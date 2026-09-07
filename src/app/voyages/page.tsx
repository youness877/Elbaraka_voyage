import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  FileCheck2,
  Headset,
  MapPin,
  MoonStar,
  Phone,
  Plane,
  Route,
  Sparkles,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { TripInquiryForm } from "@/components/forms/booking-forms";
import { JsonLd } from "@/components/json-ld";
import { FadeIn } from "@/components/motion";
import { PackageCard } from "@/components/package-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { pick } from "@/i18n/pick";
import { circuits, hajjInfo, ticketingDestinations, umrahPackages } from "@/lib/data";
import { breadcrumbSchema, travelAgencySchema } from "@/lib/seo";
import { images, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.voyages.metaTitle,
    description: t.voyages.metaDescription,
    keywords: [
      "omra agadir",
      "omra départ agadir",
      "prix omra maroc",
      "omra ramadan agadir",
      "agence hajj biougra",
      "billet avion agadir saudia",
      "qatar airways agadir billet",
      "agence de voyage biougra",
    ],
    alternates: { canonical: "/voyages" },
    openGraph: {
      title: t.voyages.ogTitle,
      description: t.voyages.ogDescription,
      url: `${site.url}/voyages`,
      images: [{ url: images.kaabaAerial, width: 1800, height: 1100, alt: "Vue aérienne de la Kaaba — Omra El Baraka Voyages" }],
    },
  };
}

const stepIcons = [FileCheck2, BadgeCheck, CalendarCheck, Plane];
const quickNavIcons = { omra: MoonStar, hajj: Sparkles, ticketing: Ticket, circuits: Route } as const;

