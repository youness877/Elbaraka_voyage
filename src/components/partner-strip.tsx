import { Plane } from "lucide-react";
import { Fragment } from "react";

const partners = [
  "Saudia",
  "Qatar Airways",
  "Royal Air Maroc",
  "Omra & Hajj",
  "Archi Cars",
  "Biougra — Agadir",
];

/**
 * Bandeau défilant des partenaires — signature de la devanture (Saudia, Qatar Airways).
 */
export function PartnerStrip() {
  return (
    <div className="relative overflow-hidden border-y border-gold/25 bg-primary-ink py-4" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {partners.map((p) => (
              <span key={`${copy}-${p}`} className="flex items-center gap-10">
                <span className="whitespace-nowrap font-display text-lg font-medium uppercase tracking-[0.34em] text-gold">
                  {p}
                </span>
                <Plane className="size-4 rotate-45 text-gold/50" />
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
