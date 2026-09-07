import "server-only";

import { unstable_cache } from "next/cache";
import { db, isDatabaseConfigured } from "@/db";
import { siteSettings } from "@/db/schema";
import { site } from "./site";

export const SETTINGS_CACHE_TAG = "site-settings";

export interface PhoneEntry {
  labelFr: string;
  labelAr: string;
  display: string;
  intl: string; // ex. "tel:+212661403298"
}

export interface HourEntry {
  dayFr: string;
  dayAr: string;
  time: string;
}

export interface ResolvedSiteSettings {
  siteName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  footerCopyrightNote: string | null;

  email: string;
  phones: PhoneEntry[];
  whatsappUrl: string;

  addressStreetFr: string;
  addressStreetAr: string;
  addressCityFr: string;
  addressCityAr: string;
  addressPostal: string;
  addressRegionFr: string;
  addressRegionAr: string;

  hours: HourEntry[];

  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string | null;
  mapsDirectionsUrl: string;
}

/** Valeurs par défaut — reprises telles quelles du contenu existant du site. */
function defaultSettings(): ResolvedSiteSettings {
  return {
    siteName: site.name,
    logoUrl: null,
    faviconUrl: null,
    footerCopyrightNote: null,
    email: site.email,
    phones: site.phones.map((p) => ({
      labelFr: p.label.fr,
      labelAr: p.label.ar,
      display: p.display,
      intl: p.href,
    })),
    whatsappUrl: site.whatsapp,
    addressStreetFr: site.address.street.fr,
    addressStreetAr: site.address.street.ar,
    addressCityFr: site.address.city.fr,
    addressCityAr: site.address.city.ar,
    addressPostal: site.address.postal,
    addressRegionFr: `${site.address.region.fr} — ${site.address.prefecture.fr}`,
    addressRegionAr: `${site.address.region.ar} — ${site.address.prefecture.ar}`,
    hours: site.hours.map((h) => ({ dayFr: h.days.fr, dayAr: h.days.ar, time: h.time })),
    facebookUrl: site.social.facebook,
    instagramUrl: site.social.instagram,
    tiktokUrl: null,
    mapsDirectionsUrl: site.maps.directions,
  };
}

async function fetchFromDb(): Promise<ResolvedSiteSettings | null> {
  if (!db || !isDatabaseConfigured) return null;
  try {
    const rows = await db.select().from(siteSettings).limit(1);
    const row = rows[0];
    if (!row) return null;

    const fallback = defaultSettings();
    return {
      siteName: row.siteName || fallback.siteName,
      logoUrl: row.logoUrl || null,
      faviconUrl: row.faviconUrl || null,
      footerCopyrightNote: row.footerCopyrightNote || null,
      email: row.email || fallback.email,
      phones: row.phones && row.phones.length > 0 ? row.phones : fallback.phones,
      whatsappUrl: row.whatsappNumber
        ? `https://wa.me/${row.whatsappNumber}?text=${encodeURIComponent(row.whatsappMessageFr || "")}`
        : fallback.whatsappUrl,
      addressStreetFr: row.addressStreetFr || fallback.addressStreetFr,
      addressStreetAr: row.addressStreetAr || fallback.addressStreetAr,
      addressCityFr: row.addressCityFr || fallback.addressCityFr,
      addressCityAr: row.addressCityAr || fallback.addressCityAr,
      addressPostal: row.addressPostal || fallback.addressPostal,
      addressRegionFr: row.addressRegionFr || fallback.addressRegionFr,
      addressRegionAr: row.addressRegionAr || fallback.addressRegionAr,
      hours: row.hours && row.hours.length > 0 ? row.hours : fallback.hours,
      facebookUrl: row.facebookUrl || fallback.facebookUrl,
      instagramUrl: row.instagramUrl || fallback.instagramUrl,
      tiktokUrl: row.tiktokUrl || null,
      mapsDirectionsUrl: row.mapsDirectionsUrl || fallback.mapsDirectionsUrl,
    };
  } catch (err) {
    console.error("[settings] échec de lecture des réglages en base:", err);
    return null;
  }
}

/**
 * Réglages du site résolus — DB si configurée et renseignée, sinon
 * repli sur le contenu existant codé en dur (`@/lib/site`). Cette
 * fonction est mise en cache et invalidée via `revalidateTag` dès qu'un
 * admin publie une modification (voir les server actions dans
 * `src/app/admin/settings/*`), donc le site public reflète le changement
 * sans redéploiement.
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<ResolvedSiteSettings> => (await fetchFromDb()) ?? defaultSettings(),
  ["resolved-site-settings"],
  { tags: [SETTINGS_CACHE_TAG] }
);
