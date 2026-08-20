import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Gold } from '@/constants/theme';
import { useI18n } from '@/i18n/use-i18n';

export function CoverButton({ onPress }: { onPress: () => void }) {
  const { t } = useI18n();
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 6 }}
      accessibilityRole="button"
      accessibilityLabel={t('cover')}
    >
      <Ionicons name="book" size={18} color={Gold.bright} />
      <ThemedText type="smallBold" style={{ color: Gold.bright }}>
        {t('cover')}
      </ThemedText>
    </Pressable>
  );
}
