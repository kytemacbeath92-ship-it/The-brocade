import * as Clipboard from 'expo-clipboard';
import { Platform, Share } from 'react-native';

export type ShareResult = 'shared' | 'copied' | 'failed';

export async function shareText(title: string, message: string): Promise<ShareResult> {
  if (Platform.OS === 'web') {
    const nav = typeof navigator !== 'undefined' ? (navigator as Navigator) : undefined;
    if (nav?.share) {
      try {
        await nav.share({ title, text: message });
        return 'shared';
      } catch {
        // User cancelled or share failed; fall through to clipboard.
      }
    }
    try {
      await Clipboard.setStringAsync(message);
      return 'copied';
    } catch {
      return 'failed';
    }
  }

  try {
    await Share.share({ title, message });
    return 'shared';
  } catch {
    try {
      await Clipboard.setStringAsync(message);
      return 'copied';
    } catch {
      return 'failed';
    }
  }
}
