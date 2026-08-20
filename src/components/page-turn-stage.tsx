import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, type SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Colors, Gold } from '@/constants/theme';

export type TurnDirection = 'next' | 'prev';

/** Blank paper on the verso — never mirrored article text. */
export const PAGE_VERSO = Colors.light.background;

export function useClipStyle(
  progress: SharedValue<number>,
  direction: TurnDirection,
  width: number,
  role: 'outgoing' | 'incoming',
) {
  return useAnimatedStyle(() => {
    const p = progress.value;
    if (role === 'outgoing') {
      const w = Math.max(0, (1 - p) * width);
      const left = direction === 'next' ? 0 : p * width;
      return { left, width: w, opacity: 1, zIndex: 2 };
    }
    const w = Math.max(0, p * width);
    const left = direction === 'next' ? (1 - p) * width : 0;
    return { left, width: w, opacity: 1, zIndex: 3 };
  }, [direction, role, width]);
}

export function useInnerStyle(
  progress: SharedValue<number>,
  direction: TurnDirection,
  width: number,
  role: 'outgoing' | 'incoming',
) {
  return useAnimatedStyle(() => {
    const p = progress.value;
    if (role === 'outgoing') {
      return { transform: [{ translateX: direction === 'next' ? 0 : -p * width }] };
    }
    // Next: keep the incoming page pinned to the right so the turning edge
    // reveals that article from right → left, like a real leaf lifting.
    return { transform: [{ translateX: direction === 'next' ? -(1 - p) * width : 0 }] };
  }, [direction, role, width]);
}

export function FoldShade({
  progress,
  direction,
  width,
  height,
}: {
  progress: SharedValue<number>;
  direction: TurnDirection;
  width: number;
  height: number;
}) {
  const isNext = direction === 'next';
  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const fold = isNext ? (1 - p) * width : p * width;
    return {
      opacity: interpolate(p, [0, 0.08, 0.86, 1], [0, 0.55, 0.4, 0]),
      left: fold - (isNext ? 18 : 0),
    };
  }, [isNext, width]);

  return (
    <Animated.View pointerEvents="none" style={[styles.fold, { height, width: 18 }, style]}>
      <LinearGradient
        colors={
          isNext
            ? ['transparent', 'rgba(42,20,8,0.22)']
            : ['rgba(42,20,8,0.22)', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

export function PageCurl({
  progress,
  direction,
  width,
  height,
  versoColor = PAGE_VERSO,
}: {
  progress: SharedValue<number>;
  direction: TurnDirection;
  width: number;
  height: number;
  versoColor?: string;
}) {
  const isNext = direction === 'next';

  const curlStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const fold = isNext ? (1 - p) * width : p * width;
    const curlW = Math.max(10, Math.sin(Math.PI * p) * width * 0.22);
    const lift = interpolate(p, [0, 0.22, 0.7, 1], [0, isNext ? -18 : 18, isNext ? -8 : 8, 0]);
    const yaw = interpolate(p, [0, 0.55, 1], [0, isNext ? -72 : 72, isNext ? -96 : 96]);
    return {
      opacity: interpolate(p, [0, 0.04, 0.88, 1], [0, 1, 1, 0]),
      width: curlW,
      left: isNext ? fold - curlW : fold,
      transform: [{ perspective: 1800 }, { rotateZ: `${lift}deg` }, { rotateY: `${yaw}deg` }],
    };
  }, [isNext, width]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.curl,
        {
          height,
          backgroundColor: versoColor,
          transformOrigin: isNext ? 'top right' : 'top left',
          zIndex: 5,
        },
        curlStyle,
      ]}
    >
      <View style={[styles.curlEdge, isNext ? { right: 0 } : { left: 0 }]} />
      <LinearGradient
        colors={['rgba(255,255,255,0.22)', 'rgba(232,212,168,0.9)', 'rgba(42,20,8,0.18)']}
        start={isNext ? { x: 1, y: 0 } : { x: 0, y: 0 }}
        end={isNext ? { x: 0, y: 1 } : { x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={
          isNext
            ? ['rgba(42,20,8,0.35)', 'rgba(42,20,8,0.06)', 'transparent']
            : ['transparent', 'rgba(42,20,8,0.06)', 'rgba(42,20,8,0.35)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fold: {
    position: 'absolute',
    top: 0,
    zIndex: 4,
  },
  curl: {
    position: 'absolute',
    top: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Gold.muted,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  curlEdge: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(245, 215, 110, 0.35)',
  },
});
