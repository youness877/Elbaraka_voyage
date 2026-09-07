import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { FadeIn } from "@/components/motion";
import { PostCard } from "@/components/post-card";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { pick } from "@/i18n/pick";
import { posts } from "@/lib/data";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const locale = await getServerLocale();
  const title = pick(locale, post.metaTitle);
  const description = pick(locale, post.description);
  const imageAlt = pick(locale, post.imageAlt);
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1400, height: 900, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const bp = t.blogPost;
  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const title = pick(locale, post.title);
  const description = pick(locale, post.description);
  const category = pick(locale, post.category);
  const dateLabel = pick(locale, post.dateLabel);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({ slug: post.slug, title, description, image: post.image, date: post.date }, locale),
          breadcrumbSchema(
            [
              { name: t.blogList.hero.breadcrumb, path: "/blog" },
              { name: title, path: `/blog/${post.slug}` },
            ],
            locale
          ),
        ]}
      />

      {/* En-tête d'article */}
      <section className="relative isolate overflow-hidden" aria-label={title}>
        <div className="absolute inset-0" aria-hidden>
          <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-ink/85 via-primary-deep/80 to-primary-deep/94" />
          <div className="absolute inset-0 bg-filigree" />
        </div>
        <div className="container-x relative max-w-4xl pb-16 pt-40 lg:pb-24">
          <FadeIn delay={0}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-widest text-cream/60 transition-colors hover:text-gold-light"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
              {bp.backToAll}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold px-4 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-widest text-primary-ink">
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-cream/60">
                <CalendarDays className="size-3.5 text-gold" aria-hidden />
                <time dateTime={post.date}>{dateLabel}</time>
              </span>
              <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-cream/60">
                <Clock3 className="size-3.5 text-gold" aria-hidden />
                {post.minutes} {bp.minutesRead}
              </span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-cream sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-cream/72">{description}</p>
          </FadeIn>
        </div>
        <div className="relative h-1.5 bg-gradient-to-r from-gold-light via-gold to-gold-light" aria-hidden />
      </section>

      {/* Corps d'article */}
      <section className="bg-cream">
        <div className="container-x grid gap-14 py-16 lg:grid-cols-[1.5fr_0.5fr] lg:py-24">
          <FadeIn>
            <article className="prose-luxe max-w-none">
              {post.content.map((block, i) => (
                <div key={i}>
                  {block.heading && <h2>{pick(locale, block.heading)}</h2>}
                  {block.paragraphs?.map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: pick(locale, p) }} />
                  ))}
                  {block.list && (
                    <ul>
                      {block.list.map((li, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: pick(locale, li) }} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>

            {/* Signature */}
            <div className="mt-14 flex flex-wrap items-center gap-5 rounded-3xl border border-sand-deep/70 bg-white p-7 shadow-card">
              <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-gold">
                <User className="size-6" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[1.1rem] font-bold text-primary-dark">{bp.signatureName}</p>
                <p className="mt-0.5 text-[0.84rem] leading-relaxed text-charcoal/60">{bp.signatureText}</p>
              </div>
              <a
                href={site.phones[0].href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[0.8rem] font-bold text-cream transition-colors hover:bg-primary-dark"
              >
                <Phone className="size-4" aria-hidden />
                {bp.askQuestion}
              </a>
            </div>
          </FadeIn>

          {/* Colonne latérale */}
          <FadeIn delay={0.1}>
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl bg-primary-deep p-7 shadow-luxe">
                <div className="absolute inset-0 bg-filigree" aria-hidden />
                <div className="relative">
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-gold">{bp.sidebarEyebrow}</p>
                  <p className="mt-3 font-display text-[1.35rem] font-semibold leading-snug text-cream">{bp.sidebarTitle}</p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-cream/65">{bp.sidebarText}</p>
                  <Link
                    href="/voyages#devis"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-5 py-3 text-[0.78rem] font-extrabold uppercase tracking-widest text-primary-ink shadow-gold transition-transform hover:scale-[1.03]"
                  >
                    {t.common.freeQuote}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-sand-deep/70 bg-white p-7 shadow-card">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-[#8a6d0b]">{bp.agencyEyebrow}</p>
                <address className="mt-3 text-[0.88rem] not-italic leading-relaxed text-charcoal/70">
                  <strong className="text-primary-dark">El Baraka Voyages — Archi Cars</strong>
                  <br />
                  {site.address.street[locale]}, {site.address.city[locale]} {site.address.postal}
                  <br />
                  {site.address.prefecture[locale]}
                </address>
                <div className="mt-4 space-y-1.5">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="flex items-center gap-2 text-[0.88rem] font-semibold text-primary transition-colors hover:text-[#8a6d0b]">
                      <Phone className="size-3.5 text-gold" aria-hidden />
                      <span className="bidi-isolate" dir="ltr">{p.display}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </section>

      {/* À lire ensuite */}
      <section className="bg-sand/50" aria-label={bp.relatedAriaLabel}>
        <div className="container-x py-16 lg:py-20">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-primary-dark">
              {bp.relatedTitle} <em className="text-gold-gradient italic">{bp.relatedHighlight}</em>
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {related.map((p, i) => (
              <FadeIn key={p.slug} delay={0.07 * i}>
                <PostCard post={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
