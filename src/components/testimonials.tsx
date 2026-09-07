"use client";

import { Quote, Star } from "lucide-react";
import type { ReactNode } from "react";
import { interpolate } from "@/i18n/interpolate";
import { useTranslation } from "@/i18n/language-provider";
import { pick } from "@/i18n/pick";
import { testimonials } from "@/lib/data";
import { FadeIn } from "./motion";
import { SectionHeading } from "./section-heading";

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-display text-base font-bold text-gold ring-2 ring-gold/50">
      {letters}
    </span>
  );
}

export function Testimonials({
  title,
  eyebrows,
  limit,
  dark = false,
}: {
  title?: ReactNode;
  eyebrows?: string;
  limit?: number;
  dark?: boolean;
}) {
  const { t, locale } = useTranslation();
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className={dark ? "" : "bg-cream"}>
      <div className="container-x py-20 lg:py-28">
        <FadeIn>
          <SectionHeading
            eyebrow={eyebrows ?? t.testimonials.eyebrow}
            title={
              title ?? (
                <>
                  {t.testimonials.titleDefault.split("{clients}")[0]}
                  <em className="text-gold-gradient italic">{t.testimonials.titleHighlight}</em>
                </>
              )
            }
            description={t.testimonials.description}
            dark={dark}
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => {
            const name = pick(locale, item.name);
            return (
              <FadeIn key={name} delay={0.08 * i}>
                <figure
                  className={
                    dark
                      ? "relative h-full rounded-3xl border border-cream/12 bg-white/5 p-7 backdrop-blur-sm"
                      : "relative h-full rounded-3xl border border-sand-deep/70 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                  }
                >
                  <Quote className={dark ? "size-7 text-gold/70" : "size-7 text-gold"} aria-hidden />
                  <div
                    className="mt-3 flex gap-1"
                    role="img"
                    aria-label={interpolate(t.testimonials.starsAria, { rating: item.rating })}
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={
                          s < item.rating
                            ? "size-3.5 fill-gold-light text-gold-light"
                            : dark
                              ? "size-3.5 text-cream/20"
                              : "size-3.5 text-sand-deep"
                        }
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className={dark ? "mt-4 font-display text-[1.02rem] leading-relaxed text-cream/90" : "mt-4 font-display text-[1.02rem] leading-relaxed text-charcoal/85"}>
                    « {pick(locale, item.quote)} »
                  </blockquote>
                  <figcaption className={dark ? "mt-6 flex items-center gap-3 border-t border-cream/10 pt-5" : "mt-6 flex items-center gap-3 border-t border-sand pt-5"}>
                    <Initials name={name} />
                    <div>
                      <p className={dark ? "text-sm font-bold text-cream" : "text-sm font-bold text-primary-dark"}>{name}</p>
                      <p className={dark ? "text-[0.76rem] text-cream/60" : "text-[0.76rem] text-charcoal/55"}>
                        {pick(locale, item.origin)} · {pick(locale, item.context)}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <p className={dark ? "mt-10 text-center text-[0.82rem] text-cream/55" : "mt-10 text-center text-[0.82rem] text-charcoal/55"}>
            {interpolate(t.testimonials.averageNote, { rating: "4.9 / 5" })}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
