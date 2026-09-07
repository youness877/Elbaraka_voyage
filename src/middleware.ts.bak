import { NextResponse, type NextRequest } from "next/server";

/**
 * Force un seul hôte canonique (https + elbarakvoyage.netlify.app).
 *
 * Pourquoi : si le site répond aussi sur http://, sur le domaine sans "www",
 * ou sur le domaine brut de l'hébergeur (ex: xxx.vercel.app), Google explore
 * et peut indexer plusieurs URLs pour le même contenu. Search Console
 * remonte alors "Dupliquée, Google a choisi un URL canonique différent de
 * celui de l'utilisateur" — et le budget de crawl/l'autorité SEO se
 * dispersent entre les variantes au lieu de se concentrer sur une seule.
 *
 * Cette redirection 308 (permanente, méthode préservée) s'exécute avant
 * toute page : chaque variante non canonique renvoie immédiatement vers la
 * bonne URL, donc Google ne voit jamais qu'une seule version indexable.
 *
 * IMPORTANT : le fallback ci-dessous DOIT correspondre au domaine réellement
 * servi en production (elbarakvoyage.netlify.app). Si NEXT_PUBLIC_SITE_URL
 * n'est pas défini sur Netlify, ce fallback est celui qui s'applique — le
 * faire pointer vers un autre domaine forcerait une redirection 308 de
 * TOUT le site vers ce domaine, ce qui est exactement ce qui empêchait
 * elbarakvoyage.netlify.app d'être indexé.
 */
const CANONICAL_HOST = new URL(
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://elbarakvoyage.netlify.app").replace(/\/$/, "")
).host;

// Transmet le pathname courant au Root Layout (Server Component) via un
// en-tête de REQUÊTE interne : App Router n'expose pas `usePathname()` côté
// serveur, et le layout racine (src/app/layout.tsx) a besoin de savoir s'il
// sert une page publique (chrome complet : navbar/footer/i18n) ou une page
// `/admin` (chrome minimal dédié au tableau de bord). Ce header n'est
// jamais exposé au navigateur, seulement lu côté serveur via `headers()`
// (d'où l'écriture sur `request.headers`, pas `response.headers`).
function nextWithPathname(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") ?? "";
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");

  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  if (isLocal) return nextWithPathname(req);

  const needsHostFix = host !== CANONICAL_HOST;
  const needsProtoFix = proto !== "https";

  if (needsHostFix || needsProtoFix) {
    const canonical = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(canonical, 308);
  }

  return nextWithPathname(req);
}

export const config = {
  matcher: [
    /*
     * S'applique à tout sauf les assets internes Next.js et les fichiers
     * statiques servis depuis /public (images, favicons, robots.txt,
     * sitemap.xml...). Rediriger ces fichiers est inutile — et surtout
     * dangereux : l'optimiseur d'images de Next.js (/_next/image) va
     * chercher les fichiers locaux via une requête interne sur le même
     * hôte ; si cette requête interne ne correspond pas exactement à
     * l'hôte canonique, ce middleware la redirige (308) au lieu de
     * renvoyer l'image, et l'optimiseur reçoit une réponse vide au lieu
     * des octets de l'image — d'où des photos qui ne s'affichent nulle
     * part, sur aucun appareil.
     */
    "/((?!_next/static|_next/image|images/|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|gif)$).*)",
  ],
};
