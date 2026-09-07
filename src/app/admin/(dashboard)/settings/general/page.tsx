import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { GeneralSettingsForm } from "./general-form";

export const metadata: Metadata = {
  title: "Réglages généraux — Administration",
  robots: { index: false, follow: false },
};

export default async function GeneralSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark">Réglages généraux</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Nom du site, logo, favicon et mention du pied de page — ces éléments sont affichés sur tout le site.
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <GeneralSettingsForm defaultValues={settings} />
      </div>
    </div>
  );
}
