import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, ProgressBar, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articleById, guidedPaths } from '@/data/articles';
import { useAppState } from '@/state/store';

export default function PathsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { isRead } = useAppState();

  return (
    <Screen edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="body" style={{ color: theme.textSecondary, marginBottom: Spacing.two }}>
          Curated journeys through the Code — a focused way to grow one theme at a time.
        </ThemedText>

        {guidedPaths.map((path) => {
          const readInPath = path.articleIds.filter((id) => isRead(id)).length;
          const progress = path.articleIds.length ? readInPath / path.articleIds.length : 0;
          const firstUnread = path.articleIds.find((id) => !isRead(id)) ?? path.articleIds[0];
          return (
            <Card key={path.id} onPress={() => router.push(`/article/${firstUnread}`)}>
              <ThemedText type="serif">{path.name}</ThemedText>
              <View style={{ height: Spacing.one }} />
              <ThemedText type="body" style={{ color: theme.textSecondary }}>
                {path.blurb}
              </ThemedText>
              <View style={{ height: Spacing.three }} />
              <ProgressBar value={progress} />
              <View style={{ height: Spacing.two }} />
              <View style={styles.metaRow}>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {readInPath}/{path.articleIds.length} read
                </ThemedText>
                <ThemedText type="smallBold" style={{ color: theme.tint }}>
                  {readInPath === path.articleIds.length
                    ? 'Completed'
                    : `Start with Article ${firstUnread}`}
                </ThemedText>
              </View>
              <View style={{ height: Spacing.two }} />
              <ThemedText type="small" style={{ color: theme.textSecondary }} numberOfLines={1}>
                {path.articleIds.map((id) => articleById.get(id)?.id).join(' · ')}
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
