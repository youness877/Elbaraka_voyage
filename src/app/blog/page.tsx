import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { posts } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/seo";
import { images, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.blogList.metaTitle,
    description: t.blogList.metaDescription,
    keywords: ["guide omra agadir", "blog voyage maroc", "conseils location voiture agadir", "hajj maroc tirage au sort"],
    alternates: { canonical: "/blog" },
    openGraph: {
      title: t.blogList.ogTitle,
      description: t.blogList.ogDescription,
      url: `${site.url}/blog`,
      images: [{ url: images.kaabaPilgrims, width: 1400, height: 900, alt: "Guides voyage El Baraka Voyages" }],
    },
  };
}

export default async function BlogPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const b = t.blogList;

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: b.hero.breadcrumb, path: "/blog" }], locale)]} />

      <PageHero
        title={b.hero.title}
        highlight={b.hero.highlight}
        description={b.hero.description}
        image={images.planeSunset}
        imageAlt={b.hero.imageAlt}
        breadcrumb={[{ name: b.hero.breadcrumb, path: "/blog" }]}
      />

      <section className="bg-cream" aria-label={b.ariaLabel}>
        <div className="container-x py-20 lg:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={b.eyebrow}
              title={
                <>
                  {b.titlePrefix} <em className="text-gold-gradient italic">{b.titleHighlight}</em>
                </>
              }
              description={b.description}
            />
          </FadeIn>
          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={0.08 * i}>
                <PostCard post={post} priority={i === 0} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={b.ctaTitle} subtitle={b.ctaSubtitle} />
    </>
  );
}
