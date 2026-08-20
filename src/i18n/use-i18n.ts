import { interpolate, UI_STRINGS, type UiKey } from '@/i18n/ui';
import { languageByCode, type LanguageCode } from '@/i18n/languages';
import { useAppState } from '@/state/store';

export function useI18n() {
  const { settings } = useAppState();
  const lang: LanguageCode = settings.language;
  const option = languageByCode.get(lang)!;
  const strings = UI_STRINGS[lang] ?? UI_STRINGS.en;

  const t = (key: UiKey, vars?: Record<string, string | number>) => {
    const value = strings[key] ?? UI_STRINGS.en[key];
    return vars ? interpolate(value, vars) : value;
  };

  return {
    lang,
    t,
    rtl: Boolean(option.rtl),
    speech: option.speech,
    writingDirection: option.rtl ? ('rtl' as const) : ('ltr' as const),
  };
}
