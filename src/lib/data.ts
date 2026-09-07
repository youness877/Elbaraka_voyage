import type { Localized } from "@/i18n/pick";
import { siteImages } from "./image-urls";

/* ———————————————————— LOCATION DE VOITURES — ARCHI CARS ———————————————————— */

export type CarCategory = "economique" | "compacte" | "suv" | "premium";

export interface Car {
  slug: string;
  name: string;
  category: CarCategory;
  categoryLabel: Localized;
  pricePerDay: number; // MAD
  longTermNote?: Localized;
  image: string;
  seats: number;
  doors: number;
  transmission: "manuelle" | "automatique";
  fuel: "essence" | "diesel";
  luggage: Localized;
  features: Localized[];
  badge?: Localized;
}

export const carCategories: { key: CarCategory | "tous"; label: Localized }[] = [
  { key: "tous", label: { fr: "Toute la flotte", ar: "كل الأسطول" } },
  { key: "economique", label: { fr: "Économique", ar: "اقتصادية" } },
  { key: "compacte", label: { fr: "Compacte", ar: "مدمجة" } },
  { key: "suv", label: { fr: "SUV & 4×4", ar: "SUV و4×4" } },
  { key: "premium", label: { fr: "Premium", ar: "بريميوم" } },
];

export const cars: Car[] = [
  {
    slug: "kia-picanto",
    name: "Kia Picanto",
    category: "economique",
    categoryLabel: { fr: "Économique", ar: "اقتصادية" },
    pricePerDay: 250,
    longTermNote: { fr: "-15 % dès 7 jours", ar: "-15٪ ابتداءً من 7 أيام" },
    image: siteImages.cars["kia-picanto"],
    seats: 5,
    doors: 5,
    transmission: "manuelle",
    fuel: "essence",
    luggage: { fr: "1 valise cabine", ar: "حقيبة يد واحدة" },
    features: [
      { fr: "Climatisation", ar: "تكييف الهواء" },
      { fr: "Bluetooth / USB", ar: "بلوتوث / USB" },
      { fr: "Vitres électriques", ar: "نوافذ كهربائية" },
      { fr: "Faible consommation", ar: "استهلاك منخفض للوقود" },
    ],
    badge: { fr: "Petit prix", ar: "سعر مناسب" },
  },
  {
    slug: "dacia-sandero-stepway",
    name: "Dacia Sandero Stepway",
    category: "economique",
    categoryLabel: { fr: "Économique", ar: "اقتصادية" },
    pricePerDay: 300,
    longTermNote: { fr: "-15 % dès 7 jours", ar: "-15٪ ابتداءً من 7 أيام" },
    image: siteImages.cars["dacia-sandero-stepway"],
    seats: 5,
    doors: 5,
    transmission: "manuelle",
    fuel: "essence",
    luggage: { fr: "2 valises", ar: "حقيبتان" },
    features: [
      { fr: "Climatisation", ar: "تكييف الهواء" },
      { fr: "Écran tactile", ar: "شاشة تعمل باللمس" },
      { fr: "Caméra de recul", ar: "كاميرا الرجوع للخلف" },
      { fr: "Barres de toit", ar: "حاملات سقف" },
    ],
  },
  {
    slug: "dacia-logan",
    name: "Dacia Logan",
    category: "compacte",
    categoryLabel: { fr: "Compacte", ar: "مدمجة" },
    pricePerDay: 320,
    longTermNote: { fr: "-10 % dès 15 jours", ar: "-10٪ ابتداءً من 15 يوماً" },
    image: siteImages.cars["dacia-logan"],
    seats: 5,
    doors: 4,
    transmission: "manuelle",
    fuel: "diesel",
    luggage: { fr: "Coffre 510 L", ar: "صندوق 510 لتر" },
    features: [
      { fr: "Grand coffre famille", ar: "صندوق واسع للعائلة" },
      { fr: "Climatisation", ar: "تكييف الهواء" },
      { fr: "Bluetooth", ar: "بلوتوث" },
      { fr: "Idéale longs trajets", ar: "مثالية للرحلات الطويلة" },
    ],
    badge: { fr: "Familles", ar: "للعائلات" },
  },
  {
    slug: "renault-clio-5",
    name: "Renault Clio 5",
    category: "compacte",
    categoryLabel: { fr: "Compacte", ar: "مدمجة" },
    pricePerDay: 350,
    longTermNote: { fr: "-10 % dès 7 jours", ar: "-10٪ ابتداءً من 7 أيام" },
    image: siteImages.cars["renault-clio-5"],
    seats: 5,
    doors: 5,
    transmission: "manuelle",
    fuel: "diesel",
    luggage: { fr: "2 valises", ar: "حقيبتان" },
    features: [
      { fr: "Écran 7\" avec CarPlay", ar: "شاشة 7 بوصة مع CarPlay" },
      { fr: "Climatisation auto", ar: "تكييف أوتوماتيكي" },
      { fr: "Régulateur", ar: "مثبت السرعة" },
      { fr: "Feux LED", ar: "أضواء LED" },
    ],
    badge: { fr: "La plus demandée", ar: "الأكثر طلباً" },
  },
  {
    slug: "peugeot-208",
    name: "Peugeot 208",
    category: "compacte",
    categoryLabel: { fr: "Compacte", ar: "مدمجة" },
    pricePerDay: 400,
    image: siteImages.cars["peugeot-208"],
    seats: 5,
    doors: 5,
    transmission: "manuelle",
    fuel: "essence",
    luggage: { fr: "2 valises", ar: "حقيبتان" },
    features: [
      { fr: "i-Cockpit 3D", ar: "لوحة قيادة i-Cockpit ثلاثية الأبعاد" },
      { fr: "CarPlay / Android Auto", ar: "CarPlay / Android Auto" },
      { fr: "Climatisation auto", ar: "تكييف أوتوماتيكي" },
      { fr: "Aide au stationnement", ar: "مساعد ركن السيارة" },
    ],
  },
  {
    slug: "dacia-duster",
    name: "Dacia Duster",
    category: "suv",
    categoryLabel: { fr: "SUV & 4×4", ar: "SUV و4×4" },
    pricePerDay: 550,
    longTermNote: { fr: "-12 % dès 7 jours", ar: "-12٪ ابتداءً من 7 أيام" },
    image: siteImages.cars["dacia-duster"],
    seats: 5,
    doors: 5,
    transmission: "manuelle",
    fuel: "diesel",
    luggage: { fr: "Coffre 445 L", ar: "صندوق 445 لتر" },
    features: [
      { fr: "Position surélevée", ar: "وضعية قيادة مرتفعة" },
      { fr: "Climatisation", ar: "تكييف الهواء" },
      { fr: "Caméra de recul", ar: "كاميرا الرجوع للخلف" },
      { fr: "Parfait région d'Agadir", ar: "مثالية لمنطقة أكادير" },
    ],
    badge: { fr: "Top vente", ar: "الأكثر مبيعاً" },
  },
  {
    slug: "hyundai-tucson",
    name: "Hyundai Tucson",
    category: "suv",
    categoryLabel: { fr: "SUV & 4×4", ar: "SUV و4×4" },
    pricePerDay: 750,
    image: siteImages.cars["hyundai-tucson"],
    seats: 5,
    doors: 5,
    transmission: "automatique",
    fuel: "diesel",
    luggage: { fr: "Coffre 513 L", ar: "صندوق 513 لتر" },
    features: [
      { fr: "Boîte automatique", ar: "ناقل حركة أوتوماتيكي" },
      { fr: "Écran 10,25\"", ar: "شاشة 10.25 بوصة" },
      { fr: "CarPlay sans fil", ar: "CarPlay لاسلكي" },
      { fr: "Confort longue distance", ar: "راحة للمسافات الطويلة" },
    ],
  },
  {
    slug: "mercedes-classe-c",
    name: "Mercedes Classe C",
    category: "premium",
    categoryLabel: { fr: "Premium", ar: "بريميوم" },
    pricePerDay: 1400,
    image: siteImages.cars["mercedes-classe-c"],
    seats: 5,
    doors: 4,
    transmission: "automatique",
    fuel: "diesel",
    luggage: { fr: "3 valises", ar: "3 حقائب" },
    features: [
      { fr: "Intérieur cuir", ar: "تجهيزات داخلية جلدية" },
      { fr: "GPS intégré", ar: "نظام ملاحة GPS مدمج" },
      { fr: "Toit ouvrant", ar: "سقف قابل للفتح" },
      { fr: "Mariages & événements", ar: "أعراس ومناسبات" },
    ],
    badge: { fr: "Premium", ar: "بريميوم" },
  },
];

