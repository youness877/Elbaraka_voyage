import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  ChevronDown,
  MapPin,
  MapPinned,
  MoonStar,
  Phone,
  Plane,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CarCard } from "@/components/car-card";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { CountUp, FadeIn } from "@/components/motion";
import { FadeInHero } from "@/components/fade-in-hero";
import { PackageCard } from "@/components/package-card";
import { PartnerStrip } from "@/components/partner-strip";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { Testimonials } from "@/components/testimonials";
import { interpolate } from "@/i18n/interpolate";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/pick";
import { cars, faqs, localSeoCommunes, posts, stats, umrahPackages, whyUs } from "@/lib/data";
import { siteImages } from "@/lib/image-urls";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";
import { images, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: { absolute: t.home.metaTitle },
    description: t.home.metaDescription,
    alternates: { canonical: "/" },
  };
}

/* ———————————————————— HERO ———————————————————— */

function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const comfort = umrahPackages.find((p) => p.slug === "omra-confort")!;
  return (
    <section className="relative isolate overflow-hidden" aria-label={t.home.hero.ariaLabel}>
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={images.heroPlane}
          alt={t.home.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-ink/92 via-primary-deep/78 to-primary-deep/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-ink via-transparent to-primary-ink/40" />
        <div className="absolute inset-0 bg-filigree opacity-70" />
      </div>

      <div className="container-x relative grid min-h-[100svh] items-center gap-14 pb-24 pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:pt-32">
        {/* Texte */}
        <div>
          <FadeInHero>
            <p className="flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold/70" aria-hidden />
              <span className="font-arabic text-2xl leading-none" lang="ar" dir="rtl">
                {site.brandArabic}
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.34em]">
                {t.home.hero.location}
              </span>
            </p>
          </FadeInHero>

          <FadeInHero delay={0.12}>
            <h1 className="mt-5 font-display text-[2.9rem] font-semibold leading-[1.02] tracking-tight text-cream sm:text-6xl lg:text-[4.6rem]">
              {t.home.hero.titleLine1}
              <span className="mt-2 block text-[0.55em]">
                <span className="text-cream/85">{t.home.hero.titleTravel}</span>
                <em className="text-gold-gradient italic">{t.home.hero.titleArchi}</em>
                <span className="text-cream/85">{t.home.hero.titleSuffix}</span>
              </span>
            </h1>
          </FadeInHero>

          <FadeInHero delay={0.24}>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-cream/78">
              {t.home.hero.intro1} <strong className="text-cream">{t.home.hero.travelAgency}</strong>
              {" — "}
              {t.home.hero.intro2} <strong className="text-cream">{t.home.hero.officialTicketing}</strong>
              {" "}
              {t.home.hero.intro3} <strong className="text-cream">{t.home.hero.carRenter}</strong>
              {" "}
              {t.home.hero.intro4}
            </p>
          </FadeInHero>

          <FadeInHero delay={0.36}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/voyages#devis"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform duration-300 hover:scale-[1.04]"
              >
                <Plane className="size-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                {t.home.hero.ctaTrip}
              </Link>
              <Link
                href="/location-voitures#reservation"
                className="group inline-flex items-center gap-2.5 rounded-full border border-cream/35 px-7 py-4 text-sm font-bold text-cream backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold-light"
              >
                <CarFront className="size-4.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
                {t.home.hero.ctaCar}
              </Link>
            </div>
          </FadeInHero>

          <FadeInHero delay={0.48}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.86rem] text-cream/70">
              <a href={site.phones[0].href} className="flex items-center gap-2.5 transition-colors hover:text-gold-light">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" aria-hidden />
                  <span className="relative inline-flex size-2.5 rounded-full bg-gold" aria-hidden />
                </span>
                {t.home.hero.instantResponse}{" "}
                <strong className="bidi-isolate text-cream" dir="ltr">{site.phones[0].display}</strong>
              </a>
              <span className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold-light text-gold-light" aria-hidden />
                ))}
                {t.home.hero.ratingLine}
              </span>
            </div>
          </FadeInHero>
        </div>

        {/* Cartes flottantes */}
        <div className="relative hidden flex-col gap-6 lg:flex" aria-hidden={false}>
          <FadeInHero delay={0.5} y={44}>
            <Link href="/voyages#omra" className="group block animate-float-slow">
              <div className="flex items-center gap-5 rounded-3xl border border-gold/30 bg-white/8 p-5 shadow-luxe backdrop-blur-xl transition-colors duration-300 group-hover:border-gold/60">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={images.kaabaClose} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.24em] text-gold-light">{t.home.hero.umrahCardEyebrow}</p>
                  <p className="mt-1.5 font-display text-xl font-semibold text-cream">{pick(locale, comfort.name)}</p>
                  <p className="mt-0.5 text-sm text-cream/70">
                    {t.common.from}{" "}
                    <strong className="bidi-isolate text-gold-light" dir="ltr">{comfort.priceFrom.toLocaleString("fr-MA")} DH</strong>{" "}
                    {t.common.perPerson} · {comfort.nightsMakkah + comfort.nightsMadinah} {t.home.hero.nights} · {t.home.hero.hotel} {comfort.hotelStars}★
                  </p>
                </div>
                <ArrowUpRight className="ms-auto size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1" aria-hidden />
              </div>
            </Link>
          </FadeInHero>
          <FadeInHero delay={0.66} y={44}>
            <Link href="/location-voitures#flotte" className="group ms-10 block animate-float-slow [animation-delay:1.4s]">
              <div className="flex items-center gap-5 rounded-3xl border border-gold/30 bg-white/8 p-5 shadow-luxe backdrop-blur-xl transition-colors duration-300 group-hover:border-gold/60">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={siteImages.cars["dacia-duster"]} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.24em] text-gold-light">{t.home.hero.carsCardEyebrow}</p>
                  <p className="mt-1.5 font-display text-xl font-semibold text-cream">{t.home.hero.carsCardTitle}</p>
                  <p className="mt-0.5 text-sm text-cream/70">{t.home.hero.carsCardText}</p>
                </div>
                <ArrowUpRight className="ms-auto size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1" aria-hidden />
              </div>
            </Link>
          </FadeInHero>
        </div>
      </div>

      <a href="#enseignes" aria-label={t.common.close} className="absolute bottom-7 start-1/2 hidden -translate-x-1/2 rtl:translate-x-1/2 lg:block">
        <ChevronDown className="size-7 animate-bounce text-gold/80" aria-hidden />
      </a>
    </section>
  );
}

