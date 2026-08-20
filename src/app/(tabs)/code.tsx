import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import { ArticleRow } from '@/components/article-row';
import { ThemedText } from '@/components/themed-text';
import { Chip, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articles, categories, type CategoryId } from '@/data/articles';
import { useAppState } from '@/state/store';

type ReadFilter = 'all' | 'unread' | 'read';

export default function CodeScreen() {
  const theme = useTheme();
  const { isRead } = useAppState();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [readFilter, setReadFilter] = useState<ReadFilter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      if (readFilter === 'read' && !isRead(a.id)) return false;
      if (readFilter === 'unread' && isRead(a.id)) return false;
      if (q) {
        const haystack = `${a.id} ${a.title} ${a.body.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, readFilter, isRead]);

  return (
    <Screen edges={['left', 'right']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ArticleRow article={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.two }} />}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={[styles.search, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <Ionicons name="search" size={18} color={theme.textSecondary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search the Code…"
                placeholderTextColor={theme.textSecondary}
                style={[styles.searchInput, { color: theme.text }]}
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>

            <View style={styles.filterRow}>
              <Chip label="All" selected={category === 'all'} onPress={() => setCategory('all')} />
              {categories.map((c) => (
                <Chip
                  key={c.id}
                  label={c.name}
                  selected={category === c.id}
                  onPress={() => setCategory(c.id)}
                />
              ))}
            </View>

            <View style={styles.filterRow}>
              <Chip label="Every article" selected={readFilter === 'all'} onPress={() => setReadFilter('all')} />
              <Chip label="Unread" selected={readFilter === 'unread'} onPress={() => setReadFilter('unread')} />
              <Chip label="Read" selected={readFilter === 'read'} onPress={() => setReadFilter('read')} />
            </View>

            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.two }}>
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </ThemedText>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={28} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              No articles match your filters.
            </ThemedText>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
  },
  header: { paddingTop: Spacing.three, gap: Spacing.three },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    height: 46,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 16, height: '100%' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  empty: { alignItems: 'center', gap: Spacing.two, paddingTop: Spacing.six },
});
