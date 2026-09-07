/**
 * Configuration centrale du système multilingue.
 *
 * Ajouter une langue = ajouter une entrée ici + un fichier dictionnaire dans
 * `src/i18n/dictionaries/`. Rien d'autre dans l'application ne doit contenir
 * de logique du type `locale === "ar" ? … : …` — voir `useTranslation()`.
 */

export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Nom du cookie qui persiste la langue choisie (lu côté serveur ET client). */
export const LOCALE_COOKIE = "locale";

export const localeMeta: Record<
  Locale,
  {
    dir: "ltr" | "rtl";
    label: string;
    nativeName: string;
    flag: string;
    /** Locale BCP-47 utilisée pour Open Graph / hreflang. */
    ogLocale: string;
    /** Classe de police appliquée sur <body> pour cette langue. */
    fontClass: string;
  }
> = {
  fr: {
    dir: "ltr",
    label: "Français",
    nativeName: "Français",
    flag: "🇫🇷",
    ogLocale: "fr_MA",
    fontClass: "font-body",
  },
  ar: {
    dir: "rtl",
    label: "Arabe",
    nativeName: "العربية",
    flag: "🇸🇦",
    ogLocale: "ar_MA",
    fontClass: "font-arabic",
  },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
