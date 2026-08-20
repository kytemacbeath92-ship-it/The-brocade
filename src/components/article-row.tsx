import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { localizeCategory } from '@/i18n/localize';
import { useI18n } from '@/i18n/use-i18n';
import { type Article } from '@/data/articles';
import { useAppState } from '@/state/store';

export function ArticleRow({ article }: { article: Article }) {
  const theme = useTheme();
  const router = useRouter();
  const { isRead, isPacked, togglePack } = useAppState();
  const { t, lang } = useI18n();
  const read = isRead(article.id);
  const packed = isPacked(article.id);
  const category = localizeCategory(article.category, lang);

  return (
    <Pressable
      onPress={() => router.push(`/article/${article.id}`)}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: theme.card, borderColor: theme.border, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <View
        style={[
          styles.badge,
          { backgroundColor: read ? theme.tint : theme.backgroundSelected },
        ]}
      >
        <ThemedText type="smallBold" style={{ color: read ? theme.onTint : theme.textSecondary }}>
          {article.id}
        </ThemedText>
      </View>

      <View style={styles.middle}>
        <ThemedText type="cursive" numberOfLines={2} style={{ fontSize: 20, lineHeight: 26 }}>
          {article.title}
        </ThemedText>
        <View style={styles.metaRow}>
          {read ? (
            <View style={styles.metaItem}>
              <Ionicons name="checkmark-circle" size={13} color={theme.success} />
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {t('read')}
              </ThemedText>
            </View>
          ) : null}
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {category?.name}
          </ThemedText>
        </View>
      </View>

      <Pressable
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={packed ? t('removeFromPack') : t('addToPack')}
        onPress={() => togglePack(article.id)}
        style={styles.bookmark}
      >
        <Ionicons
          name={packed ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={packed ? theme.tint : theme.textSecondary}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: { flex: 1, gap: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  bookmark: { padding: Spacing.one },
});
