import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Tableau de bord — Administration",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const session = await getSession();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark">Bonjour {session?.name?.split(" ")[0] ?? ""} 👋</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Voici les modules disponibles pour gérer le site El Baraka Voyages.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/settings/general"
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-primary-dark">Réglages généraux</p>
          <p className="mt-1 text-sm text-neutral-500">Nom du site, logo, favicon, pied de page.</p>
        </Link>
        <Link
          href="/admin/settings/contact"
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-primary-dark">Coordonnées</p>
          <p className="mt-1 text-sm text-neutral-500">Téléphones, WhatsApp, adresse, horaires, réseaux sociaux.</p>
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-5 text-sm text-neutral-500">
        D&apos;autres modules (Offres, Destinations, Omra &amp; Hajj, Médiathèque, Navigation…) seront ajoutés dans
        les prochaines phases du projet.
      </div>
    </div>
  );
}
