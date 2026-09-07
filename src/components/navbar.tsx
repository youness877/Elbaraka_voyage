"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/language-provider";
import { navLinks, site } from "@/lib/site";
import type { ResolvedSiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { WhatsAppIcon } from "./icons";
import { Logo } from "./logo";

export function Navbar({ settings }: { settings: ResolvedSiteSettings }) {
  const pathname = usePathname();
  const { t, locale } = useTranslation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phones = settings.phones.length > 0 ? settings.phones : site.phones.map((p) => ({ intl: p.href, display: p.display, labelFr: p.label.fr, labelAr: p.label.ar }));
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Ferme le menu mobile au changement de page. On évite un useEffect ici
  // (qui déclencherait un second rendu en cascade) : on ajuste l'état
  // directement pendant le rendu, pattern recommandé par React pour
  // "réinitialiser un state quand une prop change".
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = isHome && !scrolled;

  return (
    <>
      {/* ——— Barre d'information (NAP) ——— */}
      <div className="hidden bg-primary-ink text-[0.78rem] text-cream/85 lg:block">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            {phones.map((p) => (
              <a
                key={p.intl}
                href={p.intl}
                className="flex items-center gap-1.5 transition-colors hover:text-gold-light"
              >
                <Phone className="size-3.5 text-gold" aria-hidden />
                <span className="bidi-isolate tracking-wide" dir="ltr">
                  {p.display}
                </span>
              </a>
            ))}
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-light"
            >
              <Mail className="size-3.5 text-gold" aria-hidden />
              <span className="bidi-isolate" dir="ltr">{settings.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-cream/70">
              <Clock className="size-3.5 text-gold" aria-hidden />
              {t.nav.hoursLine} · {locale === "ar" ? settings.addressCityAr : settings.addressCityFr}, Agadir
            </span>
            <LanguageSwitcher className="border-cream/25 text-cream" />
          </div>
        </div>
      </div>

      {/* ——— Navigation principale ——— */}
      <header
        className={cn(
          "z-50 w-full transition-all duration-500",
          overlay
            ? "absolute inset-x-0 top-0 lg:top-9"
            : "sticky top-0 border-b border-primary/10 bg-cream/95 shadow-[0_10px_40px_-22px_rgba(92,13,26,0.35)] backdrop-blur-xl"
        )}
      >
        <nav
          className="container-x flex items-center justify-between py-3.5"
          aria-label={t.nav.mainLabel}
        >
          <Link href="/" className="group" aria-label={t.nav.homeAria}>
            <Logo inverted={overlay} logoUrl={settings.logoUrl} />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-[0.78rem] font-semibold tracking-wide transition-colors",
                      overlay
                        ? "text-cream/90 hover:text-gold-light"
                        : "text-charcoal/80 hover:text-primary",
                      active && (overlay ? "text-gold-light" : "text-primary")
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {t.nav[l.key]}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300",
                        active && "scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.chatOnWhatsapp}
              className={cn(
                "hidden items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] font-bold transition-all md:inline-flex",
                overlay
                  ? "border-cream/30 text-cream hover:border-[#25d366] hover:text-[#25d366]"
                  : "border-primary/25 text-primary hover:border-[#25d366] hover:text-[#25d366]"
              )}
            >
              <WhatsAppIcon className="size-4 text-[#25d366]" />
              {t.nav.whatsapp}
            </a>
            <Link
              href="/contact"
              className="hidden rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-5 py-2.5 text-[0.84rem] font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform duration-300 hover:scale-[1.04] xl:inline-block"
            >
              {t.nav.book}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border transition-colors xl:hidden",
                overlay
                  ? "border-cream/30 text-cream hover:border-gold hover:text-gold"
                  : "border-primary/20 text-primary hover:border-gold hover:text-gold"
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ——— Menu mobile ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary-deep/98 bg-filigree backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.mobileMenuLabel}
          >
            <div className="container-x flex h-full flex-col justify-center overflow-y-auto pt-16">
              <ul className="space-y-0">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.45 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "group flex items-baseline gap-3 border-b border-cream/10 py-2.5",
                        pathname === l.href ? "text-gold" : "text-cream"
                      )}
                    >
                      <span className="bidi-isolate font-display text-[0.7rem] text-gold/70">
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-gold-light">
                        {t.nav[l.key]}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
              >
                <LanguageSwitcher variant="block" className="mt-4" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-wrap gap-3"
              >
                {phones.map((p) => (
                  <a
                    key={p.intl}
                    href={p.intl}
                    className="bidi-isolate rounded-full border border-gold/40 px-4 py-2 text-sm font-semibold text-gold-light"
                    dir="ltr"
                  >
                    {p.display}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