export default async function VoyagesPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const v = t.voyages;

  return (
    <>
      <JsonLd
        data={[travelAgencySchema(locale), breadcrumbSchema([{ name: v.hero.breadcrumb, path: "/voyages" }], locale)]}
      />

      <PageHero
        title={v.hero.title}
        highlight={v.hero.highlight}
        description={v.hero.description}
        image={images.kaabaAerial}
        imageAlt={v.hero.imageAlt}
        breadcrumb={[{ name: v.hero.breadcrumb, path: "/voyages" }]}
      />

      {/* Accès rapides */}
      <section className="bg-cream" aria-label={v.quickNav.ariaLabel}>
        <div className="container-x -mt-2 py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(["omra", "hajj", "ticketing", "circuits"] as const).map((key, i) => {
              const Icon = quickNavIcons[key];
              const item = v.quickNav[key];
              return (
                <FadeIn key={key} delay={0.06 * i}>
                  <a
                    href={`#${key === "ticketing" ? "billetterie" : key}`}
                    className="group flex h-full items-center gap-4 rounded-2xl border border-sand-deep/70 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-gold transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-gold-light group-hover:to-gold group-hover:text-primary-ink">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display text-[1.05rem] font-semibold text-primary-dark">{item.label}</span>
                      <span className="block text-[0.78rem] text-charcoal/55">{item.note}</span>
                    </span>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— OMRA ——— */}
      <section id="omra" className="scroll-mt-24 bg-sand/60" aria-label={v.omraSection.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={v.omraSection.eyebrow}
              title={
                <>
                  {v.omraSection.titlePrefix} <em className="text-gold-gradient italic">{v.omraSection.titleHighlight}</em>
                </>
              }
              description={v.omraSection.description}
            />
          </FadeIn>
          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            {umrahPackages.map((p, i) => (
              <FadeIn key={p.slug} delay={0.07 * i}>
                <PackageCard pkg={p} />
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-9 max-w-2xl text-center text-[0.85rem] leading-relaxed text-charcoal/60">
              {v.omraSection.footnote}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ——— Étapes ——— */}
      <section className="relative overflow-hidden bg-primary-deep" aria-label={v.stepsSection.ariaLabel}>
        <div className="absolute inset-0 bg-filigree" aria-hidden />
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="container-x relative py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              dark
              eyebrow={v.stepsSection.eyebrow}
              title={
                <>
                  {v.stepsSection.titlePrefix} <em className="text-gold-gradient italic">{v.stepsSection.titleHighlight}</em>
                </>
              }
            />
          </FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {v.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <FadeIn key={s.title} delay={0.08 * i}>
                  <div className="relative h-full rounded-3xl border border-cream/12 bg-white/5 p-7 backdrop-blur-sm">
                    <span className="absolute end-6 top-6 font-display text-4xl font-bold text-gold/25" aria-hidden>
                      {i + 1}
                    </span>
                    <span className="flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-primary-ink shadow-gold">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[1.24rem] font-semibold text-cream">{s.title}</h3>
                    <p className="mt-2.5 text-[0.87rem] leading-relaxed text-cream/65">{s.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— HAJJ ——— */}
      <section id="hajj" className="scroll-mt-24 bg-cream" aria-label={v.hajjSection.ariaLabel}>
        <div className="container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-24">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold/40" aria-hidden />
              <div className="relative h-[440px] overflow-hidden rounded-[1.7rem] shadow-luxe">
                <Image
                  src={images.hajjCrowd}
                  alt={v.hajjSection.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/60 to-transparent" aria-hidden />
                <div className="absolute bottom-5 start-5 rounded-2xl bg-white/92 px-5 py-3.5 shadow-luxe backdrop-blur">
                  <p className="font-display text-[1.02rem] font-bold text-primary-dark">{v.hajjSection.badgeTitle}</p>
                  <p className="text-[0.76rem] text-charcoal/60">{v.hajjSection.badgeText}</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <SectionHeading align="left" eyebrow={v.hajjSection.eyebrow} title={pick(locale, hajjInfo.title)} />
            <ul className="mt-6 space-y-4">
              {hajjInfo.points.map((p) => (
                <li key={pick(locale, p)} className="flex items-start gap-3 text-[0.94rem] leading-relaxed text-charcoal/78">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  {pick(locale, p)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/voyages?formule=hajj-accompagnement#devis"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-cream shadow-luxe transition-colors hover:bg-primary-dark"
              >
                <Sparkles className="size-4 text-gold-light" aria-hidden />
                {v.hajjSection.cta}
              </Link>
              <a
                href={site.phones[0].href}
                className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 px-6 py-3.5 text-sm font-bold text-primary transition-colors hover:border-gold"
              >
                <Phone className="size-4" aria-hidden />
                <span className="bidi-isolate" dir="ltr">{site.phones[0].display}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ——— BILLETTERIE ——— */}
      <section id="billetterie" className="scroll-mt-24 bg-sand/60" aria-label={v.ticketingSection.ariaLabel}>
        <div className="container-x grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <FadeIn>
            <SectionHeading
              align="left"
              eyebrow={v.ticketingSection.eyebrow}
              title={
                <>
                  {v.ticketingSection.titlePrefix} <em className="text-gold-gradient italic">{v.ticketingSection.titleHighlight}</em>
                </>
              }
            />
            <p className="mt-5 text-[1rem] leading-relaxed text-charcoal/75">{v.ticketingSection.description}</p>
            <ul className="mt-6 space-y-3">
              {v.ticketingSection.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[0.93rem] text-charcoal/78">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#8a6d0b]">
              {v.ticketingSection.frequentDestinations}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ticketingDestinations.map((d) => (
                <span key={pick(locale, d)} className="rounded-full border border-sand-deep bg-white px-3.5 py-1.5 text-[0.78rem] font-semibold text-charcoal/70">
                  {pick(locale, d)}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform hover:scale-[1.03]"
              >
                <Ticket className="size-4" aria-hidden />
                {v.ticketingSection.whatsappCta}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="relative h-[440px] overflow-hidden rounded-[1.7rem] shadow-luxe">
              <Image
                src={images.airportCheckin}
                alt={v.ticketingSection.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/65 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-5 start-5 end-5 flex items-center justify-between rounded-2xl bg-white/92 px-5 py-3.5 shadow-luxe backdrop-blur">
                <p className="font-display text-[1.02rem] font-bold text-primary-dark">{v.ticketingSection.airlinesCaption}</p>
                <Plane className="size-5 text-gold rtl:-scale-x-100" aria-hidden />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ——— CIRCUITS ——— */}
      <section id="circuits" className="scroll-mt-24 bg-cream" aria-label={v.circuitsSection.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={v.circuitsSection.eyebrow}
              title={
                <>
                  {v.circuitsSection.titlePrefix} <em className="text-gold-gradient italic">{v.circuitsSection.titleHighlight}</em>
                </>
              }
              description={v.circuitsSection.description}
            />
          </FadeIn>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {circuits.map((c, i) => {
              const name = pick(locale, c.name);
              return (
                <FadeIn key={name} delay={0.08 * i}>
                  <article className="group h-full overflow-hidden rounded-3xl border border-sand-deep/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={images[c.image]}
                        alt={`${name} — El Baraka Voyages`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/45 to-transparent" aria-hidden />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-[1.22rem] font-semibold leading-snug text-primary-dark">{name}</h3>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-charcoal/68">{pick(locale, c.detail)}</p>
                      <Link
                        href="/voyages?formule=circuit-groupe#devis"
                        className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-widest text-primary transition-colors hover:text-[#8a6d0b]"
                      >
                        {v.circuitsSection.requestProgram}
                        <Route className="size-4 text-gold rtl:-scale-x-100" aria-hidden />
                      </Link>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— DEVIS ——— */}
      <section id="devis" className="scroll-mt-24 bg-sand/60" aria-label={v.quoteSection.ariaLabel}>
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
          <FadeIn>
            <div className="rounded-[1.8rem] border border-sand-deep/70 bg-white p-8 shadow-card lg:p-10">
              <SectionHeading
                align="left"
                eyebrow={v.quoteSection.eyebrow}
                title={
                  <>
                    {v.quoteSection.titlePrefix} <em className="text-gold-gradient italic">{v.quoteSection.titleHighlight}</em>
                  </>
                }
                description={v.quoteSection.description}
              />
              <div className="mt-8">
                <TripInquiryForm />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <aside className="relative h-full overflow-hidden rounded-[1.8rem] bg-primary-deep p-8 shadow-luxe lg:p-9">
              <div className="absolute inset-0 bg-filigree" aria-hidden />
              <div className="relative">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-gold">{v.quoteSection.phoneEyebrow}</p>
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
                    <Headset className="size-5" aria-hidden />
                    {v.quoteSection.assistanceTitle}
                  </p>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-cream/70">{v.quoteSection.assistanceText}</p>
                </div>
                <div className="mt-6 flex items-start gap-3 text-[0.85rem] text-cream/70">
                  <MapPin className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden />
                  <p>
                    {site.address.street[locale]}, {site.address.city[locale]}
                    <br />
                    <span className="text-cream/50">{t.nav.hoursLine}</span>
                  </p>
                </div>
                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-cream/10 bg-white/5 p-5">
                  <CarFront className="mt-0.5 size-9 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="font-display text-[1.02rem] font-semibold text-cream">{v.quoteSection.needCarTitle}</p>
                    <p className="mt-1 text-[0.82rem] text-cream/65">{v.quoteSection.needCarText}</p>
                    <Link href="/location-voitures" className="mt-2 inline-flex items-center gap-1.5 text-[0.76rem] font-extrabold uppercase tracking-widest text-gold-light transition-colors hover:text-gold">
                      {v.quoteSection.viewFleet}
                      <Plane className="size-3.5 rotate-90" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </section>

      <CtaBand title={v.ctaTitle} subtitle={v.ctaSubtitle} />
    </>
  );
}
