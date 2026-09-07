"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "@/i18n/language-provider";
import { pick } from "@/i18n/pick";
import { carCategories, cars, type CarCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CarCard } from "./car-card";

export function CarCatalog() {
  const [cat, setCat] = useState<CarCategory | "tous">("tous");
  const { t, locale } = useTranslation();
  const filtered = cat === "tous" ? cars : cars.filter((c) => c.category === cat);

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label={t.car.fleetFilterLabel}>
        {carCategories.map((c) => {
          const active = cat === c.key;
          const count = c.key === "tous" ? cars.length : cars.filter((car) => car.category === c.key).length;
          return (
            <button
              key={c.key}
              role="tab"
              aria-selected={active}
              onClick={() => setCat(c.key)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider transition-all duration-300",
                active
                  ? "border-primary bg-primary text-cream shadow-luxe"
                  : "border-sand-deep bg-white text-charcoal/65 hover:border-gold hover:text-primary"
              )}
            >
              {pick(locale, c.label)}
              <span className={cn("ms-2 rounded-full px-2 py-0.5 text-[0.66rem]", active ? "bg-gold text-primary-ink" : "bg-sand text-charcoal/60")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grille */}
      <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((car) => (
            <motion.div
              key={car.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              id={`car-${car.slug}`}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