export const rentalTerms: { question: Localized; answer: Localized }[] = [
  {
    question: {
      fr: "Quel âge faut-il avoir pour louer une voiture chez Archi Cars ?",
      ar: "ما هو السن المطلوب لكراء سيارة لدى أرشي كارز؟",
    },
    answer: {
      fr: "L'âge minimum est de 21 ans révolus avec un permis de conduire valide depuis au moins 2 ans pour les catégories Économique et Compacte. Pour les SUV & 4×4 et la gamme Premium, le conducteur doit avoir au moins 25 ans et 3 ans de permis.",
      ar: "السن الأدنى هو 21 سنة كاملة برخصة سياقة سارية المفعول منذ سنتين على الأقل بالنسبة لفئتي الاقتصادية والمدمجة. أما بالنسبة لفئتي SUV و4×4 وفئة بريميوم، يجب أن يكون السائق بالغاً 25 سنة على الأقل وحاصلاً على رخصة السياقة منذ 3 سنوات.",
    },
  },
  {
    question: {
      fr: "Quels documents sont nécessaires pour la location ?",
      ar: "ما هي الوثائق اللازمة للكراء؟",
    },
    answer: {
      fr: "Pour les résidents marocains : CIN en cours de validité et permis de conduire original. Pour les touristes et MRE : passeport, permis national (les permis européens et du Golfe sont acceptés) ; un permis international est recommandé pour les permis rédigés en alphabet non latin. Une pièce d'identité du second conducteur est exigée s'il y a lieu.",
      ar: "بالنسبة للمقيمين بالمغرب: بطاقة التعريف الوطنية سارية المفعول ورخصة السياقة الأصلية. بالنسبة للسياح والمغاربة المقيمين بالخارج: جواز السفر، رخصة السياقة الوطنية (الرخص الأوروبية ورخص دول الخليج مقبولة)؛ ويُنصح برخصة سياقة دولية للرخص المكتوبة بأبجدية غير لاتينية. تُطلب بطاقة هوية السائق الثاني عند الاقتضاء.",
    },
  },
  {
    question: {
      fr: "Comment se passent la caution et le paiement ?",
      ar: "كيف يتم التعامل مع الضمان والأداء؟",
    },
    answer: {
      fr: "Une caution est demandée à la prise du véhicule : de 2 000 DH pour les citadines à 10 000 DH pour la gamme Premium, payable en espèces ou par empreinte bancaire, et restituée au retour du véhicule en l'état. La location se règle en espèces, par virement ou par carte sur demande. Aucun frais caché : le tarif annoncé est le tarif payé.",
      ar: "يُطلب ضمان عند استلام المركبة: من 2000 درهم للسيارات المدينية إلى 10000 درهم لفئة بريميوم، يُدفع نقداً أو ببصمة بنكية، ويُسترجع عند إعادة المركبة بحالتها. تتم تسوية الكراء نقداً أو بتحويل بنكي أو بالبطاقة عند الطلب. لا رسوم خفية: السعر المعلن هو السعر المدفوع.",
    },
  },
  {
    question: {
      fr: "L'assurance est-elle incluse dans le prix ?",
      ar: "هل التأمين مشمول في السعر؟",
    },
    answer: {
      fr: "Oui. Tous nos véhicules sont couverts par une assurance tous risques avec franchise. L'assistance dépannage 24h/24 est incluse sur tout le territoire national. Une option « rachat de franchise » est proposée à partir de 50 DH / jour pour rouler l'esprit tranquille.",
      ar: "نعم. جميع مركباتنا مؤمَّنة بتأمين شامل مع نسبة تحمل. مساعدة الإصلاح على مدار الساعة مشمولة في كامل التراب الوطني. يُقترح خيار «إلغاء نسبة التحمل» ابتداءً من 50 درهم/اليوم لقيادة براحة بال تامة.",
    },
  },
  {
    question: {
      fr: "Quelle est la politique kilométrique et carburant ?",
      ar: "ما هي سياسة الكيلومترات والوقود؟",
    },
    answer: {
      fr: "Le kilométrage est illimité pour toute location de 3 jours et plus (200 km / jour inclus en deçà, puis 1 DH / km supplémentaire). Le véhicule est remis avec le plein ou un niveau convenu et doit être restitué au même niveau : politique « plein contre plein », sans surcoût.",
      ar: "الكيلومترات غير محدودة لكل كراء يمتد 3 أيام فأكثر (200 كلم/اليوم مشمولة دون ذلك، ثم درهم واحد لكل كيلومتر إضافي). تُسلَّم المركبة بخزان ممتلئ أو بمستوى متفق عليه ويجب إعادتها بنفس المستوى: سياسة «خزان ممتلئ مقابل خزان ممتلئ»، دون رسوم إضافية.",
    },
  },
  {
    question: {
      fr: "Livrez-vous à l'aéroport Agadir Al Massira ou à domicile ?",
      ar: "هل توصلون إلى مطار أكادير المسيرة أو إلى المنزل؟",
    },
    answer: {
      fr: "Oui. La livraison et la restitution sont gratuites à Biougra, Aït Melloul et Inezgane. Livraison possible à l'aéroport Agadir Al Massira (AGA), à Agadir centre et à Taghazout moyennant un forfait de 150 DH. Nous suivons votre vol en cas de retard, de jour comme de nuit.",
      ar: "نعم. التوصيل والاسترجاع مجانيان ببيوكرى وآيت ملول وإنزكان. التوصيل ممكن إلى مطار أكادير المسيرة (AGA) ووسط أكادير وتغازوت مقابل مبلغ ثابت قدره 150 درهم. نتتبع رحلتكم الجوية في حال التأخر، نهاراً أو ليلاً.",
    },
  },
];

/* ———————————————————— VOYAGES — EL BARAKA VOYAGES ———————————————————— */

export interface UmrahPackage {
  slug: string;
  name: Localized;
  period: Localized;
  nightsMakkah: number;
  nightsMadinah: number;
  hotelStars: number;
  distanceMakkah: Localized;
  airline: Localized;
  board: Localized;
  priceFrom: number; // MAD / personne
  includes: Localized[];
  featured?: boolean;
}

