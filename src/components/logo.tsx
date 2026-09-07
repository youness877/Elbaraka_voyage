import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logotype El Baraka Voyages × Archi Cars.
 * Médaillon bordeaux/or : avion en orbite autour d'un globe — identité de la devanture.
 */
export function LogoMark({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="El Baraka Voyages"
    >
      <defs>
        <linearGradient id="lb-gold" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0C419" />
          <stop offset="0.55" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#A67C00" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22.5" className="fill-[#7A1224]" />
      <circle cx="24" cy="24" r="22.5" stroke="url(#lb-gold)" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18" stroke="url(#lb-gold)" strokeWidth="0.7" opacity="0.55" />
      {/* méridien façon globe */}
      <path
        d="M9 30c5 3.4 9.8 5 15 5s10-1.6 15-5"
        stroke="url(#lb-gold)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M24 13v14"
        stroke="url(#lb-gold)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* avion */}
      <path
        d="M33.3 17.3 28.6 20.4l-9.1-2.6c-1.2-.35-2.4.12-3 1.16-.56 1-.3 2.2.7 2.9l7.4 4.9 2.3-3.9 6.4 1.7c1.5.4 3-.5 3.4-2 .4-1.5-.5-3-2-3.4l-1.4-1.8z"
        fill="url(#lb-gold)"
        transform="rotate(-18 24 20) scale(0.92) translate(1.5 1.5)"
      />
      {/* étoile */}
      <path d="m38 9 1 2.4L41.5 12.5 39 13.4 38 16l-1-2.6-2.5-1 2.5-1z" fill="#F0C419" />
    </svg>
  );
}

export function Logo({
  className,
  inverted = false,
  compact = false,
  logoUrl = null,
}: {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
  /** Logo personnalisé envoyé par l'admin (Réglages généraux). Remplace le médaillon SVG par défaut quand renseigné. */
  logoUrl?: string | null;
}) {
  if (logoUrl) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src={logoUrl}
          alt="El Baraka Voyages"
          width={compact ? 40 : 160}
          height={40}
          className="h-10 w-auto object-contain"
          unoptimized
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={40} className={cn("shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]", inverted && "drop-shadow-[0_2px_10px_rgba(212,175,55,0.35)]")} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.28rem] font-semibold tracking-tight",
              inverted ? "text-cream" : "text-primary-dark"
            )}
          >
            El Baraka
          </span>
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-bold uppercase tracking-[0.3em]",
              inverted ? "text-gold" : "text-primary/80"
            )}
          >
            Voyages <span className="text-gold">×</span> Archi Cars
          </span>
        </span>
      )}
    </span>
  );
}
