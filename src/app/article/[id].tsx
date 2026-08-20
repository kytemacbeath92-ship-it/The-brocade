import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconButton, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { APP_NAME, articleById, articles, categoryById } from '@/data/articles';
import { shareText } from '@/lib/share';
import { isTtsAvailable, speak, stopSpeaking } from '@/lib/tts';
import { useAppState } from '@/state/store';

export default function ArticleScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const articleId = Number(id);
  const article = articleById.get(articleId);

  const { markRead, isPacked, togglePack, settings } = useAppState();
  const [speaking, setSpeaking] = useState(false);
  const [shareNote, setShareNote] = useState('');

  useEffect(() => {
    if (article) markRead(article.id);
  }, [article, markRead]);

  useEffect(() => () => stopSpeaking(), []);

  useEffect(() => {
    // Reset the read-aloud control and halt the speech engine when the article changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpeaking(false);
    stopSpeaking();
  }, [articleId]);

  const onToggleSpeak = useCallback(() => {
    if (!article) return;
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const text = `Article ${article.id}. ${article.title} ${article.body.join(' ')}`;
    speak(text, settings.ttsRate, {
      onStart: () => setSpeaking(true),
      onDone: () => setSpeaking(false),
    });
  }, [article, speaking, settings.ttsRate]);

  const onShare = useCallback(async () => {
    if (!article) return;
    const message = `${APP_NAME} — Article ${article.id}\n\n“${article.title}”\n\n${article.body.join('\n\n')}`;
    const result = await shareText(`Article ${article.id}`, message);
    if (result === 'copied') {
      setShareNote('Copied to clipboard');
      setTimeout(() => setShareNote(''), 2000);
    }
  }, [article]);

  if (!article) {
    return (
      <Screen>
        <View style={styles.missing}>
          <ThemedText type="serif">Article not found</ThemedText>
          <IconButton icon="arrow-back" accessibilityLabel="Go back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const packed = isPacked(article.id);
  const category = categoryById.get(article.category);
  const index = articles.findIndex((a) => a.id === article.id);
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Stack.Screen options={{ title: `Article ${article.id}` }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metaRow}>
          <View style={[styles.numberBadge, { backgroundColor: theme.tint }]}>
            <ThemedText type="smallBold" style={{ color: theme.onTint }}>
              Article {article.id}
            </ThemedText>
          </View>
          <View style={[styles.categoryTag, { borderColor: theme.border }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {category?.name}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="title" style={styles.title}>
          {article.title}
        </ThemedText>

        <View style={styles.actions}>
          <IconButton
            icon={packed ? 'bookmark' : 'bookmark-outline'}
            active={packed}
            accessibilityLabel={packed ? 'Remove from Pack' : 'Add to Pack'}
            onPress={() => togglePack(article.id)}
          />
          {isTtsAvailable() ? (
            <IconButton
              icon={speaking ? 'stop' : 'volume-high'}
              active={speaking}
              accessibilityLabel={speaking ? 'Stop reading aloud' : 'Read aloud'}
              onPress={onToggleSpeak}
            />
          ) : null}
          <IconButton icon="share-outline" accessibilityLabel="Share this article" onPress={onShare} />
        </View>
        {shareNote ? (
          <ThemedText type="small" style={{ color: theme.tint }}>
            {shareNote}
          </ThemedText>
        ) : null}

        <View style={styles.body}>
          {article.body.map((paragraph, i) => (
            <ThemedText key={i} type="body" style={styles.paragraph}>
              {paragraph}
            </ThemedText>
          ))}
        </View>

        <View style={styles.nav}>
          <NavButton
            direction="prev"
            label={prev ? `Article ${prev.id}` : ''}
            disabled={!prev}
            onPress={() => prev && router.replace(`/article/${prev.id}`)}
          />
          <NavButton
            direction="next"
            label={next ? `Article ${next.id}` : ''}
            disabled={!next}
            onPress={() => next && router.replace(`/article/${next.id}`)}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

function NavButton({
  direction,
  label,
  disabled,
  onPress,
}: {
  direction: 'prev' | 'next';
  label: string;
  disabled: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.navButton,
        {
          borderColor: theme.border,
          backgroundColor: theme.backgroundElement,
          opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
          alignItems: direction === 'prev' ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <ThemedText type="small" style={{ color: theme.textSecondary }}>
        {direction === 'prev' ? 'Previous' : 'Next'}
      </ThemedText>
      <View style={styles.navLabel}>
        {direction === 'prev' ? (
          <Ionicons name="arrow-back" size={16} color={theme.text} />
        ) : null}
        <ThemedText type="smallBold">{label || '—'}</ThemedText>
        {direction === 'next' ? (
          <Ionicons name="arrow-forward" size={16} color={theme.text} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  numberBadge: { paddingHorizontal: Spacing.three, paddingVertical: Spacing.one, borderRadius: Radius.pill },
  categoryTag: { paddingHorizontal: Spacing.three, paddingVertical: Spacing.one, borderRadius: Radius.pill, borderWidth: 1 },
  title: { lineHeight: 42 },
  actions: { flexDirection: 'row', gap: Spacing.two },
  body: { gap: Spacing.three, marginTop: Spacing.two },
  paragraph: {},
  nav: { flexDirection: 'row', gap: Spacing.three, marginTop: Spacing.four },
  navButton: { flex: 1, gap: 2, padding: Spacing.three, borderRadius: Radius.md, borderWidth: 1 },
  navLabel: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
});
