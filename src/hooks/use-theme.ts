import { Colors } from '@/constants/theme';
import { useResolvedScheme } from '@/hooks/use-resolved-scheme';

export function useTheme() {
  const scheme = useResolvedScheme();
  return Colors[scheme];
}
