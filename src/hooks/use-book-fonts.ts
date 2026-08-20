import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import { Cinzel_400Regular, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { useFonts } from 'expo-font';

export function useBookFonts() {
  return useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    GreatVibes_400Regular,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_700Bold,
  });
}