export const umrahPackages: UmrahPackage[] = [
  {
    slug: "omra-economique",
    name: { fr: "Omra Économique", ar: "عمرة اقتصادية" },
    period: { fr: "Départs toute l'année, hors Ramadan", ar: "انطلاقات طوال السنة، باستثناء رمضان" },
    nightsMakkah: 9,
    nightsMadinah: 5,
    hotelStars: 3,
    distanceMakkah: { fr: "≈ 1 200 m du Haram (navettes)", ar: "≈ 1200 متر من الحرم (حافلات نقل)" },
    airline: { fr: "Saudia, via Casablanca", ar: "الخطوط السعودية، عبر الدار البيضاء" },
    board: { fr: "Petit-déjeuner", ar: "الإفطار فقط" },
    priceFrom: 13900,
    includes: [
      { fr: "Vol A/R Agadir – Djeddah (via Casablanca) en classe économique", ar: "رحلة ذهاب وإياب أكادير – جدة (عبر الدار البيضاء) بالدرجة الاقتصادية" },
      { fr: "Visa Omra + inscription sur l'application Nusuk", ar: "تأشيرة العمرة + التسجيل على تطبيق نسك" },
      { fr: "Hôtels 3★ : 9 nuits à Makkah, 5 nuits à Madinah", ar: "فنادق 3 نجوم: 9 ليالٍ بمكة، 5 ليالٍ بالمدينة" },
      { fr: "Transferts privés en bus climatisé", ar: "نقل خاص بحافلة مكيفة" },
      { fr: "Visites guidées : Mont du Pardon, Quba, Uhud…", ar: "زيارات مُرشَدة: جبل الرحمة، قباء، أحد…" },
      { fr: "Accompagnateur religieux parlant arabe, français et amazigh", ar: "مرافق ديني يتحدث العربية والفرنسية والأمازيغية" },
    ],
  },
  {
    slug: "omra-confort",
    name: { fr: "Omra Confort", ar: "عمرة مريحة" },
    period: { fr: "Départs toute l'année + vacances scolaires", ar: "انطلاقات طوال السنة + العطل المدرسية" },
    nightsMakkah: 7,
    nightsMadinah: 5,
    hotelStars: 4,
    distanceMakkah: { fr: "≈ 450 m du Haram", ar: "≈ 450 متر من الحرم" },
    airline: { fr: "Saudia ou Qatar Airways", ar: "الخطوط السعودية أو القطرية" },
    board: { fr: "Demi-pension", ar: "نصف إقامة" },
    priceFrom: 17900,
    includes: [
      { fr: "Vol A/R au départ d'Agadir ou de Casablanca", ar: "رحلة ذهاب وإياب انطلاقاً من أكادير أو الدار البيضاء" },
      { fr: "Visa Omra + assistance Nusuk et permis de Rawda", ar: "تأشيرة العمرة + مساعدة نسك وتصريح الروضة" },
      { fr: "Hôtels 4★ proches du Haram à Makkah et à Madinah", ar: "فنادق 4 نجوم قريبة من الحرم بمكة والمدينة" },
      { fr: "Demi-pension (petit-déjeuner + dîner)", ar: "نصف إقامة (إفطار + عشاء)" },
      { fr: "Bagage 2 × 23 kg + 10 L d'eau de Zamzam offerts", ar: "أمتعة 2×23 كلغ + 10 لترات من ماء زمزم هدية" },
      { fr: "Encadrement religieux et assistance 24h/7j sur place", ar: "مواكبة دينية ومساعدة على مدار الساعة هناك" },
    ],
    featured: true,
  },
  {
    slug: "omra-prestige",
    name: { fr: "Omra Prestige — Vue Haram", ar: "عمرة فاخرة — إطلالة على الحرم" },
    period: { fr: "Départs toute l'année, sur réservation", ar: "انطلاقات طوال السنة، بالحجز" },
    nightsMakkah: 6,
    nightsMadinah: 4,
    hotelStars: 5,
    distanceMakkah: { fr: "≈ 150 m — vue Kaaba", ar: "≈ 150 متر — إطلالة على الكعبة" },
    airline: { fr: "Qatar Airways (via Doha)", ar: "القطرية (عبر الدوحة)" },
    board: { fr: "Pension complète", ar: "إقامة كاملة" },
    priceFrom: 24900,
    includes: [
      { fr: "Vol A/R en cabine supérieure avec Qatar Airways", ar: "رحلة ذهاب وإياب بدرجة رجال الأعمال مع القطرية" },
      { fr: "Hôtels 5★ : chambre vue Haram à Makkah, face au Prophète ﷺ à Madinah", ar: "فنادق 5 نجوم: غرفة بإطلالة على الحرم بمكة، مقابل الروضة الشريفة بالمدينة" },
      { fr: "Pension complète (buffets internationaux)", ar: "إقامة كاملة (بوفيهات عالمية)" },
      { fr: "Transferts privés VIP et accueil à l'aéroport", ar: "نقل خاص VIP واستقبال بالمطار" },
      { fr: "Guide religieux dédié au groupe", ar: "مرشد ديني مخصص للمجموعة" },
      { fr: "Assurance voyage premium incluse", ar: "تأمين سفر متميز مشمول" },
    ],
  },
  {
    slug: "omra-ramadan",
    name: { fr: "Omra Ramadan", ar: "عمرة رمضان" },
    period: { fr: "10 derniers jours de Ramadan — places limitées", ar: "العشر الأواخر من رمضان — أماكن محدودة" },
    nightsMakkah: 10,
    nightsMadinah: 5,
    hotelStars: 4,
    distanceMakkah: { fr: "≈ 600 m du Haram (navettes)", ar: "≈ 600 متر من الحرم (حافلات نقل)" },
    airline: { fr: "Saudia", ar: "الخطوط السعودية" },
    board: { fr: "Iftar + Suhour", ar: "إفطار + سحور" },
    priceFrom: 21900,
    includes: [
      { fr: "Vol A/R et nuitées alignées sur les 10 derniers jours", ar: "رحلة ذهاب وإياب وإقامة متزامنة مع العشر الأواخر" },
      { fr: "Repas d'Iftar et de Suhour servis à l'hôtel", ar: "وجبات الإفطار والسحور تُقدَّم بالفندق" },
      { fr: "Tarawih au Haram avec groupe encadré", ar: "صلاة التراويح بالحرم مع مجموعة مُواكَبة" },
      { fr: "Visa Omra Ramadan et permis Nusuk gérés par nos soins", ar: "تأشيرة عمرة رمضان وتصريح نسك يتكفل بهما فريقنا" },
      { fr: "Transferts et visites inclus", ar: "النقل والزيارات مشمولة" },
      { fr: "Réunion de préparation avant le départ à l'agence", ar: "اجتماع تحضيري قبل السفر بالوكالة" },
    ],
  },
];

export const hajjInfo = {
  title: { fr: "Hajj — cinquième pilier de l'Islam", ar: "الحج — الركن الخامس من أركان الإسلام" } as Localized,
  points: [
    {
      fr: "Inscription au tirage au sort national (Tatwir) : nous vous accompagnons gratuitement dans la constitution du dossier auprès des autorités locales de Biougra et de la province Chtouka-Aït Baha.",
      ar: "التسجيل في القرعة الوطنية (تطوير): نرافقكم مجاناً في تكوين الملف لدى السلطات المحلية ببيوكرى وإقليم الشتوكة آيت باها.",
    },
    {
      fr: "Suivi du statut de votre candidature et assistance dès la publication des listes de retenus.",
      ar: "تتبع حالة ترشيحكم والمساعدة فور نشر لوائح المقبولين.",
    },
    {
      fr: "Formules « Bitaqat Alwissam » du Ministère des Habous : réservation, paiement échelonné et préparation du voyage avec notre agence.",
      ar: "برامج «بطاقة الوسام» التابعة لوزارة الأوقاف: الحجز، الأداء بالتقسيط والتحضير للرحلة مع وكالتنا.",
    },
    {
      fr: "Atelier de préparation rituelle avant départ : rites du Hajj, formalités santé (vaccins exigés par l'Arabie Saoudite) et bagages.",
      ar: "ورشة تحضير روحي قبل السفر: مناسك الحج، الإجراءات الصحية (اللقاحات التي تطلبها السلطات السعودية) والأمتعة.",
    },
  ] as Localized[],
};

export const circuits: { name: Localized; detail: Localized; image: keyof typeof import("./site").images }[] = [
  {
    image: "dunes",
    name: { fr: "Grand Sud & Désert — 4 jours", ar: "الجنوب الكبير والصحراء — 4 أيام" },
    detail: {
      fr: "Merzouga, dunes de l'Erg Chebbi, nuit en bivouac, Todra et Ouarzazate. Départs en groupe chaque mois depuis Agadir.",
      ar: "مرزوكة، كثبان اركّ الشبي، ليلة بمخيم، تودرا وورزازات. انطلاقات جماعية شهرياً من أكادير.",
    },
  },
  {
    image: "camelCaravan",
    name: { fr: "Aït Ben Haddou & Ouarzazate — 2 jours", ar: "آيت بن حدو وورزازات — يومان" },
    detail: {
      fr: "La kasbah classée UNESCO, les studios de cinéma et la vallée de l'Ounila. Idéal familles et associations.",
      ar: "القصبة المصنفة تراثاً عالمياً، استوديوهات السينما ووادي أونيلا. مثالية للأسر والجمعيات.",
    },
  },
  {
    image: "agadirCoast",
    name: { fr: "Côte d'Agadir & Vallée du Paradis — 1 jour", ar: "ساحل أكادير ووادي الجنة — يوم واحد" },
    detail: {
      fr: "Excursion guidée : plage d'Agadir, Immouzer et piscines naturelles de la Vallée du Paradis.",
      ar: "رحلة مُرشَدة: شاطئ أكادير، إمّوزار والبرك الطبيعية بوادي الجنة.",
    },
  },
];

