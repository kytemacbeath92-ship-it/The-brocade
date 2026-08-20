import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articles, categoryById } from '@/data/articles';

function randomIndex(exclude: number, length: number) {
  if (length <= 1) return 0;
  let next = exclude;
  while (next === exclude) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

export default function GlanceScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * articles.length));
  const article = articles[index];
  const category = categoryById.get(article.category);

  const shuffle = useCallback(() => {
    setIndex((prev) => randomIndex(prev, articles.length));
  }, []);

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <View style={styles.content}>
        <ThemedText type="small" style={{ color: theme.textSecondary, textAlign: 'center' }}>
          A moment of the Code, at a glance.
        </ThemedText>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.badge, { backgroundColor: theme.tint }]}>
            <ThemedText type="smallBold" style={{ color: theme.onTint }}>
              Article {article.id}
            </ThemedText>
          </View>
          <ThemedText type="serif" style={styles.quote}>
            “{article.title}”
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {category?.name}
          </ThemedText>
        </View>

        <View style={styles.actions}>
          <Button label="Another" icon="shuffle" variant="secondary" onPress={shuffle} />
          <Button label="Read it" icon="book-outline" onPress={() => router.push(`/article/${article.id}`)} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', gap: Spacing.four, paddingHorizontal: Spacing.three },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.five,
    gap: Spacing.three,
    alignItems: 'center',
  },
  badge: { paddingHorizontal: Spacing.three, paddingVertical: Spacing.one, borderRadius: Radius.pill },
  quote: { textAlign: 'center', fontSize: 26, lineHeight: 36 },
  actions: { flexDirection: 'row', gap: Spacing.three, justifyContent: 'center' },
});
