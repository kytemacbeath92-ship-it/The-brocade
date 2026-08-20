/**
 * Brand theme for The Bro Code. Light and dark palettes share the same keys so
 * ThemedText / ThemedView can reference any color by name.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#211C13',
    background: '#FAF6EC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1E9D5',
    textSecondary: '#6E6450',
    tint: '#9A7B22',
    onTint: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E7DECB',
    accent: '#7A5C1E',
    danger: '#B3261E',
    success: '#2E7D32',
  },
  dark: {
    text: '#F4EEDD',
    background: '#12100B',
    backgroundElement: '#1D1A12',
    backgroundSelected: '#2A2517',
    textSecondary: '#B7AC93',
    tint: '#D8B849',
    onTint: '#12100B',
    card: '#1A1710',
    border: '#332C1D',
    accent: '#E7CE77',
    danger: '#F2B8B5',
    success: '#A5D6A7',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
