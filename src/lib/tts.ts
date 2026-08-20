import { Platform } from 'react-native';

export type SpeakHandlers = {
  onStart?: () => void;
  onDone?: () => void;
};

type SpeechModule = typeof import('expo-speech');
let Speech: SpeechModule | null = null;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Speech = require('expo-speech');
}

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

export function speak(
  text: string,
  rate: number,
  handlers: SpeakHandlers = {},
  options: { lang?: string; muted?: boolean } = {},
): void {
  if (options.muted) return;
  if (Platform.OS === 'web') {
    const synth = webSynth();
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    if (options.lang) utterance.lang = options.lang;
    utterance.onstart = () => handlers.onStart?.();
    utterance.onend = () => handlers.onDone?.();
    utterance.onerror = () => handlers.onDone?.();
    synth.speak(utterance);
    return;
  }
  Speech?.stop();
  Speech?.speak(text, {
    rate,
    language: options.lang,
    onDone: handlers.onDone,
    onStopped: handlers.onDone,
  });
  handlers.onStart?.();
}

export function stopSpeaking(): void {
  if (Platform.OS === 'web') {
    webSynth()?.cancel();
    return;
  }
  Speech?.stop();
}
