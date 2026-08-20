import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ArticleRow } from '@/components/article-row';
import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeArticles, localizeCategory } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { type Article } from '@/data/articles';

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'to', 'of', 'and', 'or', 'is', 'are', 'my', 'i', 'me', 'do', 'does',
  'how', 'what', 'when', 'should', 'with', 'for', 'in', 'on', 'at', 'be', 'it', 'his', 'her',
  'he', 'she', 'they', 'you', 'your', 'that', 'this', 'about', 'if', 'can', 'bro', 'mate',
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u0980-\u09FF\u4E00-\u9FFF\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

function suggest(query: string, list: Article[], lang: ReturnType<typeof useI18n>['lang']): Article[] {
  const q = tokens(query);
  if (q.length === 0) return [];
  const haystacks = list.map((article) => ({
    article,
    words: new Set(
      tokens(`${article.title} ${article.body.join(' ')} ${localizeCategory(article.category, lang).name}`),
    ),
  }));
  return haystacks
    .map(({ article, words }) => {
      let score = 0;
      for (const term of q) {
        if (words.has(term)) score += 2;
        else {
          for (const w of words) {
            if (w.includes(term) || term.includes(w)) {
              score += 1;
              break;
            }
          }
        }
      }
      return { article, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.article);
}

export default function AskScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const localized = useMemo(() => localizeArticles(lang), [lang]);

  const results = useMemo(() => suggest(submitted, localized, lang), [submitted, localized, lang]);
  const showEmpty = submitted.trim().length > 0 && results.length === 0;
  const presets = [t('presetBreakup'), t('presetWingman'), t('presetLetDown'), t('presetParty')];

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          {t('askHint')}
        </ThemedText>

        <View style={[styles.inputWrap, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('askPlaceholder')}
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
            multiline
            onSubmitEditing={() => setSubmitted(query)}
          />
        </View>
        <Button label={t('askABro')} icon="chatbubbles" onPress={() => setSubmitted(query)} />

        <View style={styles.presets}>
          {presets.map((p) => (
            <Pressable
              key={p}
              onPress={() => {
                setQuery(p);
                setSubmitted(p);
              }}
              style={({ pressed }) => [
                styles.preset,
                { borderColor: theme.border, backgroundColor: theme.backgroundElement, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Ionicons name="sparkles-outline" size={14} color={theme.tint} />
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {p}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {results.length > 0 ? (
          <View style={styles.results}>
            <ThemedText type="small" style={{ color: theme.textSecondary, letterSpacing: 1.2 }}>
              {t('theCodeSays')}
            </ThemedText>
            {results.map((a) => (
              <ArticleRow key={a.id} article={a} />
            ))}
          </View>
        ) : null}

        {showEmpty ? (
          <View style={styles.empty}>
            <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: 'center' }}>
              {t('noDirectMatch')}
            </ThemedText>
            <Button label={t('readArticle1')} icon="book-outline" variant="secondary" onPress={() => router.push('/article/1')} />
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  inputWrap: { borderRadius: Radius.md, borderWidth: 1, padding: Spacing.three },
  input: { fontSize: 16, minHeight: 72, textAlignVertical: 'top' },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  preset: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  results: { gap: Spacing.two, marginTop: Spacing.two },
  empty: { gap: Spacing.three, marginTop: Spacing.three, alignItems: 'center' },
});
