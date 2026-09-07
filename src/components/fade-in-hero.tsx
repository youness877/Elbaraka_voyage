import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal-on-load wrapper for above-the-fold (Hero / PageHero) content.
 *
 * This is intentionally a plain Server Component with a pure CSS animation,
 * NOT a framer-motion client component. The previous implementation used
 * `motion.div` with `initial={{ opacity: 0 }}` + `animate={{ opacity: 1 }}`,
 * which meant the element was invisible until React hydrated and
 * framer-motion executed on the client. On a throttled mobile CPU that
 * hydration + library-execution wait was measured by PageSpeed Insights as
 * a ~2.7s "render delay" on the Hero paragraph — the dominant cause of the
 * 6.3s LCP.
 *
 * CSS animations, by contrast, start as soon as the browser paints the
 * element (compositor-driven), independent of JS bundle download, parsing,
 * or hydration. Swapping to a CSS `@keyframes` animation (declared in
 * globals.css as the `animate-fade-in-up` utility) keeps the exact same
 * fade + slide-up look and per-element stagger delay, but removes the
 * hydration dependency entirely for the Hero's visibility.
 */
export function FadeInHero({
  children,
  className,
  delay = 0,
  y = 34,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const style = {
    animationDelay: `${delay}s`,
    "--fade-y": `${y}px`,
  } as CSSProperties;

  return (
    <div
      className={className ? `animate-fade-in-up ${className}` : "animate-fade-in-up"}
      style={style}
    >
      {children}
    </div>
  );
}
