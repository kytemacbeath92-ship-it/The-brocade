import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ArticleRow } from '@/components/article-row';
import { ThemedText } from '@/components/themed-text';
import { Chip, Screen } from '@/components/ui';
import { Gold, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeArticles, localizeCategories } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { useAppState } from '@/state/store';
import type { CategoryId } from '@/data/articles';

type ReadFilter = 'all' | 'unread' | 'read';

export default function CodeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { isRead } = useAppState();
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [readFilter, setReadFilter] = useState<ReadFilter>('all');

  const localized = useMemo(() => localizeArticles(lang), [lang]);
  const cats = useMemo(() => localizeCategories(lang), [lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return localized.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      if (readFilter === 'read' && !isRead(a.id)) return false;
      if (readFilter === 'unread' && isRead(a.id)) return false;
      if (q) {
        const haystack = `${a.id} ${a.title} ${a.body.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, readFilter, isRead, localized]);

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
            <Pressable
              onPress={() => router.push('/intro')}
              style={({ pressed }) => [
                styles.introRow,
                { borderColor: theme.border, backgroundColor: theme.card, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <ThemedText type="small" style={{ color: Gold.deep, letterSpacing: 1.2 }}>
                {t('page1')}
              </ThemedText>
              <ThemedText type="cursive" style={{ color: theme.text }}>
                {t('introduction')}
              </ThemedText>
            </Pressable>

            <View style={[styles.search, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <Ionicons name="search" size={18} color={theme.textSecondary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t('searchTheCode')}
                placeholderTextColor={theme.textSecondary}
                style={[styles.searchInput, { color: theme.text }]}
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>

            <View style={styles.filterRow}>
              <Chip label={t('all')} selected={category === 'all'} onPress={() => setCategory('all')} />
              {cats.map((c) => (
                <Chip
                  key={c.id}
                  label={c.name}
                  selected={category === c.id}
                  onPress={() => setCategory(c.id)}
                />
              ))}
            </View>

            <View style={styles.filterRow}>
              <Chip label={t('everyArticle')} selected={readFilter === 'all'} onPress={() => setReadFilter('all')} />
              <Chip label={t('unread')} selected={readFilter === 'unread'} onPress={() => setReadFilter('unread')} />
              <Chip label={t('read')} selected={readFilter === 'read'} onPress={() => setReadFilter('read')} />
            </View>

            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.two }}>
              {filtered.length} {filtered.length === 1 ? t('articleSingular') : t('articles')}
            </ThemedText>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={28} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              {t('noArticlesMatch')}
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
  introRow: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.three,
    gap: 2,
  },
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
