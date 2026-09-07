import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/pick";
import { siteImages } from "./image-urls";
import { site } from "./site";

/* Helpers de données structurées schema.org (JSON-LD) — SEO & Local SEO */

/**
 * schema.org (et les Rich Results de Google) exigent des URLs ABSOLUES pour
 * les champs `image`/`logo` — contrairement aux métadonnées Open Graph/Twitter,
 * ce JSON-LD n'est pas résolu automatiquement par `metadataBase`. Un chemin
 * relatif ("/images/...") y est invalide et fait échouer la validation des
 * données structurées dans Search Console.
 */
function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${site.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

function businessBase(locale: Locale) {
  return {
    name: "El Baraka Voyages — Archi Cars",
    alternateName: ["El Baraka Voyages", "Archi Cars", "البركة للأسفار"],
    url: site.url,
    email: site.email,
    telephone: "+212661403298",
    image: [absoluteUrl(siteImages.storefront)],
    logo: `${site.url}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: pick(locale, site.address.street),
      addressLocality: pick(locale, site.address.city),
      addressRegion: "Souss-Massa",
      postalCode: site.address.postal,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.social.facebook, site.social.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "19:00",
      },
    ],
    priceRange: "250 DH – 25 000 DH",
    areaServed: ["Biougra", "Aït Melloul", "Inezgane", "Agadir", "Chtouka-Aït Baha", "Souss-Massa"],
  };
}

export function localBusinessSchema(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "AutoRental", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    ...businessBase(locale),
    description: site.description[locale],
    knowsAbout: [
      "Omra",
      "Hajj",
      "Billetterie aérienne",
      "Saudia",
      "Qatar Airways",
      "Location de voitures Agadir",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Voyages & Location de voitures",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Voyages organisés",
          itemListElement: ["Omra", "Hajj", "Billetterie aérienne", "Circuits au Maroc"].map(
            (n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })
          ),
        },
        {
          "@type": "OfferCatalog",
          name: "Location de voitures",
          itemListElement: ["Citadine", "Compacte", "SUV & 4x4", "Premium"].map((n) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: `Location ${n}` },
          })),
        },
      ],
    },
  };
}

export function travelAgencySchema(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${site.url}/voyages#agency`,
    ...businessBase(locale),
    name: "El Baraka Voyages",
    description: site.description[locale],
  };
}

export function carRentalSchema(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${site.url}/location-voitures#rental`,
    ...businessBase(locale),
    name: "Archi Cars",
    description: site.description[locale],
  };
}

export function websiteSchema(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description[locale],
    inLanguage: locale === "ar" ? "ar-MA" : "fr-MA",
    publisher: { "@id": `${site.url}/#business` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale = "fr") {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.seo.breadcrumbHome, item: site.url },
      ...items.map((it, i) => ({
        "@type": "ListItem" as const,
        position: i + 2,
        name: it.name,
        item: `${site.url}${it.path}`,
      })),
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/<[^>]*>/g, "") },
    })),
  };
}

export function articleSchema(
  post: {
    slug: string;
    title: string;
    description: string;
    image: string;
    date: string;
  },
  locale: Locale = "fr"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.image)],
    datePublished: post.date,
    inLanguage: locale === "ar" ? "ar-MA" : "fr-MA",
    author: {
      "@type": "Organization",
      name: "El Baraka Voyages",
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
  };
}
