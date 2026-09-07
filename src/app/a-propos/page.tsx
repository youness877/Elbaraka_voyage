import type { Metadata } from "next";
import { Award, HandHeart, Landmark, MapPin, Medal, Phone, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { CountUp, FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { stats } from "@/lib/data";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo";
import { images, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    alternates: { canonical: "/a-propos" },
    openGraph: {
      title: t.about.ogTitle,
      description: t.about.ogDescription,
      url: `${site.url}/a-propos`,
      images: [{ url: images.storefront, width: 1536, height: 1024, alt: "Devanture El Baraka Voyages — Archi Cars à Biougra" }],
    },
  };
}

const valueIcons = [ShieldCheck, HandHeart, Medal, Users];

export default async function AboutPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const a = t.about;
  const statLabels = [a.stats.years, a.stats.pilgrims, a.stats.vehicles, a.stats.satisfaction];

  return (
    <>
      <JsonLd data={[localBusinessSchema(locale), breadcrumbSchema([{ name: a.hero.breadcrumb, path: "/a-propos" }], locale)]} />

      <PageHero
        title={a.hero.title}
        highlight={a.hero.highlight}
        description={a.hero.description}
        image={images.storefront}
        imageAlt={a.hero.imageAlt}
        breadcrumb={[{ name: a.hero.breadcrumb, path: "/a-propos" }]}
      />

      {/* Histoire */}
      <section className="bg-cream" aria-label={a.story.ariaLabel}>
        <div className="container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-24">
          <FadeIn>
            <SectionHeading
              align="left"
              eyebrow={a.story.eyebrow}
              title={
                <>
                  {a.story.titlePrefix} <em className="text-gold-gradient italic">{a.story.titleHighlight}</em>
                </>
              }
            />
            <div className="mt-5 space-y-4 text-[1rem] leading-relaxed text-charcoal/78">
              <p>
                {a.story.p1} <strong>{a.story.p1Bold}</strong>.
              </p>
              <p>
                {a.story.p2a} <strong>{a.story.p2Bold1}</strong>
                {a.story.p2b} <strong>{a.story.p2Bold2}</strong> {a.story.p2c} <strong>{a.story.p2Bold3}</strong>
                {a.story.p2d} <strong>{a.story.p2Bold4}</strong>
                {a.story.p2e}
              </p>
              <p>
                {a.story.p3a} <strong>{a.story.p3Bold1}</strong> {a.story.p3b}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7">
              {stats.map((s, i) => (
                <div key={statLabels[i]} className="border-s-2 border-gold ps-4">
                  <CountUp value={s.value} suffix={s.suffix} className="font-display text-3xl font-bold text-primary" />
                  <p className="mt-1 text-[0.76rem] font-semibold uppercase tracking-wider text-charcoal/55">{statLabels[i]}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold/40" aria-hidden />
              <div className="relative h-[430px] w-full overflow-hidden rounded-[1.7rem] shadow-luxe [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
                <Image
                  src={images.storefront}
                  alt={a.story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/55 to-transparent" aria-hidden />
                <div className="absolute bottom-5 start-5 flex items-center gap-3 rounded-2xl bg-white/92 px-5 py-3.5 shadow-luxe backdrop-blur">
                  <Landmark className="size-5 text-primary" aria-hidden />
                  <p className="text-[0.85rem] font-bold text-primary-dark">
                    {site.address.street[locale]} — {site.address.city[locale]}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-sand/60" aria-label={a.timelineSection.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={a.timelineSection.eyebrow}
              title={
                <>
                  {a.timelineSection.titlePrefix} <em className="text-gold-gradient italic">{a.timelineSection.titleHighlight}</em>
                </>
              }
            />
          </FadeIn>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <span className="absolute bottom-2 top-2 start-[1.1rem] w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:start-1/2" aria-hidden />
            <div className="space-y-10">
              {a.timeline.map((item, i) => (
                <FadeIn key={item.year} delay={0.06 * i}>
                  <div className={`relative flex gap-6 sm:w-1/2 ${i % 2 === 0 ? "sm:pe-10" : "sm:ms-auto sm:ps-10"}`}>
                    <span
                      className={`absolute top-1.5 hidden size-4 rotate-45 border-2 border-gold bg-cream sm:block ${
                        i % 2 === 0 ? "-end-2" : "-start-2"
                      }`}
                      aria-hidden
                    />
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-[0.68rem] font-bold text-gold-light sm:hidden" aria-hidden>
                      {i + 1}
                    </span>
                    <div className={`rounded-2xl border border-sand-deep/70 bg-white p-6 shadow-card ${i % 2 === 0 ? "sm:text-end" : ""}`}>
                      <p className="inline-flex rounded-full bg-gradient-to-r from-gold-light to-gold px-3.5 py-1 font-display text-[0.78rem] font-bold text-primary-ink">
                        {item.year}
                      </p>
                      <h3 className="mt-3 font-display text-[1.16rem] font-semibold text-primary-dark">{item.title}</h3>
                      <p className="mt-1.5 text-[0.86rem] leading-relaxed text-charcoal/68">{item.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-cream" aria-label={a.valuesSection.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={a.valuesSection.eyebrow}
              title={
                <>
                  {a.valuesSection.titlePrefix} <em className="text-gold-gradient italic">{a.valuesSection.titleHighlight}</em>
                </>
              }
            />
          </FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <FadeIn key={v.title} delay={0.08 * i}>
                  <div className="group h-full rounded-3xl border border-sand-deep/70 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
                    <span className="flex size-13 items-center justify-center rounded-2xl bg-primary text-gold transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-gold-light group-hover:to-gold group-hover:text-primary-ink">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[1.2rem] font-semibold text-primary-dark">{v.title}</h3>
                    <p className="mt-2.5 text-[0.87rem] leading-relaxed text-charcoal/68">{v.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-[1.8rem] border border-gold/40 bg-gradient-to-r from-gold/12 via-cream to-gold/12 p-8 lg:flex-row lg:p-10">
              <div className="flex items-center gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-gold">
                  <Award className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-[1.4rem] font-semibold text-primary-dark">{a.visitPanel.title}</h3>
                  <p className="mt-1 text-[0.9rem] text-charcoal/65">
                    {site.address.street[locale]}, {site.address.city[locale]} — {a.visitPanel.hours}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-cream shadow-luxe transition-colors hover:bg-primary-dark"
                >
                  <MapPin className="size-4 text-gold-light" aria-hidden />
                  {t.common.directions}
                </a>
                <a
                  href={site.phones[0].href}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-6 py-3 text-sm font-bold text-primary transition-colors hover:border-gold"
                >
                  <Phone className="size-4" aria-hidden />
                  <span className="bidi-isolate" dir="ltr">{site.phones[0].display}</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-6 py-3 text-sm font-bold text-primary transition-colors hover:border-gold"
                >
                  {t.common.writeToUs}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
