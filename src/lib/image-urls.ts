/**
 * SOURCE UNIQUE de toutes les URLs d'images hébergées du site (Pexels — usage libre).
 * Toute modification d'image se fait UNIQUEMENT ici.
 *
 * Groupement :
 *  - cars       : photos de la flotte Archi Cars (modèle réel ou équivalent visuel)
 *  - storefront : façade d'agence / showroom automobile (OG + sections À propos/Contact)
 *  - travel     : imagerie voyage / Omra / Hajj / Maroc
 *  - blog       : visuels d'articles (réutilisent les mêmes sources)
 *
 * Format Pexels conseillé : ?auto=compress&cs=tinysrgb&fit=crop&h=H&w=W
 */

const px = (id: number, w = 1400, h = 900): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

export const siteImages = {
  cars: {
    /** Vraie Kia Picanto blanche */
    "kia-picanto": px(20475125),
    /** Vraie Dacia Sandero Stepway — photo réelle du véhicule */
    "dacia-sandero-stepway": "/images/cars/dacia-sandero-stepway.webp",
    /** Vraie Dacia Logan — photo réelle du véhicule */
    "dacia-logan": "/images/cars/dacia-logan.webp",
    /** Vraie Renault Clio 5 — photo réelle du véhicule */
    "renault-clio-5": "/images/cars/renault-clio-5.webp",
    /** Vraie Peugeot 208 — photo réelle du véhicule */
    "peugeot-208": "/images/cars/peugeot-208.webp",
    /** Vrai Dacia Duster — photo réelle du véhicule */
    "dacia-duster": "/images/cars/dacia-duster.webp",
    /** Vrai Hyundai Tucson — photo réelle du véhicule */
    "hyundai-tucson": "/images/cars/hyundai-tucson.webp",
    /** Vraie Mercedes Classe C — photo réelle du véhicule */
    "mercedes-classe-c": "/images/cars/mercedes-classe-c.webp",
  },

  /** Vraie photo de la devanture de l'agence El Baraka Voyages */
  storefront: "/images/agency/el-baraka-storefront.webp",

  travel: {
    heroPlane: px(8281054, 1920, 1200),
    planeSunset: px(8281056),
    kaabaAerial: px(38546883, 1800, 1100),
    kaabaPilgrims: px(12721555),
    kaabaClose: px(2895295),
    masjidHaram: px(35332385),
    hajjCrowd: px(35446836),
    nabawi: px(38498727),
    nabawiMinarets: px(33169796),
    airportCheckin: px(3943950),
    airportCounter: px(32223420),
    camelCaravan: px(30320422),
    camelRide: px(12214734),
    desertTent: px(10541223),
    dunes: px(3909922),
    agadirBeach: px(22397339),
    agadirCoast: px(34855142),
    suvRoad: px(32217815, 1800, 1100),
    blackSuv: px(32217821),
    whiteSuvDesert: px(20584984),
  },

  blog: {
    omraGuide: px(12721555),
    hajjGuide: px(35446836),
    rentalGuide: px(32217815),
  },
} as const;

export type CarImageKey = keyof (typeof siteImages)["cars"];
