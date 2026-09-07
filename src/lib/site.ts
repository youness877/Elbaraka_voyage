import { siteImages } from "./image-urls";

/**
 * Informations canoniques de l'entreprise — NAP (Name, Address, Phone).
 * Ces données sont réutilisées partout : footer, pages, schémas JSON-LD.
 * Ne jamais les déformer d'une page à l'autre (cohérence Local SEO).
 */
export const site = {
  name: "El Baraka Voyages × Archi Cars",
  shortName: "El Baraka Voyages",
  brandArabic: "البركة للأسفار",
  tagline: "Agence de voyages & location de voitures à Biougra, Agadir",
  // Source unique de l'URL canonique du site : réutilisée par metadataBase,
  // canonical, sitemap, robots.txt et tout le JSON-LD (voir src/lib/seo.ts).
  // Ce fallback DOIT rester le domaine réellement servi en production.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://elbarakvoyage.netlify.app").replace(/\/$/, ""),
  description: {
    fr: "El Baraka Voyages × Archi Cars : agence de voyages à Biougra, Agadir. Omra, Hajj, billetterie Saudia & Qatar Airways, et location de voitures récentes à Biougra, Aït Melloul et Agadir.",
    ar: "البركة للأسفار × أرشي كارز: وكالة أسفار ببيوكرى، أكادير. العمرة، الحج، تذاكر السعودية وقطر للطيران، وكراء سيارات حديثة ببيوكرى وآيت ملول وأكادير.",
  },
  email: "archicars@gmail.com",
  phones: [
    {
      label: { fr: "Mobile / WhatsApp", ar: "الهاتف المحمول / واتساب" },
      display: "06 61 40 32 98",
      href: "tel:+212661403298",
      intl: "+212 6 61 40 32 98",
    },
    {
      label: { fr: "Fixe agence", ar: "هاتف الوكالة الثابت" },
      display: "05 28 81 06 61",
      href: "tel:+212528810661",
      intl: "+212 5 28 81 06 61",
    },
    {
      label: { fr: "Mobile 2", ar: "الهاتف المحمول 2" },
      display: "06 61 40 32 76",
      href: "tel:+212661403276",
      intl: "+212 6 61 40 32 76",
    },
  ],
  whatsapp:
    "https://wa.me/212661403298?text=" +
    encodeURIComponent(
      "Bonjour El Baraka Voyages, je souhaite un renseignement (voyage / location de voiture)."
    ),
  address: {
    street: { fr: "Avenue Mohammed V, Centre", ar: "شارع محمد الخامس، الوسط" },
    city: { fr: "Biougra", ar: "بيوكرى" },
    postal: "83300",
    region: { fr: "Chtouka-Aït Baha", ar: "الشتوكة آيت باها" },
    prefecture: { fr: "Agadir — Souss-Massa", ar: "أكادير — سوس ماسة" },
    country: { fr: "Maroc", ar: "المغرب" },
    countryCode: "MA",
    oneLine: {
      fr: "Avenue Mohammed V, Biougra 83300, Agadir, Maroc",
      ar: "شارع محمد الخامس، بيوكرى 83300، أكادير، المغرب",
    },
  },
  geo: { lat: 30.2135, lng: -9.3706 },
  maps: {
    embed:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("Biougra, Chtouka Aït Baha, Maroc") +
      "&z=13&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("El Baraka Voyages, Avenue Mohammed V, Biougra, Maroc"),
  },
  hours: [
    { days: { fr: "Lundi", ar: "الإثنين" }, time: "08h30 – 19h00" },
    { days: { fr: "Mardi", ar: "الثلاثاء" }, time: "08h30 – 19h00" },
    { days: { fr: "Mercredi", ar: "الأربعاء" }, time: "08h30 – 19h00" },
    { days: { fr: "Jeudi", ar: "الخميس" }, time: "08h30 – 19h00" },
    { days: { fr: "Vendredi", ar: "الجمعة" }, time: "08h30 – 19h00" },
    { days: { fr: "Samedi", ar: "السبت" }, time: "08h30 – 19h00" },
    { days: { fr: "Dimanche", ar: "الأحد" }, time: "Fermé / مغلق" },
  ],
  openingHoursSchema: ["Mo-Sa 08:30-19:00"],
  social: {
    facebook: "https://share.google/W87fzpakm5KsLmCh6",
    instagram: "https://www.instagram.com/elbaraka_voyages?igsi=anpraTF3cWozaXpy",
  },
  partnerAirlines: ["Saudia", "Qatar Airways"],
  airports: ["Aéroport Agadir Al Massira (AGA)"],
} as const;

/**
 * Liens de navigation — `key` référence une entrée du dictionnaire
 * (`t.nav.<key>`) au lieu d'un libellé figé, pour que Navbar/Footer
 * affichent automatiquement le bon texte selon la langue active.
 */
export const navLinks = [
  { href: "/", key: "home" },
  { href: "/voyages", key: "trips" },
  { href: "/location-voitures", key: "cars" },
  { href: "/a-propos", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * OBJET IMAGES LEGACY — conservé pour rétro-compatibilité des consommateurs.
 * ⚠️ La source de vérité est désormais `siteImages` dans `@/lib/image-urls`.
 * Les valeurs sont de simples références vers ce fichier central.
 */
export const images = {
  heroPlane: siteImages.travel.heroPlane,
  planeSunset: siteImages.travel.planeSunset,
  kaabaAerial: siteImages.travel.kaabaAerial,
  kaabaPilgrims: siteImages.travel.kaabaPilgrims,
  kaabaClose: siteImages.travel.kaabaClose,
  masjidHaram: siteImages.travel.masjidHaram,
  hajjCrowd: siteImages.travel.hajjCrowd,
  nabawi: siteImages.travel.nabawi,
  nabawiMinarets: siteImages.travel.nabawiMinarets,
  airportCheckin: siteImages.travel.airportCheckin,
  airportCounter: siteImages.travel.airportCounter,
  camelCaravan: siteImages.travel.camelCaravan,
  camelRide: siteImages.travel.camelRide,
  desertTent: siteImages.travel.desertTent,
  dunes: siteImages.travel.dunes,
  agadirBeach: siteImages.travel.agadirBeach,
  agadirCoast: siteImages.travel.agadirCoast,
  suvRoad: siteImages.travel.suvRoad,
  blackSuv: siteImages.travel.blackSuv,
  whiteSuvDesert: siteImages.travel.whiteSuvDesert,
  storefront: siteImages.storefront,
} as const;
