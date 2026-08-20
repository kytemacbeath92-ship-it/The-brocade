import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Fonts, Gold, Leather } from '@/constants/theme';
import { useI18n } from '@/i18n/use-i18n';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useI18n();

  // Let the navigator own the home-indicator inset. Adding a second large pad
  // previously clipped the four tab labels; a small web-only pad is enough.

  return (
    <Tabs
      initialRouteName="code"
      screenOptions={{
        headerStyle: { backgroundColor: Leather.dark },
        headerTintColor: Gold.bright,
        headerTitleStyle: { fontFamily: Fonts.display, color: Gold.bright },
        headerShadowVisible: false,
        headerBackground: () => (
          <LinearGradient
            colors={[Leather.deep, Leather.mid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => router.replace('/')}
            style={styles.coverHit}
            accessibilityRole="button"
            accessibilityLabel={t('cover')}
          >
            <Ionicons name="book" size={18} color={Gold.bright} />
            <ThemedText type="smallBold" style={styles.coverLabel}>
              {t('cover')}
            </ThemedText>
          </Pressable>
        ),
        tabBarActiveTintColor: Gold.bright,
        tabBarInactiveTintColor: Gold.muted,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: Fonts.sans,
          fontSize: 11,
          marginBottom: 2,
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
        tabBarStyle: {
          backgroundColor: Leather.dark,
          borderTopColor: Gold.foil,
          borderTopWidth: 1.5,
          minHeight: 56,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'web' ? Math.max(insets.bottom, 10) : undefined,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[Leather.mid, Leather.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        ),
        sceneStyle: { backgroundColor: Leather.dark },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="code"
        options={{
          title: t('theCode'),
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="paths"
        options={{
          title: t('paths'),
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pack"
        options={{
          title: t('pack'),
          tabBarIcon: ({ color, size }) => <Ionicons name="bookmark" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  coverHit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  coverLabel: { color: Gold.bright },
});
