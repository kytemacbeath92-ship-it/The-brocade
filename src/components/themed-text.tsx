import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useI18n } from '@/i18n/use-i18n';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/store';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'small'
    | 'smallBold'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code'
    | 'serif'
    | 'body'
    | 'cursive'
    | 'display'
    | 'goldCursive';
  themeColor?: ThemeColor;
};

const SCALABLE = new Set([
  'default',
  'small',
  'smallBold',
  'body',
  'serif',
  'subtitle',
  'title',
  'cursive',
  'display',
  'goldCursive',
]);

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const { settings } = useAppState();
  const { writingDirection } = useI18n();
  const scale = SCALABLE.has(type) ? settings.fontScale : 1;

  const base = styles[type] ?? styles.default;
  const baseLineHeight = 'lineHeight' in base ? (base as { lineHeight?: number }).lineHeight : undefined;
  const scaled =
    scale !== 1
      ? {
          fontSize: Math.round(base.fontSize * scale),
          lineHeight:
            typeof baseLineHeight === 'number' ? Math.round(baseLineHeight * scale) : undefined,
        }
      : null;

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'], writingDirection },
        base,
        scaled,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.sans,
    fontWeight: '500',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.display,
    fontWeight: '700',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.serif,
    fontWeight: '500',
  },
  body: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.serif,
    fontWeight: '400',
  },
  serif: {
    fontSize: 22,
    lineHeight: 32,
    fontFamily: Fonts.serifItalic,
    fontWeight: '500',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    fontFamily: Fonts.display,
  },
  subtitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    fontFamily: Fonts.display,
  },
  display: {
    fontSize: 42,
    lineHeight: 50,
    fontFamily: Fonts.display,
    fontWeight: '700',
  },
  cursive: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: Fonts.cursive,
    fontWeight: '400',
  },
  goldCursive: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: Fonts.cursive,
    fontWeight: '400',
    color: '#F5D76E',
  },
  link: { lineHeight: 30, fontSize: 14, fontFamily: Fonts.sans },
  linkPrimary: { lineHeight: 30, fontSize: 14, color: '#3c87f7', fontFamily: Fonts.sans },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize: 12,
  },
});
