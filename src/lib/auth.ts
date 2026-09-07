import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db, isDatabaseConfigured } from "@/db";
import { adminUsers, type AdminUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/lib/password";

export const SESSION_COOKIE = "eb_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 heures

/**
 * Secret de signature des sessions admin.
 * En production, SESSION_SECRET DOIT être défini.
 */
function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "[auth] SESSION_SECRET manquante en production — impossible de sécuriser les sessions admin."
      );
    }

    return new TextEncoder().encode(
      "dev-only-insecure-secret-change-me"
    );
  }

  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}

/**
 * Hash du mot de passe.
 * Implémentation dans src/lib/password.ts
 */
export { hashPassword, verifyPassword };

/**
 * Crée le token JWT de session.
 */
export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());
}

/**
 * Vérifie le token JWT de session.
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      getSessionSecret()
    );

    if (
      typeof payload.sub === "string" &&
      typeof payload.email === "string" &&
      typeof payload.name === "string" &&
      (payload.role === "admin" || payload.role === "editor")
    ) {
      return {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Pose le cookie de session admin.
 */
export async function setSessionCookie(
  payload: SessionPayload
): Promise<void> {
  const token = await createSessionToken(payload);

  const store = await cookies();

  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

/**
 * Supprime le cookie de session.
 */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();

  store.delete(SESSION_COOKIE);
}

/**
 * Récupère la session courante depuis le cookie.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();

  const token = store.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

/**
 * Vérifie qu'une session valide existe.
 *
 * Par défaut, editor et admin sont acceptés.
 * Si minRole = admin, seul un admin est accepté.
 */
export async function requireSession(
  minRole: "admin" | "editor" = "editor"
): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  if (minRole === "admin" && session.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  return session;
}

/**
 * Recherche un administrateur par email.
 */
export async function findAdminByEmail(
  email: string
): Promise<AdminUser | null> {
  if (!db || !isDatabaseConfigured) {
    return null;
  }

  const normalizedEmail = email
    .toLowerCase()
    .trim();

  const rows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, normalizedEmail))
    .limit(1);

  return rows[0] ?? null;
}

/**
 * Met à jour la date de dernière connexion.
 */
export async function touchLastLogin(
  id: string
): Promise<void> {
  if (!db || !isDatabaseConfigured) {
    return;
  }

  await db
    .update(adminUsers)
    .set({
      lastLoginAt: new Date(),
    })
    .where(eq(adminUsers.id, id));
}
