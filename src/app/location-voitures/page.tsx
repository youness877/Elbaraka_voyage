import type { Metadata } from "next";
import {
  BadgeCheck,
  Baby,
  CarFront,
  Fuel,
  Gauge,
  HandCoins,
  Headset,
  IdCard,
  MapPin,
  Phone,
  ShieldCheck,
  Timer,
  UserRoundPlus,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandStrip } from "@/components/brand-mark";
import { CarCatalog } from "@/components/car-catalog";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { CarBookingForm } from "@/components/forms/booking-forms";
import { JsonLd } from "@/components/json-ld";
import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { pick } from "@/i18n/pick";
import { rentalTerms } from "@/lib/data";
import { breadcrumbSchema, carRentalSchema } from "@/lib/seo";
import { images, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.locationVoitures.metaTitle,
    description: t.locationVoitures.metaDescription,
    keywords: [
      "location voiture biougra",
      "location voiture agadir",
      "location voiture aéroport agadir al massira",
      "louer duster agadir",
      "location voiture longue durée maroc",
      "archi cars",
      "location voiture ait melloul",
    ],
    alternates: { canonical: "/location-voitures" },
    openGraph: {
      title: t.locationVoitures.ogTitle,
      description: t.locationVoitures.ogDescription,
      url: `${site.url}/location-voitures`,
      images: [{ url: images.suvRoad, width: 1800, height: 1100, alt: "SUV sur route du Souss — location Archi Cars Biougra" }],
    },
  };
}

const trustIcons = [HandCoins, ShieldCheck, MapPin, Headset];
const keyRuleIcons = [IdCard, Timer, Wallet, Gauge, Fuel, UserRoundPlus, Baby];

