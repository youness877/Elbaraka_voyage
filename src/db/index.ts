import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Connexion PostgreSQL — résiliente.
 * Si DATABASE_URL n'est pas configurée (ex. hébergement sans base branchée),
 * on n'interrompt PAS le démarrage de l'app : `db` vaut `null` et chaque route
 * API le détecte pour répondre proprement (voir isDatabaseConfigured) plutôt
 * que de faire planter toute la fonction serveur avec une 500 opaque.
 */

const databaseUrl = process.env.DATABASE_URL;

export const isDatabaseConfigured = Boolean(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool(): Pool | null {
  if (!databaseUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[db] DATABASE_URL manquante — les formulaires (contact / réservation) répondront en mode dégradé."
      );
    }
    return null;
  }

  const existing = globalForDb.__arenaNextJsPostgresqlPool;
  if (existing) return existing;

  const pool = new Pool({ connectionString: databaseUrl });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  return pool;
}

export const pool = createPool();
export const db = pool ? drizzle(pool) : null;
