"use client";

import { ArrowUpRight, Clock, Mail, MapPin, Phone, Plane } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/language-provider";
import { navLinks, site } from "@/lib/site";
import type { ResolvedSiteSettings } from "@/lib/settings";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";

const serviceLinks = [
  { href: "/voyages#omra", key: "omra" as const },
  { href: "/voyages#hajj", key: "hajj" as const },
  { href: "/voyages#billetterie", key: "ticketing" as const },
  { href: "/voyages#circuits", key: "circuits" as const },
  { href: "/location-voitures#flotte", key: "fleet" as const },
  { href: "/location-voitures#conditions", key: "terms" as const },
  { href: "/location-voitures#reservation", key: "bookCar" as const },
];

export function Footer({ settings }: { settings: ResolvedSiteSettings }) {
  const year = new Date().getFullYear();
  const { t, locale } = useTranslation();
  const phones = settings.phones.length > 0 ? settings.phones : null;

  return (
    <footer className="relative overflow-hidden bg-primary-deep text-cream">
      <div className="absolute inset-0 bg-filigree" aria-hidden />
      <div className="absolute inset-0 bg-grain" aria-hidden />
      <div className="absolute -top-40 end-0 size-[480px] rounded-full bg-gold/10 blur-[140px]" aria-hidden />

      <div className="container-x relative">
        {/* bandeau haut */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr] lg:gap-10">
          {/* Marque */}
          <div>
            <Link href="/" aria-label={t.nav.homeAria} className="group inline-block">
              <Logo inverted logoUrl={settings.logoUrl} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              {t.footer.tagline}
            </p>
            <p className="mt-4 font-arabic text-xl text-gold/90" lang="ar" dir="rtl">
              {site.brandArabic}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: settings.whatsappUrl, icon: WhatsAppIcon, label: t.nav.whatsapp },
                { href: settings.facebookUrl, icon: FacebookIcon, label: "Facebook" },
                { href: settings.instagramUrl, icon: InstagramIcon, label: "Instagram" },
                { href: (phones ?? site.phones.map((p) => ({ intl: p.href })))[0].intl, icon: Phone, label: t.common.call },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-primary-ink"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label={t.footer.siteNavLabel}>
            <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
              {t.footer.navigationTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-cream/75 transition-colors hover:text-gold-light"
                  >
                    <Plane
                      className="size-3 shrink-0 text-gold/50 transition-transform rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t.footer.servicesNavLabel}>
            <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-cream/75 transition-colors hover:text-gold-light"
                  >
                    <ArrowUpRight
                      className="size-3 shrink-0 text-gold/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                    {t.footer.services[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact / NAP */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
              {t.footer.agencyTitle}
            </h3>
            <address className="mt-5 space-y-4 text-sm not-italic text-cream/75">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  <strong className="font-semibold text-cream">El Baraka Voyages — Archi Cars</strong>
                  <br />
                  {locale === "ar" ? settings.addressStreetAr : settings.addressStreetFr},{" "}
                  {locale === "ar" ? settings.addressCityAr : settings.addressCityFr} {settings.addressPostal}
                  <br />
                  {locale === "ar" ? settings.addressRegionAr : settings.addressRegionFr}
                </span>
              </p>
              {(phones ?? site.phones.map((p) => ({ intl: p.href, display: p.display, labelFr: p.label.fr, labelAr: p.label.ar }))).map((p) => (
                <p key={p.intl} className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                  <a href={p.intl} className="transition-colors hover:text-gold-light">
                    <span className="bidi-isolate font-semibold text-cream" dir="ltr">
                      {p.display}
                    </span>
                    <span className="ms-2 text-xs text-cream/55">{locale === "ar" ? p.labelAr : p.labelFr}</span>
                  </a>
                </p>
              ))}
              <p className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${settings.email}`} className="bidi-isolate transition-colors hover:text-gold-light" dir="ltr">
                  {settings.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {t.footer.hoursLabel}
                  <br />
                  <span className="text-cream/55">{t.footer.closedSunday}</span>
                </span>
              </p>
            </address>
            <a
              href={settings.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/45 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-primary-ink"
            >
              <MapPin className="size-4" aria-hidden />
              {t.common.getDirections}
            </a>
          </div>
        </div>

        <div className="gold-rule" aria-hidden />

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-[0.78rem] text-cream/55 md:flex-row">
          <p>
            © {year} {settings.siteName} — {t.footer.rightsReserved}
            {settings.footerCopyrightNote ? ` — ${settings.footerCopyrightNote}` : ""}
          </p>
          <p className="text-center">{t.footer.bottomTagline}</p>
          <p dir="ltr" className="bidi-isolate tracking-wide">
            {(phones ?? site.phones)[0].display} · {settings.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
