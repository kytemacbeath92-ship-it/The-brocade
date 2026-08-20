import { type ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeIntro } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';

export function IntroPage({
  headerRight,
  interactive = true,
}: {
  headerRight?: ReactNode;
  interactive?: boolean;
}) {
  const theme = useTheme();
  const router = useRouter();
  const { t, lang } = useI18n();
  const copy = localizeIntro(lang);

  return (
    <Screen edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <ThemedText type="small" style={{ color: theme.tint, letterSpacing: 2, flex: 1 }}>
            {t('page1')} · {t('subtitle').toUpperCase()}
          </ThemedText>
          {headerRight}
        </View>
        <ThemedText type="cursive" style={{ fontSize: 36, lineHeight: 44, color: theme.accent }}>
          {copy.title}
        </ThemedText>
        <ThemedText type="serif" style={{ color: theme.textSecondary }}>
          {t('tagline')}
        </ThemedText>

        <View style={styles.body}>
          {copy.body.map((paragraph, i) => (
            <ThemedText key={i} type="body">
              {paragraph}
            </ThemedText>
          ))}
        </View>

        <Button
          label={t('beginWithArticle1')}
          icon="arrow-forward"
          onPress={() => {
            if (interactive) router.push('/article/1');
          }}
        />
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  body: { gap: Spacing.three, marginVertical: Spacing.two },
});
