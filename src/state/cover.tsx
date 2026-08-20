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
import { InteractionManager, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { usePathname, useRouter } from 'expo-router';

import { CoverArt } from '@/components/cover-art';
import { FoldShade, PageCurl } from '@/components/page-turn-stage';
import { PAGE_TURN_EASING, PAGE_TURN_MS } from '@/constants/motion';
import { Leather } from '@/constants/theme';

type CoverMode = 'closed' | 'opening' | 'open' | 'closing';

type CoverApi = {
  mode: CoverMode;
  closeBook: () => void;
  openToArticle: (id: number) => void;
};

const CoverContext = createContext<CoverApi>({
  mode: 'closed',
  closeBook: () => {},
  openToArticle: () => {},
});

export function useCover() {
  return useContext(CoverContext);
}

const easing = Easing.bezier(
  PAGE_TURN_EASING[0],
  PAGE_TURN_EASING[1],
  PAGE_TURN_EASING[2],
  PAGE_TURN_EASING[3],
);

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        InteractionManager.runAfterInteractions(() => {
          setTimeout(resolve, 40);
        });
      });
    });
  });
}

function isCoverEntry(path: string) {
  return path === '/' || path === '/code' || path.endsWith('/code');
}

export function CoverProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { width, height } = useWindowDimensions();
  const [mode, setMode] = useState<CoverMode>(() => (isCoverEntry(pathname) ? 'closed' : 'open'));
  const modeRef = useRef(mode);
  const busy = useRef(false);
  const progress = useSharedValue(0);
  /** 0 closed, 1 opening (peel next/top-right), 2 closing (leaf in from top-left). */
  const phase = useSharedValue(0);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const finishOpen = useCallback(() => {
    setMode('open');
    busy.current = false;
  }, []);

  const finishClose = useCallback(() => {
    phase.value = 0;
    progress.value = 0;
    setMode('closed');
    busy.current = false;
  }, [phase, progress]);

  useEffect(() => {
    if (mode !== 'opening' && mode !== 'closing') return;
    const done = () => {
      if (mode === 'opening') finishOpen();
      else finishClose();
    };
    progress.value = withTiming(1, { duration: PAGE_TURN_MS, easing }, (finished) => {
      if (finished) runOnJS(done)();
    });
  }, [finishClose, finishOpen, mode, progress]);

  const startOpen = useCallback(async () => {
    if (busy.current || modeRef.current !== 'closed') return;
    busy.current = true;
    await waitForPaint();
    if (modeRef.current !== 'closed') {
      busy.current = false;
      return;
    }
    progress.value = 0;
    phase.value = 1;
    setMode('opening');
  }, [phase, progress]);

  const closeBook = useCallback(() => {
    if (busy.current || modeRef.current !== 'open') return;
    busy.current = true;
    progress.value = 0;
    phase.value = 2;
    setMode('closing');
  }, [phase, progress]);

  const goToCode = useCallback(() => {
    if (router.canDismiss()) {
      router.dismissTo('/code');
      return;
    }
    router.replace('/code');
  }, [router]);

  const openBook = useCallback(() => {
    if (busy.current || modeRef.current !== 'closed') return;
    goToCode();
    void startOpen();
  }, [goToCode, startOpen]);

  const openToArticle = useCallback(
    (id: number) => {
      if (modeRef.current === 'open') {
        router.push(`/article/${id}`);
        return;
      }
      if (busy.current || modeRef.current !== 'closed') return;
      router.push(`/article/${id}`);
      void startOpen();
    },
    [router, startOpen],
  );

  const overlayVisible = mode !== 'open';
  const turning = mode === 'opening' || mode === 'closing';
  const curlDirection = mode === 'closing' ? 'prev' : 'next';

  const coverClip = useAnimatedStyle(() => {
    const p = progress.value;
    const ph = phase.value;
    if (ph === 1) {
      return { left: 0, width: Math.max(0, (1 - p) * width), opacity: 1 };
    }
    if (ph === 2) {
      return { left: 0, width: Math.max(0, p * width), opacity: 1 };
    }
    return { left: 0, width, opacity: 1 };
  }, [width]);

  const coverInner = useAnimatedStyle(() => ({
    transform: [{ translateX: 0 }],
  }));

  const api = useMemo(
    () => ({ mode, closeBook, openToArticle }),
    [closeBook, mode, openToArticle],
  );

  return (
    <CoverContext.Provider value={api}>
      <View style={styles.root}>
        {children}
        {overlayVisible ? (
          <Animated.View
            style={[
              styles.overlay,
              { width, height, pointerEvents: mode === 'closed' ? 'auto' : 'none' },
            ]}
          >
            <Animated.View style={[styles.clip, { top: 0, height }, coverClip]}>
              <Animated.View style={[{ width, height }, coverInner]}>
                <CoverArt onOpenBook={openBook} onOpenArticle={openToArticle} />
              </Animated.View>
            </Animated.View>
            {turning ? (
              <>
                <FoldShade
                  progress={progress}
                  direction={curlDirection}
                  width={width}
                  height={height}
                />
                <PageCurl
                  progress={progress}
                  direction={curlDirection}
                  width={width}
                  height={height}
                  versoColor={Leather.mid}
                />
              </>
            ) : null}
          </Animated.View>
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
