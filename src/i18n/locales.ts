export const locales = ["en", "my", "jp", "th"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  my: "မြန်မာ",
  jp: "日本語",
  th: "ไทย",
};
