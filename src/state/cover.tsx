/* eslint-disable react-hooks/immutability -- Reanimated shared values are mutated by design */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { usePathname, useRouter } from 'expo-router';

import { CoverArt } from '@/components/cover-art';
import { CoverButton } from '@/components/cover-button';
import { HardcoverEdge, useCoverOpenClip, useCoverOpenInner } from '@/components/cover-board';
import { IntroPage } from '@/components/intro-page';
import { COVER_EASING, PAGE_TURN_MS } from '@/constants/motion';
import { isCoverEntryPath, isIntroPath, PAGE_ONE_HREF } from '@/lib/book-session';
import { playCoverChoir } from '@/lib/sounds';
import { stopSpeaking } from '@/lib/tts';

type CoverMode = 'closed' | 'opening' | 'open' | 'closing';

type CoverApi = {
  mode: CoverMode;
  closeBook: () => void;
  openToArticle: (id: number) => void;
  sessionId: number;
};

const CoverContext = createContext<CoverApi>({
  mode: 'closed',
  closeBook: () => {},
  openToArticle: () => {},
  sessionId: 0,
});

export function useCover() {
  return useContext(CoverContext);
}

const easing = Easing.bezier(COVER_EASING[0], COVER_EASING[1], COVER_EASING[2], COVER_EASING[3]);

function waitFrames(n: number) {
  return new Promise<void>((resolve) => {
    const tick = (left: number) => {
      if (left <= 0) {
        resolve();
        return;
      }
      requestAnimationFrame(() => tick(left - 1));
    };
    tick(n);
  });
}

export function CoverProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { width, height } = useWindowDimensions();
  const [mode, setMode] = useState<CoverMode>(() => (isCoverEntryPath(pathname) ? 'closed' : 'open'));
  const modeRef = useRef(mode);
  const pathnameRef = useRef(pathname);
  const busy = useRef(false);
  const openAmount = useSharedValue(mode === 'open' ? 1 : 0);
  const [revealIntro, setRevealIntro] = useState(() => isCoverEntryPath(pathname));
  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const goToIntro = useCallback(() => {
    if (isIntroPath(pathnameRef.current)) return;
    if (router.canDismiss()) {
      router.dismissTo(PAGE_ONE_HREF);
      return;
    }
    router.replace(PAGE_ONE_HREF);
  }, [router]);

  const resetToPageOne = useCallback(() => {
    setSessionId((n) => n + 1);
    goToIntro();
  }, [goToIntro]);

  const finishOpen = useCallback(() => {
    setMode('open');
    busy.current = false;
  }, []);

  const finishClose = useCallback(() => {
    // Cover is fully shut: drop the previous reading position so the next
    // cover-open starts at page 1. Continue on the cover still uses lastReadId.
    resetToPageOne();
    setMode('closed');
    busy.current = false;
  }, [resetToPageOne]);

  const startOpen = useCallback(
    (withIntro: boolean) => {
      if (modeRef.current !== 'closed') {
        busy.current = false;
        return;
      }
      busy.current = true;
      setRevealIntro(withIntro);
      openAmount.value = 0;
      setMode('opening');
      openAmount.value = withTiming(1, { duration: PAGE_TURN_MS, easing }, (finished) => {
        if (finished) runOnJS(finishOpen)();
      });
    },
    [finishOpen, openAmount],
  );

  const closeBook = useCallback(() => {
    if (busy.current || modeRef.current !== 'open') return;
    stopSpeaking();
    busy.current = true;
    const withIntro = isIntroPath(pathname);
    setRevealIntro(withIntro);
    openAmount.value = 1;
    setMode('closing');
    openAmount.value = withTiming(0, { duration: PAGE_TURN_MS, easing }, (finished) => {
      if (finished) runOnJS(finishClose)();
    });
  }, [finishClose, openAmount, pathname]);

  const openBook = useCallback(() => {
    if (busy.current || modeRef.current !== 'closed') return;
    playCoverChoir();
    busy.current = true;
    const alreadyIntro = isIntroPath(pathnameRef.current);
    goToIntro();
    if (alreadyIntro) {
      startOpen(true);
      return;
    }
    void (async () => {
      await waitFrames(2);
      startOpen(true);
    })();
  }, [goToIntro, startOpen]);

  const openToArticle = useCallback(
    (id: number) => {
      if (modeRef.current === 'open') {
        router.push(`/article/${id}`);
        return;
      }
      if (busy.current || modeRef.current !== 'closed') return;
      playCoverChoir();
      busy.current = true;
      router.push(`/article/${id}`);
      void (async () => {
        await waitFrames(2);
        startOpen(false);
      })();
    },
    [router, startOpen],
  );

  const overlayVisible = mode !== 'open';
  const turning = mode === 'opening' || mode === 'closing';
  const showIntroLeaf = overlayVisible && revealIntro;

  const coverClip = useCoverOpenClip(openAmount, width, 'cover');
  const coverInner = useCoverOpenInner(openAmount, width, 'cover');
  const introClip = useCoverOpenClip(openAmount, width, 'intro');
  const introInner = useCoverOpenInner(openAmount, width, 'intro');

  const api = useMemo(
    () => ({ mode, closeBook, openToArticle, sessionId }),
    [closeBook, mode, openToArticle, sessionId],
  );

  return (
    <CoverContext.Provider value={api}>
      <View style={styles.root}>
        {children}
        {overlayVisible ? (
          <View
            style={[
              styles.overlay,
              { width, height, pointerEvents: mode === 'closed' ? 'auto' : 'none' },
            ]}
          >
            {showIntroLeaf ? (
              <Animated.View style={[styles.clip, { top: 0, height }, introClip]}>
                <Animated.View style={[{ width, height }, introInner]}>
                  <IntroPage
                    key={sessionId}
                    interactive={false}
                    headerRight={<CoverButton onPress={closeBook} />}
                  />
                </Animated.View>
              </Animated.View>
            ) : null}
            <Animated.View
              style={[
                styles.clip,
                { top: 0, height, transformOrigin: 'left center' },
                coverClip,
              ]}
            >
              <Animated.View
                style={[{ width, height, transformOrigin: 'left center' }, coverInner]}
              >
                <CoverArt onOpenBook={openBook} onOpenArticle={openToArticle} />
              </Animated.View>
            </Animated.View>
            {turning ? <HardcoverEdge openAmount={openAmount} width={width} height={height} /> : null}
          </View>
        ) : null}
      </View>
    </CoverContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 200,
    elevation: 200,
  },
  clip: {
    position: 'absolute',
    left: 0,
    overflow: 'hidden',
  },
});
