import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/**
 * Lit la langue choisie depuis le cookie de la requête entrante.
 * À utiliser dans les Server Components, `generateMetadata`, les routes API…
 * — jamais côté client (voir `useLocale()` dans `language-provider.tsx`).
 */
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}
