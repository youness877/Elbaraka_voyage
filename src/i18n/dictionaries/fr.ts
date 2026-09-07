/**
 * Dictionnaire FRANÇAIS — source de vérité pour la FORME du dictionnaire.
 * `ar.ts` doit respecter exactement la même structure (vérifié par
 * `satisfies Dictionary` dans `src/i18n/dictionaries.ts`).
 */
export const fr = {
  meta: {
    htmlLang: "fr" as "fr" | "ar",
    dir: "ltr" as "ltr" | "rtl",
  },

  common: {
    skipToContent: "Aller au contenu principal",
    home: "Accueil",
    perDay: "/ jour",
    perPerson: "/ pers.",
    from: "à partir de",
    readMore: "Lire l'article",
    allArticles: "Tous les articles",
    getDirections: "Obtenir l'itinéraire",
    directions: "Itinéraire",
    call: "Appeler",
    writeToUs: "Nous écrire",
    freeQuote: "Devis gratuit",
    book: "Réserver",
    close: "Fermer",
  },

  languageSwitcher: {
    label: "Choisir la langue",
    current: "Langue actuelle : {lang}",
  },

  nav: {
    mainLabel: "Navigation principale",
    home: "Accueil",
    trips: "Voyages & Omra",
    cars: "Location de voitures",
    about: "À propos",
    blog: "Blog",
    faq: "FAQ",
    contact: "Contact",
    book: "Réserver",
    whatsapp: "WhatsApp",
    chatOnWhatsapp: "Discuter sur WhatsApp",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mobileMenuLabel: "Menu de navigation",
    homeAria: "El Baraka Voyages — accueil",
    hoursLine: "Lun – Sam : 8h30 – 19h00",
  },

  footer: {
    siteNavLabel: "Plan du site",
    servicesNavLabel: "Nos services",
    navigationTitle: "Navigation",
    servicesTitle: "Nos services",
    agencyTitle: "Agence de Biougra",
    tagline:
      "Deux enseignes, une seule exigence. Agence de voyages (Omra, Hajj, billetterie Saudia & Qatar Airways) et location de voitures récentes — au service de Biougra et du grand Agadir depuis plus de 15 ans.",
    services: {
      omra: "Forfaits Omra",
      hajj: "Accompagnement Hajj",
      ticketing: "Billetterie Saudia & Qatar Airways",
      circuits: "Circuits & groupes",
      fleet: "Flotte Archi Cars",
      terms: "Conditions de location",
      bookCar: "Réserver un véhicule",
    },
    hoursLabel: "Lun – Sam : 8h30 – 19h00",
    closedSunday: "Dimanche : Fermé",
    rightsReserved: "Tous droits réservés.",
    bottomTagline: "Agence de voyages & location de voitures — Biougra, Chtouka-Aït Baha, Agadir, Maroc",
  },

  whatsappFloat: {
    chatAria: "Discuter sur WhatsApp avec El Baraka Voyages",
    callAria: "Appeler El Baraka Voyages au {phone}",
  },

  notFound: {
    title: "Cette page a pris un autre vol",
    description:
      "La page que vous cherchez n'existe pas ou a été déplacée. Revenons ensemble au point de départ.",
    backHome: "Retour à l'accueil",
    ourTrips: "Nos voyages",
  },

  pageHero: {
    breadcrumbLabel: "Fil d'Ariane",
  },

  ctaBand: {
    defaultTitle: "Parlons de votre prochain départ",
    defaultSubtitle: "Un conseiller vous répond 7j/7 — à l'agence de Biougra, par téléphone ou sur WhatsApp.",
    defaultCta: "Demander un devis gratuit",
  },

  car: {
    seats: "Places",
    doors: "Portes",
    gearbox: "Boîte",
    automatic: "Auto",
    manual: "Manu.",
    automaticFull: "Automatique",
    manualFull: "Manuelle",
    fuelLabel: "Carburant",
    petrol: "Essence",
    diesel: "Diesel",
    insuranceIncluded: "Assurance tous risques incluse",
    bookCar: "Réserver {name}",
    fleetFilterLabel: "Filtrer la flotte par catégorie",
    all: "Toute la flotte",
  },

  packageCard: {
    mostChosen: "La plus choisie",
    nightsMakkah: "nuits Makkah",
    nightsMadinah: "nuits Madinah",
    hotels: "Hôtels",
    makkahPrefix: "Makkah :",
    requestQuote: "Demander un devis pour {name}",
  },

  testimonials: {
    eyebrow: "Témoignages",
    titleDefault: "La confiance de nos {clients}",
    titleHighlight: "clients",
    description:
      "Des familles de Biougra, Agadir et de toute la région Souss-Massa nous confient leurs voyages et leurs routes depuis des années.",
    starsAria: "{rating} étoiles sur 5",
    averageNote: "Note moyenne {rating} — avis recueillis auprès de nos clients à l'agence, par téléphone et sur WhatsApp.",
  },

  blogCard: {
    minutesRead: "min de lecture",
  },

  faqSection: {
    questionsCount: "{count} question fréquente",
    questionsCountPlural: "{count} questions fréquentes",
  },

  seo: {
    breadcrumbHome: "Accueil",
  },

  /* ———————————————————— PAGE D'ACCUEIL ———————————————————— */
  home: {
    metaTitle: "Voyages Omra & Location de Voitures à Agadir | El Baraka",
    metaDescription:
      "Agence de voyages et location de voitures à Biougra, Agadir : Omra dès 13 900 DH, billets Saudia & Qatar Airways, voitures dès 250 DH/jour.",
    hero: {
      ariaLabel: "Présentation El Baraka Voyages et Archi Cars",
      imageAlt: "Avion traversant un ciel doré — voyages au départ d'Agadir avec El Baraka Voyages",
      location: "Biougra — Agadir, Maroc",
      titleLine1: "El Baraka Voyages",
      titleTravel: "voyage & ",
      titleArchi: "Archi Cars",
      titleSuffix: ", la route en or",
      intro1: "Deux enseignes, une maison : votre",
      travelAgency: "agence de voyages",
      intro2:
        "— Omra, Hajj et billetterie officielle",
      officialTicketing: "Saudia & Qatar Airways",
      intro3: "— et votre",
      carRenter: "loueur de voitures",
      intro4: "de confiance à Biougra, au cœur du grand Agadir.",
      ctaTrip: "Organiser mon voyage",
      ctaCar: "Louer une voiture",
      instantResponse: "Réponse immédiate :",
      ratingLine: "4,9/5 — clients de la région",
      umrahCardEyebrow: "Omra — Saudia & Qatar Airways",
      nights: "nuits",
      hotel: "hôtel",
      carsCardEyebrow: "Archi Cars — location Biougra",
      carsCardTitle: "Citadines dès 250 DH / jour",
      carsCardText: "Assurance tous risques · Livraison aéroport Agadir Al Massira",
    },
    dualBrands: {
      eyebrow: "Deux enseignes, une maison",
      titlePrefix: "Voyage et route,",
      titleHighlight: "sous le même toit",
      description:
        "El Baraka Voyages organise votre Omra, votre Hajj et vos billets d'avion. Archi Cars loue les voitures qui vous emmènent partout dans la région. Une seule adresse, une seule confiance.",
      travelBadge: "El Baraka Voyages",
      travelTitle: "Voyages, Omra & Hajj",
      travelText: "Forfaits Omra toute l'année, accompagnement Hajj, billetterie Saudia & Qatar Airways, circuits au Maroc.",
      travelCta: "Découvrir les voyages",
      carsBadge: "Archi Cars",
      carsTitle: "Location de voitures",
      carsText: "Flotte récente assurée tous risques, dès 250 DH/jour, livrée à l'agence, à domicile ou à l'aéroport.",
      carsCta: "Découvrir la flotte",
    },
    featuredTrips: {
      eyebrow: "Voyages & Omra",
      titlePrefix: "Nos formules",
      titleHighlight: "Omra les plus demandées",
      description: "Vols, visa, hôtels, transferts et accompagnement religieux inclus. Choisissez la formule qui vous ressemble.",
      viewAll: "Voir tous les forfaits",
    },
    stats: {
      eyebrow: "En quelques chiffres",
      title: "Quinze ans au service du Souss-Massa",
    },
    featuredCars: {
      eyebrow: "Location de voitures",
      titlePrefix: "La flotte",
      titleHighlight: "Archi Cars",
      description: "Citadines, compactes, SUV et gamme Premium : des véhicules récents, assurés tous risques, dès 250 DH/jour.",
      viewAll: "Voir toute la flotte",
    },
    whyUs: {
      eyebrow: "Pourquoi nous choisir",
      titlePrefix: "Ce qui fait",
      titleHighlight: "la différence",
    },
    localSeo: {
      eyebrow: "Ancrage local",
      titlePrefix: "Votre agence de voyages et loueur de voitures,",
      titleHighlight: "à deux pas de chez vous",
      description1: "Implantés",
      addressBold: "Avenue Mohammed V à Biougra",
      description2:
        ", entre Agadir et Taroudant, nous accompagnons chaque semaine les habitants de la province",
      provinceBold: "Chtouka-Aït Baha",
      description3: "et du grand Agadir : réservation de",
      packagesBold: "forfaits Omra",
      description4: ", émission de",
      ticketsBold: "billets d'avion",
      description5: "au départ d'Agadir Al Massira, organisation de circuits et",
      rentalBold: "location de voitures",
      description6: "livrées à domicile, à l'aéroport ou à l'agence.",
      agencyDirections: "Itinéraire vers l'agence",
      fixedLine: "(fixe)",
      captionTitle: "Centre-ville de Biougra",
      captionText: "à 25 min de l'aéroport Agadir Al Massira",
    },
    faqPreview: {
      eyebrow: "Questions fréquentes",
      titlePrefix: "Tout ce qu'on nous demande",
      titleHighlight: "chaque semaine",
      description: "Omra, Hajj, billets ou location de voiture : les réponses claires, sans langue de bois. Une autre question ? Appelez-nous, on adore y répondre.",
      linkLabel: "Consulter la FAQ complète",
    },
    blogPreview: {
      eyebrow: "Guides & conseils",
      titlePrefix: "Le carnet de voyage",
      titleHighlight: "de l'agence",
      description: "Guides pratiques écrits par notre équipe : préparation de la Omra, démarches du Hajj, bons plans location dans la région.",
      linkLabel: "Tous les articles",
      ariaLabel: "Derniers articles du blog",
    },
  },

  /* ———————————————————— CONTACT ———————————————————— */
  contact: {
    metaTitle: "Contact — Biougra, Agadir",
    metaDescription: "Contactez El Baraka Voyages × Archi Cars à Biougra (Agadir) : téléphone, WhatsApp, e-mail et formulaire en ligne. Réponse rapide garantie.",
    ogTitle: "Contact — El Baraka Voyages × Archi Cars, Biougra",
    ogDescription: "Téléphone, WhatsApp, itinéraire : joignez votre agence de Biougra en un clic.",
    hero: {
      title: "Parlons de votre projet,",
      highlight: "en toute simplicité",
      description: "Un sourire au bout du fil, une réponse WhatsApp dans l'heure, un thé à l'agence. Choisissez votre façon de nous joindre.",
      imageAlt: "Avion au coucher du soleil — contact El Baraka Voyages Biougra, Agadir",
      breadcrumb: "Contact",
    },
    quickCards: {
      ariaLabel: "Coordonnées",
      callUs: "Appelez-nous",
      whatsapp: "WhatsApp",
      whatsappTitle: "Réponse rapide",
      whatsappText: "7j/7, même le week-end",
      email: "E-mail",
      emailText: "Réponse sous 24 h ouvrées",
      agency: "L'agence",
    },
    form: {
      ariaLabel: "Formulaire de contact",
      eyebrow: "Écrivez-nous",
      titlePrefix: "Votre message,",
      titleHighlight: "notre réponse sous 24 h",
    },
    hours: {
      title: "Horaires d'ouverture",
      rentalNote: "Pour la location : retraits et restitutions possibles en dehors des horaires sur rendez-vous (livraison aéroport 24h/24).",
    },
    quickCallPanel: {
      eyebrow: "Le plus simple",
      title: "Un appel, et c'est réglé.",
      text: "Tarif Omra, dispo d'une Clio, état d'un dossier Hajj : un conseiller vous répond directement, sans standard.",
    },
    map: {
      ariaLabel: "Plan d'accès",
      eyebrow: "Nous trouver",
      titlePrefix: "Au cœur de Biougra,",
      titleHighlight: "avenue Mohammed V",
      description: "Entre Aït Melloul et Taroudant, à 25 minutes de l'aéroport Agadir Al Massira. Parking facile devant l'agence.",
      iframeTitle: "Carte — El Baraka Voyages × Archi Cars, Avenue Mohammed V, Biougra, Agadir",
    },
  },

  /* ———————————————————— FAQ ———————————————————— */
  faqPage: {
    metaTitle: "FAQ — Omra, Hajj & location de voitures",
    metaDescription: "Réponses aux questions fréquentes : documents pour la Omra depuis Agadir, accompagnement Hajj, billetterie aérienne, conditions de location Archi Cars.",
    ogTitle: "FAQ — El Baraka Voyages × Archi Cars",
    ogDescription: "Omra, Hajj, billets et location de voitures : toutes les réponses, sans langue de bois.",
    hero: {
      title: "Questions fréquentes",
      highlight: "réponses franches",
      description: "Les questions que l'on nous pose chaque semaine à l'agence de Biougra — sur la Omra, le Hajj, les billets et la location de voitures.",
      imageAlt: "La mosquée al-Haram à Makkah — questions fréquentes sur la Omra et le Hajj",
      breadcrumb: "FAQ",
    },
    ariaAll: "Toutes les questions",
    categoriesAria: "Catégories de questions",
    sidebar: {
      eyebrow: "Sommaire",
      titlePrefix: "Trois univers,",
      titleHighlight: "une équipe",
      description: "Choisissez un sujet. Et si votre réponse n'y est pas, appelez-nous : nous y répondons avec plaisir.",
      otherQuestion: "Une autre question ?",
      directLine: "Notre ligne directe :",
    },
    groups: {
      omraHajj: { title: "Omra & Hajj", note: "Documents, délais, compagnies, tirage au sort" },
      ticketing: { title: "Billetterie", note: "Billets simples toutes destinations" },
      rental: { title: "Location de voitures", note: "Tarifs, conditions, caution, livraison" },
    },
    ctaTitle: "La réponse que vous cherchez est à un appel près",
    ctaSubtitle: "Lundi à samedi, 9h – 19h. Un conseiller décroche, jamais un robot.",
    ctaButton: "Poser ma question sur WhatsApp",
  },

  /* ———————————————————— À PROPOS ———————————————————— */
  about: {
    metaTitle: "À propos — notre histoire à Biougra",
    metaDescription: "Depuis plus de 15 ans, El Baraka Voyages accompagne pèlerins et voyageurs du Souss ; Archi Cars loue des voitures fiables à Biougra, Agadir.",
    ogTitle: "À propos d'El Baraka Voyages × Archi Cars — Biougra, Agadir",
    ogDescription: "15 ans d'expérience, 4 800 pèlerins accompagnés, une flotte de 30 véhicules. Une maison familiale au service du Souss-Massa.",
    hero: {
      title: "Deux enseignes, une maison",
      highlight: "depuis 2009",
      description: "El Baraka Voyages × Archi Cars : l'histoire d'une agence familiale de Biougra devenue la référence voyage et location du grand Agadir.",
      imageAlt: "Façade d'une agence de voyages et de location de voitures de nuit — El Baraka Voyages × Archi Cars à Biougra, Agadir",
      breadcrumb: "À propos",
    },
    story: {
      ariaLabel: "Notre histoire",
      eyebrow: "Notre histoire",
      titlePrefix: "Née à Biougra,",
      titleHighlight: "grandie avec vous",
      p1: "Tout commence en 2009, Avenue Mohammed V, avec une petite agence de billetterie et une conviction simple : les habitants de Biougra méritent le même niveau de service que les grandes agences de Casablanca —",
      p1Bold: "sans avoir à se déplacer",
      p2a: "Très vite, une demande revient chaque semaine :",
      p2Bold1: "la Omra",
      p2b: ". Nous organisons nos premiers départs encadrés, nous tissons des partenariats avec",
      p2Bold2: "Saudia",
      p2c: "et",
      p2Bold3: "Qatar Airways",
      p2d: ", et la confiance grandit de famille en famille. En 2018, nos clients nous poussent vers un nouveau métier : la",
      p2Bold4: "location de voitures",
      p2e: ". Archi Cars est née — même toit, même exigence.",
      p3a: "Aujourd'hui, l'équipage compte six collaborateurs, plus de",
      p3Bold1: "4 800 pèlerins accompagnés",
      p3b: "et une flotte de 30 véhicules récents. Mais rien n'a changé : on vous accueille encore avec un thé, et chaque dossier est traité comme celui d'un proche.",
      imageAlt: "Showroom d'une agence de location de voitures illuminée la nuit — Archi Cars à Biougra",
    },
    stats: {
      years: "années d'expérience",
      pilgrims: "pèlerins accompagnés",
      vehicles: "véhicules récents en flotte",
      satisfaction: "de clients satisfaits",
    },
    timelineSection: {
      ariaLabel: "Les grandes étapes",
      eyebrow: "Les grandes étapes",
      titlePrefix: "Quinze ans de",
      titleHighlight: "route commune",
    },
    timeline: [
      { year: "2009", title: "Naissance d'El Baraka Voyages", text: "Ouverture de l'agence au centre de Biougra : billetterie et voyages organisés pour les familles de la province Chtouka-Aït Baha." },
      { year: "2013", title: "Premiers groupes Omra", text: "Nos premiers départs accompagnés vers Makkah et Madinah. Le bouche-à-oreille fait le reste : les groupes doublent chaque saison." },
      { year: "2016", title: "Partenariats Saudia & Qatar Airways", text: "Accréditation billetterie auprès des deux compagnies : tarifs négociés et émission directe depuis l'agence." },
      { year: "2018", title: "Lancement d'Archi Cars", text: "Du voyage… à la route : création de notre enseigne de location de voitures, sous le même toit, avec les mêmes exigences de service." },
      { year: "2022", title: "Agence rénovée, équipe renforcée", text: "Une devanture bordeaux et or reconnaissable entre toutes, un espace Omra & Hajj dédié et une équipe passée à six personnes." },
      { year: "Aujourd'hui", title: "4 800 pèlerins, 30 véhicules, une famille", text: "Des milliers de clients devenus des habitués : pour la Omra, les billets de l'été ou la voiture du mariage." },
    ],
    valuesSection: {
      ariaLabel: "Nos valeurs",
      eyebrow: "Ce qui ne changera jamais",
      titlePrefix: "Nos quatre",
      titleHighlight: "engagements",
    },
    values: [
      { title: "La confiance d'abord", text: "Prix annoncés = prix payés. Un contrat clair, des engagements écrits, et un interlocuteur qui décroche quand vous appelez." },
      { title: "Le service du voyageur", text: "Le voyage — surtout la Omra et le Hajj — est un moment de vie. Nous le préparons avec le soin que nous voudrions pour nos propres parents." },
      { title: "L'exigence du détail", text: "Hôtels vérifiés, chauffeurs connus par leur nom, véhicules contrôlés à chaque retour : rien n'est laissé au hasard." },
      { title: "L'ancrage local", text: "Nés et établis à Biougra, nous connaissons chaque famille, chaque association, chaque comité du Souss. C'est notre force." },
    ],
    visitPanel: {
      title: "Venez nous rencontrer à l'agence",
      hours: "Lun à Sam, 8h30 à 19h. Le thé est toujours prêt.",
    },
  },

  /* ———————————————————— VOYAGES ———————————————————— */
  voyages: {
    metaTitle: "Omra, Hajj & billets d'avion depuis Agadir",
    metaDescription: "El Baraka Voyages à Biougra (Agadir) : forfaits Omra dès 13 900 DH, accompagnement Hajj, billets Saudia & Qatar Airways, voyages de groupe.",
    ogTitle: "El Baraka Voyages — Omra, Hajj & billetterie au départ d'Agadir",
    ogDescription: "Forfaits Omra dès 13 900 DH, accompagnement Hajj, billetterie Saudia & Qatar Airways. Agence de voyages à Biougra, Agadir.",
    hero: {
      title: "Voyages, Omra & Hajj",
      highlight: "au départ d'Agadir",
      description: "Forfaits Omra toute l'année, accompagnement Hajj, billetterie internationale et circuits au Maroc. Partenaire Saudia & Qatar Airways depuis Biougra.",
      imageAlt: "Vue aérienne de la Kaaba et de la mosquée al-Haram à Makkah — Omra au départ d'Agadir",
      breadcrumb: "Voyages & Omra",
    },
    quickNav: {
      ariaLabel: "Accès rapides",
      omra: { label: "Forfaits Omra", note: "4 formules, dès 13 900 DH" },
      hajj: { label: "Hajj", note: "Accompagnement du dossier" },
      ticketing: { label: "Billetterie", note: "Saudia · Qatar Airways" },
      circuits: { label: "Circuits & groupes", note: "Maroc & désert" },
    },
    omraSection: {
      ariaLabel: "Forfaits Omra",
      eyebrow: "Omra — Saison complète & Ramadan",
      titlePrefix: "Quatre formules,",
      titleHighlight: "une même sérénité",
      description: "Chaque forfait inclut les vols, le visa, les hôtels, les transferts et l'encadrement religieux. Vous choisissez la proximité du Haram et la pension ; nous nous occupons du reste.",
      footnote: "Prix par personne en chambre quadruple, base départ Agadir ou Casablanca selon la formule. Suppléments chambre double / triple disponibles. Départs garantis dès 20 pèlerins par groupe.",
    },
    stepsSection: {
      ariaLabel: "Les étapes de votre Omra",
      eyebrow: "Simple comme bonjour",
      titlePrefix: "Votre Omra en",
      titleHighlight: "4 étapes",
    },
    steps: [
      { title: "Dossier & devis", text: "Passeport, photo, acompte de 30 % : votre place est bloquée. Le reste s'échelonne à l'agence de Biougra." },
      { title: "Visa, vols & Nusuk", text: "Visa Omra, billets Saudia ou Qatar Airways et créneaux Nusuk (Rawda) : nous gérons chaque formalité." },
      { title: "Réunion de préparation", text: "À l'agence : rites de la Omra, bagages, santé et déroulé du séjour expliqués simplement, en français et en arabe." },
      { title: "Départ accompagné", text: "Départ groupé depuis Agadir ou Casablanca, accompagnateur religieux avec vous jusqu'au retour. Assistance 24h/7j sur place." },
    ],
    hajjSection: {
      ariaLabel: "Hajj",
      badgeTitle: "Accompagnement gratuit du dossier",
      badgeText: "Tirage au sort · Bitaqat Alwissam · préparation",
      eyebrow: "Hajj — le voyage d'une vie",
      cta: "Être accompagné pour le Hajj",
      imageAlt: "Pèlerins rassemblés autour de la Kaaba pendant le Hajj — accompagnement El Baraka Voyages",
    },
    hajjInfo: {
      title: "Hajj — cinquième pilier de l'Islam",
      points: [
        "Inscription au tirage au sort national (Tatwir) : nous vous accompagnons gratuitement dans la constitution du dossier auprès des autorités locales de Biougra et de la province Chtouka-Aït Baha.",
        "Suivi du statut de votre candidature et assistance dès la publication des listes de retenus.",
        "Formules « Bitaqat Alwissam » du Ministère des Habous : réservation, paiement échelonné et préparation du voyage avec notre agence.",
        "Atelier de préparation rituelle avant départ : rites du Hajj, formalités santé (vaccins exigés par l'Arabie Saoudite) et bagages.",
      ],
    },
    ticketingSection: {
      ariaLabel: "Billetterie aérienne",
      eyebrow: "Billetterie internationale",
      titlePrefix: "Vos billets d'avion,",
      titleHighlight: "au meilleur tarif négocié",
      description: "Agence de billetterie officielle Saudia et Qatar Airways à Biougra, nous émettons vos billets au départ d'Agadir, Casablanca ou Marrakech vers toutes les destinations — avec accès aux tarifs négociés et aux horaires qu'Internet ne montre pas toujours.",
      bullets: [
        "Devis gratuit par téléphone ou WhatsApp, réponse dans l'heure",
        "Modification, annulation et suivi de dossier gérés par nos soins",
        "Groupe et famille : sièges ensemble, bagages optimisés",
        "Émission immédiate et envoi du billet sur WhatsApp ou e-mail",
      ],
      frequentDestinations: "Destinations fréquentes",
      whatsappCta: "Demander un tarif sur WhatsApp",
      imageAlt: "Enregistrement à l'aéroport — billetterie Saudia et Qatar Airways à Biougra, Agadir",
      airlinesCaption: "Saudia · Qatar Airways · Royal Air Maroc",
    },
    circuitsSection: {
      ariaLabel: "Circuits et voyages de groupe",
      eyebrow: "Circuits & voyages de groupe",
      titlePrefix: "Le Maroc,",
      titleHighlight: "autrement, ensemble",
      description: "Excursions à la journée, circuits du Grand Sud, voyages d'associations, de comités d'entreprise et de familles : transport, hébergement et guidage clé en main.",
      requestProgram: "Demander le programme",
    },
    circuits: [
      { name: "Grand Sud & Désert — 4 jours", detail: "Merzouga, dunes de l'Erg Chebbi, nuit en bivouac, Todra et Ouarzazate. Départs en groupe chaque mois depuis Agadir." },
      { name: "Aït Ben Haddou & Ouarzazate — 2 jours", detail: "La kasbah classée UNESCO, les studios de cinéma et la vallée de l'Ounila. Idéal familles et associations." },
      { name: "Côte d'Agadir & Vallée du Paradis — 1 jour", detail: "Excursion guidée : plage d'Agadir, Immouzer et piscines naturelles de la Vallée du Paradis." },
    ],
    quoteSection: {
      ariaLabel: "Demande de devis voyage",
      eyebrow: "Devis gratuit sous 24 h",
      titlePrefix: "Préparons votre",
      titleHighlight: "prochain départ",
      description: "Remplissez ce formulaire : un conseiller vous rappelle sous 2 h ouvrées avec un devis détaillé et sans engagement.",
      phoneEyebrow: "Par téléphone, c'est plus vite",
      assistanceTitle: "Assistance 7j/7",
      assistanceText: "Urgence billet, modification de vol ou question Omra : notre ligne WhatsApp vous répond même le week-end.",
      needCarTitle: "Besoin d'une voiture aussi ?",
      needCarText: "Notre enseigne Archi Cars est au même endroit.",
      viewFleet: "Voir la flotte",
    },
    ctaTitle: "La Kaaba vous appelle — partons ensemble",
    ctaSubtitle: "Réunion d'information Omra & Hajj chaque semaine à l'agence de Biougra. Entrée libre, conseils personnalisés.",
  },

  /* ———————————————————— LOCATION DE VOITURES ———————————————————— */
  locationVoitures: {
    metaTitle: "Location de voitures à Biougra & Agadir",
    metaDescription: "Archi Cars : location de voitures à Biougra (Agadir) dès 250 DH/jour — Duster, Clio 5, Tucson, Mercedes. Assurance tous risques incluse.",
    ogTitle: "Archi Cars — Location de voitures à Biougra, Agadir dès 250 DH/jour",
    ogDescription: "Flotte récente, assurance tous risques incluse, livraison aéroport Agadir Al Massira. Réservez en ligne ou au 05 28 81 06 61.",
    hero: {
      title: "Location de voitures",
      highlight: "à Biougra & Agadir",
      description: "Archi Cars : une flotte récente et assurée tous risques, des prix clairs dès 250 DH/jour, livrée où vous voulez — agence, domicile ou aéroport.",
      imageAlt: "SUV premium sur une route du Souss — location de voitures Archi Cars à Biougra, Agadir",
      breadcrumb: "Location de voitures",
    },
    trustSection: { ariaLabel: "Nos garanties" },
    trustItems: [
      { title: "Prix transparents", text: "Le tarif annoncé est le tarif payé. Zéro frais caché." },
      { title: "Tous risques incluse", text: "Assurance et assistance dépannage 24h/24 comprises." },
      { title: "Livraison partout", text: "Biougra, Aït Melloul, aéroport Agadir Al Massira." },
      { title: "7j/7 à votre écoute", text: "Réservation et suivi par téléphone ou WhatsApp." },
    ],
    fleetSection: {
      ariaLabel: "Notre flotte de véhicules",
      eyebrow: "La flotte Archi Cars",
      titlePrefix: "Huit véhicules,",
      titleHighlight: "zéro compromis",
      description: "Moins de 4 ans d'âge, révision complète et désinfection entre chaque location. Tarifs dégressifs automatiques en longue durée.",
    },
    conditionsSection: {
      ariaLabel: "Conditions de location",
      eyebrow: "Conditions & franchise",
      titlePrefix: "Louer en toute",
      titleHighlight: "transparence",
      description: "Les règles du jeu, posées avant de signer. Retrouvez ici les questions les plus fréquentes sur nos conditions de location.",
      summaryTitle: "Les conditions en bref",
      deliveryZonesTitle: "Zones de livraison",
      flightDelayNote: "Retard de vol ? Nous suivons votre avion et vous attendons, de jour comme de nuit.",
    },
    keyRules: [
      { label: "Âge minimum", value: "21 ans (25 ans SUV & Premium)" },
      { label: "Ancienneté du permis", value: "2 ans minimum" },
      { label: "Caution", value: "2 000 à 10 000 DH, restituée au retour" },
      { label: "Kilométrage", value: "Illimité dès 3 jours de location" },
      { label: "Carburant", value: "Plein contre plein, sans surcoût" },
      { label: "2ᵉ conducteur", value: "Gratuit sur présentation du permis" },
      { label: "Siège bébé", value: "30 DH/j — offert dès 7 jours" },
    ],
    deliveryZones: [
      { zone: "Biougra — agence & domicile", price: "Gratuit" },
      { zone: "Aït Melloul & Inezgane", price: "Gratuit" },
      { zone: "Aéroport Agadir Al Massira (AGA)", price: "150 DH" },
      { zone: "Agadir centre & Taghazout", price: "150 DH" },
    ],
    reservationSection: {
      ariaLabel: "Réservation en ligne",
      eyebrow: "Réservation en 2 minutes",
      titlePrefix: "Votre voiture,",
      titleHighlight: "clé en main",
      description: "Envoyez votre demande : nous confirmons la disponibilité et le tarif exact sous 2 h ouvrées. Sans paiement en ligne.",
      phoneEyebrow: "Ou par téléphone",
      longTermTitle: "Longue durée & MRE",
      longTermText: "Vacances d'été, mission professionnelle, remplacement de véhicule : demandez nos tarifs mensuels dégressifs.",
      imageAlt: "SUV blanc dans le désert — location longue durée Archi Cars Agadir",
      needTripTitle: "Et pour vos voyages ?",
      needTripText: "El Baraka Voyages, c'est sous le même toit.",
      needTripCta: "Omra, billets & circuits",
    },
    ctaTitle: "La route vous attend — réservez aujourd'hui",
    ctaSubtitle: "Disponibilités confirmées sous 2 h ouvrées. Livraison ce jour possible à Biougra et Aït Melloul.",
    ctaButton: "Réserver mon véhicule",
  },

  /* ———————————————————— BLOG ———————————————————— */
  blogList: {
    metaTitle: "Blog & guides voyage et location",
    metaDescription: "Guides pratiques El Baraka Voyages × Archi Cars : préparer sa Omra depuis Agadir, comprendre le Hajj, louer une voiture à Biougra au meilleur prix.",
    ogTitle: "Le carnet de voyage — El Baraka Voyages × Archi Cars",
    ogDescription: "Guides Omra, Hajj et location de voitures, écrits par notre équipe de Biougra.",
    hero: {
      title: "Le carnet de voyage",
      highlight: "de l'agence",
      description: "Conseils de préparation, démarches expliquées simplement, bons plans de la région : nos guides, écrits par l'équipe de Biougra.",
      imageAlt: "Avion au soleil couchant — guides et conseils voyage El Baraka Voyages",
      breadcrumb: "Blog",
    },
    ariaLabel: "Articles",
    eyebrow: "Guides & conseils",
    titlePrefix: "Des réponses d'experts,",
    titleHighlight: "avant même de nous appeler",
    description: "Chaque article répond aux questions que vous nous posez le plus souvent à l'agence.",
    ctaTitle: "Une question après votre lecture ?",
    ctaSubtitle: "Notre équipe y répond au téléphone, sur WhatsApp ou à l'agence — Lun à Sam, 8h30 à 19h.",
  },

  blogPost: {
    backToAll: "Tous les articles",
    minutesRead: "min de lecture",
    signatureName: "L'équipe El Baraka Voyages",
    signatureText: "Rédigé par nos conseillers voyage de Biougra — 15 ans d'expérience Omra, Hajj et billetterie au service de la région.",
    askQuestion: "Une question ?",
    sidebarEyebrow: "Nos prochains départs",
    sidebarTitle: "Omra dès 13 900 DH — départs toute l'année",
    sidebarText: "Saudia & Qatar Airways, hôtels proches du Haram, accompagnateur religieux inclus.",
    agencyEyebrow: "L'agence",
    relatedTitle: "À lire",
    relatedHighlight: "ensuite",
    relatedAriaLabel: "Articles liés",
  },

  /* ———————————————————— FORMULAIRES ———————————————————— */
  forms: {
    contact: {
      nameLabel: "Nom complet",
      namePlaceholder: "Votre nom",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail (facultatif)",
      emailPlaceholder: "vous@exemple.com",
      subjectLabel: "Sujet",
      subjects: ["Omra", "Hajj", "Billet d'avion", "Location de voiture", "Circuit / groupe", "Autre demande"],
      messageLabel: "Votre message",
      messagePlaceholder: "Décrivez votre besoin (dates, destination, véhicule…)",
      submit: "Envoyer le message",
      submitting: "Envoi…",
      successTitle: "Message envoyé",
      successText: "Merci pour votre message (réf. {ref}). Nous vous répondons sous 24 h — souvent bien plus vite.",
      sendAnother: "Envoyer un autre message",
      genericError: "Envoi impossible. Appelez-nous au {phone}.",
    },
    booking: {
      websiteHoneypot: "Site web",
      chooseVehicle: "Choisir un véhicule…",
      vehicleLabel: "Véhicule souhaité",
      pickupPlaceLabel: "Lieu de prise en charge",
      pickupDateLabel: "Date de départ",
      dropoffDateLabel: "Date de retour",
      fullNameLabel: "Nom complet",
      fullNamePlaceholderCar: "Ex. Ahmed El Fassi",
      fullNamePlaceholderTrip: "Ex. Fatima Idrissi",
      phoneLabel: "Téléphone (Maroc)",
      emailLabel: "E-mail (facultatif)",
      emailPlaceholder: "vous@exemple.com",
      notesLabelCar: "Message (siège bébé, second conducteur…)",
      notesLabelTrip: "Message (hôtel souhaité, âge des enfants…)",
      notesPlaceholder: "Précisions utiles (facultatif)",
      estimateText: "Estimation indicative : {price} DH / jour — assurance tous risques et kilométrage illimité dès 3 jours inclus. Remise longue durée automatique.",
      submitCar: "Envoyer ma demande",
      submitTrip: "Recevoir mon devis gratuit",
      submitting: "Envoi en cours…",
      privacyNoteCar: "Réponse sous 2 h ouvrées. Vos données restent confidentielles et ne servent qu'à traiter votre demande.",
      privacyNoteTrip: "Devis détaillé sous 24 h. Acompte de 30 % seulement pour confirmer — échelonnement possible à l'agence.",
      pickupPlaces: [
        "Agence Biougra — Av. Mohammed V",
        "Aéroport Agadir Al Massira (AGA)",
        "Aït Melloul",
        "Inezgane",
        "Agadir centre",
        "Autre ville (préciser en message)",
      ],
      carSuccessTitle: "Demande de réservation reçue",
      carSuccessWaText: "Bonjour Archi Cars, je viens de faire une demande de réservation (réf. {ref}) pour : {car}.",
      carDefaultVehicle: "un véhicule",
      newRequest: "Nouvelle demande",
      confirmWhatsapp: "Confirmer sur WhatsApp",
      packageLabel: "Formule souhaitée",
      choosePackage: "Choisir une formule…",
      umrahGroup: "Forfaits Omra",
      otherGroup: "Autres demandes",
      extraOptions: [
        { value: "billet-avion", label: "Billet d'avion simple (toutes destinations)" },
        { value: "hajj-accompagnement", label: "Hajj — accompagnement dossier & tirage au sort" },
        { value: "circuit-groupe", label: "Circuit / voyage de groupe au Maroc" },
      ],
      departureDateLabel: "Date de départ souhaitée",
      travelersLabel: "Nombre de voyageurs",
      tripSuccessTitle: "Demande de devis reçue",
      tripSuccessWaText: "Bonjour El Baraka Voyages, je viens de demander un devis (réf. {ref}) : {pkg}.",
      packageSummary: "{name} : {nights} nuits — {stars}★, {distance}. À partir de {price} DH / personne, vols {airline} inclus.",
    },
  },

  /* ———————————————————— VALIDATION (Zod) ———————————————————— */
  validation: {
    phoneRequired: "Le numéro de téléphone est requis.",
    phoneTooShort: "Numéro de téléphone trop court.",
    phoneInvalid: "Numéro marocain invalide (ex. 06 61 40 32 98).",
    emailInvalid: "Adresse e-mail invalide.",
    nameRequired: "Votre nom complet est requis.",
    nameTooShort: "Nom complet requis (min. 3 caractères).",
    invalidRequest: "Requête invalide.",
    chooseVehicle: "Choisissez un véhicule.",
    pickupPlaceRequired: "Lieu de prise en charge requis.",
    pickupDateRequired: "Date de départ requise.",
    dropoffDateRequired: "Date de retour requise.",
    choosePackage: "Choisissez une formule.",
    travelersRequired: "Nombre de voyageurs requis (chiffre).",
    travelersInt: "Nombre entier requis.",
    travelersMin: "Au moins 1 voyageur.",
    travelersMax: "Pour plus de 60 voyageurs, contactez-nous par téléphone.",
    messageRequired: "Votre message est requis.",
    messageTooShort: "Message trop court (min. 10 caractères).",
    messageTooLong: "Message trop long (max. 2000 caractères).",
    invalidData: "Données invalides.",
    formUnavailable: "Notre formulaire est momentanément indisponible. Merci de nous appeler au {phone} ou d'écrire sur WhatsApp.",
    bookingUnavailable: "Notre système de réservation est momentanément indisponible. Merci de nous appeler au {phone} ou d'écrire sur WhatsApp.",
    serverError: "Erreur serveur — appelez-nous au {phone}.",
  },
} as const;

/**
 * `typeof fr` infers every translated string as its own literal type
 * (grâce à `as const`), pas comme `string`. C'est exactement ce qu'on veut
 * pour la FORME du dictionnaire (clés, imbrication, tableaux…), mais pas
 * pour le CONTENU : ça obligerait chaque traduction à être mot pour mot
 * identique au français, ce qui est absurde et cassait le build.
 *
 * `WidenStrings` garde la forme intacte et remplace uniquement les feuilles
 * `string` littérales par `string` — les autres dictionnaires peuvent donc
 * fournir leur propre texte tout en étant vérifiés structurellement par
 * `satisfies Dictionary` (clé manquante, en trop, ou mal imbriquée = erreur
 * de compilation, comme prévu).
 */
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly WidenStrings<U>[]
    : T extends object
      ? { readonly [K in keyof T]: WidenStrings<T[K]> }
      : T;

export type Dictionary = Omit<WidenStrings<typeof fr>, "meta"> & {
  /** `meta` reste basé sur les unions explicites ("fr" | "ar", "ltr" | "rtl")
   *  définies ci-dessus, plutôt que d'être élargi en `string`. */
  readonly meta: (typeof fr)["meta"];
};
