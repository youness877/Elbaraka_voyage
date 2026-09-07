import type { Locale } from "./config";

/**
 * Forme d'un champ de contenu bilingue dans `src/lib/data.ts`
 * (noms de véhicules, formules, témoignages, articles de blog…).
 */
export type Localized = { fr: string; ar: string };

/** Résout un champ bilingue vers la chaîne de la langue courante. */
export function pick(locale: Locale, value: Localized): string {
  return value[locale] ?? value.fr;
}

/** Variante pour un tableau de chaînes bilingues (ex. listes à puces). */
export function pickList(locale: Locale, values: Localized[]): string[] {
  return values.map((v) => pick(locale, v));
}
