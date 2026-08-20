import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeArticles, localizeCategory } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';

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
  const { t, lang } = useI18n();
  const localized = useMemo(() => localizeArticles(lang), [lang]);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * localized.length));
  const article = localized[index] ?? localized[0];
  const category = localizeCategory(article.category, lang);

  const shuffle = useCallback(() => {
    setIndex((prev) => randomIndex(prev, localized.length));
  }, [localized.length]);

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <View style={styles.content}>
        <ThemedText type="cursive" style={{ color: theme.textSecondary, textAlign: 'center' }}>
          {t('tagline')}
        </ThemedText>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.badge, { backgroundColor: theme.tint }]}>
            <ThemedText type="smallBold" style={{ color: theme.onTint }}>
              {t('article')} {article.id}
            </ThemedText>
          </View>
          <ThemedText type="cursive" style={styles.quote}>
            “{article.title}”
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {category?.name}
          </ThemedText>
        </View>

        <View style={styles.actions}>
          <Button label={t('next')} icon="shuffle" variant="secondary" onPress={shuffle} />
          <Button label={t('articleSingular')} icon="book-outline" onPress={() => router.push(`/article/${article.id}`)} />
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
