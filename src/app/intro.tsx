import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { APP_SUBTITLE, APP_TAGLINE, intro } from '@/data/articles';

export default function IntroScreen() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="small" style={{ color: theme.tint, letterSpacing: 2 }}>
          PAGE 1 · {APP_SUBTITLE.toUpperCase()}
        </ThemedText>
        <ThemedText type="title">{intro.title}</ThemedText>
        <ThemedText type="serif" style={{ color: theme.textSecondary }}>
          {APP_TAGLINE}
        </ThemedText>

        <View style={styles.body}>
          {intro.body.map((paragraph, i) => (
            <ThemedText key={i} type="body">
              {paragraph}
            </ThemedText>
          ))}
        </View>

        <Button label="Begin with Article 1" icon="arrow-forward" onPress={() => router.push('/article/1')} />
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
