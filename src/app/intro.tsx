import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeIntro } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';

export default function IntroScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t, lang } = useI18n();
  const copy = localizeIntro(lang);

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="small" style={{ color: theme.tint, letterSpacing: 2 }}>
          {t('page1')} · {t('subtitle').toUpperCase()}
        </ThemedText>
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

        <Button label={t('beginWithArticle1')} icon="arrow-forward" onPress={() => router.push('/article/1')} />
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
  body: { gap: Spacing.three, marginVertical: Spacing.two },
});
