"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// Structure volontairement réduite au périmètre livré aujourd'hui (Réglages
// généraux + Coordonnées). Les autres modules du cahier des charges
// (Offres, Destinations, Omra & Hajj, Médiathèque, etc.) apparaîtront ici
// au fur et à mesure des prochaines phases — la structure de menu est déjà
// prête à les accueillir.
const navGroups: NavGroup[] = [
  {
    title: "Paramètres",
    items: [
      { href: "/admin/settings/general", label: "Réglages généraux" },
      { href: "/admin/settings/contact", label: "Coordonnées" },
    ],
  },
];

export function AdminSidebar({ userName, role }: { userName: string; role: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-5 py-5">
        <p className="text-sm font-bold text-primary-dark">El Baraka Voyages</p>
        <p className="text-xs text-neutral-500">Administration</p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        <Link
          href="/admin"
          className={cn(
            "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/admin" ? "bg-primary/10 text-primary-dark" : "text-neutral-600 hover:bg-neutral-100"
          )}
        >
          Tableau de bord
        </Link>

        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 text-[0.68rem] font-bold uppercase tracking-wider text-neutral-400">
              {group.title}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "bg-primary/10 text-primary-dark"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-neutral-200 px-4 py-4">
        <p className="truncate text-xs font-semibold text-neutral-700">{userName}</p>
        <p className="text-[0.68rem] uppercase tracking-wide text-neutral-400">{role}</p>
        <form action="/api/admin/logout" method="post" className="mt-3">
          <button
            type="submit"
            className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
