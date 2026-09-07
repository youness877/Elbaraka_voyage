"use server";

import { updateTag } from "next/cache";
import { sql } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/db";
import { siteSettings } from "@/db/schema";
import { contactSettingsSchema } from "@/lib/admin-validation";
import { requireSession } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";
import { SETTINGS_CACHE_TAG } from "@/lib/settings";

export interface ContactSettingsState {
  error?: string;
  success?: boolean;
}

function parseJsonField<T>(formData: FormData, key: string): T | null {
  const raw = formData.get(key);
  if (typeof raw !== "string" || raw.trim() === "") return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function updateContactSettingsAction(
  _prevState: ContactSettingsState,
  formData: FormData
): Promise<ContactSettingsState> {
  const session = await requireSession("editor").catch(() => null);
  if (!session) {
    return { error: "Session expirée. Veuillez vous reconnecter." };
  }

  const phones = parseJsonField(formData, "phonesJson");
  const hours = parseJsonField(formData, "hoursJson");

  const parsed = contactSettingsSchema.safeParse({
    email: formData.get("email"),
    whatsappNumber: formData.get("whatsappNumber"),
    whatsappMessageFr: formData.get("whatsappMessageFr") ?? "",
    whatsappMessageAr: formData.get("whatsappMessageAr") ?? "",
    phones: phones ?? [],
    addressStreetFr: formData.get("addressStreetFr"),
    addressStreetAr: formData.get("addressStreetAr"),
    addressCityFr: formData.get("addressCityFr"),
    addressCityAr: formData.get("addressCityAr"),
    addressPostal: formData.get("addressPostal"),
    addressRegionFr: formData.get("addressRegionFr"),
    addressRegionAr: formData.get("addressRegionAr"),
    hours: hours ?? [],
    facebookUrl: formData.get("facebookUrl") ?? "",
    instagramUrl: formData.get("instagramUrl") ?? "",
    tiktokUrl: formData.get("tiktokUrl") ?? "",
    mapsDirectionsUrl: formData.get("mapsDirectionsUrl") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides." };
  }

  if (!db || !isDatabaseConfigured) {
    return { error: "Base de données non configurée. Contactez le développeur." };
  }

  const d = parsed.data;

  try {
    await db
      .insert(siteSettings)
      .values({
        id: 1,
        email: d.email,
        whatsappNumber: d.whatsappNumber,
        whatsappMessageFr: d.whatsappMessageFr || null,
        whatsappMessageAr: d.whatsappMessageAr || null,
        phones: d.phones,
        addressStreetFr: d.addressStreetFr,
        addressStreetAr: d.addressStreetAr,
        addressCityFr: d.addressCityFr,
        addressCityAr: d.addressCityAr,
        addressPostal: d.addressPostal,
        addressRegionFr: d.addressRegionFr,
        addressRegionAr: d.addressRegionAr,
        hours: d.hours,
        facebookUrl: d.facebookUrl || null,
        instagramUrl: d.instagramUrl || null,
        tiktokUrl: d.tiktokUrl || null,
        mapsDirectionsUrl: d.mapsDirectionsUrl || null,
        updatedBy: session.sub,
      })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: {
          email: d.email,
          whatsappNumber: d.whatsappNumber,
          whatsappMessageFr: d.whatsappMessageFr || null,
          whatsappMessageAr: d.whatsappMessageAr || null,
          phones: d.phones,
          addressStreetFr: d.addressStreetFr,
          addressStreetAr: d.addressStreetAr,
          addressCityFr: d.addressCityFr,
          addressCityAr: d.addressCityAr,
          addressPostal: d.addressPostal,
          addressRegionFr: d.addressRegionFr,
          addressRegionAr: d.addressRegionAr,
          hours: d.hours,
          facebookUrl: d.facebookUrl || null,
          instagramUrl: d.instagramUrl || null,
          tiktokUrl: d.tiktokUrl || null,
          mapsDirectionsUrl: d.mapsDirectionsUrl || null,
          updatedAt: sql`now()`,
          updatedBy: session.sub,
        },
      });
  } catch (err) {
    console.error("[admin/settings/contact] échec de l'enregistrement:", err);
    return { error: "Échec de l'enregistrement. Réessayez dans un instant." };
  }

  await logActivity(session, "updated", "Coordonnées de contact");
  updateTag(SETTINGS_CACHE_TAG);

  return { success: true };
}
