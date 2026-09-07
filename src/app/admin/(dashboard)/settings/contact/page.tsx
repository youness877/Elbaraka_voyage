import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { ContactSettingsForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Coordonnées — Administration",
  robots: { index: false, follow: false },
};

export default async function ContactSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark">Coordonnées</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Téléphones, WhatsApp, adresse, horaires et réseaux sociaux — utilisés dans l&apos;en-tête, le pied de page et
        la page Contact.
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <ContactSettingsForm defaultValues={settings} />
      </div>
    </div>
  );
}
