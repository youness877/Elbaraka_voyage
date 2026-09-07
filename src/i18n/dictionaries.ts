import { fr, type Dictionary } from "./dictionaries/fr";
import { ar } from "./dictionaries/ar";
import type { Locale } from "./config";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { fr, ar };

/** Utilisable côté serveur ET côté client — c'est un simple objet JS. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}
