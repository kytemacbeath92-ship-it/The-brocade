/* eslint-disable react-hooks/refs -- gesture worklets capture turn callbacks */
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
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  FoldShade,
  PageCurl,
  PAGE_VERSO,
  useClipStyle,
  useInnerStyle,
  type TurnDirection,
} from '@/components/page-turn-stage';
import { PAGE_TURN_EASING, PAGE_TURN_MS } from '@/constants/motion';
import { useTheme } from '@/hooks/use-theme';

type PagerApi = {
  turn: (dir: TurnDirection) => void;
  busy: boolean;
};

const PagerContext = createContext<PagerApi>({ turn: () => {}, busy: false });

export function useBookPager() {
  return useContext(PagerContext);
}

type Props = {
  currentId: number;
  prevId: number | null;
  nextId: number | null;
  renderPage: (id: number) => ReactNode;
  onSettled: (id: number) => void;
};

type TurnSnap = {
  dir: TurnDirection;
  from: number;
  to: number;
  prev: number | null;
  next: number | null;
};

const easing = Easing.bezier(
  PAGE_TURN_EASING[0],
  PAGE_TURN_EASING[1],
  PAGE_TURN_EASING[2],
  PAGE_TURN_EASING[3],
);

export function BookPager({ currentId, prevId, nextId, renderPage, onSettled }: Props) {
  const theme = useTheme();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [turn, setTurn] = useState<TurnSnap | null>(null);
  const progress = useSharedValue(0);
  const busyRef = useRef(false);

  useEffect(() => {
    if (!turn) {
      progress.value = 0;
      return;
    }
    const settledId = turn.to;
    const done = () => {
      onSettled(settledId);
      requestAnimationFrame(() => {
        busyRef.current = false;
        setTurn(null);
      });
    };
    progress.value = 0;
    progress.value = withTiming(1, { duration: PAGE_TURN_MS, easing }, (finished) => {
      if (finished) runOnJS(done)();
    });
  }, [onSettled, progress, turn]);

  const startTurn = useCallback(
    (dir: TurnDirection) => {
      if (busyRef.current) return;
      const to = dir === 'next' ? nextId : prevId;
      if (to == null) return;
      busyRef.current = true;
      setTurn({ dir, from: currentId, to, prev: prevId, next: nextId });
    },
    [currentId, nextId, prevId],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-28, 28])
        .failOffsetY([-24, 24])
        .onEnd((event) => {
          'worklet';
          const goNext = event.translationX < -40 || event.velocityX < -700;
          const goPrev = event.translationX > 40 || event.velocityX > 700;
          if (goNext) runOnJS(startTurn)('next');
          else if (goPrev) runOnJS(startTurn)('prev');
        }),
    [startTurn],
  );

  const api = useMemo<PagerApi>(
    () => ({ turn: startTurn, busy: turn != null }),
    [startTurn, turn],
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (Math.abs(width - size.width) > 0.5 || Math.abs(height - size.height) > 0.5) {
      setSize({ width, height });
    }
  };

  const displayCurrent = turn ? turn.from : currentId;
  const incomingId = turn ? turn.to : null;
  const mountedPrev = turn ? turn.prev : prevId;
  const mountedNext = turn ? turn.next : nextId;
  const direction = turn?.dir ?? 'next';

  const mountedIds = useMemo(() => {
    const ids: number[] = [];
    const push = (id: number | null) => {
      if (id != null && !ids.includes(id)) ids.push(id);
    };
    push(mountedPrev);
    push(displayCurrent);
    push(mountedNext);
    push(incomingId);
    return ids;
  }, [displayCurrent, incomingId, mountedNext, mountedPrev]);

  const ready = size.width > 0 && size.height > 0;

  return (
    <PagerContext.Provider value={api}>
      <GestureDetector gesture={pan}>
        <View
          style={[styles.fill, { backgroundColor: theme.background }]}
          onLayout={onLayout}
          collapsable={false}
        >
          {ready
            ? mountedIds.map((id) => (
                <PageSlot
                  key={id}
                  role={
                    turn && id === displayCurrent
                      ? 'outgoing'
                      : turn && id === incomingId
                        ? 'incoming'
                        : id === displayCurrent
                          ? 'current'
                          : 'hidden'
                  }
                  direction={direction}
                  progress={progress}
                  width={size.width}
                  height={size.height}
                  pageColor={theme.background}
                >
                  {renderPage(id)}
                </PageSlot>
              ))
            : null}
          {turn && ready ? (
            <>
              <FoldShade
                progress={progress}
                direction={direction}
                width={size.width}
                height={size.height}
              />
              <PageCurl
                progress={progress}
                direction={direction}
                width={size.width}
                height={size.height}
                versoColor={PAGE_VERSO}
              />
            </>
          ) : null}
        </View>
      </GestureDetector>
    </PagerContext.Provider>
  );
}

function PageSlot({
  role,
  direction,
  progress,
  width,
  height,
  pageColor,
  children,
}: {
  role: 'current' | 'outgoing' | 'incoming' | 'hidden';
  direction: TurnDirection;
  progress: SharedValue<number>;
  width: number;
  height: number;
  pageColor: string;
  children: ReactNode;
}) {
  const outClip = useClipStyle(progress, direction, width, 'outgoing');
  const inClip = useClipStyle(progress, direction, width, 'incoming');
  const outInner = useInnerStyle(progress, direction, width, 'outgoing');
  const inInner = useInnerStyle(progress, direction, width, 'incoming');

  const idleStyle = useAnimatedStyle(() => {
    if (role === 'hidden') {
      return { left: 0, width, opacity: 0, zIndex: 0 };
    }
    return { left: 0, width, opacity: 1, zIndex: 1 };
  }, [role, width]);

  const clipStyle = role === 'incoming' ? inClip : role === 'outgoing' ? outClip : idleStyle;
  const innerStyle = role === 'incoming' ? inInner : role === 'outgoing' ? outInner : undefined;

  return (
    <Animated.View
      pointerEvents={role === 'current' ? 'auto' : 'none'}
      style={[styles.clip, { backgroundColor: pageColor }, clipStyle]}
      collapsable={false}
    >
      <Animated.View style={[styles.inner, { width, height }, innerStyle]} collapsable={false}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, overflow: 'hidden' },
  clip: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  inner: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
