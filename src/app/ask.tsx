import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ArticleRow } from '@/components/article-row';
import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articles, categoryById, type Article } from '@/data/articles';

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'to', 'of', 'and', 'or', 'is', 'are', 'my', 'i', 'me', 'do', 'does',
  'how', 'what', 'when', 'should', 'with', 'for', 'in', 'on', 'at', 'be', 'it', 'his', 'her',
  'he', 'she', 'they', 'you', 'your', 'that', 'this', 'about', 'if', 'can', 'bro', 'mate',
]);

const PRESETS = [
  'My mate is going through a breakup',
  'How do I be a good wingman?',
  'A friend let me down',
  'What do I bring to a party?',
];

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

const HAYSTACKS = articles.map((a) => ({
  article: a,
  words: new Set(tokens(`${a.title} ${a.body.join(' ')} ${categoryById.get(a.category)?.name ?? ''}`)),
}));

function suggest(query: string): Article[] {
  const q = tokens(query);
  if (q.length === 0) return [];
  const scored = HAYSTACKS.map(({ article, words }) => {
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
  return scored;
}

export default function AskScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const results = useMemo(() => suggest(submitted), [submitted]);
  const showEmpty = submitted.trim().length > 0 && results.length === 0;

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          Describe the situation, and the Code will point you to the articles that apply.
        </ThemedText>

        <View style={[styles.inputWrap, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="e.g. My best mate just lost his job…"
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
            multiline
            onSubmitEditing={() => setSubmitted(query)}
          />
        </View>
        <Button label="Ask a Bro" icon="chatbubbles" onPress={() => setSubmitted(query)} />

        <View style={styles.presets}>
          {PRESETS.map((p) => (
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
              THE CODE SAYS
            </ThemedText>
            {results.map((a) => (
              <ArticleRow key={a.id} article={a} />
            ))}
          </View>
        ) : null}

        {showEmpty ? (
          <View style={styles.empty}>
            <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: 'center' }}>
              No direct match — when in doubt, start at the beginning.
            </ThemedText>
            <Button label="Read Article 1" icon="book-outline" variant="secondary" onPress={() => router.push('/article/1')} />
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
