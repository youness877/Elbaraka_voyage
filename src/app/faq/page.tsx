import type { Metadata } from "next";
import { CarFront, MessageCircleQuestion, MoonStar, Phone, Ticket } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { interpolate } from "@/i18n/interpolate";
import { pick } from "@/i18n/pick";
import { faqs } from "@/lib/data";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { images, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.faqPage.metaTitle,
    description: t.faqPage.metaDescription,
    keywords: [
      "faq omra agadir",
      "documents omra maroc",
      "conditions location voiture agadir",
      "caution location voiture maroc",
      "age minimum location voiture agadir",
    ],
    alternates: { canonical: "/faq" },
    openGraph: {
      title: t.faqPage.ogTitle,
      description: t.faqPage.ogDescription,
      url: `${site.url}/faq`,
      images: [{ url: images.masjidHaram, width: 1400, height: 900, alt: "Mosquée al-Haram — FAQ El Baraka Voyages" }],
    },
  };
}

export default async function FaqPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const f = t.faqPage;

  const groups = [
    { key: "omraHajj", icon: MoonStar, categories: ["omra", "hajj"] as const },
    { key: "ticketing", icon: Ticket, categories: ["billets"] as const },
    { key: "rental", icon: CarFront, categories: ["location"] as const },
  ] as const;

  const localizedFaqs = faqs.map((item) => ({
    ...item,
    question: pick(locale, item.question),
    answer: pick(locale, item.answer),
  }));

  return (
    <>
      <JsonLd
        data={[faqSchema(localizedFaqs), breadcrumbSchema([{ name: f.hero.breadcrumb, path: "/faq" }], locale)]}
      />

      <PageHero
        title={f.hero.title}
        highlight={f.hero.highlight}
        description={f.hero.description}
        image={images.masjidHaram}
        imageAlt={f.hero.imageAlt}
        breadcrumb={[{ name: f.hero.breadcrumb, path: "/faq" }]}
      />

      <section className="bg-cream" aria-label={f.ariaAll}>
        <div className="container-x grid gap-14 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-24">
          {/* Sommaire latéral */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <FadeIn>
              <SectionHeading
                align="left"
                eyebrow={f.sidebar.eyebrow}
                title={
                  <>
                    {f.sidebar.titlePrefix} <em className="text-gold-gradient italic">{f.sidebar.titleHighlight}</em>
                  </>
                }
                description={f.sidebar.description}
              />
              <nav className="mt-8 space-y-3" aria-label={f.categoriesAria}>
                {groups.map((g) => {
                  const label = f.groups[g.key];
                  return (
                    <a
                      key={g.key}
                      href={`#faq-${g.categories[0]}`}
                      className="group flex items-center gap-4 rounded-2xl border border-sand-deep/70 bg-white p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-luxe"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-gold transition-colors group-hover:bg-gradient-to-br group-hover:from-gold-light group-hover:to-gold group-hover:text-primary-ink">
                        <g.icon className="size-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-display text-[1.05rem] font-semibold text-primary-dark">{label.title}</span>
                        <span className="block text-[0.76rem] text-charcoal/55">{label.note}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>
              <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5">
                <p className="flex items-center gap-2 font-display text-[1.02rem] font-semibold text-primary-dark">
                  <MessageCircleQuestion className="size-5 text-[#8a6d0b]" aria-hidden />
                  {f.sidebar.otherQuestion}
                </p>
                <p className="mt-1.5 text-[0.84rem] text-charcoal/65">{f.sidebar.directLine}</p>
                <a href={site.phones[0].href} className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-primary-dark">
                  <Phone className="size-4" aria-hidden />
                  <span className="bidi-isolate" dir="ltr">{site.phones[0].display}</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Questions par groupe */}
          <div className="space-y-14">
            {groups.map((g, gi) => {
              const label = f.groups[g.key];
              const items = localizedFaqs.filter((item) => (g.categories as readonly string[]).includes(item.category));
              const countText = interpolate(
                items.length > 1 ? t.faqSection.questionsCountPlural : t.faqSection.questionsCount,
                { count: items.length }
              );
              return (
                <FadeIn key={g.key} delay={0.05 * gi}>
                  <div id={`faq-${g.categories[0]}`} className="scroll-mt-28">
                    <div className="mb-6 flex items-center gap-3.5">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-gold">
                        <g.icon className="size-5.5" aria-hidden />
                      </span>
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-primary-dark">{label.title}</h2>
                        <p className="text-[0.8rem] text-charcoal/55">{countText}</p>
                      </div>
                    </div>
                    <FaqAccordion items={items} defaultOpen={gi === 0 ? 0 : null} />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title={f.ctaTitle}
        subtitle={f.ctaSubtitle}
        primaryHref={site.whatsapp}
        primaryLabel={f.ctaButton}
      />
    </>
  );
}
