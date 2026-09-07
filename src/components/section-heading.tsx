import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className={cn("h-px w-8", dark ? "bg-gold/70" : "bg-gold/80")} aria-hidden />
        <span
          className={cn(
            "text-[0.7rem] font-extrabold uppercase tracking-[0.32em]",
            dark ? "text-gold" : "text-[#9a7a10]"
          )}
        >
          {eyebrow}
        </span>
        <span className={cn("h-px w-8", dark ? "bg-gold/70" : "bg-gold/80")} aria-hidden />
      </div>
      <h2
        className={cn(
          "mt-4 font-display text-[2.1rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl",
          dark ? "text-cream" : "text-primary-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[1.02rem] leading-relaxed",
            dark ? "text-cream/70" : "text-charcoal/70"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
