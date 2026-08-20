import { Platform } from 'react-native';

// expo-speech is a native module; only require it off web.
type SpeechModule = typeof import('expo-speech');
let Speech: SpeechModule | null = null;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Speech = require('expo-speech');
}

export type SpeakHandlers = {
  onStart?: () => void;
  onDone?: () => void;
};

function webSynth(): SpeechSynthesis | null {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis;
  }
  return null;
}

export function isTtsAvailable(): boolean {
  if (Platform.OS === 'web') return webSynth() !== null;
  return Speech !== null;
}

export function speak(text: string, rate: number, handlers: SpeakHandlers = {}): void {
  if (Platform.OS === 'web') {
    const synth = webSynth();
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.onstart = () => handlers.onStart?.();
    utterance.onend = () => handlers.onDone?.();
    utterance.onerror = () => handlers.onDone?.();
    synth.speak(utterance);
    return;
  }
  Speech?.stop();
  Speech?.speak(text, { rate, onDone: handlers.onDone, onStopped: handlers.onDone });
  handlers.onStart?.();
}

export function stopSpeaking(): void {
  if (Platform.OS === 'web') {
    webSynth()?.cancel();
    return;
  }
  Speech?.stop();
}
