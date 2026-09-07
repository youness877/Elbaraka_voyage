"use server";

import { updateTag } from "next/cache";
import { sql } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/db";
import { siteSettings } from "@/db/schema";
import { generalSettingsSchema } from "@/lib/admin-validation";
import { requireSession } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";
import { SETTINGS_CACHE_TAG } from "@/lib/settings";

export interface GeneralSettingsState {
  error?: string;
  success?: boolean;
}

export async function updateGeneralSettingsAction(
  _prevState: GeneralSettingsState,
  formData: FormData
): Promise<GeneralSettingsState> {
  const session = await requireSession("editor").catch(() => null);
  if (!session) {
    return { error: "Session expirée. Veuillez vous reconnecter." };
  }

  const parsed = generalSettingsSchema.safeParse({
    siteName: formData.get("siteName"),
    footerCopyrightNote: formData.get("footerCopyrightNote") ?? "",
    logoUrl: formData.get("logoUrl") ?? "",
    faviconUrl: formData.get("faviconUrl") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides." };
  }

  if (!db || !isDatabaseConfigured) {
    return { error: "Base de données non configurée. Contactez le développeur." };
  }

  const { siteName, footerCopyrightNote, logoUrl, faviconUrl } = parsed.data;

  try {
    await db
      .insert(siteSettings)
      .values({
        id: 1,
        siteName,
        footerCopyrightNote: footerCopyrightNote || null,
        logoUrl: logoUrl || null,
        faviconUrl: faviconUrl || null,
        updatedBy: session.sub,
      })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: {
          siteName,
          footerCopyrightNote: footerCopyrightNote || null,
          logoUrl: logoUrl || null,
          faviconUrl: faviconUrl || null,
          updatedAt: sql`now()`,
          updatedBy: session.sub,
        },
      });
  } catch (err) {
    console.error("[admin/settings/general] échec de l'enregistrement:", err);
    return { error: "Échec de l'enregistrement. Réessayez dans un instant." };
  }

  await logActivity(session, "updated", "Réglages généraux");
  // Le site public relit `getSiteSettings()` via ce tag : invalider ici
  // rend le changement visible immédiatement, sans redéploiement.
  // `updateTag` (plutôt que `revalidateTag`) permet en plus une sémantique
  // "read-your-own-writes" : si cette server action redirige ou revalide la
  // page courante juste après, elle verra déjà la donnée fraîche.
  updateTag(SETTINGS_CACHE_TAG);

  return { success: true };
}
