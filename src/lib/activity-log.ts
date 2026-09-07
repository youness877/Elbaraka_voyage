import "server-only";

import { db, isDatabaseConfigured } from "@/db";
import { activityLogs } from "@/db/schema";
import type { SessionPayload } from "./auth";

/**
 * Enregistre une action admin dans le journal d'activité.
 * Best-effort : une panne du journal ne doit jamais faire échouer l'action
 * métier elle-même (ex. la mise à jour des réglages doit réussir même si
 * l'écriture du log échoue) — on avale l'erreur après l'avoir loguée.
 */
export async function logActivity(actor: SessionPayload, action: string, target: string) {
  if (!db || !isDatabaseConfigured) return;
  try {
    await db.insert(activityLogs).values({
      actorId: actor.sub,
      actorName: actor.name,
      action,
      target,
    });
  } catch (err) {
    console.error("[activity-log] échec de l'écriture du journal:", err);
  }
}
