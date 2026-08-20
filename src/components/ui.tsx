import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Screen({
  children,
  style,
  edges = ['top', 'left', 'right'],
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1, backgroundColor: theme.background }, style]}>
      <View style={styles.centered}>
        <View style={styles.constrained}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

export function Loading() {
  const theme = useTheme();
  return (
    <View style={[styles.loading, { backgroundColor: theme.background }]}>
      <ActivityIndicator color={theme.tint} />
    </View>
  );
}

export function Card({
  children,
  style,
  onPress,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const content = (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        style,
      ]}
    >
      {children}
    </View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : null)}>
        {content}
      </Pressable>
    );
  }
  return content;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';
  const bg = isPrimary ? theme.tint : isGhost ? 'transparent' : theme.backgroundElement;
  const fg = isPrimary ? theme.onTint : theme.text;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bg,
          borderColor: isGhost ? 'transparent' : theme.border,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={fg} /> : null}
      <ThemedText type="smallBold" style={{ color: fg }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function IconButton({
  icon,
  onPress,
  active,
  accessibilityLabel,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  active?: boolean;
  accessibilityLabel: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        {
          backgroundColor: active ? theme.tint : theme.backgroundElement,
          borderColor: theme.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={active ? theme.onTint : theme.text} />
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? theme.tint : theme.backgroundElement,
          borderColor: selected ? theme.tint : theme.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <ThemedText type="small" style={{ color: selected ? theme.onTint : theme.textSecondary }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const theme = useTheme();
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={[styles.progressTrack, { backgroundColor: theme.backgroundSelected }]}>
      <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: theme.tint }]} />
    </View>
  );
}

export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.sectionHeader}>
      <ThemedText type="small" style={{ color: theme.textSecondary, letterSpacing: 1.2 }}>
        {title.toUpperCase()}
      </ThemedText>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction}>
          <ThemedText type="smallBold" style={{ color: theme.tint }}>
            {actionLabel}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Divider() {
  const theme = useTheme();
  return <View style={{ height: 1, backgroundColor: theme.border }} />;
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center' },
  constrained: { flex: 1, width: '100%', maxWidth: MaxContentWidth },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.three,
  },
  pressed: { opacity: 0.9 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  progressTrack: {
    height: 8,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: Radius.pill },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
});
