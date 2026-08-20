import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppState } from '@/state/store';

export function useResolvedScheme(): 'light' | 'dark' {
  const system = useColorScheme();
  const { settings } = useAppState();
  if (settings.themeMode === 'system') {
    return system === 'dark' ? 'dark' : 'light';
  }
  return settings.themeMode;
}
