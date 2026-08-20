import Constants from 'expo-constants';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, Chip, IconButton, Screen, SectionHeader } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { articles } from '@/data/articles';
import { speak, stopSpeaking } from '@/lib/tts';
import { useAppState, type ThemeMode } from '@/state/store';

const FONT_MIN = 0.85;
const FONT_MAX = 1.4;
const RATE_MIN = 0.6;
const RATE_MAX = 1.6;

export default function SettingsScreen() {
  const theme = useTheme();
  const { settings, updateSettings, readIds, resetProgress } = useAppState();

  const clamp = (v: number, min: number, max: number) =>
    Math.round(Math.max(min, Math.min(max, v)) * 100) / 100;

  const confirmReset = () => {
    const doReset = () => {
      resetProgress();
    };
    if (Platform.OS === 'web') {
      // Alert on web only supports a single button, so reset directly.
      doReset();
      return;
    }
    Alert.alert('Reset reading progress?', 'This clears which articles you have marked as read. Your Pack is kept.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: doReset },
    ]);
  };

  return (
    <Screen edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <SectionHeader title="Appearance" />
          <Card>
            <ThemedText type="smallBold">Theme</ThemedText>
            <View style={{ height: Spacing.two }} />
            <View style={styles.row}>
              {(['system', 'light', 'dark'] as ThemeMode[]).map((mode) => (
                <Chip
                  key={mode}
                  label={mode[0].toUpperCase() + mode.slice(1)}
                  selected={settings.themeMode === mode}
                  onPress={() => updateSettings({ themeMode: mode })}
                />
              ))}
            </View>

            <View style={{ height: Spacing.three }} />
            <View style={styles.stepperRow}>
              <View>
                <ThemedText type="smallBold">Text size</ThemedText>
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
          <SectionHeader title="Read aloud" />
          <Card>
            <View style={styles.stepperRow}>
              <View>
                <ThemedText type="smallBold">Speech rate</ThemedText>
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
                    speak('A bro reads the Code aloud, at just the right pace.', settings.ttsRate);
                  }}
                />
              </View>
            </View>
          </Card>
        </View>

        <View>
          <SectionHeader title="Progress" />
          <Card>
            <ThemedText type="body">
              You have read {readIds.size} of {articles.length} articles.
            </ThemedText>
            <View style={{ height: Spacing.three }} />
            <Chip label="Reset reading progress" onPress={confirmReset} />
          </Card>
        </View>

        <ThemedText type="small" style={{ color: theme.textSecondary, textAlign: 'center' }}>
          The Bro Code · v{Constants.expoConfig?.version ?? '1.0.0'}
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
