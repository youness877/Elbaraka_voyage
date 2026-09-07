import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion — Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-deep px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <h1 className="text-xl font-bold text-primary-dark">Administration</h1>
        <p className="mt-1 text-sm text-neutral-500">El Baraka Voyages — Tableau de bord</p>
        <LoginForm />
      </div>
    </div>
  );
}
