import { cn } from "@/lib/utils";

/** Marques de la flotte Archi Cars — fichiers SVG officiels dans /images/brands/ */
export const BRAND_NAMES: Record<string, string> = {
  kia: "Kia",
  dacia: "Dacia",
  renault: "Renault",
  peugeot: "Peugeot",
  hyundai: "Hyundai",
  mercedes: "Mercedes-Benz",
};

export const FLEET_BRANDS = ["kia", "dacia", "renault", "peugeot", "hyundai", "mercedes"] as const;

function brandFromSlug(slug: string): string | null {
  const b = slug.split("-")[0];
  return b in BRAND_NAMES ? b : null;
}

/** Logo de marque automobile (SVG officiel) */
export function BrandMark({
  slug,
  className,
  title,
}: {
  slug: string;
  className?: string;
  title?: string;
}) {
  const brand = brandFromSlug(slug);
  if (!brand) return null;
  const name = title ?? BRAND_NAMES[brand];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/brands/${brand}.svg`}
      alt={`Logo ${name}`}
      title={name}
      className={className}
      loading="lazy"
      width={48}
      height={24}
    />
  );
}

/** Pastille blanche avec le logo de marque — posée sur la photo du véhicule */
export function BrandChip({ slug, className }: { slug: string; className?: string }) {
  const brand = brandFromSlug(slug);
  if (!brand) return null;
  const name = BRAND_NAMES[brand];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-3 pr-3.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] backdrop-blur",
        className
      )}
    >
      <BrandMark slug={slug} className="h-4 w-auto" title={name} />
      <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-charcoal/70">
        {name}
      </span>
    </span>
  );
}

/** Rangée de logos de marques — preuve de sérieux de la flotte */
export function BrandStrip({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-10 gap-y-5", className)}>
      {FLEET_BRANDS.map((b) => (
        <span key={b} className="flex flex-col items-center gap-1.5 opacity-80 transition-all duration-300 hover:opacity-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/brands/${b}.svg`}
            alt={`Logo ${BRAND_NAMES[b]}`}
            title={BRAND_NAMES[b]}
            loading="lazy"
            width={64}
            height={32}
            className="h-8 w-auto sm:h-9"
          />
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-charcoal/45">
            {BRAND_NAMES[b]}
          </span>
        </span>
      ))}
    </div>
  );
}
