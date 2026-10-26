import type { Locale } from "@/lib/i18n";
import fr from "./fr";
import en from "./en";

export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
