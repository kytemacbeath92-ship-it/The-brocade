import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { APP_NAME, APP_SUBTITLE, APP_TAGLINE } from '@/data/articles';

const GOLD = '#E7C766';
const GOLD_BRIGHT = '#F6E4A6';
const GOLD_DEEP = '#A8842B';
const EMBOSS = 'rgba(0,0,0,0.45)';

/**
 * A red leather-bound hardcover book cover with gold, embossed lettering.
 * Colors are fixed (not theme-driven) so the cover always reads as a physical book.
 */
export function BookCover() {
  return (
    <View style={styles.wrap}>
      <View style={styles.book}>
        {/* Leather body */}
        <LinearGradient
          colors={['#9A2020', '#7A1414', '#500B0B']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Diagonal sheen across the leather */}
        <LinearGradient
          colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0)', 'rgba(0,0,0,0.28)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Bound spine on the left */}
        <LinearGradient
          colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.spine}
        />
        <View style={styles.spineRule} />

        {/* Gold embossed frame */}
        <View style={styles.frameOuter}>
          <View style={styles.frameInner}>
            <View style={styles.content}>
              <View style={styles.crest}>
                <Ionicons name="shield-half" size={26} color={GOLD} />
              </View>

              <ThemedText style={styles.subtitle}>{APP_SUBTITLE.toUpperCase()}</ThemedText>

              <Ornament />

              <ThemedText style={styles.title}>{APP_NAME.toUpperCase()}</ThemedText>

              <Ornament />

              <ThemedText style={styles.tagline}>{APP_TAGLINE}</ThemedText>

              <ThemedText style={styles.est}>EST. MMXXVI</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Ornament() {
  return (
    <View style={styles.ornament}>
      <View style={styles.ornamentLine} />
      <View style={styles.diamond} />
      <View style={styles.ornamentLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 8 },
  book: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 0.72,
    borderRadius: 12,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    overflow: 'hidden',
    // Physical drop shadow so it lifts off the page like a real book.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 12,
  },
  spine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 26 },
  spineRule: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  frameOuter: {
    flex: 1,
    margin: 14,
    marginLeft: 26,
    borderWidth: 2,
    borderColor: GOLD_DEEP,
    borderRadius: 6,
    padding: 3,
  },
  frameInner: {
    flex: 1,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    gap: 14,
  },
  crest: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  subtitle: {
    color: GOLD_BRIGHT,
    fontSize: 11,
    letterSpacing: 2.5,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: EMBOSS,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    color: GOLD,
    fontFamily: Fonts.serif,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: 2,
    textAlign: 'center',
    fontWeight: '700',
    textShadowColor: EMBOSS,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  tagline: {
    color: GOLD_BRIGHT,
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: EMBOSS,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  est: {
    color: GOLD_DEEP,
    fontSize: 11,
    letterSpacing: 3,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 2,
  },
  ornament: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'stretch', justifyContent: 'center' },
  ornamentLine: { height: 1, width: 48, backgroundColor: GOLD_DEEP },
  diamond: {
    width: 7,
    height: 7,
    backgroundColor: GOLD,
    transform: [{ rotate: '45deg' }],
  },
});
