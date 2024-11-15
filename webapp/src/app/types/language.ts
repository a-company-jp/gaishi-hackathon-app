export const languages = [
  "ja",
  "en",
  "zh",
  "ko",
  "es",
  "fr",
  "th",
  "de",
  "ru",
  "it",
] as const;

export type Language = (typeof languages)[number];

export const languageNames: Record<Language, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  th: "ภาษาไทย",
  de: "Deutsch",
  ru: "Русский",
  it: "Italiano",
};
