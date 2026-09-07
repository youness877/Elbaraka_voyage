import { Fraunces, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FloatingActions } from "@/components/whatsapp-float";
import { getDictionary } from "@/i18n/dictionaries";
import { getServerLocale } from "@/i18n/get-locale";
import { localeMeta } from "@/i18n/config";
import { LanguageProvider } from "@/i18n/language-provider";
import { siteImages } from "@/lib/image-urls";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// `font-arabic` is applied to the whole <body> for the Arabic locale
// (see i18n/config.ts), so it needs to cover both regular text and
// bold headings/emphasis across the site, not just weight 400.
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const meta = localeMeta[locale];
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: "El Baraka Voyages × Archi Cars — Biougra, Agadir",
      template: "%s | El Baraka Voyages",
    },
    description: site.description[locale],
    applicationName: site.name,
    keywords: [
      "agence de voyage Agadir",
      "agence de voyage Biougra",
      "Omra Agadir",
      "Omra départ Agadir prix",
      "Hajj Maroc inscription",
      "billet avion Agadir Saudia",
      "Qatar Airways Agadir",
      "location voiture Biougra",
      "location voiture Agadir",
      "location voiture aéroport Agadir Al Massira",
      "Archi Cars",
      "El Baraka Voyages",
      "عمرة أكادير",
      "كراء سيارات بيوكرى",
    ],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "travel",
    alternates: {
      canonical: "/",
      languages: { fr: "/", ar: "/" },
    },
    formatDetection: { telephone: true, email: true, address: true },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: site.url,
      siteName: site.name,
      title: "El Baraka Voyages × Archi Cars — Biougra, Agadir",
      description: site.description[locale],
      images: [
        {
          url: siteImages.storefront,
          width: 1200,
          height: 630,
          alt: "El Baraka Voyages — Archi Cars : agence de voyages & location de voitures à Biougra, Agadir",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "El Baraka Voyages × Archi Cars — Biougra, Agadir",
      description: site.description[locale],
      images: [siteImages.storefront],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Le fichier google59d6bc87fcc2f75e.html (public/) vérifie déjà la
    // propriété du domaine dans Search Console. On n'ajoute la balise
    // <meta name="google-site-verification"> QUE si une clé réelle est
    // fournie, pour ne jamais publier de balise vide sans valeur.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
    // Favicon personnalisé (Réglages généraux → admin) s'il a été défini,
    // sinon on garde l'icône par défaut du projet (src/app/icon.svg).
    ...(settings.faviconUrl ? { icons: { icon: settings.faviconUrl } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7a1224" },
    { media: "(prefers-color-scheme: dark)", color: "#3e0811" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const meta = localeMeta[locale];

  // Le tableau de bord `/admin` a son propre chrome (voir
  // src/app/admin/(dashboard)/layout.tsx) : pas de navbar/footer publics
  // bilingues, pas de bouton WhatsApp flottant. On le détecte via l'en-tête
  // `x-pathname` posé par le middleware (voir src/middleware.ts), App
  // Router n'exposant pas le pathname courant dans un Server Component.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <html lang="fr" dir="ltr" className={`${fraunces.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}>
        <body className="bg-neutral-50 antialiased">{children}</body>
      </html>
    );
  }

  const siteSettings = await getSiteSettings();

  return (
    <html
      lang={locale}
      dir={meta.dir}
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}
    >
      <body className={`bg-cream ${meta.fontClass} antialiased`}>
        <LanguageProvider initialLocale={locale}>
          {/* Lien d'évitement (accessibilité) */}
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-primary-ink"
          >
            {t.common.skipToContent}
          </a>
          <Navbar settings={siteSettings} />
          <main id="contenu">{children}</main>
          <Footer settings={siteSettings} />
          <FloatingActions settings={siteSettings} />
        </LanguageProvider>
      </body>
    </html>
  );
}
