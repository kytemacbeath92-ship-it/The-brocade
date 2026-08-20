import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { GoldToggle } from '@/components/ui';
import { Fonts, Gold, Leather, Spacing } from '@/constants/theme';
import { broOfTheDayId } from '@/data/articles';
import { localizeArticle, localizeArticles } from '@/i18n/localize';
import { LANGUAGES } from '@/i18n/languages';
import { useI18n } from '@/i18n/use-i18n';
import { useAppState } from '@/state/store';

export default function CoverScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang } = useI18n();
  const { lastReadId, settings, updateSettings } = useAppState();
  const [langOpen, setLangOpen] = useState(false);

  const todaysId = useMemo(() => broOfTheDayId(), []);
  const todaysArticle = useMemo(() => {
    const list = localizeArticles(lang);
    const found = list.find((a) => a.id === todaysId);
    return found ? localizeArticle(found, lang) : found;
  }, [lang, todaysId]);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  const openBook = () => {
    router.push('/code');
  };

  const openArticle = (id: number) => {
    router.push(`/article/${id}`);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[Leather.deep, Leather.rich, Leather.mid, Leather.dark]}
        locations={[0, 0.28, 0.72, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,220,120,0.12)', 'transparent', 'rgba(0,0,0,0.35)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={styles.spine} />

      <Pressable
        style={[
          styles.frame,
          {
            marginTop: Math.max(insets.top, 12),
            marginBottom: Math.max(insets.bottom, 12),
          },
        ]}
        onPress={openBook}
        accessibilityRole="button"
        accessibilityLabel={t('tapAnywhere')}
      >
        <View style={styles.innerFrame} pointerEvents="box-none">
          <View style={styles.topBar} pointerEvents="box-none">
            <Pressable
              onPress={() => setLangOpen(true)}
              style={({ pressed }) => [styles.langButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={t('language')}
            >
              <ThemedText type="smallBold" style={styles.goldText}>
                {currentLang.nativeName}
              </ThemedText>
              <Ionicons name="chevron-down" size={14} color={Gold.bright} />
            </Pressable>

            <Pressable
              onPress={() => updateSettings({ soundOn: !settings.soundOn })}
              style={({ pressed }) => [styles.soundButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={settings.soundOn ? t('soundOn') : t('soundOff')}
            >
              <Ionicons
                name={settings.soundOn ? 'volume-high' : 'volume-mute'}
                size={16}
                color={Gold.bright}
              />
              <ThemedText type="smallBold" style={styles.goldText}>
                {settings.soundOn ? t('soundOn') : t('soundOff')}
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.hero} pointerEvents="none">
            <ThemedText type="small" style={[styles.goldText, styles.subtitle]}>
              {t('subtitle')}
            </ThemedText>
            <ThemedText type="display" style={styles.coverTitle}>
              {t('appName')}
            </ThemedText>
            <ThemedText type="cursive" style={styles.coverCursive}>
              {t('tagline')}
            </ThemedText>
          </View>

          <View style={styles.bottomBlock} pointerEvents="box-none">
            <ThemedText type="goldCursive" style={styles.tapHint} pointerEvents="none">
              {t('tapAnywhere')}
            </ThemedText>
            <View style={styles.goldLine} />

            <View
              style={styles.notifyRow}
              accessibilityRole="switch"
              accessibilityState={{ checked: settings.dailyNotifications }}
              accessibilityLabel={t('dailyNotifications')}
            >
              <ThemedText type="small" style={styles.goldText}>
                {t('dailyNotifications')}
              </ThemedText>
              <View onStartShouldSetResponder={() => true}>
                <GoldToggle
                  value={settings.dailyNotifications}
                  onValueChange={(next) => updateSettings({ dailyNotifications: next })}
                  accessibilityLabel={t('dailyNotifications')}
                />
              </View>
            </View>

            {todaysArticle ? (
              <Pressable
                onPress={() => openArticle(todaysArticle.id)}
                style={({ pressed }) => [styles.ruleStrip, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel={`${t('todaysRule')}: ${todaysArticle.title}`}
              >
                <ThemedText type="smallBold" style={styles.ruleHeading}>
                  {t('todaysRule')}
                </ThemedText>
                <ThemedText type="cursive" style={styles.ruleTitle} numberOfLines={2}>
                  {todaysArticle.title}
                </ThemedText>
              </Pressable>
            ) : null}

            {lastReadId ? (
              <Pressable
                onPress={() => openArticle(lastReadId)}
                style={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel={t('continueWhereYouLeftOff')}
              >
                <ThemedText type="smallBold" style={styles.continueLabel}>
                  {t('continueWhereYouLeftOff')}
                </ThemedText>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Pressable>

      <Modal visible={langOpen} transparent animationType="fade" onRequestClose={() => setLangOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setLangOpen(false)}>
          <View style={styles.modalCard}>
            <ThemedText type="smallBold" style={[styles.goldText, { marginBottom: Spacing.two }]}>
              {t('language')}
            </ThemedText>
            <ScrollView style={{ maxHeight: 360 }}>
              {LANGUAGES.map((option) => {
                const selected = option.code === lang;
                return (
                  <Pressable
                    key={option.code}
                    onPress={() => {
                      updateSettings({ language: option.code });
                      setLangOpen(false);
                    }}
                    style={[styles.langRow, selected && styles.langRowSelected]}
                  >
                    <ThemedText type="smallBold" style={selected ? styles.continueLabel : styles.goldText}>
                      {option.nativeName}
                    </ThemedText>
                    <ThemedText type="small" style={{ color: Gold.muted }}>
                      {option.name}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Leather.deep },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(212,175,55,0.35)',
  },
  frame: {
    flex: 1,
    marginHorizontal: 12,
    borderWidth: 3,
    borderColor: Gold.foil,
    borderRadius: 10,
    padding: 4,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1,
    borderColor: Gold.muted,
    borderRadius: 6,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: Gold.muted,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(42,7,7,0.35)',
    maxWidth: '58%',
  },
  soundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Gold.muted,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(42,7,7,0.35)',
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  subtitle: {
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 11,
  },
  coverTitle: {
    color: Gold.bright,
    textAlign: 'center',
    textShadowColor: 'rgba(245, 215, 110, 0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  coverCursive: {
    color: Gold.foil,
    textAlign: 'center',
    paddingHorizontal: Spacing.two,
  },
  goldText: { color: Gold.bright },
  bottomBlock: { gap: Spacing.two },
  tapHint: {
    textAlign: 'center',
    color: Gold.bright,
    fontSize: 26,
    lineHeight: 32,
  },
  goldLine: {
    height: 1,
    backgroundColor: Gold.foil,
    opacity: 0.85,
    marginTop: 2,
  },
  notifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  ruleStrip: {
    borderWidth: 1,
    borderColor: Gold.muted,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(42,7,7,0.28)',
    gap: 2,
  },
  ruleHeading: {
    color: Gold.foil,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  ruleTitle: {
    color: Gold.bright,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: Fonts.cursive,
  },
  continueBtn: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Gold.foil,
    borderRadius: 999,
    paddingVertical: 10,
    backgroundColor: Gold.foil,
  },
  continueLabel: { color: Leather.deep },
  pressed: { opacity: 0.82 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(20,0,0,0.65)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: Leather.dark,
    borderWidth: 1.5,
    borderColor: Gold.foil,
    borderRadius: 12,
    padding: Spacing.three,
  },
  langRow: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Gold.muted,
    gap: 2,
  },
  langRowSelected: {
    backgroundColor: Gold.foil,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    marginVertical: 4,
  },
});
