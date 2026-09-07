
/**
 * Crée ou met à jour un compte administrateur.
 *
 * Utilisation :
 * npx tsx scripts/create-admin.ts --email "admin@elbarakavoyage.ma" --password "MotDePasseSolide123" --name "Admin"
 */

import dotenv from "dotenv";
import { resolve } from "node:path";

// Charger .env.local AVANT les imports de la DB
dotenv.config({
  path: resolve(process.cwd(), ".env.local"),
});

async function main() {
  // Imports dynamiques : la DB est chargée APRÈS .env.local
  const { db, isDatabaseConfigured } = await import("../src/db");
  const { adminUsers } = await import("../src/db/schema");
  const { hashPassword } = await import("../src/lib/password");
  const { eq } = await import("drizzle-orm");

  function getArg(name: string): string | undefined {
    const prefix = `--${name}=`;

    const inline = process.argv.find((a) =>
      a.startsWith(prefix)
    );

    if (inline) {
      return inline.slice(prefix.length);
    }

    const idx = process.argv.indexOf(`--${name}`);

    if (idx !== -1) {
      return process.argv[idx + 1];
    }

    return undefined;
  }

  const email = getArg("email");
  const password = getArg("password");
  const name = getArg("name") ?? "Administrateur";
  const role =
    getArg("role") === "editor"
      ? "editor"
      : "admin";

  if (!email || !password) {
    console.error(
      'Usage: npx tsx scripts/create-admin.ts --email "admin@example.com" --password "..." [--name "Nom"] [--role admin|editor]'
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error(
      "Le mot de passe doit contenir au moins 8 caractères."
    );
    process.exit(1);
  }

  if (!isDatabaseConfigured || !db) {
    console.error(
      "DATABASE_URL n'est pas configurée."
    );
    console.error(
      "Vérifiez votre fichier .env.local."
    );
    process.exit(1);
  }

  console.log("Connexion à la base de données...");

  const normalizedEmail = email
    .toLowerCase()
    .trim();

  const passwordHash = await hashPassword(password);

  const existing = await db
    .select()
    .from(adminUsers)
    .where(
      eq(adminUsers.email, normalizedEmail)
    )
    .limit(1);

  if (existing[0]) {
    await db
      .update(adminUsers)
      .set({
        passwordHash,
        name,
        role,
      })
      .where(
        eq(
          adminUsers.id,
          existing[0].id
        )
      );

    console.log(
      `✔ Mot de passe mis à jour pour ${normalizedEmail}.`
    );
  } else {
    await db
      .insert(adminUsers)
      .values({
        email: normalizedEmail,
        passwordHash,
        name,
        role,
      });

    console.log(
      `✔ Compte administrateur créé : ${normalizedEmail} (${role}).`
    );
  }
}

main().catch((err) => {
  console.error(
    "Échec de la création du compte admin :"
  );
  console.error(err);
  process.exit(1);
});

