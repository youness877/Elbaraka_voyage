"use server";

import { redirect } from "next/navigation";
import { findAdminByEmail, setSessionCookie, touchLastLogin, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/admin-validation";
import { isDatabaseConfigured } from "@/db";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides." };
  }

  if (!isDatabaseConfigured) {
    return { error: "La base de données n'est pas configurée. Contactez le développeur." };
  }

  const user = await findAdminByEmail(parsed.data.email);
  if (!user) {
    // Message volontairement identique à "mauvais mot de passe" pour ne pas
    // révéler quels e-mails existent en base.
    return { error: "E-mail ou mot de passe incorrect." };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { error: "E-mail ou mot de passe incorrect." };
  }

  await setSessionCookie({ sub: user.id, email: user.email, name: user.name, role: user.role });
  await touchLastLogin(user.id);

  redirect("/admin");
}
