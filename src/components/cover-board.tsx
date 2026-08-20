import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, type SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Gold, Leather } from '@/constants/theme';

const BOARD = 14;

/** Stiff hardcover hinge: cover stays a rigid board, not a curling leaf. */
export function useCoverOpenClip(openAmount: SharedValue<number>, width: number, role: 'cover' | 'intro') {
  return useAnimatedStyle(() => {
    const p = openAmount.value;
    if (role === 'cover') {
      return { left: 0, width: Math.max(0, (1 - p) * width), opacity: 1, zIndex: 2 };
    }
    return { left: (1 - p) * width, width: Math.max(0, p * width), opacity: 1, zIndex: 1 };
  }, [role, width]);
}

export function useCoverOpenInner(openAmount: SharedValue<number>, width: number, role: 'cover' | 'intro') {
  return useAnimatedStyle(() => {
    const p = openAmount.value;
    if (role === 'intro') {
      return { transform: [{ translateX: -(1 - p) * width }] };
    }
    const yaw = interpolate(p, [0, 1], [0, -32]);
    return {
      transform: [{ perspective: 2200 }, { rotateY: `${yaw}deg` }],
    };
  }, [role, width]);
}

export function HardcoverEdge({
  openAmount,
  width,
  height,
}: {
  openAmount: SharedValue<number>;
  width: number;
  height: number;
}) {
  const style = useAnimatedStyle(() => {
    const p = openAmount.value;
    const fold = (1 - p) * width;
    const yaw = interpolate(p, [0, 0.45, 1], [0, -12, -38]);
    return {
      left: fold - BOARD,
      opacity: interpolate(p, [0, 0.04, 0.92, 1], [0, 1, 1, 0]),
      transform: [{ perspective: 1600 }, { rotateY: `${yaw}deg` }],
    };
  }, [width]);

  return (
    <Animated.View
      style={[
        styles.edge,
        {
          height,
          width: BOARD,
          transformOrigin: 'left center',
          pointerEvents: 'none',
        },
        style,
      ]}
    >
      <LinearGradient
        colors={[Leather.highlight, Leather.rich, Leather.deep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.goldArris} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  edge: {
    position: 'absolute',
    top: 0,
    zIndex: 5,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  goldArris: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 2,
    backgroundColor: Gold.foil,
    opacity: 0.75,
  },
});
