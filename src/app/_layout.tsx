import { GreatVibes_400Regular, useFonts } from '@expo-google-fonts/great-vibes';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Loading } from '@/components/ui';
import { useResolvedScheme } from '@/hooks/use-resolved-scheme';
import { useTheme } from '@/hooks/use-theme';
import { AppStateProvider, useAppState } from '@/state/store';

function RootNavigator() {
  const scheme = useResolvedScheme();
  const theme = useTheme();
  const { hydrated } = useAppState();
  const [fontsLoaded] = useFonts({ GreatVibes_400Regular });

  const navTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const themed = {
    ...navTheme,
    colors: {
      ...navTheme.colors,
      background: theme.background,
      card: theme.background,
      text: theme.text,
      border: theme.border,
      primary: theme.tint,
    },
  };

  if (!hydrated || !fontsLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider value={themed}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="intro" options={{ title: 'Introduction' }} />
        <Stack.Screen name="article/[id]" options={{ title: '' }} />
        <Stack.Screen name="ask" options={{ title: 'Ask a Bro', presentation: 'modal' }} />
        <Stack.Screen name="glance" options={{ title: 'Glance', presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppStateProvider>
        <RootNavigator />
      </AppStateProvider>
    </GestureHandlerRootView>
  );
}
