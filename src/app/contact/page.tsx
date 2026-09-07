import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo";
import { images, site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    keywords: ["contact agence voyage agadir", "téléphone location voiture biougra", "el baraka voyages contact", "archi cars contact"],
    alternates: { canonical: "/contact" },
    openGraph: {
      title: t.contact.ogTitle,
      description: t.contact.ogDescription,
      url: `${site.url}/contact`,
      images: [{ url: images.storefront, width: 1536, height: 1024, alt: "Agence El Baraka Voyages à Biougra" }],
    },
  };
}

export default async function ContactPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const c = t.contact;
  const settings = await getSiteSettings();
  const phones = settings.phones.length > 0 ? settings.phones : site.phones.map((p) => ({ intl: p.href, display: p.display, labelFr: p.label.fr, labelAr: p.label.ar }));
  const secondaryPhones = phones.slice(1);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(locale),
          breadcrumbSchema([{ name: c.hero.breadcrumb, path: "/contact" }], locale),
        ]}
      />

      <PageHero
        title={c.hero.title}
        highlight={c.hero.highlight}
        description={c.hero.description}
        image={images.planeSunset}
        imageAlt={c.hero.imageAlt}
        breadcrumb={[{ name: c.hero.breadcrumb, path: "/contact" }]}
      />

      {/* Cartes de contact rapide */}
      <section className="bg-cream" aria-label={c.quickCards.ariaLabel}>
        <div className="container-x py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FadeIn>
              <a href={phones[0].intl} className="group block h-full rounded-3xl border border-sand-deep/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-gold transition-colors group-hover:bg-gradient-to-br group-hover:from-gold-light group-hover:to-gold group-hover:text-primary-ink">
                  <Phone className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[#8a6d0b]">{c.quickCards.callUs}</p>
                <p className="bidi-isolate mt-1.5 font-display text-[1.3rem] font-semibold text-primary-dark" dir="ltr">{phones[0].display}</p>
                {secondaryPhones.length > 0 && (
                  <p className="mt-1 text-[0.8rem] text-charcoal/55">
                    {secondaryPhones.map((p, i) => (
                      <span key={p.intl}>
                        {i > 0 && " · "}
                        <span className="bidi-isolate" dir="ltr">{p.display}</span>
                      </span>
                    ))}
                  </p>
                )}
              </a>
            </FadeIn>
            <FadeIn delay={0.07}>
              <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-3xl border border-sand-deep/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#25d366] text-white">
                  <WhatsAppIcon className="size-6" />
                </span>
                <p className="mt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[#8a6d0b]">{c.quickCards.whatsapp}</p>
                <p className="mt-1.5 font-display text-[1.3rem] font-semibold text-primary-dark">{c.quickCards.whatsappTitle}</p>
                <p className="mt-1 text-[0.8rem] text-charcoal/55">{c.quickCards.whatsappText}</p>
              </a>
            </FadeIn>
            <FadeIn delay={0.14}>
              <a href={`mailto:${settings.email}`} className="group block h-full rounded-3xl border border-sand-deep/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-gold transition-colors group-hover:bg-gradient-to-br group-hover:from-gold-light group-hover:to-gold group-hover:text-primary-ink">
                  <Mail className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[#8a6d0b]">{c.quickCards.email}</p>
                <p className="bidi-isolate mt-1.5 break-all font-display text-[1.16rem] font-semibold text-primary-dark" dir="ltr">{settings.email}</p>
                <p className="mt-1 text-[0.8rem] text-charcoal/55">{c.quickCards.emailText}</p>
              </a>
            </FadeIn>
            <FadeIn delay={0.21}>
              <a href={settings.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-3xl border border-sand-deep/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-gold transition-colors group-hover:bg-gradient-to-br group-hover:from-gold-light group-hover:to-gold group-hover:text-primary-ink">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[#8a6d0b]">{c.quickCards.agency}</p>
                <p className="mt-1.5 font-display text-[1.1rem] font-semibold leading-snug text-primary-dark">
                  {locale === "ar" ? settings.addressStreetAr : settings.addressStreetFr}, {locale === "ar" ? settings.addressCityAr : settings.addressCityFr}
                </p>
                <p className="mt-1 text-[0.8rem] text-charcoal/55">{locale === "ar" ? settings.addressRegionAr : settings.addressRegionFr}</p>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Formulaire + horaires */}
      <section className="bg-cream pb-4" aria-label={c.form.ariaLabel}>
        <div className="container-x grid gap-10 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
          <FadeIn>
            <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-primary-deep p-8 shadow-luxe lg:p-10">
              <div className="absolute inset-0 bg-filigree" aria-hidden />
              <div className="relative">
                <SectionHeading
                  dark
                  align="left"
                  eyebrow={c.form.eyebrow}
                  title={
                    <>
                      {c.form.titlePrefix} <em className="text-gold-gradient italic">{c.form.titleHighlight}</em>
                    </>
                  }
                />
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-[1.8rem] border border-sand-deep/70 bg-white p-8 shadow-card">
                <p className="flex items-center gap-2.5 font-display text-xl font-semibold text-primary-dark">
                  <Clock className="size-5 text-gold" aria-hidden />
                  {c.hours.title}
                </p>
                <ul className="mt-5 space-y-1">
                  {settings.hours.map((h) => (
                    <li key={locale === "ar" ? h.dayAr : h.dayFr} className="flex items-center justify-between border-b border-sand py-3.5 text-[0.93rem] last:border-0">
                      <span className="font-semibold text-charcoal/75">{locale === "ar" ? h.dayAr : h.dayFr}</span>
                      <span className="bidi-isolate rounded-full bg-sand px-3.5 py-1 text-[0.8rem] font-bold text-primary" dir="ltr">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8rem] leading-relaxed text-charcoal/55">{c.hours.rentalNote}</p>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-[1.8rem] bg-primary-deep p-8 shadow-luxe">
                <div className="absolute inset-0 bg-filigree" aria-hidden />
                <div className="relative flex h-full flex-col justify-center">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-gold">{c.quickCallPanel.eyebrow}</p>
                  <p className="mt-3 font-display text-2xl font-semibold text-cream">{c.quickCallPanel.title}</p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/65">{c.quickCallPanel.text}</p>
                  <a
                    href={phones[0].intl}
                    className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform hover:scale-[1.04]"
                  >
                    <Phone className="size-4" aria-hidden />
                    <span className="bidi-isolate" dir="ltr">{phones[0].display}</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Carte Google Maps */}
      <section className="bg-sand/50" aria-label={c.map.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={c.map.eyebrow}
              title={
                <>
                  {c.map.titlePrefix} <em className="text-gold-gradient italic">{c.map.titleHighlight}</em>
                </>
              }
              description={c.map.description}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative mt-12 overflow-hidden rounded-[1.8rem] border border-sand-deep/80 shadow-luxe">
              <iframe
                src={site.maps.embed}
                title={c.map.iframeTitle}
                className="h-[440px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center p-5 sm:justify-start sm:p-6">
                <div className="pointer-events-auto flex flex-wrap items-center gap-4 rounded-2xl bg-white/95 px-6 py-4 shadow-luxe backdrop-blur">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-gold">
                    <Navigation className="size-5 rtl:-scale-x-100" aria-hidden />
                  </span>
                  <div className="mx-2">
                    <p className="font-display text-[1.02rem] font-bold text-primary-dark">El Baraka Voyages — Archi Cars</p>
                    <p className="text-[0.78rem] text-charcoal/60">
                      {locale === "ar" ? settings.addressStreetAr : settings.addressStreetFr}, {locale === "ar" ? settings.addressCityAr : settings.addressCityFr} {settings.addressPostal}
                    </p>
                  </div>
                  <a
                    href={settings.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-primary-ink shadow-gold transition-transform hover:scale-[1.03]"
                  >
                    <MapPin className="size-4" aria-hidden />
                    {t.common.directions}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
