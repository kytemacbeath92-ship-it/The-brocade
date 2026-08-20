import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ArticleRow } from '@/components/article-row';
import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeArticles } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { useAppState } from '@/state/store';

export default function PackScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { packIds } = useAppState();
  const { t, lang } = useI18n();

  const saved = useMemo(
    () => localizeArticles(lang).filter((a) => packIds.has(a.id)),
    [packIds, lang],
  );

  if (saved.length === 0) {
    return (
      <Screen edges={['left', 'right']}>
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={40} color={theme.textSecondary} />
          <ThemedText type="cursive" style={{ textAlign: 'center' }}>
            {t('packEmptyTitle')}
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: 'center' }}>
            {t('packEmptyBody')}
          </ThemedText>
          <Button label={t('browseTheCode')} icon="list" onPress={() => router.push('/code')} />
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
            {saved.length} {saved.length === 1 ? t('savedArticle') : t('savedArticles')}
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
