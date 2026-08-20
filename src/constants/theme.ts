/**
 * Brand theme for The Bro Code: red leather covers, gold foil, cream pages.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Leather = {
  deep: '#2A0707',
  dark: '#4A0C0C',
  mid: '#6B1414',
  rich: '#8B1A1A',
  highlight: '#A32626',
  grain: '#3D0A0A',
} as const;

export const Gold = {
  foil: '#D4AF37',
  bright: '#F5D76E',
  deep: '#B8860B',
  muted: '#C9A84C',
  ink: '#5C4308',
} as const;

export const Colors = {
  light: {
    text: '#2A1408',
    background: '#F4E6C3',
    backgroundElement: '#FBF3DC',
    backgroundSelected: '#E8D4A8',
    textSecondary: '#6B4A28',
    tint: Gold.foil,
    onTint: '#2A0707',
    card: '#FBF3DC',
    border: Gold.muted,
    accent: Gold.deep,
    danger: '#8B1A1A',
    success: '#2E7D32',
    leather: Leather.mid,
    gold: Gold.foil,
  },
  dark: {
    text: '#F4E6C3',
    background: '#1C1008',
    backgroundElement: '#2A1C10',
    backgroundSelected: '#3A2814',
    textSecondary: '#C9B48A',
    tint: Gold.bright,
    onTint: '#2A0707',
    card: '#2A1C10',
    border: Gold.deep,
    accent: Gold.bright,
    danger: '#F2B8B5',
    success: '#A5D6A7',
    leather: Leather.dark,
    gold: Gold.bright,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Cinzel_400Regular',
    serif: 'CormorantGaramond_400Regular',
    rounded: 'GreatVibes_400Regular',
    mono: 'ui-monospace',
    display: 'Cinzel_700Bold',
    cursive: 'GreatVibes_400Regular',
    serifItalic: 'CormorantGaramond_400Regular_Italic',
    serifBold: 'CormorantGaramond_700Bold',
  },
  default: {
    sans: 'Cinzel_400Regular',
    serif: 'CormorantGaramond_400Regular',
    rounded: 'GreatVibes_400Regular',
    mono: 'monospace',
    display: 'Cinzel_700Bold',
    cursive: 'GreatVibes_400Regular',
    serifItalic: 'CormorantGaramond_400Regular_Italic',
    serifBold: 'CormorantGaramond_700Bold',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-cursive)',
    mono: 'var(--font-mono)',
    display: 'var(--font-display-bold)',
    cursive: 'var(--font-cursive)',
    serifItalic: 'var(--font-serif-italic)',
    serifBold: 'var(--font-serif-bold)',
  },
})!;

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
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999,
} as const;

export const MaxContentWidth = 800;
