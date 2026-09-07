"use client";

import { ArrowRight, CalendarDays, CheckCircle2, MapPin, MoonStar, Plane, Star, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { interpolate } from "@/i18n/interpolate";
import { useTranslation } from "@/i18n/language-provider";
import { pick } from "@/i18n/pick";
import type { UmrahPackage } from "@/lib/data";
import { images } from "@/lib/site";
import { cn, formatDH } from "@/lib/utils";

const imageBySlug: Record<string, string> = {
  "omra-economique": images.kaabaPilgrims,
  "omra-confort": images.masjidHaram,
  "omra-prestige": images.kaabaAerial,
  "omra-ramadan": images.nabawi,
};

export function PackageCard({
  pkg,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  pkg: UmrahPackage;
  priority?: boolean;
  /**
   * Must match the actual column count of the grid this card is rendered
   * in — the voyages page uses a 2-column grid (default above), the
   * homepage's featured-trips grid uses 3 columns, so it passes its own
   * value. A mismatched value causes next/image to fetch a larger source
   * than what's ever displayed.
   */
  sizes?: string;
}) {
  const { t, locale } = useTranslation();
  const name = pick(locale, pkg.name);
  const distance = pick(locale, pkg.distanceMakkah);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe",
        pkg.featured ? "border-gold ring-2 ring-gold/60" : "border-sand-deep/70"
      )}
    >
      {/* Image d'en-tête */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageBySlug[pkg.slug] ?? images.kaabaPilgrims}
          alt={`${name} — El Baraka Voyages`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/70 via-primary-ink/20 to-transparent" aria-hidden />
        {pkg.featured && (
          <span className="absolute start-4 top-4 rounded-full bg-gradient-to-r from-gold-light to-gold px-3.5 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-widest text-primary-ink shadow-gold">
            {t.packageCard.mostChosen}
          </span>
        )}
        <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold text-cream drop-shadow-md">{name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-wider text-[#8a6d0b]">
          <CalendarDays className="size-4 text-gold" aria-hidden />
          {pick(locale, pkg.period)}
        </p>

        {/* Faits clés */}
        <dl className="mt-4 space-y-2.5 border-b border-sand pb-5 text-[0.88rem]">
          <div className="flex items-center gap-2.5">
            <MoonStar className="size-4 shrink-0 text-gold" aria-hidden />
            <dd>
              <strong className="text-primary-dark">{pkg.nightsMakkah} {t.packageCard.nightsMakkah}</strong> +{" "}
              <strong className="text-primary-dark">{pkg.nightsMadinah} {t.packageCard.nightsMadinah}</strong>
            </dd>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex w-4 shrink-0 justify-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("size-2.5", i < pkg.hotelStars ? "fill-gold text-gold" : "text-sand-deep")}
                />
              ))}
            </span>
            <dd>{t.packageCard.hotels} {pkg.hotelStars}★ — {distance}</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
            <dd>{distance}</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <Plane className="size-4 shrink-0 text-gold rtl:-scale-x-100" aria-hidden />
            <dd>{pick(locale, pkg.airline)}</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <UtensilsCrossed className="size-4 shrink-0 text-gold" aria-hidden />
            <dd>{pick(locale, pkg.board)}</dd>
          </div>
        </dl>

        {/* Inclus */}
        <ul className="mt-5 space-y-2">
          {pkg.includes.map((inc) => (
            <li key={pick(locale, inc)} className="flex items-start gap-2.5 text-[0.84rem] leading-snug text-charcoal/75">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              {pick(locale, inc)}
            </li>
          ))}
        </ul>

        {/* Prix + CTA */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-wider text-charcoal/50">{t.common.from}</p>
            <p className="font-display text-[1.55rem] font-bold leading-none text-primary">
              <span className="bidi-isolate" dir="ltr">{formatDH(pkg.priceFrom)}</span>
              <span className="ms-1 font-body text-[0.72rem] font-semibold text-charcoal/55">{t.common.perPerson}</span>
            </p>
          </div>
          <Link
            href={`/voyages?formule=${pkg.slug}#devis`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.78rem] font-bold uppercase tracking-wider text-cream transition-all duration-300 hover:bg-primary-dark hover:shadow-luxe"
            aria-label={interpolate(t.packageCard.requestQuote, { name })}
          >
            {t.common.freeQuote}
            <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