export const ticketingDestinations: Localized[] = [
  { fr: "Istanbul", ar: "إسطنبول" },
  { fr: "Le Caire", ar: "القاهرة" },
  { fr: "Dubaï", ar: "دبي" },
  { fr: "Doha", ar: "الدوحة" },
  { fr: "Riyad & Djeddah", ar: "الرياض وجدة" },
  { fr: "Paris", ar: "باريس" },
  { fr: "Bruxelles", ar: "بروكسل" },
  { fr: "Madrid", ar: "مدريد" },
  { fr: "Dakar", ar: "داكار" },
  { fr: "Tunis", ar: "تونس" },
];

/* ———————————————————— TÉMOIGNAGES ———————————————————— */

export interface Testimonial {
  name: Localized;
  origin: Localized;
  context: Localized;
  quote: Localized;
  rating: 5 | 4;
}

export const testimonials: Testimonial[] = [
  {
    name: { fr: "Youssef Ait Brahim", ar: "يوسف آيت إبراهيم" },
    origin: { fr: "Agadir — Hay Essalam", ar: "أكادير — حي السلام" },
    context: { fr: "Omra Confort, janvier", ar: "عمرة مريحة، يناير" },
    quote: {
      fr: "De l'inscription au retour, tout était parfaitement organisé. L'hôtel était vraiment à quelques minutes du Haram et l'accompagnateur nous a guidés pas à pas. Une Omra sereine, sans aucun souci logistique.",
      ar: "من التسجيل إلى العودة، كان كل شيء منظماً بشكل مثالي. كان الفندق فعلاً على بعد دقائق من الحرم، والمرافق أرشدنا خطوة بخطوة. عمرة هادئة، دون أي مشكل لوجستي.",
    },
    rating: 5,
  },
  {
    name: { fr: "Khadija El Moussaoui", ar: "خديجة الموساوي" },
    origin: { fr: "Biougra", ar: "بيوكرى" },
    context: { fr: "Omra Économique en famille", ar: "عمرة اقتصادية عائلية" },
    quote: {
      fr: "Nous sommes partis à cinq. Prix honnête, visa obtenu rapidement et réunion de préparation très utile avant le départ. Je recommande El Baraka à toutes les familles de la région.",
      ar: "سافرنا خمسة أفراد. سعر منصف، تأشيرة تم الحصول عليها بسرعة، واجتماع تحضيري مفيد جداً قبل السفر. أنصح بالبركة لكل أسر الجهة.",
    },
    rating: 5,
  },
  {
    name: { fr: "Mohamed Ouahbi", ar: "محمد الوهابي" },
    origin: { fr: "Aït Melloul", ar: "آيت ملول" },
    context: { fr: "Location Dacia Duster, 10 jours", ar: "كراء داسيا دوستر، 10 أيام" },
    quote: {
      fr: "Voiture récente, propre, climatisation impeccable. Livrée à l'aéroport d'Agadir à 23h30 sans supplément caché. Le tarif annoncé au téléphone était le tarif payé. Très professionnel.",
      ar: "سيارة حديثة، نظيفة، وتكييف ممتاز. سُلِّمت بمطار أكادير على الساعة 23:30 دون أي رسوم خفية. السعر المُعلن بالهاتف هو السعر المدفوع. احترافية عالية.",
    },
    rating: 5,
  },
  {
    name: { fr: "Fatima Zahra Bennani", ar: "فاطمة الزهراء بناني" },
    origin: { fr: "Biougra", ar: "بيوكرى" },
    context: { fr: "Billets Agadir – Istanbul (Qatar Airways)", ar: "تذاكر أكادير – إسطنبول (القطرية)" },
    quote: {
      fr: "Ils m'ont trouvé un tarif imbattable quelques jours avant le départ, avec la bonne correspondance à Doha. Service rapide sur WhatsApp et billet reçu dans l'heure.",
      ar: "وجدوا لي سعراً لا يُقاوَم قبل أيام قليلة من السفر، مع أفضل ارتباط بالدوحة. خدمة سريعة عبر واتساب واستلمت التذكرة خلال ساعة.",
    },
    rating: 5,
  },
  {
    name: { fr: "Abderrahim Lahlou", ar: "عبد الرحيم لحلو" },
    origin: { fr: "Taroudant", ar: "تارودانت" },
    context: { fr: "Location Clio 5, un mois", ar: "كراء كليو 5، لمدة شهر" },
    quote: {
      fr: "Location longue durée pour mes vacances d'été : tarif dégressif respecté, entretien suivi et échange de véhicule proposé à mi-parcours. Une agence sérieuse et de confiance.",
      ar: "كراء طويل المدة لعطلتي الصيفية: سعر تنازلي محترم، صيانة متابَعة، واقتراح تبديل المركبة في منتصف المدة. وكالة جادة وموثوقة.",
    },
    rating: 5,
  },
  {
    name: { fr: "Malika Bouziane", ar: "مليكة بوزيان" },
    origin: { fr: "Inezgane", ar: "إنزكان" },
    context: { fr: "Omra Ramadan", ar: "عمرة رمضان" },
    quote: {
      fr: "Vivre les dix derniers jours de Ramadan à Makkah était un rêve. Iftar, Tarawih, transferts : tout était minuté. Merci à toute l'équipe d'El Baraka pour ce voyage inoubliable.",
      ar: "عيش العشر الأواخر من رمضان بمكة كان حلماً. الإفطار، التراويح، النقل: كل شيء كان مضبوطاً بدقة. شكراً لفريق البركة على هذه الرحلة التي لا تُنسى.",
    },
    rating: 5,
  },
];

/* ———————————————————— FAQ ———————————————————— */

export interface Faq {
  question: Localized;
  answer: Localized;
  category: "omra" | "hajj" | "billets" | "location";
}

