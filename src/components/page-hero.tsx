"use client";

import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/language-provider";
import { FadeInHero } from "./fade-in-hero";

export function PageHero({
  title,
  highlight,
  description,
  image,
  imageAlt,
  breadcrumb,
}: {
  title: string;
  highlight?: string;
  description?: string;
  image: string;
  imageAlt: string;
  breadcrumb: { name: string; path: string }[];
}) {
  const { t } = useTranslation();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-ink/82 via-primary-deep/78 to-primary-deep/92" />
        <div className="absolute inset-0 bg-filigree" />
      </div>

      <div className="container-x relative flex min-h-[54vh] flex-col justify-end pb-14 pt-36 lg:min-h-[58vh] lg:pb-20">
        <FadeInHero>
          <nav aria-label={t.pageHero.breadcrumbLabel} className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.78rem] font-semibold text-cream/65">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-gold-light">
                  <Home className="size-3.5" aria-hidden />
                  {t.common.home}
                </Link>
              </li>
              {breadcrumb.map((b, i) => (
                <li key={b.path} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 text-gold/60 rtl:rotate-180" aria-hidden />
                  <span className={i === breadcrumb.length - 1 ? "text-gold" : ""} aria-current={i === breadcrumb.length - 1 ? "page" : undefined}>
                    {b.name}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            {title}{" "}
            {highlight && <em className="text-gold-gradient not-italic italic">{highlight}</em>}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-cream/75">
              {description}
            </p>
          )}
        </FadeInHero>
      </div>
      <div className="relative h-1.5 bg-gradient-to-r from-gold-light via-gold to-gold-light" aria-hidden />
    </section>
  );
}
