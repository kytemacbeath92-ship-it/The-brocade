export const LANGUAGE_CODES = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'id'] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export type LanguageOption = {
  code: LanguageCode;
  /** English label for the spoken language */
  name: string;
  /** Autonym shown in the dropdown */
  nativeName: string;
  /** BCP-47 tag for TTS */
  speech: string;
  rtl?: boolean;
};

/**
 * Top 10 spoken languages by total speakers, with Urdu replaced by Indonesian
 * per product request. English is included (it is #1 by total speakers).
 */
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', speech: 'en-US' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文', speech: 'zh-CN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speech: 'hi-IN' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', speech: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', speech: 'fr-FR' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', speech: 'ar-SA', rtl: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speech: 'bn-IN' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', speech: 'pt-BR' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', speech: 'ru-RU' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', speech: 'id-ID' },
];

export const languageByCode = new Map(LANGUAGES.map((l) => [l.code, l] as const));

export function isLanguageCode(value: string): value is LanguageCode {
  return (LANGUAGE_CODES as readonly string[]).includes(value);
}