export const faqs: Faq[] = [
  {
    category: "omra",
    question: {
      fr: "Quels documents faut-il pour réserver une Omra au départ d'Agadir ?",
      ar: "ما هي الوثائق اللازمة لحجز عمرة انطلاقاً من أكادير؟",
    },
    answer: {
      fr: "Un passeport marocain valide au moins 6 mois après la date de retour, une photo d'identité récente et, pour les femmes de moins de 45 ans, un accompagnement conforme à la réglementation en vigueur (nous vous informons des dernières conditions). Nous nous occupons ensuite du visa Omra et de l'enregistrement sur l'application Nusuk.",
      ar: "جواز سفر مغربي ساري المفعول لمدة 6 أشهر على الأقل بعد تاريخ العودة، صورة شمسية حديثة، وبالنسبة للنساء دون 45 سنة، مرافقة وفق التنظيم الساري (نُطلعكم على آخر الشروط). نتكفل بعد ذلك بتأشيرة العمرة والتسجيل على تطبيق نسك.",
    },
  },
  {
    category: "omra",
    question: {
      fr: "Combien de temps avant le départ faut-il réserver son forfait Omra ?",
      ar: "متى يجب حجز برنامج العمرة قبل السفر؟",
    },
    answer: {
      fr: "Idéalement 3 à 6 semaines avant le départ, et dès que possible pour l'Omra de Ramadan, dont les places partent très vite. Un acompte de 30 % confirme la réservation ; le solde est payable avant l'émission des billets. Un échelonnement de paiement est possible à l'agence de Biougra.",
      ar: "يُفضَّل من 3 إلى 6 أسابيع قبل السفر، وفي أقرب وقت ممكن بالنسبة لعمرة رمضان التي تنفد أماكنها بسرعة. عربون 30٪ يؤكد الحجز؛ ويُدفع الباقي قبل إصدار التذاكر. التقسيط ممكن بوكالة بيوكرى.",
    },
  },
  {
    category: "omra",
    question: {
      fr: "Voyages-t-on avec Saudia ou Qatar Airways pour les forfaits Omra ?",
      ar: "هل نسافر مع الخطوط السعودية أو القطرية بالنسبة لبرامج العمرة؟",
    },
    answer: {
      fr: "Oui. El Baraka Voyages est partenaire de Saudia et de Qatar Airways. Selon la formule choisie, vous volez avec Saudia via Casablanca (arrivée directe à Djeddah ou Médine) ou avec Qatar Airways via Doha. Dans les deux cas, les horaires sont choisis pour éviter les longues escales.",
      ar: "نعم. البركة للأسفار شريك للخطوط السعودية والقطرية. حسب البرنامج المختار، تسافرون مع السعودية عبر الدار البيضاء (وصول مباشر لجدة أو المدينة) أو مع القطرية عبر الدوحة. في الحالتين، تُختار المواعيد لتفادي التوقفات الطويلة.",
    },
  },
  {
    category: "hajj",
    question: {
      fr: "L'agence organise-t-elle le Hajj ?",
      ar: "هل تنظم الوكالة رحلة الحج؟",
    },
    answer: {
      fr: "Le Hajj depuis le Maroc est encadré par le Ministère des Habous via un tirage au sort national et les formules « Bitaqat Alwissam ». El Baraka Voyages vous accompagne gratuitement : constitution du dossier de candidature, suivi du tirage, puis préparation du voyage (formalités, vaccins, bagages) si vous êtes retenu.",
      ar: "الحج من المغرب تؤطره وزارة الأوقاف عبر قرعة وطنية وبرامج «بطاقة الوسام». البركة للأسفار ترافقكم مجاناً: تكوين ملف الترشيح، تتبع القرعة، ثم التحضير للرحلة (الإجراءات، اللقاحات، الأمتعة) في حال قبولكم.",
    },
  },
  {
    category: "billets",
    question: {
      fr: "Peut-on acheter un simple billet d'avion sans forfait ?",
      ar: "هل يمكن شراء تذكرة طيران بسيطة دون برنامج؟",
    },
    answer: {
      fr: "Bien sûr. La billetterie est un de nos métiers : nous émettons des billets toutes destinations (Turquie, Égypte, Golfe, Europe, Afrique de l'Ouest…) sur Saudia, Qatar Airways, Royal Air Maroc et les autres grandes compagnies, au départ d'Agadir, de Casablanca ou de Marrakech. Devis gratuit par téléphone ou WhatsApp, émission rapide.",
      ar: "بالطبع. بيع التذاكر أحد مجالات عملنا: نُصدر تذاكر لجميع الوجهات (تركيا، مصر، الخليج، أوروبا، غرب إفريقيا…) عبر السعودية والقطرية والخطوط الملكية المغربية وباقي الشركات الكبرى، انطلاقاً من أكادير أو الدار البيضاء أو مراكش. عرض سعر مجاني بالهاتف أو واتساب، وإصدار سريع.",
    },
  },
  {
    category: "location",
    question: {
      fr: "Quel est le tarif d'une location de voiture à Biougra ?",
      ar: "ما هو سعر كراء سيارة ببيوكرى؟",
    },
    answer: {
      fr: "Nos tarifs démarrent à 250 DH / jour pour une citadine (Kia Picanto), entre 320 et 400 DH / jour pour une compacte familiale, et à partir de 550 DH / jour pour un SUV comme le Dacia Duster. Des remises longue durée (de -10 % à -15 %) s'appliquent automatiquement dès 7 jours. Prix TTC, assurance tous risques incluse.",
      ar: "تبدأ أسعارنا من 250 درهم/اليوم لسيارة مدينية (كيا بيكانتو)، بين 320 و400 درهم/اليوم لسيارة مدمجة عائلية، وابتداءً من 550 درهم/اليوم لسيارة SUV مثل داسيا دوستر. تُطبَّق تخفيضات المدة الطويلة (من -10٪ إلى -15٪) تلقائياً ابتداءً من 7 أيام. السعر شامل الضريبة والتأمين الشامل.",
    },
  },
  {
    category: "location",
    question: {
      fr: "Peut-on ajouter un second conducteur ou un siège bébé ?",
      ar: "هل يمكن إضافة سائق ثانٍ أو مقعد طفل؟",
    },
    answer: {
      fr: "Oui. Le second conducteur est gratuit sur présentation de sa pièce d'identité et de son permis. Siège bébé / rehausseur : 30 DH / jour (offert dès 7 jours). GPS et rehausseur supplémentaire sur demande lors de la réservation.",
      ar: "نعم. السائق الثاني مجاني بتقديم بطاقة هويته ورخصة سياقته. مقعد الطفل / الرافع: 30 درهم/اليوم (مجاني ابتداءً من 7 أيام). GPS ورافع إضافي عند الطلب أثناء الحجز.",
    },
  },
  {
    category: "location",
    question: {
      fr: "Comment se déroule la prise en charge du véhicule ?",
      ar: "كيف تتم عملية استلام المركبة؟",
    },
    answer: {
      fr: "Retrait à l'agence de Biougra (Avenue Mohammed V) ou livraison gratuite à Biougra, Aït Melloul et Inezgane ; livraison possible à l'aéroport Agadir Al Massira et à Agadir. Un état des lieux photo est réalisé ensemble, vous repartez avec votre copie du contrat et notre numéro d'assistance 24h/7j.",
      ar: "الاستلام بوكالة بيوكرى (شارع محمد الخامس) أو توصيل مجاني ببيوكرى وآيت ملول وإنزكان؛ التوصيل ممكن إلى مطار أكادير المسيرة وأكادير. يُنجَز معاينة بالصور معاً، وتغادرون بنسختكم من العقد ورقم مساعدتنا على مدار الساعة.",
    },
  },
];

/* ———————————————————— BLOG ———————————————————— */

export interface PostBlock {
  heading?: Localized;
  paragraphs?: Localized[];
  list?: Localized[];
}

