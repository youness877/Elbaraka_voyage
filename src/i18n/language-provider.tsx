"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { LOCALE_COOKIE, localeMeta, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";
import { interpolate } from "./interpolate";

interface LanguageContextValue {
  locale: Locale;
  /** Dictionnaire complet de la langue active — usage : `t.nav.home`, `t.home.hero.title`… */
  t: Dictionary;
  dir: "ltr" | "rtl";
  /**
   * Lookup par chemin `"a.b.c"` avec interpolation optionnelle de `{jetons}`.
   * Utile quand la clé n'est connue qu'à l'exécution (ex. languageSwitcher).
   * Pour l'usage courant, préférer l'accès direct `t.a.b.c`.
   */
  tr: (path: string, values?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readPath(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

/**
 * Fournit la langue courante à toute l'arborescence client.
 *
 * `initialLocale` vient du Server Component racine (lecture du cookie côté
 * serveur) : le premier rendu client est donc toujours déjà dans la bonne
 * langue — aucun flash FR→AR, aucune divergence d'hydratation.
 *
 * Changer de langue ici met à jour le contexte immédiatement (React), pose
 * le cookie pour les prochaines requêtes, synchronise `<html lang/dir>` et
 * la police, puis déclenche `router.refresh()` pour que les Server
 * Components (pages, métadonnées) se re-rendent dans la nouvelle langue.
 */
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      setLocaleState(next);

      const meta = localeMeta[next];
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = meta.dir === "rtl" ? "ar" : "fr";
      document.documentElement.dir = meta.dir;
      document.body.classList.remove("font-body", "font-arabic");
      document.body.classList.add(meta.fontClass);

      router.refresh();
    },
    [locale, router]
  );

  const value = useMemo<LanguageContextValue>(() => {
    const dict = getDictionary(locale);
    const tr = (path: string, values?: Record<string, string | number>) => {
      const raw = readPath(dict, path);
      const str = typeof raw === "string" ? raw : path;
      return values ? interpolate(str, values) : str;
    };
    return { locale, t: dict, dir: localeMeta[locale].dir, tr, setLocale };
  }, [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Hook principal pour tout composant CLIENT ayant besoin de la langue courante. */
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation() doit être utilisé sous <LanguageProvider>.");
  }
  return ctx;
}
