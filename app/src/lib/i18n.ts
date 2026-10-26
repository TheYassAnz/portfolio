export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

// Only the first listed language counts; q-values are ignored.
export function negotiateLocale(acceptLanguage: string | null): Locale {
  const first = (acceptLanguage ?? "").split(",")[0].trim().toLowerCase();
  return first.startsWith("en") ? "en" : "fr";
}
