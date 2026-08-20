import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ArticlePage } from '@/components/article-page';
import { BookPager } from '@/components/book-pager';
import { ThemedText } from '@/components/themed-text';
import { IconButton, Screen } from '@/components/ui';
import { Gold, Spacing } from '@/constants/theme';
import { articleById, articles } from '@/data/articles';
import { localizeArticle } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { useCover } from '@/state/cover';

function ArticleCoverButton() {
  const { closeBook } = useCover();
  const { t } = useI18n();
  return (
    <Pressable
      onPress={closeBook}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 6 }}
      accessibilityRole="button"
      accessibilityLabel={t('cover')}
    >
      <Ionicons name="book" size={18} color={Gold.bright} />
      <ThemedText type="smallBold" style={{ color: Gold.bright }}>
        {t('cover')}
      </ThemedText>
    </Pressable>
  );
}

export default function ArticleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const paramId = Number(id);
  const { t, lang } = useI18n();
  const [currentId, setCurrentId] = useState(() => (Number.isFinite(paramId) ? paramId : 1));
  const [seenParam, setSeenParam] = useState(paramId);

  if (Number.isFinite(paramId) && paramId !== seenParam) {
    setSeenParam(paramId);
    setCurrentId(paramId);
  }

  const index = articles.findIndex((a) => a.id === currentId);
  const prevId = index > 0 ? articles[index - 1].id : null;
  const nextId = index >= 0 && index < articles.length - 1 ? articles[index + 1].id : null;

  const onSettled = useCallback(
    (next: number) => {
      setCurrentId(next);
      router.setParams({ id: String(next) });
    },
    [router],
  );

  const localized = useMemo(() => {
    const map = new Map<number, ReturnType<typeof localizeArticle>>();
    for (const idKey of [prevId, currentId, nextId]) {
      if (idKey == null) continue;
      const base = articleById.get(idKey);
      if (base) map.set(idKey, localizeArticle(base, lang));
    }
    return map;
  }, [currentId, lang, nextId, prevId]);

  const current = localized.get(currentId);

  if (!current) {
    return (
      <Screen>
        <View style={styles.missing}>
          <ThemedText type="serif">{t('articleNotFound')}</ThemedText>
          <IconButton icon="arrow-back" accessibilityLabel="Go back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Stack.Screen
        options={{
          title: `${t('article')} ${currentId}`,
          headerRight: () => <ArticleCoverButton />,
        }}
      />
      <BookPager
        currentId={currentId}
        prevId={prevId}
        nextId={nextId}
        onSettled={onSettled}
        renderPage={(pageId) => {
          const article = localized.get(pageId);
          return article ? <ArticlePage article={article} active={pageId === currentId} /> : null;
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
});
