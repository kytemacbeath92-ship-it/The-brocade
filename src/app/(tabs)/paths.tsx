import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, ProgressBar, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeArticle, localizePaths } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { articleById } from '@/data/articles';
import { useAppState } from '@/state/store';

export default function PathsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { isRead } = useAppState();
  const { t, lang } = useI18n();
  const paths = useMemo(() => localizePaths(lang), [lang]);

  return (
    <Screen edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="serif" style={{ color: theme.textSecondary, marginBottom: Spacing.two }}>
          {t('pathsBlurb')}
        </ThemedText>

        {paths.map((path) => {
          const readInPath = path.articleIds.filter((id) => isRead(id)).length;
          const progress = path.articleIds.length ? readInPath / path.articleIds.length : 0;
          const firstUnread = path.articleIds.find((id) => !isRead(id)) ?? path.articleIds[0];
          return (
            <Card key={path.id} onPress={() => router.push(`/article/${firstUnread}`)}>
              <ThemedText type="cursive">{path.name}</ThemedText>
              <View style={{ height: Spacing.one }} />
              <ThemedText type="body" style={{ color: theme.textSecondary }}>
                {path.blurb}
              </ThemedText>
              <View style={{ height: Spacing.three }} />
              <ProgressBar value={progress} />
              <View style={{ height: Spacing.two }} />
              <View style={styles.metaRow}>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {t('readCount', { read: readInPath, total: path.articleIds.length })}
                </ThemedText>
                <ThemedText type="smallBold" style={{ color: theme.tint }}>
                  {readInPath === path.articleIds.length
                    ? t('completed')
                    : t('startWithArticle', { id: firstUnread })}
                </ThemedText>
              </View>
              <View style={{ height: Spacing.two }} />
              <ThemedText type="small" style={{ color: theme.textSecondary }} numberOfLines={1}>
                {path.articleIds
                  .map((id) => localizeArticle(articleById.get(id)!, lang).id)
                  .join(' · ')}
              </ThemedText>
            </Card>
          );
        })}
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
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
