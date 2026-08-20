import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
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
    | 'body';
  themeColor?: ThemeColor;
};

const SCALABLE = new Set(['default', 'small', 'smallBold', 'body', 'serif', 'subtitle', 'title']);

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const { settings } = useAppState();
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
      style={[{ color: theme[themeColor ?? 'text'] }, base, scaled, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  smallBold: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
  default: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
  body: { fontSize: 17, lineHeight: 28, fontWeight: '400' },
  serif: { fontSize: 20, lineHeight: 30, fontFamily: Fonts.serif, fontWeight: '500' },
  title: { fontSize: 40, fontWeight: '700', lineHeight: 46 },
  subtitle: { fontSize: 26, lineHeight: 34, fontWeight: '700' },
  link: { lineHeight: 30, fontSize: 14 },
  linkPrimary: { lineHeight: 30, fontSize: 14, color: '#3c87f7' },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize: 12,
  },
});
