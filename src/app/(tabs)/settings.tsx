import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button, Card, Chip, IconButton, Screen, SectionHeader } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articles } from '@/data/articles';
import { useI18n } from '@/i18n/use-i18n';
import { speak, stopSpeaking } from '@/lib/tts';
import { useAppState, type ThemeMode } from '@/state/store';

const FONT_MIN = 0.85;
const FONT_MAX = 1.4;
const RATE_MIN = 0.6;
const RATE_MAX = 1.6;

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { settings, updateSettings, readIds, resetProgress } = useAppState();
  const { t, speech } = useI18n();

  const clamp = (v: number, min: number, max: number) =>
    Math.round(Math.max(min, Math.min(max, v)) * 100) / 100;

  const confirmReset = () => {
    const doReset = () => {
      resetProgress();
    };
    if (Platform.OS === 'web') {
      doReset();
      return;
    }
    Alert.alert(t('resetProgressTitle'), t('resetProgressBody'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('reset'), style: 'destructive', onPress: doReset },
    ]);
  };

  const themeLabel = (mode: ThemeMode) => t(mode);

  return (
    <Screen edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <SectionHeader title={t('appearance')} />
          <Card>
            <ThemedText type="smallBold">{t('theme')}</ThemedText>
            <View style={{ height: Spacing.two }} />
            <View style={styles.row}>
              {(['system', 'light', 'dark'] as ThemeMode[]).map((mode) => (
                <Chip
                  key={mode}
                  label={themeLabel(mode)}
                  selected={settings.themeMode === mode}
                  onPress={() => updateSettings({ themeMode: mode })}
                />
              ))}
            </View>

            <View style={{ height: Spacing.three }} />
            <View style={styles.stepperRow}>
              <View>
                <ThemedText type="smallBold">{t('textSize')}</ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {Math.round(settings.fontScale * 100)}%
                </ThemedText>
              </View>
              <View style={styles.stepper}>
                <IconButton
                  icon="remove"
                  accessibilityLabel="Decrease text size"
                  onPress={() => updateSettings({ fontScale: clamp(settings.fontScale - 0.05, FONT_MIN, FONT_MAX) })}
                />
                <IconButton
                  icon="add"
                  accessibilityLabel="Increase text size"
                  onPress={() => updateSettings({ fontScale: clamp(settings.fontScale + 0.05, FONT_MIN, FONT_MAX) })}
                />
              </View>
            </View>
          </Card>
        </View>

        <View>
          <SectionHeader title={t('readAloud')} />
          <Card>
            <View style={styles.stepperRow}>
              <View>
                <ThemedText type="smallBold">{t('speechRate')}</ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {settings.ttsRate.toFixed(2)}×
                </ThemedText>
              </View>
              <View style={styles.stepper}>
                <IconButton
                  icon="remove"
                  accessibilityLabel="Decrease speech rate"
                  onPress={() => updateSettings({ ttsRate: clamp(settings.ttsRate - 0.1, RATE_MIN, RATE_MAX) })}
                />
                <IconButton
                  icon="add"
                  accessibilityLabel="Increase speech rate"
                  onPress={() => updateSettings({ ttsRate: clamp(settings.ttsRate + 0.1, RATE_MIN, RATE_MAX) })}
                />
                <IconButton
                  icon="volume-high"
                  accessibilityLabel="Preview speech rate"
                  onPress={() => {
                    stopSpeaking();
                    speak(t('tagline'), settings.ttsRate, {}, { lang: speech, muted: !settings.soundOn });
                  }}
                />
              </View>
            </View>
          </Card>
        </View>

        <View>
          <SectionHeader title={t('progress')} />
          <Card>
            <ThemedText type="body">
              {t('youHaveRead', { read: readIds.size, total: articles.length })}
            </ThemedText>
            <View style={{ height: Spacing.three }} />
            <Chip label={t('resetProgress')} onPress={confirmReset} />
          </Card>
        </View>

        <Button label={t('askABro')} icon="chatbubbles" variant="secondary" onPress={() => router.push('/ask')} />

        <ThemedText type="cursive" style={{ color: theme.textSecondary, textAlign: 'center' }}>
          {t('appName')} · v{Constants.expoConfig?.version ?? '1.0.0'}
        </ThemedText>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepper: { flexDirection: 'row', gap: Spacing.two },
});
