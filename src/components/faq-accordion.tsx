"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: { question: string; answer: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-300",
              isOpen ? "border-gold/60" : "border-sand-deep/70"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
            >
              <span className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md font-display text-[0.7rem] font-bold",
                    isOpen ? "bg-gold text-primary-ink" : "bg-sand text-primary"
                  )}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("font-display text-[1.06rem] font-semibold leading-snug", isOpen ? "text-primary" : "text-primary-dark")}>
                  {item.question}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isOpen ? "border-gold bg-gold text-primary-ink" : "border-sand-deep text-primary"
                )}
              >
                <Plus className="size-4" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p className="px-6 pb-6 ps-[4.4rem] text-[0.94rem] leading-relaxed text-charcoal/75">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
