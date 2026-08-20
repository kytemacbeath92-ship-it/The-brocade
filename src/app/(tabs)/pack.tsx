import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ArticleRow } from '@/components/article-row';
import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articles } from '@/data/articles';
import { useAppState } from '@/state/store';

export default function PackScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { packIds } = useAppState();

  const saved = useMemo(
    () => articles.filter((a) => packIds.has(a.id)),
    [packIds],
  );

  if (saved.length === 0) {
    return (
      <Screen edges={['left', 'right']}>
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={40} color={theme.textSecondary} />
          <ThemedText type="serif" style={{ textAlign: 'center' }}>
            Your Pack is empty
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: 'center' }}>
            Tap the bookmark on any article to keep it here for quick reference — your personal
            pack of the rules that matter most to you.
          </ThemedText>
          <Button label="Browse the Code" icon="list" onPress={() => router.push('/code')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['left', 'right']}>
      <FlatList
        data={saved}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ArticleRow article={item} />}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.two }} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.three }}>
            {saved.length} saved {saved.length === 1 ? 'article' : 'articles'}
          </ThemedText>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
});