export default async function LocationVoituresPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const l = t.locationVoitures;

  return (
    <>
      <JsonLd
        data={[carRentalSchema(locale), breadcrumbSchema([{ name: l.hero.breadcrumb, path: "/location-voitures" }], locale)]}
      />

      <PageHero
        title={l.hero.title}
        highlight={l.hero.highlight}
        description={l.hero.description}
        image={images.suvRoad}
        imageAlt={l.hero.imageAlt}
        breadcrumb={[{ name: l.hero.breadcrumb, path: "/location-voitures" }]}
      />

      {/* Garanties */}
      <section className="bg-cream" aria-label={l.trustSection.ariaLabel}>
        <div className="container-x py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {l.trustItems.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <FadeIn key={item.title} delay={0.06 * i}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-sand-deep/70 bg-white p-5 shadow-card">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-gold">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-[1.02rem] font-semibold text-primary-dark">{item.title}</p>
                      <p className="mt-0.5 text-[0.8rem] leading-relaxed text-charcoal/60">{item.text}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flotte */}
      <section id="flotte" className="scroll-mt-24 bg-sand/50" aria-label={l.fleetSection.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={l.fleetSection.eyebrow}
              title={
                <>
                  {l.fleetSection.titlePrefix} <em className="text-gold-gradient italic">{l.fleetSection.titleHighlight}</em>
                </>
              }
              description={l.fleetSection.description}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <BrandStrip className="mt-12 border-y border-sand-deep/60 py-8" />
          </FadeIn>
          <div className="mt-12">
            <CarCatalog />
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section id="conditions" className="scroll-mt-24 bg-cream" aria-label={l.conditionsSection.ariaLabel}>
        <div className="container-x grid gap-14 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <FadeIn>
            <SectionHeading
              align="left"
              eyebrow={l.conditionsSection.eyebrow}
              title={
                <>
                  {l.conditionsSection.titlePrefix} <em className="text-gold-gradient italic">{l.conditionsSection.titleHighlight}</em>
                </>
              }
              description={l.conditionsSection.description}
            />
            <div className="mt-9">
              <FaqAccordion items={rentalTerms.map((r) => ({ question: pick(locale, r.question), answer: pick(locale, r.answer) }))} />
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[1.8rem] border border-sand-deep/70 bg-white p-8 shadow-card">
                <h3 className="font-display text-xl font-semibold text-primary-dark">{l.conditionsSection.summaryTitle}</h3>
                <ul className="mt-5 divide-y divide-sand">
                  {l.keyRules.map((r, i) => {
                    const Icon = keyRuleIcons[i];
                    return (
                      <li key={r.label} className="flex items-center gap-4 py-3.5">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sand text-primary">
                          <Icon className="size-4.5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.74rem] font-bold uppercase tracking-wider text-charcoal/50">{r.label}</p>
                          <p className="text-[0.92rem] font-semibold text-primary-dark">{r.value}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-[1.8rem] bg-primary-deep p-8 shadow-luxe">
                <div className="absolute inset-0 bg-filigree" aria-hidden />
                <div className="relative">
                  <p className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
                    <MapPin className="size-5 text-gold" aria-hidden />
                    {l.conditionsSection.deliveryZonesTitle}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {l.deliveryZones.map((z) => (
                      <li key={z.zone} className="flex items-center justify-between gap-4 border-b border-cream/10 pb-3 text-[0.9rem] last:border-0 last:pb-0">
                        <span className="text-cream/80">{z.zone}</span>
                        <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 text-[0.76rem] font-bold text-gold-light">{z.price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[0.78rem] leading-relaxed text-cream/55">{l.conditionsSection.flightDelayNote}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Réservation */}
      <section id="reservation" className="scroll-mt-24 bg-sand/50" aria-label={l.reservationSection.ariaLabel}>
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
          <FadeIn>
            <div className="rounded-[1.8rem] border border-sand-deep/70 bg-white p-8 shadow-card lg:p-10">
              <SectionHeading
                align="left"
                eyebrow={l.reservationSection.eyebrow}
                title={
                  <>
                    {l.reservationSection.titlePrefix} <em className="text-gold-gradient italic">{l.reservationSection.titleHighlight}</em>
                  </>
                }
                description={l.reservationSection.description}
              />
              <div className="mt-8">
                <CarBookingForm />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <aside className="relative h-full overflow-hidden rounded-[1.8rem] bg-primary-deep p-8 shadow-luxe lg:p-9">
              <div className="absolute inset-0 bg-filigree" aria-hidden />
              <div className="relative">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-gold">{l.reservationSection.phoneEyebrow}</p>
                <div className="mt-5 space-y-3.5">
                  {site.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="flex items-center gap-3.5 rounded-2xl border border-cream/12 bg-white/5 px-4 py-3.5 transition-colors hover:border-gold/50"
                    >
                      <Phone className="size-4.5 shrink-0 text-gold" aria-hidden />
                      <span>
                        <span className="bidi-isolate block font-display text-lg font-semibold text-cream" dir="ltr">{p.display}</span>
                        <span className="block text-[0.72rem] text-cream/55">{p.label[locale]}</span>
                      </span>
                    </a>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl border border-gold/30 bg-gold/10 p-5">
                  <p className="flex items-center gap-2 font-display text-[1.06rem] font-semibold text-gold-light">
                    <BadgeCheck className="size-5" aria-hidden />
                    {l.reservationSection.longTermTitle}
                  </p>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-cream/70">{l.reservationSection.longTermText}</p>
                </div>
                <div className="relative mt-6 h-44 overflow-hidden rounded-2xl">
                  <Image
                    src={images.whiteSuvDesert}
                    alt={l.reservationSection.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cream/10 bg-white/5 p-5">
                  <CarFront className="mt-0.5 size-9 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="font-display text-[1.02rem] font-semibold text-cream">{l.reservationSection.needTripTitle}</p>
                    <p className="mt-1 text-[0.82rem] text-cream/65">{l.reservationSection.needTripText}</p>
                    <Link href="/voyages" className="mt-2 inline-flex items-center gap-1.5 text-[0.76rem] font-extrabold uppercase tracking-widest text-gold-light transition-colors hover:text-gold">
                      {l.reservationSection.needTripCta}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </section>

      <CtaBand
        title={l.ctaTitle}
        subtitle={l.ctaSubtitle}
        primaryHref="#reservation"
        primaryLabel={l.ctaButton}
      />
    </>
  );
}
