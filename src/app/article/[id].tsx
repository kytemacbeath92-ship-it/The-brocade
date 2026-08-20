import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconButton, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articleById, articles } from '@/data/articles';
import { localizeArticle, localizeCategory } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { shareText } from '@/lib/share';
import { isTtsAvailable, speak, stopSpeaking } from '@/lib/tts';
import { useAppState } from '@/state/store';

export default function ArticleScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const articleId = Number(id);
  const { t, lang, speech } = useI18n();
  const base = articleById.get(articleId);
  const article = useMemo(() => (base ? localizeArticle(base, lang) : undefined), [base, lang]);

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
    const text = `${t('article')} ${article.id}. ${article.title} ${article.body.join(' ')}`;
    speak(
      text,
      settings.ttsRate,
      {
        onStart: () => setSpeaking(true),
        onDone: () => setSpeaking(false),
      },
      { lang: speech, muted: !settings.soundOn },
    );
  }, [article, speaking, settings.ttsRate, settings.soundOn, speech, t]);

  const onShare = useCallback(async () => {
    if (!article) return;
    const message = `${t('appName')} — ${t('article')} ${article.id}\n\n“${article.title}”\n\n${article.body.join('\n\n')}`;
    const result = await shareText(`${t('article')} ${article.id}`, message);
    if (result === 'copied') {
      setShareNote(t('copied'));
      setTimeout(() => setShareNote(''), 2000);
    }
  }, [article, t]);

  if (!article) {
    return (
      <Screen>
        <View style={styles.missing}>
          <ThemedText type="serif">{t('articleNotFound')}</ThemedText>
          <IconButton icon="arrow-back" accessibilityLabel="Go back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const packed = isPacked(article.id);
  const category = localizeCategory(article.category, lang);
  const index = articles.findIndex((a) => a.id === article.id);
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Stack.Screen options={{ title: `${t('article')} ${article.id}` }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metaRow}>
          <View style={[styles.numberBadge, { backgroundColor: theme.tint }]}>
            <ThemedText type="smallBold" style={{ color: theme.onTint }}>
              {t('article')} {article.id}
            </ThemedText>
          </View>
          <View style={[styles.categoryTag, { borderColor: theme.border }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {category?.name}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="cursive" style={styles.title}>
          {article.title}
        </ThemedText>

        <View style={styles.actions}>
          <IconButton
            icon={packed ? 'bookmark' : 'bookmark-outline'}
            active={packed}
            accessibilityLabel={packed ? t('removeFromPack') : t('addToPack')}
            onPress={() => togglePack(article.id)}
          />
          {isTtsAvailable() ? (
            <IconButton
              icon={speaking ? 'stop' : 'volume-high'}
              active={speaking}
              accessibilityLabel={speaking ? t('stopReadingAloud') : t('readAloud')}
              onPress={onToggleSpeak}
            />
          ) : null}
          <IconButton icon="share-outline" accessibilityLabel={t('shareThisArticle')} onPress={onShare} />
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
            label={prev ? `${t('article')} ${prev.id}` : ''}
            previousLabel={t('previous')}
            nextLabel={t('next')}
            disabled={!prev}
            onPress={() => prev && router.replace(`/article/${prev.id}`)}
          />
          <NavButton
            direction="next"
            label={next ? `${t('article')} ${next.id}` : ''}
            previousLabel={t('previous')}
            nextLabel={t('next')}
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
  previousLabel,
  nextLabel,
  disabled,
  onPress,
}: {
  direction: 'prev' | 'next';
  label: string;
  previousLabel: string;
  nextLabel: string;
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
        {direction === 'prev' ? previousLabel : nextLabel}
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
  title: { fontSize: 32, lineHeight: 40 },
  actions: { flexDirection: 'row', gap: Spacing.two },
  body: { gap: Spacing.three, marginTop: Spacing.two },
  paragraph: {},
  nav: { flexDirection: 'row', gap: Spacing.three, marginTop: Spacing.four },
  navButton: { flex: 1, gap: 2, padding: Spacing.three, borderRadius: Radius.md, borderWidth: 1 },
  navLabel: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
});