export interface BlogPost {
  slug: string;
  title: Localized;
  metaTitle: Localized;
  description: Localized;
  category: Localized;
  date: string; // ISO
  dateLabel: Localized;
  minutes: number;
  image: string;
  imageAlt: Localized;
  content: PostBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: "omra-depuis-agadir-guide-complet",
    title: {
      fr: "Omra au départ d'Agadir : le guide complet pour bien préparer son voyage",
      ar: "العمرة انطلاقاً من أكادير: الدليل الكامل لتحضير رحلتكم جيداً",
    },
    metaTitle: {
      fr: "Omra depuis Agadir : prix et préparation (2026)",
      ar: "العمرة من أكادير: الأسعار والتحضير (2026)",
    },
    description: {
      fr: "Documents, budget, durée idéale, choix de la formule : tout ce qu'il faut savoir pour préparer votre Omra au départ d'Agadir et de Biougra avec El Baraka Voyages, partenaire Saudia et Qatar Airways.",
      ar: "الوثائق، الميزانية، المدة المثالية، اختيار البرنامج: كل ما يجب معرفته لتحضير عمرتكم انطلاقاً من أكادير وبيوكرى مع البركة للأسفار، شريك السعودية والقطرية.",
    },
    category: { fr: "Omra", ar: "العمرة" },
    date: "2026-01-12",
    dateLabel: { fr: "12 janvier 2026", ar: "12 يناير 2026" },
    minutes: 8,
    image: siteImages.blog.omraGuide,
    imageAlt: {
      fr: "La Kaaba à Makkah entourée de pèlerins — Omra au départ d'Agadir",
      ar: "الكعبة المشرفة بمكة محاطة بالحجاج — العمرة انطلاقاً من أكادير",
    },
    content: [
      {
        paragraphs: [
          {
            fr: "Chaque année, des centaines de familles de la région Souss-Massa — Agadir, Biougra, Aït Melloul, Inezgane, Taroudant — accomplissent la Omra. Bien préparé, ce voyage devient une expérience sereine, de la réservation jusqu'au retour. Voici le guide que nous remettons à chacun de nos pèlerins à l'agence de Biougra.",
            ar: "كل سنة، تؤدي مئات الأسر من جهة سوس ماسة — أكادير، بيوكرى، آيت ملول، إنزكان، تارودانت — مناسك العمرة. وعند حسن التحضير، تتحول هذه الرحلة إلى تجربة هادئة، من الحجز إلى العودة. إليكم الدليل الذي نُسلمه لكل معتمرينا بوكالة بيوكرى.",
          },
        ],
      },
      {
        heading: { fr: "Quels documents préparer ?", ar: "ما هي الوثائق الواجب تحضيرها؟" },
        list: [
          { fr: "Passeport marocain valide au moins 6 mois après la date de retour ;", ar: "جواز سفر مغربي ساري المفعول لمدة 6 أشهر على الأقل بعد تاريخ العودة؛" },
          { fr: "Une photo d'identité récente fond blanc ;", ar: "صورة شمسية حديثة بخلفية بيضاء؛" },
          { fr: "Pour les femmes : justificatif d'accompagnement selon la réglementation en vigueur (nous vérifions votre dossier ensemble) ;", ar: "بالنسبة للنساء: إثبات المرافقة وفق التنظيم الساري (نتحقق من ملفكم معاً)؛" },
          { fr: "Carnet de santé à jour — le vaccin contre la méningite ACWY est exigé par les autorités saoudiennes.", ar: "دفتر صحي محيَّن — لقاح التهاب السحايا ACWY مطلوب من السلطات السعودية." },
        ],
        paragraphs: [
          {
            fr: "Une fois ces pièces réunies, notre équipe dépose la demande de visa Omra et crée votre compte sur Nusuk, l'application officielle indispensable pour réserver les créneaux de Rawda à Médine.",
            ar: "بمجرد جمع هذه الوثائق، يقدم فريقنا طلب تأشيرة العمرة وينشئ حسابكم على نسك، التطبيق الرسمي الضروري لحجز مواعيد الروضة بالمدينة المنورة.",
          },
        ],
      },
      {
        heading: { fr: "Quel budget prévoir pour une Omra depuis Agadir ?", ar: "ما هي الميزانية اللازمة لعمرة من أكادير؟" },
        paragraphs: [
          {
            fr: "Le prix dépend surtout de la proximité de l'hôtel avec le Haram et de la période. En 2026, comptez environ <strong>13 900 DH</strong> pour une formule économique 14 nuits (hôtel 3★ avec navettes), <strong>17 900 DH</strong> pour une formule confort 4★ à environ 450 m, et <strong>24 900 DH</strong> et plus pour un 5★ face au Haram avec pension complète. L'Omra de Ramadan, très demandée, se situe autour de 21 900 DH. Un acompte de 30 % confirme la réservation et un échelonnement est possible à l'agence.",
            ar: "يعتمد السعر بالأساس على قرب الفندق من الحرم وعلى الفترة. في 2026، توقعوا حوالي <strong>13900 درهم</strong> لبرنامج اقتصادي لمدة 14 ليلة (فندق 3 نجوم مع حافلات نقل)، و<strong>17900 درهم</strong> لبرنامج مريح 4 نجوم على بعد حوالي 450 متر، و<strong>24900 درهم</strong> فما فوق لفندق 5 نجوم مقابل الحرم مع إقامة كاملة. عمرة رمضان، المطلوبة بكثرة، تتراوح حول 21900 درهم. عربون 30٪ يؤكد الحجز، والتقسيط ممكن بالوكالة.",
          },
        ],
      },
      {
        heading: { fr: "Saudia ou Qatar Airways : que choisir ?", ar: "السعودية أم القطرية: ماذا نختار؟" },
        paragraphs: [
          {
            fr: "Les deux compagnies partenaires d'El Baraka Voyages offrent un excellent service. Saudia vous fait voyager via Casablanca avec arrivée directe à Djeddah ou à Médine — le trajet le plus court. Qatar Airways passe par Doha avec une cabine récompensée et une franchise bagage généreuse, idéale pour ramener l'eau de Zamzam. Nous comparons les horaires avec vous au moment de la réservation.",
            ar: "الشركتان الشريكتان للبركة للأسفار تقدمان خدمة ممتازة. السعودية تنقلكم عبر الدار البيضاء بوصول مباشر لجدة أو المدينة — أقصر مسار. القطرية تمر عبر الدوحة بمقصورة حائزة على جوائز وسماح أمتعة سخي، مثالي لجلب ماء زمزم. نقارن معكم المواعيد عند الحجز.",
          },
        ],
      },
      {
        heading: { fr: "Combien de nuits réserver ?", ar: "كم عدد الليالي التي يجب حجزها؟" },
        paragraphs: [
          {
            fr: "La formule classique dure 12 à 15 nuits : une première étape à Makkah (6 à 9 nuits) pour la Omra et les prières au Haram, puis 4 à 5 nuits à Médine pour saluer le Prophète ﷺ et visiter Quba, Uhud et Qiblatayn. Partir moins de 10 nuits fatigue les personnes âgées ; au-delà de 15 nuits, le budget hotel augmente vite.",
            ar: "يمتد البرنامج الكلاسيكي من 12 إلى 15 ليلة: مرحلة أولى بمكة (6 إلى 9 ليالٍ) لأداء العمرة والصلاة بالحرم، ثم 4 إلى 5 ليالٍ بالمدينة لزيارة الروضة الشريفة وقباء وأحد والقبلتين. السفر لأقل من 10 ليالٍ يُتعب كبار السن؛ وما فوق 15 ليلة، ترتفع ميزانية الفندقة بسرعة.",
          },
        ],
      },
      {
        heading: { fr: "Les conseils de notre accompagnateur", ar: "نصائح مرافقنا" },
        list: [
          { fr: "Préparez l'ihram dans votre bagage cabine et revêtez-le avant le miqat annoncé en vol ;", ar: "حضّروا الإحرام في حقيبة اليد وارتدوه قبل الميقات المُعلَن أثناء الرحلة؛" },
          { fr: "Emportez des chaussures faciles à enlever et un bagage à main léger entre l'hôtel et le Haram ;", ar: "احملوا أحذية سهلة الخلع وحقيبة يد خفيفة بين الفندق والحرم؛" },
          { fr: "Réservez votre créneau de Rawda sur Nusuk dès l'arrivée à Médine ;", ar: "احجزوا موعد الروضة عبر نسك فور الوصول إلى المدينة؛" },
          { fr: "Hydratez-vous : même en hiver, les journées restent chaudes ;", ar: "اشربوا الماء بانتظام: حتى في الشتاء، تبقى الأيام حارة؛" },
          { fr: "Gardez sur vous la carte de l'hôtel et le numéro de notre assistance 24h/7j.", ar: "احتفظوا ببطاقة الفندق ورقم مساعدتنا على مدار الساعة." },
        ],
        paragraphs: [
          {
            fr: "Envie d'en parler de vive voix ? Passez à l'agence — Avenue Mohammed V, Biougra — ou appelez-nous au 06 61 40 32 98. La réunion de préparation avant départ est offerte à tous nos pèlerins.",
            ar: "ترغبون في الحديث مباشرة؟ مروا بالوكالة — شارع محمد الخامس، بيوكرى — أو اتصلوا بنا على 0661403298. الاجتماع التحضيري قبل السفر مجاني لجميع معتمرينا.",
          },
        ],
      },
    ],
  },
  {
    slug: "hajj-maroc-inscription-tirage-au-sort",
    title: {
      fr: "Hajj au Maroc : inscription, tirage au sort et calendrier expliqués simplement",
      ar: "الحج بالمغرب: التسجيل، القرعة والجدول الزمني بشرح مبسط",
    },
    metaTitle: { fr: "Hajj Maroc : tirage au sort et accompagnement", ar: "الحج بالمغرب: القرعة والمواكبة" },
    description: {
      fr: "Comment s'inscrire au tirage au sort du Hajj au Maroc, quels documents fournir, comment fonctionne le suivi du statut et comment El Baraka Voyages vous accompagne gratuitement à Biougra.",
      ar: "كيفية التسجيل في قرعة الحج بالمغرب، الوثائق المطلوبة، كيفية تتبع حالة الملف، وكيف تُرافقكم البركة للأسفار مجاناً ببيوكرى.",
    },
    category: { fr: "Hajj", ar: "الحج" },
    date: "2025-11-20",
    dateLabel: { fr: "20 novembre 2025", ar: "20 نونبر 2025" },
    minutes: 6,
    image: siteImages.blog.hajjGuide,
    imageAlt: {
      fr: "Pèlerins rassemblés autour de la Kaaba pendant le Hajj",
      ar: "حجاج مجتمعون حول الكعبة المشرفة أثناء الحج",
    },
    content: [
      {
        paragraphs: [
          {
            fr: "Le Hajj est le cinquième pilier de l'Islam. Au Maroc, son organisation est unique : elle passe par le Ministère des Habous et des Affaires islamiques, avec un système de candidature par tirage au sort (Tatwir). Beaucoup de candidats de notre région nous posent les mêmes questions à l'agence de Biougra ; voici les réponses claires.",
            ar: "الحج هو الركن الخامس من أركان الإسلام. بالمغرب، تنظيمه فريد من نوعه: يمر عبر وزارة الأوقاف والشؤون الإسلامية، بنظام ترشيح عن طريق القرعة (تطوير). كثير من مرشحي جهتنا يطرحون علينا نفس الأسئلة بوكالة بيوكرى؛ إليكم الأجوبة الواضحة.",
          },
        ],
      },
      {
        heading: { fr: "Comment fonctionne le tirage au sort ?", ar: "كيف تعمل القرعة؟" },
        paragraphs: [
          {
            fr: "À l'ouverture de la campagne — en général peu après le Hajj précédent — chaque candidat dépose un dossier auprès de la commission provinciale de tutelle. Pour nos habitants : la commission de la province Chtouka-Aït Baha. Les retenus sont ensuite désignés par tirage au sort officiel, par quota régional, avec des listes principales et des listes d'attente.",
            ar: "عند فتح الحملة — عموماً بعد فترة قصيرة من حج السنة السابقة — يودع كل مرشح ملفاً لدى اللجنة الإقليمية الوصية. بالنسبة لسكان جهتنا: لجنة إقليم الشتوكة آيت باها. يُعيَّن المقبولون بعد ذلك بقرعة رسمية، حسب حصة جهوية، مع لوائح رئيسية ولوائح انتظار.",
          },
        ],
      },
      {
        heading: { fr: "Les pièces du dossier de candidature", ar: "وثائق ملف الترشيح" },
        list: [
          { fr: "Copie de la CIN en cours de validité (le conjoint/mahram dépose son propre dossier) ;", ar: "نسخة من بطاقة التعريف الوطنية سارية المفعول (الزوج/المحرم يودع ملفه الخاص)؛" },
          { fr: "Formulaire de candidature dûment rempli auprès de la commission ;", ar: "استمارة الترشيح مملوءة بشكل صحيح لدى اللجنة؛" },
          { fr: "Pour les veufs, divorcés ou les femmes seules : justificatif de mahram selon les consignes de l'année ;", ar: "بالنسبة للأرامل والمطلقين أو النساء اللواتي بمفردهن: إثبات المحرم وفق تعليمات السنة؛" },
          { fr: "Engagement à régler les frais du Hajj dans les délais si vous êtes retenu.", ar: "التزام بأداء مصاريف الحج في الآجال في حال القبول." },
        ],
      },
      {
        heading: { fr: "Comment El Baraka Voyages vous accompagne", ar: "كيف تُرافقكم البركة للأسفار" },
        paragraphs: [
          {
            fr: "Notre accompagnement est <strong>gratuit</strong> : nous vous aidons à constituer le dossier sans erreur (cause n°1 de rejet), nous suivons avec vous la publication des listes, puis — si vous êtes retenu — nous vous orientons vers les formules « Bitaqat Alwissam » du Ministère et préparons le voyage : paiement échelonné, vaccins exigés (méningite, grippe), bagages et réunion de préparation rituelle avant départ.",
            ar: "مواكبتنا <strong>مجانية</strong>: نساعدكم على تكوين الملف دون أخطاء (السبب الأول للرفض)، نتتبع معكم نشر اللوائح، ثم — في حال القبول — نوجهكم نحو برامج «بطاقة الوسام» التابعة للوزارة ونُحضّر الرحلة: الأداء بالتقسيط، اللقاحات المطلوبة (التهاب السحايا، الأنفلونزا)، الأمتعة واجتماع التحضير الروحي قبل السفر.",
          },
        ],
      },
      {
        heading: { fr: "Et en attendant votre tour ?", ar: "وفي انتظار دوركم؟" },
        paragraphs: [
          {
            fr: "De nombreuses familles accomplissent d'abord la Omra, accessible toute l'année sans tirage au sort. C'est aussi une excellente préparation : vous découvrez les lieux, les rites et le rythme du voyage. Parlons-en à l'agence ou au 06 61 40 32 98.",
            ar: "تؤدي أسر عديدة العمرة أولاً، وهي متاحة طوال السنة دون قرعة. وهي أيضاً تحضير ممتاز: تكتشفون الأماكن والمناسك وإيقاع الرحلة. لنتحدث عن ذلك بالوكالة أو على 0661403298.",
          },
        ],
      },
    ],
  },
  {
    slug: "location-voiture-agadir-biougra-guide",
    title: {
      fr: "Louer une voiture à Agadir et Biougra : tarifs, documents et bons plans",
      ar: "كراء سيارة بأكادير وبيوكرى: الأسعار، الوثائق وأفضل العروض",
    },
    metaTitle: { fr: "Location de voiture à Agadir & Biougra (2026)", ar: "كراء سيارة بأكادير وبيوكرى (2026)" },
    description: {
      fr: "Prix réels, documents exigés, caution, assurance, livraison à l'aéroport Agadir Al Massira : le guide complet pour louer une voiture à Biougra et Agadir avec Archi Cars, sans mauvaise surprise.",
      ar: "الأسعار الحقيقية، الوثائق المطلوبة، الضمان، التأمين، التوصيل لمطار أكادير المسيرة: الدليل الكامل لكراء سيارة ببيوكرى وأكادير مع أرشي كارز، دون مفاجآت.",
    },
    category: { fr: "Location de voitures", ar: "كراء السيارات" },
    date: "2025-12-08",
    dateLabel: { fr: "8 décembre 2025", ar: "8 دجنبر 2025" },
    minutes: 7,
    image: siteImages.blog.rentalGuide,
    imageAlt: {
      fr: "SUV sur une route du Souss — location de voiture Agadir Biougra avec Archi Cars",
      ar: "سيارة SUV على طريق بمنطقة سوس — كراء سيارة أكادير بيوكرى مع أرشي كارز",
    },
    content: [
      {
        paragraphs: [
          {
            fr: "Entre la côte, l'arrière-pays et les départs vers le désert, la voiture reste la meilleure façon de profiter de la région d'Agadir. Encore faut-il louer au bon prix, avec un contrat clair. Voici le guide transparent d'Archi Cars, notre enseigne de location à Biougra.",
            ar: "بين الساحل والمناطق الداخلية والانطلاقات نحو الصحراء، تبقى السيارة أفضل وسيلة للاستمتاع بمنطقة أكادير. يبقى أن يتم الكراء بالسعر المناسب، وبعقد واضح. إليكم الدليل الشفاف لأرشي كارز، علامتنا للكراء ببيوكرى.",
          },
        ],
      },
      {
        heading: { fr: "Combien coûte une location à Biougra en 2026 ?", ar: "كم يكلف الكراء ببيوكرى سنة 2026؟" },
        list: [
          { fr: "Citadine (Kia Picanto, Sandero) : 250 – 300 DH / jour ;", ar: "سيارة مدينية (كيا بيكانتو، سانديرو): 250 – 300 درهم/اليوم؛" },
          { fr: "Compacte familiale (Logan, Clio 5, 208) : 320 – 400 DH / jour ;", ar: "مدمجة عائلية (لوگان، كليو 5، 208): 320 – 400 درهم/اليوم؛" },
          { fr: "SUV & 4×4 (Duster, Tucson) : 550 – 750 DH / jour ;", ar: "SUV و4×4 (دوستر، توسان): 550 – 750 درهم/اليوم؛" },
          { fr: "Premium (Mercedes Classe C) : à partir de 1 400 DH / jour.", ar: "بريميوم (مرسيدس الفئة C): ابتداءً من 1400 درهم/اليوم." },
        ],
        paragraphs: [
          {
            fr: "Les prix baissent avec la durée : de -10 % à -15 % dès 7 jours, et des tarifs mensuels pour les MRE et les longs séjours. Chez Archi Cars, le tarif annoncé inclut l'assurance tous risques — pas de frais cachés au comptoir.",
            ar: "تنخفض الأسعار مع طول المدة: من -10٪ إلى -15٪ ابتداءً من 7 أيام، وأسعار شهرية للمغاربة المقيمين بالخارج والإقامات الطويلة. لدى أرشي كارز، السعر المعلن يشمل التأمين الشامل — لا رسوم خفية عند الاستلام.",
          },
        ],
      },
      {
        heading: { fr: "Quels documents présenter ?", ar: "ما هي الوثائق الواجب تقديمها؟" },
        list: [
          { fr: "Résidents marocains : CIN + permis de conduire (2 ans minimum) ;", ar: "المقيمون بالمغرب: بطاقة التعريف الوطنية + رخصة السياقة (سنتان على الأقل)؛" },
          { fr: "Touristes et MRE : passeport + permis national ; permis international recommandé pour les permis en alphabet non latin ;", ar: "السياح والمغاربة بالخارج: جواز السفر + الرخصة الوطنية؛ يُنصح برخصة دولية للرخص بأبجدية غير لاتينية؛" },
          { fr: "Âge minimum : 21 ans (25 ans pour les SUV et la gamme Premium).", ar: "السن الأدنى: 21 سنة (25 سنة لفئتي SUV وبريميوم)." },
        ],
      },
      {
        heading: { fr: "Caution, assurance, kilométrage : les points à vérifier partout", ar: "الضمان، التأمين، الكيلومترات: نقاط يجب التحقق منها في كل مكان" },
        paragraphs: [
          {
            fr: "Demandez toujours le montant de la caution <strong>avant</strong> de réserver (de 2 000 à 10 000 DH selon la gamme chez nous, restituée au retour), le type d'assurance (tous risques avec franchise chez Archi Cars, rachat de franchise possible) et la politique kilométrique (illimité dès 3 jours chez nous). Exigez un état des lieux photo à la prise du véhicule : c'est votre meilleure protection.",
            ar: "اطلبوا دائماً مبلغ الضمان <strong>قبل</strong> الحجز (من 2000 إلى 10000 درهم حسب الفئة لدينا، يُسترجع عند العودة)، ونوع التأمين (شامل مع نسبة تحمل لدى أرشي كارز، مع إمكانية إلغائها)، وسياسة الكيلومترات (غير محدودة ابتداءً من 3 أيام لدينا). اطلبوا معاينة بالصور عند استلام المركبة: إنها أفضل حماية لكم.",
          },
        ],
      },
      {
        heading: { fr: "Livraison à l'aéroport Agadir Al Massira : le bon plan des familles", ar: "التوصيل لمطار أكادير المسيرة: الحل الأمثل للأسر" },
        paragraphs: [
          {
            fr: "Atterrir à Al Massira à 23h avec enfants et valises ? Nous livrons le véhicule à l'aéroport, à Agadir, Taghazout, Biougra, Aït Melloul ou Inezgane, avec suivi de votre vol en cas de retard. La livraison est gratuite à Biougra, Aït Melloul et Inezgane ; forfait unique de 150 DH pour l'aéroport et Agadir.",
            ar: "الهبوط بالمسيرة على الساعة 23:00 برفقة الأطفال والحقائب؟ نوصل المركبة إلى المطار أو أكادير أو تغازوت أو بيوكرى أو آيت ملول أو إنزكان، مع تتبع رحلتكم في حال التأخر. التوصيل مجاني ببيوكرى وآيت ملول وإنزكان؛ ومبلغ ثابت قدره 150 درهم للمطار وأكادير.",
          },
        ],
      },
      {
        heading: { fr: "Où rouler depuis Biougra ?", ar: "أين نتجول انطلاقاً من بيوكرى؟" },
        paragraphs: [
          {
            fr: "En 30 minutes : la baie d'Agadir. En une heure : la Vallée du Paradis et Immouzer. En une journée : les dunes caspiennes de l'Anti-Atlas ou le départ du grand Sud vers Tiznit et Mirleft. Réservez au 05 28 81 06 61 ou sur WhatsApp au 06 61 40 32 98 : votre voiture vous attend clé en main.",
            ar: "على بعد 30 دقيقة: خليج أكادير. على بعد ساعة: وادي الجنة وإمّوزار. في يوم واحد: كثبان الأطلس الصغير أو انطلاقة الجنوب الكبير نحو تيزنيت وميرلفت. احجزوا على 0528810661 أو عبر واتساب على 0661403298: سيارتكم في انتظاركم جاهزة بمفتاح واحد.",
          },
        ],
      },
    ],
  },
];

