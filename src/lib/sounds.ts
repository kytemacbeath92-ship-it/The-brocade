import { Asset } from 'expo-asset';
import { Audio as ExpoAudio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Platform } from 'react-native';

import COVER_CHOIR_SRC from '../../assets/sounds/cover-choir.mp3';
import PAGE_TURN_SRC from '../../assets/sounds/page-turn.mp3';

const PAGE_POOL = 4;

let enabled = true;
let primed = false;
let priming: Promise<void> | null = null;

type NativeSlot = { sound: ExpoAudio.Sound };
const nativePages: NativeSlot[] = [];
let nativeChoir: ExpoAudio.Sound | null = null;
let nativePageIdx = 0;

let webPages: HTMLAudioElement[] = [];
let webChoir: HTMLAudioElement | null = null;
let webPageIdx = 0;

function assetUri(mod: unknown): string {
  if (typeof mod === 'string') return mod;
  try {
    const asset = Asset.fromModule(mod as number);
    return asset.localUri ?? asset.uri ?? '';
  } catch {
    if (mod && typeof mod === 'object') {
      const rec = mod as { uri?: string; default?: unknown };
      if (typeof rec.uri === 'string') return rec.uri;
      if (rec.default != null) return assetUri(rec.default);
    }
    return '';
  }
}

function makeWebAudio(src: string, volume: number) {
  const el = new window.Audio(src);
  el.preload = 'auto';
  el.volume = volume;
  return el;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (!on) stopAll();
}

function stopAll() {
  if (Platform.OS === 'web') {
    webPages.forEach((el) => {
      el.pause();
      el.currentTime = 0;
    });
    if (webChoir) {
      webChoir.pause();
      webChoir.currentTime = 0;
    }
    return;
  }
  nativePages.forEach(({ sound }) => {
    void sound.stopAsync().catch(() => {});
  });
  void nativeChoir?.stopAsync().catch(() => {});
}

async function primeNative() {
  await ExpoAudio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
  });
  if (nativePages.length === 0) {
    for (let i = 0; i < PAGE_POOL; i += 1) {
      const { sound } = await ExpoAudio.Sound.createAsync(PAGE_TURN_SRC, {
        shouldPlay: false,
        volume: 0.9,
      });
      nativePages.push({ sound });
    }
  }
  if (!nativeChoir) {
    const { sound } = await ExpoAudio.Sound.createAsync(COVER_CHOIR_SRC, {
      shouldPlay: false,
      volume: 0.72,
    });
    nativeChoir = sound;
  }
}

function primeWeb() {
  if (typeof window === 'undefined' || typeof window.Audio === 'undefined') return;
  const pageUri = assetUri(PAGE_TURN_SRC);
  const choirUri = assetUri(COVER_CHOIR_SRC);
  if (!pageUri || !choirUri) return;
  if (webPages.length === 0) {
    webPages = Array.from({ length: PAGE_POOL }, () => makeWebAudio(pageUri, 0.9));
  }
  if (!webChoir) webChoir = makeWebAudio(choirUri, 0.72);
  webPages.forEach((el) => el.load());
  webChoir.load();
}

/** Warm HTMLAudio after a user gesture so later swipes still play. */
export function unlockAudio() {
  if (Platform.OS !== 'web') {
    void primeSounds();
    return;
  }
  primeWeb();
  webPages.forEach((el) => {
    if (el.dataset.unlocked === '1') return;
    el.muted = true;
    const play = el.play();
    if (!play) {
      el.muted = false;
      return;
    }
    void play
      .then(() => {
        el.pause();
        el.currentTime = 0;
        el.muted = false;
        el.dataset.unlocked = '1';
      })
      .catch(() => {
        el.muted = false;
      });
  });
}

export function primeSounds() {
  if (primed) return priming ?? Promise.resolve();
  if (priming) return priming;
  priming = (async () => {
    try {
      if (Platform.OS === 'web') primeWeb();
      else await primeNative();
      primed = true;
    } catch {
      priming = null;
    }
  })();
  return priming;
}

function replayWeb(el: HTMLAudioElement, rate: number) {
  el.pause();
  el.playbackRate = rate;
  try {
    el.currentTime = 0;
  } catch {
    /* some browsers throw if metadata is not ready */
  }
  const play = el.play();
  if (play) void play.catch(() => {});
}

async function replayNative(sound: ExpoAudio.Sound, rate: number) {
  try {
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) await sound.stopAsync();
    await sound.setRateAsync(rate, true);
    await sound.setPositionAsync(0);
    await sound.playAsync();
  } catch {
    /* ignore replay races */
  }
}

/** Paper rustle for article turns. Must stay sync on web so it rides the user gesture. */
export function playPageTurn(direction: 'next' | 'prev') {
  if (!enabled) return;
  const rate = direction === 'next' ? 1 : 0.96;
  if (Platform.OS === 'web') {
    if (webPages.length === 0) primeWeb();
    if (webPages.length === 0) return;
    const el = webPages[webPageIdx % webPages.length];
    webPageIdx += 1;
    replayWeb(el, rate);
    return;
  }
  void (async () => {
    await primeSounds();
    if (nativePages.length === 0) return;
    const slot = nativePages[nativePageIdx % nativePages.length];
    nativePageIdx += 1;
    await replayNative(slot.sound, rate);
  })();
}

/** High choir “ahhhh” for cover open only. */
export function playCoverChoir() {
  if (!enabled) return;
  if (Platform.OS === 'web') {
    if (!webChoir) primeWeb();
    if (!webChoir) return;
    replayWeb(webChoir, 1);
    return;
  }
  void (async () => {
    await primeSounds();
    if (nativeChoir) await replayNative(nativeChoir, 1);
  })();
}
