import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Card, ProgressBar, Screen, SectionHeader } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  APP_NAME,
  APP_SUBTITLE,
  APP_TAGLINE,
  articleById,
  articles,
  broOfTheDayId,
  categoryById,
} from '@/data/articles';
import { useAppState } from '@/state/store';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { readIds, lastReadId } = useAppState();

  const total = articles.length;
  const readCount = readIds.size;
  const progress = total ? readCount / total : 0;

  const botdId = useMemo(() => broOfTheDayId(), []);
  const botd = articleById.get(botdId)!;

  const continueId = lastReadId ?? 1;
  const continueArticle = articleById.get(continueId)!;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ThemedText type="small" style={{ color: theme.tint, letterSpacing: 2 }}>
            {APP_SUBTITLE.toUpperCase()}
          </ThemedText>
          <ThemedText type="title" style={styles.heroTitle}>
            {APP_NAME}
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            {APP_TAGLINE}
          </ThemedText>
        </View>

        <Card>
          <SectionHeader title="Your progress" />
          <View style={styles.progressRow}>
            <ThemedText type="subtitle">{readCount}</ThemedText>
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              of {total} articles read
            </ThemedText>
          </View>
          <ProgressBar value={progress} />
          <View style={{ height: Spacing.three }} />
          <Button
            label={lastReadId ? `Continue: Article ${continueArticle.id}` : 'Start with Article 1'}
            icon="play"
            onPress={() => router.push(`/article/${continueId}`)}
          />
          <View style={{ height: Spacing.two }} />
          <Button
            label="Read the Introduction"
            icon="book-outline"
            variant="secondary"
            onPress={() => router.push('/intro')}
          />
        </Card>

        <View>
          <SectionHeader title="Bro of the Day" />
          <Card onPress={() => router.push(`/article/${botd.id}`)}>
            <View style={styles.botdHeader}>
              <View style={[styles.botdBadge, { backgroundColor: theme.tint }]}>
                <ThemedText type="smallBold" style={{ color: theme.onTint }}>
                  #{botd.id}
                </ThemedText>
              </View>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {categoryById.get(botd.category)?.name}
              </ThemedText>
            </View>
            <View style={{ height: Spacing.two }} />
            <ThemedText type="serif">{botd.title}</ThemedText>
            <View style={{ height: Spacing.two }} />
            <ThemedText type="body" style={{ color: theme.textSecondary }} numberOfLines={2}>
              {botd.body[0]}
            </ThemedText>
          </Card>
        </View>

        <View>
          <SectionHeader title="Quick actions" />
          <View style={styles.quickRow}>
            <QuickAction
              icon="flash"
              label="Glance"
              hint="A random article"
              onPress={() => router.push('/glance')}
            />
            <QuickAction
              icon="chatbubbles"
              label="Ask a Bro"
              hint="Advice on tap"
              onPress={() => router.push('/ask')}
            />
          </View>
          <View style={styles.quickRow}>
            <QuickAction
              icon="list"
              label="The Code"
              hint="All 70 articles"
              onPress={() => router.push('/code')}
            />
            <QuickAction
              icon="compass"
              label="Guided Paths"
              hint="Curated journeys"
              onPress={() => router.push('/paths')}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function QuickAction({
  icon,
  label,
  hint,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  hint: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.quick,
        { backgroundColor: theme.card, borderColor: theme.border, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <View style={[styles.quickIcon, { backgroundColor: theme.backgroundSelected }]}>
        <Ionicons name={icon} size={20} color={theme.tint} />
      </View>
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedText type="small" style={{ color: theme.textSecondary }}>
        {hint}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  hero: { gap: Spacing.one, paddingTop: Spacing.two },
  heroTitle: { marginVertical: 2 },
  progressRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two, marginBottom: Spacing.two },
  botdHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  botdBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  quickRow: { flexDirection: 'row', gap: Spacing.three, marginBottom: Spacing.three },
  quick: {
    flex: 1,
    gap: 2,
    padding: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
});
