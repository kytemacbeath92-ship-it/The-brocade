import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useBookPager } from '@/components/book-pager';
import { ThemedText } from '@/components/themed-text';
import { IconButton } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { articles, type Article } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';
import { localizeCategory } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { shareText } from '@/lib/share';
import { isTtsAvailable, speak, stopSpeaking } from '@/lib/tts';
import { useAppState } from '@/state/store';

export function ArticlePage({ article, active = true }: { article: Article; active?: boolean }) {
  const theme = useTheme();
  const { t, lang, speech } = useI18n();
  const { markRead, isPacked, togglePack, settings } = useAppState();
  const pager = useBookPager();
  const [speaking, setSpeaking] = useState(false);
  const [shareNote, setShareNote] = useState('');
  const packed = isPacked(article.id);
  const category = localizeCategory(article.category, lang);
  const index = articles.findIndex((a) => a.id === article.id);
  const prevId = index > 0 ? articles[index - 1].id : null;
  const nextId = index < articles.length - 1 ? articles[index + 1].id : null;

  useEffect(() => {
    if (active) markRead(article.id);
  }, [active, article.id, markRead]);

  useEffect(() => () => stopSpeaking(), [article.id]);

  const onToggleSpeak = useCallback(() => {
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
    const message = `${t('appName')} — ${t('article')} ${article.id}\n\n“${article.title}”\n\n${article.body.join('\n\n')}`;
    const result = await shareText(`${t('article')} ${article.id}`, message);
    if (result === 'copied') {
      setShareNote(t('copied'));
      setTimeout(() => setShareNote(''), 2000);
    }
  }, [article, t]);

  return (
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
          <ThemedText key={i} type="body">
            {paragraph}
          </ThemedText>
        ))}
      </View>

      <View style={styles.nav}>
        <Pressable
          disabled={prevId == null || pager.busy}
          onPress={() => pager.turn('prev')}
          style={({ pressed }) => [
            styles.navButton,
            {
              borderColor: theme.border,
              backgroundColor: theme.backgroundElement,
              opacity: prevId == null ? 0.4 : pressed ? 0.85 : 1,
              alignItems: 'flex-start',
            },
          ]}
        >
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {t('previous')}
          </ThemedText>
          <View style={styles.navLabel}>
            <Ionicons name="arrow-back" size={16} color={theme.text} />
            <ThemedText type="smallBold">{prevId != null ? `${t('article')} ${prevId}` : '—'}</ThemedText>
          </View>
        </Pressable>
        <Pressable
          disabled={nextId == null || pager.busy}
          onPress={() => pager.turn('next')}
          style={({ pressed }) => [
            styles.navButton,
            {
              borderColor: theme.border,
              backgroundColor: theme.backgroundElement,
              opacity: nextId == null ? 0.4 : pressed ? 0.85 : 1,
              alignItems: 'flex-end',
            },
          ]}
        >
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {t('next')}
          </ThemedText>
          <View style={styles.navLabel}>
            <ThemedText type="smallBold">{nextId != null ? `${t('article')} ${nextId}` : '—'}</ThemedText>
            <Ionicons name="arrow-forward" size={16} color={theme.text} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    flexGrow: 1,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  numberBadge: { paddingHorizontal: Spacing.three, paddingVertical: Spacing.one, borderRadius: Radius.pill },
  categoryTag: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  title: { fontSize: 32, lineHeight: 40 },
  actions: { flexDirection: 'row', gap: Spacing.two },
  body: { gap: Spacing.three, marginTop: Spacing.two },
  nav: { flexDirection: 'row', gap: Spacing.three, marginTop: Spacing.four },
  navButton: { flex: 1, gap: 2, padding: Spacing.three, borderRadius: Radius.md, borderWidth: 1 },
  navLabel: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
});