/** Communes & villes desservies (SEO local) */
export const localSeoCommunes: Localized[] = [
  { fr: "Biougra", ar: "بيوكرى" },
  { fr: "Aït Melloul", ar: "آيت ملول" },
  { fr: "Inezgane", ar: "إنزكان" },
  { fr: "Dcheira", ar: "الدشيرة" },
  { fr: "Lqliaa", ar: "القليعة" },
  { fr: "Temsia", ar: "تمسية" },
  { fr: "Oulad Dahou", ar: "أولاد الداهو" },
  { fr: "Agadir", ar: "أكادير" },
  { fr: "Taroudant", ar: "تارودانت" },
  { fr: "Massa", ar: "ماسة" },
  { fr: "Aït Amira", ar: "آيت عميرة" },
  { fr: "Taghazout", ar: "تغازوت" },
];

/* ———————————————————— STATS & AVANTAGES ———————————————————— */

export const stats = [
  { value: 15, suffix: "+" },
  { value: 4800, suffix: "+" },
  { value: 30, suffix: "+" },
  { value: 98, suffix: "%" },
];

export const whyUs: { title: Localized; text: Localized }[] = [
  {
    title: { fr: "Expertise Omra & Hajj", ar: "خبرة في العمرة والحج" },
    text: {
      fr: "Une équipe formée aux rites et à la logistique saoudienne : visa, Nusuk, hôtels proches du Haram, accompagnement religieux du départ au retour.",
      ar: "فريق مُكوَّن في المناسك واللوجستيك السعودي: التأشيرة، نسك، فنادق قريبة من الحرم، مواكبة دينية من السفر إلى العودة.",
    },
  },
  {
    title: { fr: "Partenaire Saudia & Qatar Airways", ar: "شريك السعودية وقطر للطيران" },
    text: {
      fr: "Billetterie officielle au départ d'Agadir et Casablanca : tarifs négociés, correspondances courtes et émission immédiate des billets.",
      ar: "تذاكر رسمية انطلاقاً من أكادير والدار البيضاء: أسعار تفاوضية، ارتباطات قصيرة وإصدار فوري للتذاكر.",
    },
  },
  {
    title: { fr: "Flotte récente et entretenue", ar: "أسطول حديث وجيد الصيانة" },
    text: {
      fr: "Des véhicules de moins de 4 ans, révisés et désinfectés entre chaque location. Assistance dépannage 24h/24 sur tout le Maroc.",
      ar: "مركبات عمرها أقل من 4 سنوات، تُراجَع وتُعقَّم بين كل عملية كراء. مساعدة الإصلاح على مدار الساعة في كل أنحاء المغرب.",
    },
  },
  {
    title: { fr: "Une adresse de confiance", ar: "عنوان موثوق" },
    text: {
      fr: "Basés au cœur de Biougra ({street}), nous sommes l'agence de proximité de tout Chtouka-Aït Baha et du grand Agadir.",
      ar: "نتواجد في قلب بيوكرى ({street})، ونحن الوكالة القريبة من سكان الشتوكة آيت باها والدائرة الكبرى لأكادير.",
    },
  },
];
