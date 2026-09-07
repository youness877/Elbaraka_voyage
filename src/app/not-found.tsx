"use client";

import { Compass, Home, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/language-provider";
import { site } from "@/lib/site";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="relative flex min-h-[86vh] items-center overflow-hidden bg-primary-deep">
      <div className="absolute inset-0 bg-filigree" aria-hidden />
      <div className="absolute inset-0 bg-grain" aria-hidden />
      <div className="container-x relative py-24 text-center">
        <p className="font-arabic text-2xl text-gold/80" lang="ar" dir="rtl">ضالة الطريق</p>
        <p className="mt-4 font-display text-[7rem] font-bold leading-none text-gold-gradient sm:text-[11rem]">
          404
        </p>
        <h1 className="mx-auto mt-2 max-w-xl font-display text-3xl font-semibold text-cream sm:text-4xl">
          {t.notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream/65">
          {t.notFound.description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform hover:scale-[1.04]"
          >
            <Home className="size-4" aria-hidden />
            {t.notFound.backHome}
          </Link>
          <Link
            href="/voyages"
            className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold-light"
          >
            <Compass className="size-4" aria-hidden />
            {t.notFound.ourTrips}
          </Link>
          <a
            href={site.phones[0].href}
            className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold-light"
          >
            <Phone className="size-4" aria-hidden />
            <span className="bidi-isolate" dir="ltr">{site.phones[0].display}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
