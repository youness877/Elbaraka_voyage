"use client";

import { Phone } from "lucide-react";
import { useTranslation } from "@/i18n/language-provider";
import { interpolate } from "@/i18n/interpolate";
import { site } from "@/lib/site";
import type { ResolvedSiteSettings } from "@/lib/settings";
import { WhatsAppIcon } from "./icons";

/**
 * Boutons flottants d'appel à l'action (WhatsApp officiel + appel direct
 * mobile). Positions volontairement fixes (pas de logique RTL) : ce sont
 * des icônes non directionnelles dont l'emplacement est une convention
 * d'interface indépendante du sens de lecture (cf. spec RTL, §4).
 */
export function FloatingActions({ settings }: { settings: ResolvedSiteSettings }) {
  const { t } = useTranslation();
  const primaryPhone = settings.phones[0] ?? { intl: site.phones[0].href, display: site.phones[0].display };

  return (
    <>
      <a
        href={settings.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappFloat.chatAria}
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25d366] py-3.5 pl-4 pr-5 text-white shadow-[0_16px_42px_-10px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-[1.05] hover:bg-[#1fbd5a]"
      >
        <span
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25d366]/45 [animation-duration:2.6s]"
          aria-hidden
        />
        <WhatsAppIcon className="size-7 transition-transform duration-300 group-hover:rotate-[8deg]" />
        <span className="text-[0.9rem] font-extrabold tracking-wide">{t.nav.whatsapp}</span>
      </a>

      <a
        href={primaryPhone.intl}
        aria-label={interpolate(t.whatsappFloat.callAria, { phone: primaryPhone.display })}
        className="fixed bottom-5 left-5 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold text-primary-ink shadow-gold transition-transform duration-300 hover:scale-105 md:hidden"
      >
        <Phone className="size-6" aria-hidden />
      </a>
    </>
  );
}

