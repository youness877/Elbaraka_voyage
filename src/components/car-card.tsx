"use client";

import { ArrowRight, Cog, DoorOpen, Fuel, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { interpolate } from "@/i18n/interpolate";
import { useTranslation } from "@/i18n/language-provider";
import { pick } from "@/i18n/pick";
import type { Car } from "@/lib/data";
import { formatDH } from "@/lib/utils";
import { BrandChip } from "./brand-mark";

export function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  const { t, locale } = useTranslation();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-deep/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={car.image}
          alt={`${t.common.book} ${car.name} — Biougra Agadir — Archi Cars`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/25 via-transparent to-transparent" aria-hidden />
        {car.badge && (
          <span className="absolute start-4 top-4 rounded-full bg-gradient-to-r from-gold-light to-gold px-3.5 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-widest text-primary-ink shadow-gold">
            {pick(locale, car.badge)}
          </span>
        )}
        <span className="absolute end-4 top-4 rounded-full bg-primary-ink/70 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-widest text-cream backdrop-blur">
          {pick(locale, car.categoryLabel)}
        </span>
        <BrandChip slug={car.slug} className="absolute bottom-4 start-4" />
      </div>

      {/* Corps */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.32rem] font-semibold leading-tight text-primary-dark">
            {car.name}
          </h3>
          <div className="text-end">
            <p className="text-[0.66rem] font-bold uppercase tracking-wider text-charcoal/50">
              {t.common.from}
            </p>
            <p className="font-display text-xl font-bold text-primary">
              <span className="bidi-isolate" dir="ltr">{formatDH(car.pricePerDay)}</span>
              <span className="ms-1 font-body text-[0.7rem] font-semibold text-charcoal/55">{t.common.perDay}</span>
            </p>
          </div>
        </div>

        {/* Specs */}
        <dl className="mt-4 grid grid-cols-4 gap-1 border-y border-sand py-3 text-center">
          {[
            { icon: Users, label: t.car.seats, value: String(car.seats) },
            { icon: DoorOpen, label: t.car.doors, value: String(car.doors) },
            { icon: Cog, label: t.car.gearbox, value: car.transmission === "automatique" ? t.car.automatic : t.car.manual },
            { icon: Fuel, label: t.car.fuelLabel, value: car.fuel === "essence" ? t.car.petrol : t.car.diesel },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <s.icon className="mx-auto size-4 text-gold" aria-hidden />
                <span className="mt-1 block text-[0.72rem] font-semibold text-charcoal/75">{s.value}</span>
                <span className="block text-[0.6rem] uppercase tracking-wide text-charcoal/45">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {car.features.slice(0, 3).map((f) => (
            <li key={pick(locale, f)} className="flex items-center gap-1.5 text-[0.78rem] text-charcoal/70">
              <span className="size-1.5 rotate-45 bg-gold" aria-hidden />
              {pick(locale, f)}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-[0.74rem] text-charcoal/55">
            {t.car.insuranceIncluded}
            {car.longTermNote && <span className="mt-0.5 block font-bold text-[#8a6d0b]">{pick(locale, car.longTermNote)}</span>}
          </span>
          <Link
            href={`/location-voitures?car=${car.slug}#reservation`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.78rem] font-bold uppercase tracking-wider text-cream transition-all duration-300 hover:bg-primary-dark hover:shadow-luxe"
            aria-label={interpolate(t.car.bookCar, { name: car.name })}
          >
            {t.common.book}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
