"use client";

import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/language-provider";
import { pick } from "@/i18n/pick";
import type { BlogPost } from "@/lib/data";

export function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const { t, locale } = useTranslation();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-deep/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <Image
          src={post.image}
          alt={pick(locale, post.imageAlt)}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/45 via-transparent to-transparent" />
        <span className="absolute start-4 top-4 rounded-full bg-primary px-3.5 py-1.5 text-[0.64rem] font-extrabold uppercase tracking-widest text-gold-light">
          {pick(locale, post.category)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-[0.72rem] font-semibold text-charcoal/50">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-gold" aria-hidden />
            <time dateTime={post.date}>{pick(locale, post.dateLabel)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5 text-gold" aria-hidden />
            {post.minutes} {t.blogCard.minutesRead}
          </span>
        </div>
        <h3 className="mt-3 font-display text-[1.28rem] font-semibold leading-snug text-primary-dark">
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-primary">
            {pick(locale, post.title)}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[0.88rem] leading-relaxed text-charcoal/65">{pick(locale, post.description)}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.78rem] font-extrabold uppercase tracking-widest text-primary transition-colors hover:text-[#8a6d0b]"
        >
          {t.common.readMore}
          <ArrowUpRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