/* ———————————————————— DEUX ENSEIGNES ———————————————————— */

function DualBrands({ t }: { t: Dictionary }) {
  const panels = [
    {
      href: "/voyages",
      image: images.kaabaClose,
      alt: t.home.dualBrands.travelTitle,
      eyebrow: t.home.dualBrands.travelBadge,
      title: t.home.dualBrands.travelTitle,
      text: t.home.dualBrands.travelText,
      cta: t.home.dualBrands.travelCta,
    },
    {
      href: "/location-voitures",
      image: images.blackSuv,
      alt: t.home.dualBrands.carsTitle,
      eyebrow: t.home.dualBrands.carsBadge,
      title: t.home.dualBrands.carsTitle,
      text: t.home.dualBrands.carsText,
      cta: t.home.dualBrands.carsCta,
    },
  ];
  return (
    <section id="enseignes" className="bg-cream" aria-label={t.home.dualBrands.eyebrow}>
      <div className="container-x py-20 lg:py-24">
        <FadeIn>
          <SectionHeading
            eyebrow={t.home.dualBrands.eyebrow}
            title={
              <>
                {t.home.dualBrands.titlePrefix} <em className="text-gold-gradient italic">{t.home.dualBrands.titleHighlight}</em>
              </>
            }
            description={t.home.dualBrands.description}
          />
        </FadeIn>
        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {panels.map((p, i) => (
            <FadeIn key={p.href} delay={0.12 * i}>
              <Link
                href={p.href}
                className="group relative block h-[430px] overflow-hidden rounded-[1.8rem] shadow-card transition-shadow duration-500 hover:shadow-luxe"
                aria-label={p.title}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/94 via-primary-ink/42 to-transparent transition-opacity duration-500" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-gold-light">{p.eyebrow}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-cream lg:text-4xl">{p.title}</h3>
                  <p className="mt-4 flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-cream/85">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {p.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/55 px-5 py-2.5 text-[0.76rem] font-extrabold uppercase tracking-widest text-gold-light transition-all duration-300 group-hover:bg-gold group-hover:text-primary-ink">
                    {p.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ———————————————————— OMRA À LA UNE ———————————————————— */

function FeaturedTrips({ t, locale }: { t: Dictionary; locale: Locale }) {
  const ramadan = umrahPackages.find((p) => p.slug === "omra-ramadan")!;
  const main = umrahPackages.filter((p) => p.slug !== "omra-ramadan");
  return (
    <section className="bg-sand/60" aria-label={t.home.featuredTrips.eyebrow}>
      <div className="container-x py-20 lg:py-24">
        <FadeIn>
          <SectionHeading
            eyebrow={t.home.featuredTrips.eyebrow}
            title={
              <>
                {t.home.featuredTrips.titlePrefix} <em className="text-gold-gradient italic">{t.home.featuredTrips.titleHighlight}</em>
              </>
            }
            description={t.home.featuredTrips.description}
          />
        </FadeIn>

        {/* Bandeau Ramadan */}
        <FadeIn delay={0.1}>
          <Link
            href={`/voyages?formule=${ramadan.slug}#devis`}
            className="group relative mt-12 flex flex-col items-start gap-6 overflow-hidden rounded-[1.8rem] bg-primary-deep p-8 shadow-luxe transition-transform duration-500 hover:-translate-y-1 md:flex-row md:items-center lg:p-10"
          >
            <div className="absolute inset-0 bg-filigree" aria-hidden />
            <div className="absolute end-0 top-0 h-full w-1/2 opacity-25" aria-hidden>
              <Image src={images.nabawi} alt="" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-deep to-transparent" />
            </div>
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-widest text-primary-ink">
                <MoonStar className="size-3.5" aria-hidden /> {pick(locale, ramadan.period)}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-cream">{pick(locale, ramadan.name)}</h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-cream/70">
                {pick(locale, ramadan.includes[0])}
              </p>
            </div>
            <div className="relative flex items-center gap-6 md:ms-auto">
              <p className="text-end">
                <span className="block text-[0.66rem] font-bold uppercase tracking-widest text-cream/60">{t.common.from}</span>
                <span className="bidi-isolate font-display text-3xl font-bold text-gold-light" dir="ltr">{ramadan.priceFrom.toLocaleString("fr-MA")} DH</span>
                <span className="block text-xs text-cream/60">{t.common.perPerson}</span>
              </p>
              <span className="flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary-ink">
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden />
              </span>
            </div>
          </Link>
        </FadeIn>

        <div className="mt-8 grid gap-7 lg:grid-cols-3">
          {main.map((p, i) => (
            <FadeIn key={p.slug} delay={0.08 * i}>
              <PackageCard pkg={p} sizes="(max-width: 1024px) 100vw, 33vw" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ———————————————————— CHIFFRES ———————————————————— */

function StatsBand({ t }: { t: Dictionary }) {
  const labels = [t.about.stats.years, t.about.stats.pilgrims, t.about.stats.vehicles, t.about.stats.satisfaction];
  return (
    <section className="relative overflow-hidden bg-primary-deep" aria-label={t.home.stats.eyebrow}>
      <div className="absolute inset-0 bg-filigree" aria-hidden />
      <div className="absolute inset-0 bg-grain" aria-hidden />
      <div className="container-x relative grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4">
        {stats.map((s, i) => (
          <FadeIn key={labels[i]} delay={0.08 * i} className="relative px-6 text-center lg:rtl:[&:not(:last-child)]:border-l lg:[&:not(:last-child)]:border-r lg:border-gold/15">
            <CountUp
              value={s.value}
              suffix={s.suffix}
              className="font-display text-4xl font-bold text-gold-light lg:text-5xl"
            />
            <p className="mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-cream/65">{labels[i]}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ———————————————————— VOITURES À LA UNE ———————————————————— */

function FeaturedCars({ t }: { t: Dictionary }) {
  const picks = ["renault-clio-5", "dacia-duster", "dacia-sandero-stepway", "mercedes-classe-c"]
    .map((slug) => cars.find((c) => c.slug === slug))
    .filter(Boolean) as typeof cars;
  return (
    <section className="bg-cream" aria-label={t.home.featuredCars.eyebrow}>
      <div className="container-x py-20 lg:py-24">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow={t.home.featuredCars.eyebrow}
              title={
                <>
                  {t.home.featuredCars.titlePrefix} <em className="text-gold-gradient italic">{t.home.featuredCars.titleHighlight}</em>
                </>
              }
              description={t.home.featuredCars.description}
            />
            <Link
              href="/location-voitures#flotte"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-[0.8rem] font-extrabold uppercase tracking-widest text-primary transition-all duration-300 hover:border-gold hover:bg-primary hover:text-cream"
            >
              {t.home.featuredCars.viewAll}
              <ArrowUpRight className="size-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {picks.map((car, i) => (
            <FadeIn key={car.slug} delay={0.07 * i}>
              <CarCard car={car} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ———————————————————— POURQUOI NOUS ———————————————————— */

function WhyUs({ t, locale }: { t: Dictionary; locale: Locale }) {
  const icons = [MoonStar, Plane, CarFront, MapPinned];
  return (
    <section className="relative overflow-hidden bg-primary-deep" aria-label={t.home.whyUs.eyebrow}>
      <div className="absolute inset-0 bg-filigree" aria-hidden />
      <div className="absolute inset-0 bg-grain" aria-hidden />
      <div className="absolute -end-32 top-0 size-[420px] rounded-full bg-gold/10 blur-[130px]" aria-hidden />
      <div className="container-x relative py-20 lg:py-24">
        <FadeIn>
          <SectionHeading
            dark
            eyebrow={t.home.whyUs.eyebrow}
            title={
              <>
                {t.home.whyUs.titlePrefix} <em className="text-gold-gradient italic">{t.home.whyUs.titleHighlight}</em>
              </>
            }
          />
        </FadeIn>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {whyUs.map((w, i) => {
            const Icon = icons[i];
            const title = pick(locale, w.title);
            const text = interpolate(pick(locale, w.text), { street: site.address.street[locale] });
            return (
              <FadeIn key={title} delay={0.08 * i}>
                <div className="group h-full rounded-3xl border border-cream/12 bg-white/5 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/8">
                  <span className="flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-primary-ink shadow-gold transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-[1.28rem] font-semibold leading-snug text-cream">{title}</h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-cream/65">{text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ———————————————————— SEO LOCAL ———————————————————— */

function LocalSeoSection({ t, locale }: { t: Dictionary; locale: Locale }) {
  const s = t.home.localSeo;
  return (
    <section className="bg-cream" aria-label={s.eyebrow}>
      <div className="container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-24">
        <FadeIn>
          <SectionHeading
            align="left"
            eyebrow={s.eyebrow}
            title={
              <>
                {s.titlePrefix} <em className="text-gold-gradient italic">{s.titleHighlight}</em>
              </>
            }
          />
          <p className="mt-5 text-[1rem] leading-relaxed text-charcoal/75">
            {s.description1} <strong>{s.addressBold}</strong>{s.description2} <strong>{s.provinceBold}</strong>{s.description3}{" "}
            <strong>{s.packagesBold}</strong>{s.description4} <strong>{s.ticketsBold}</strong>{s.description5}{" "}
            <strong>{s.rentalBold}</strong>{s.description6}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {localSeoCommunes.map((c) => (
              <span key={pick(locale, c)} className="rounded-full border border-sand-deep bg-white px-3.5 py-1.5 text-[0.76rem] font-semibold text-charcoal/70">
                {pick(locale, c)}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-cream shadow-luxe transition-all duration-300 hover:bg-primary-dark"
            >
              <MapPin className="size-4 text-gold-light" aria-hidden />
              {s.agencyDirections}
            </a>
            <a
              href={site.phones[1].href}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 px-6 py-3.5 text-sm font-bold text-primary transition-colors hover:border-gold hover:text-[#8a6d0b]"
            >
              <Phone className="size-4" aria-hidden />
              <span className="bidi-isolate" dir="ltr">
                {site.phones[1].display} <span className="font-semibold text-charcoal/50">{s.fixedLine}</span>
              </span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/40" aria-hidden />
            <div className="relative h-[430px] w-full overflow-hidden rounded-[1.7rem] shadow-luxe [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
              <Image
                src={images.storefront}
                alt={s.titlePrefix}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 start-6 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-luxe">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-gold">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-[1.05rem] font-bold text-primary-dark">{s.captionTitle}</p>
                <p className="text-[0.78rem] text-charcoal/60">{s.captionText}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ———————————————————— FAQ + BLOG PREVIEWS ———————————————————— */

function FaqPreview({ t, locale }: { t: Dictionary; locale: Locale }) {
  const items = faqs.slice(0, 4).map((f) => ({ question: pick(locale, f.question), answer: pick(locale, f.answer) }));
  return (
    <section className="bg-sand/60" aria-label={t.home.faqPreview.eyebrow}>
      <div className="container-x grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
        <FadeIn>
          <SectionHeading
            align="left"
            eyebrow={t.home.faqPreview.eyebrow}
            title={
              <>
                {t.home.faqPreview.titlePrefix} <em className="text-gold-gradient italic">{t.home.faqPreview.titleHighlight}</em>
              </>
            }
            description={t.home.faqPreview.description}
          />
          <Link
            href="/faq"
            className="group mt-7 inline-flex items-center gap-2 text-[0.82rem] font-extrabold uppercase tracking-widest text-primary transition-colors hover:text-[#8a6d0b]"
          >
            {t.home.faqPreview.linkLabel}
            <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
          </Link>
        </FadeIn>
        <FadeIn delay={0.12}>
          <FaqAccordion items={items} />
        </FadeIn>
      </div>
    </section>
  );
}

function BlogPreview({ t }: { t: Dictionary }) {
  return (
    <section className="bg-cream" aria-label={t.home.blogPreview.ariaLabel}>
      <div className="container-x py-20 lg:py-24">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow={t.home.blogPreview.eyebrow}
              title={
                <>
                  {t.home.blogPreview.titlePrefix} <em className="text-gold-gradient italic">{t.home.blogPreview.titleHighlight}</em>
                </>
              }
              description={t.home.blogPreview.description}
            />
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-[0.8rem] font-extrabold uppercase tracking-widest text-primary transition-all duration-300 hover:border-gold hover:bg-primary hover:text-cream"
            >
              {t.home.blogPreview.linkLabel}
              <ArrowUpRight className="size-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={0.08 * i}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ———————————————————— PAGE ———————————————————— */

export default async function HomePage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return (
    <>
      <JsonLd data={[localBusinessSchema(locale), websiteSchema(locale)]} />
      <Hero t={t} locale={locale} />
      <PartnerStrip />
      <DualBrands t={t} />
      <FeaturedTrips t={t} locale={locale} />
      <StatsBand t={t} />
      <FeaturedCars t={t} />
      <WhyUs t={t} locale={locale} />
      <LocalSeoSection t={t} locale={locale} />
      <Testimonials limit={3} />
      <FaqPreview t={t} locale={locale} />
      <BlogPreview t={t} />
      <CtaBand />
    </>
  );
}
