"use client";

import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/language-provider";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { FadeIn } from "./motion";

export function CtaBand({
  title,
  subtitle,
  primaryHref = "/contact",
  primaryLabel,
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary-deep">
      <div className="absolute inset-0 bg-filigree" aria-hidden />
      <div className="absolute inset-0 bg-grain" aria-hidden />
      <div className="absolute -start-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-gold/15 blur-[110px]" aria-hidden />
      <div className="absolute -end-20 -top-24 size-80 rounded-full bg-gold/10 blur-[120px]" aria-hidden />

      <div className="container-x relative py-20 text-center lg:py-24">
        <FadeIn>
          <p className="font-arabic text-2xl text-gold/85" lang="ar" dir="rtl">رحلة سعيدة</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
            {title ?? t.ctaBand.defaultTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">{subtitle ?? t.ctaBand.defaultSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform duration-300 hover:scale-[1.04]"
            >
              {primaryLabel ?? t.ctaBand.defaultCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
            </Link>
            <a
              href={site.phones[0].href}
              className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold-light"
            >
              <Phone className="size-4" aria-hidden />
              <span className="bidi-isolate" dir="ltr">{site.phones[0].display}</span>
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:border-[#25d366] hover:text-white"
            >
              <WhatsAppIcon className="size-4.5 text-[#25d366]" />
              {t.nav.whatsapp}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
