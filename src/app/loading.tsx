/**
 * Affiché immédiatement par Next.js pendant qu'une page se charge
 * (App Router : ce fichier crée automatiquement une limite <Suspense>
 * autour du contenu de chaque route). Sans ce fichier, un clic sur un
 * lien du menu ne montre RIEN tant que la page suivante n'est pas
 * entièrement prête, ce qui donne une impression de lenteur/blocage —
 * surtout sur mobile. Avec ce fichier, le retour visuel est instantané.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex size-14 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/15 border-t-gold" />
          <span className="size-3 rounded-full bg-gold" />
        </span>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.25em] text-primary/50">
          Chargement…
        </p>
      </div>
    </div>
  );
}
