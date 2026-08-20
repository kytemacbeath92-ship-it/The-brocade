import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Loading } from '@/components/ui';
import { Gold, Leather } from '@/constants/theme';
import { useBookFonts } from '@/hooks/use-book-fonts';
import { useResolvedScheme } from '@/hooks/use-resolved-scheme';
import { useTheme } from '@/hooks/use-theme';
import { useI18n } from '@/i18n/use-i18n';
import {
  configureNotificationHandler,
  parseArticleIdFromNotification,
} from '@/lib/notifications';
import { AppStateProvider, useAppState } from '@/state/store';

configureNotificationHandler();

function RootNavigator() {
  const scheme = useResolvedScheme();
  const theme = useTheme();
  const { hydrated, setFontsReady } = useAppState();
  const [fontsLoaded, fontError] = useBookFonts();
  const { t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    setFontsReady(Boolean(fontsLoaded));
  }, [fontsLoaded, setFontsReady]);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    let Notifications: typeof import('expo-notifications') | null = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      Notifications = require('expo-notifications');
    } catch {
      return;
    }
    if (!Notifications) return;
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const id = parseArticleIdFromNotification(response.notification.request.content.data);
      if (id) router.push(`/article/${id}`);
    });
    return () => sub.remove();
  }, [router]);

  const navTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const themed = {
    ...navTheme,
    colors: {
      ...navTheme.colors,
      background: Leather.dark,
      card: Leather.dark,
      text: Gold.bright,
      border: Gold.foil,
      primary: Gold.foil,
    },
  };

  if (!hydrated || (!fontsLoaded && !fontError)) {
    return <Loading />;
  }

  return (
    <ThemeProvider value={themed}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Leather.dark },
          headerTintColor: Gold.bright,
          headerTitleStyle: { color: Gold.bright },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="intro" options={{ title: t('introduction') }} />
        <Stack.Screen name="article/[id]" options={{ title: '' }} />
        <Stack.Screen name="ask" options={{ title: t('askABro'), presentation: 'modal' }} />
        <Stack.Screen name="glance" options={{ title: t('theCode'), presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Leather.deep }}>
      <AppStateProvider>
        <RootNavigator />
      </AppStateProvider>
    </GestureHandlerRootView>
  );
}
