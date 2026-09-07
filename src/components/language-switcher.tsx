"use client";

import { locales, localeMeta } from "@/i18n/config";
import { useTranslation } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

/**
 * FR | العربية — bascule de langue.
 * Boutons natifs (pas de menu déroulant caché) : accessible au clavier,
 * lisible au lecteur d'écran, sans dépendance JS supplémentaire.
 */
export function LanguageSwitcher({
  variant = "pill",
  className,
}: {
  /** "pill" — barre navbar desktop compacte. "block" — menu mobile plein largeur. */
  variant?: "pill" | "block";
  className?: string;
}) {
  const { locale, setLocale, t } = useTranslation();

  if (variant === "block") {
    return (
      <div
        role="group"
        aria-label={t.languageSwitcher.label}
        className={cn("flex items-center gap-2", className)}
      >
        {locales.map((l) => {
          const active = l === locale;
          const meta = localeMeta[l];
          return (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={active}
              lang={l}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-bold transition-colors",
                active
                  ? "border-gold bg-gold text-primary-ink"
                  : "border-cream/25 text-cream hover:border-gold/60"
              )}
            >
              <span aria-hidden>{meta.flag}</span>
              {meta.nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t.languageSwitcher.label}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 text-[0.78rem] font-bold",
        className
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        const meta = localeMeta[l];
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            aria-label={meta.label}
            lang={l}
            className={cn(
              "rounded-full px-2.5 py-1.5 transition-colors",
              active ? "bg-gold text-primary-ink" : "text-current opacity-70 hover:opacity-100"
            )}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
