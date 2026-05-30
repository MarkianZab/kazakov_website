const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    availability: "Disponibilités",
    contact: "Contact",
    book: "Réserver",
  },
  footer: {
    tagline: "Grand Maître & Coach d'échecs",
    navigation: "Navigation",
    findMe: "Me retrouver",
    rights: "Tous droits réservés.",
  },
  home: {
    badge: "Grand Maître FIDE",
    subtitle: "Grand Maître & Coach d'échecs",
    intro:
      "[PLACEHOLDER: 2–3 phrases d'introduction sur Mikhail et ce que les élèves peuvent attendre de travailler avec lui.]",
    firstFree: "La première leçon est gratuite",
    cta: "Réserver une session",
    learnMore: "En savoir plus",
    stats: {
      yearsCoaching: "Ans de coaching",
      studentsTrained: "Élèves formés",
      fideTitle: "Titre FIDE",
      peakRating: "Classement max.",
    },
    offerLabel: "Ce que je propose",
    offerTitle: "Les échecs à tous les niveaux",
    offerSubtitle:
      "Des débutants aux joueurs avancés en préparation de tournois — chaque session est construite autour de vos objectifs.",
    highlights: [
      {
        title: "À propos de Mikhail",
        description:
          "Grand Maître, compétiteur international et coach dévoué avec des décennies d'expérience au plus haut niveau.",
      },
      {
        title: "Réserver une session",
        description:
          "Leçons privées et analyse de parties — personnalisées selon votre niveau.",
      },
      {
        title: "Disponibilités",
        description:
          "Consultez les créneaux disponibles et trouvez un horaire qui vous convient.",
      },
    ],
    learnMoreLink: "En savoir plus →",
    ctaBannerTitle: "Prêt à améliorer votre jeu ?",
    ctaBannerSubtitle:
      "Réservez votre première session aujourd'hui et obtenez un plan personnalisé d'un Grand Maître.",
    getInTouch: "Prendre contact",
  },
  bio: {
    label: "À propos",
    subtitle: "Grand Maître FIDE · Coach d'échecs",
    rating: "Classement FIDE",
    titleLabel: "Titre",
    grandmaster: "Grand Maître (GM)",
    placeholderOpening:
      "[PLACEHOLDER: Paragraphe d'introduction — origines, quand Mikhail a commencé à jouer aux échecs, premières influences.]",
    placeholderCareer:
      "[PLACEHOLDER: Carrière aux échecs — titres obtenus, tournois notables, classement maximum, expérience internationale.]",
    placeholderCoaching:
      "[PLACEHOLDER: Transition vers le coaching — quand et pourquoi Mikhail a commencé à coacher, approche pédagogique.]",
    achievementsTitle: "Réalisations notables",
    philosophyTitle: "Philosophie d'enseignement",
    philosophyText:
      "[PLACEHOLDER: 2–3 phrases sur le style d'enseignement de Mikhail.]",
    book: "Réserver une session",
  },
  booking: {
    label: "Réservation",
    title: "Réserver une session",
    subtitle:
      "Remplissez vos informations et Mikhail confirmera votre session dans les 24 heures.",
    firstFree:
      "Votre première leçon est entièrement gratuite — aucun paiement nécessaire pour commencer.",
    sessionName: "Leçon privée individuelle",
    sessionDetails: "90 minutes · Zoom ou Microsoft Teams",
    sessionPrice: "50 $",
    sessionDesc:
      "Session personnalisée adaptée à votre niveau et vos objectifs. Mikhail enverra les détails de paiement après confirmation de votre créneau.",
    requestTitle: "Demander une session",
    requestSubtitle:
      "Mikhail répondra dans les 24 heures pour confirmer le créneau et partager les informations de paiement.",
    form: {
      name: "Nom complet",
      namePH: "Votre nom",
      email: "Email",
      date: "Date souhaitée",
      time: "Heure souhaitée (heure de Kyiv)",
      platform: "Plateforme",
      platformPH: "Choisir…",
      level: "Votre niveau aux échecs",
      levelPH: "Choisir…",
      levels: [
        "Débutant (moins de 800)",
        "Intermédiaire (800–1500)",
        "Avancé (1500–2000)",
        "Expert (2000+)",
      ],
      notes: "Sur quoi souhaitez-vous travailler ?",
      notesOptional: "(optionnel)",
      notesPH: "Ouvertures, fins de partie, tactiques, amélioration générale…",
      submit: "Demander une session →",
      sending: "Envoi en cours…",
    },
    success: {
      title: "Demande envoyée !",
      message:
        "Mikhail vous répondra dans les 24 heures pour confirmer votre session et partager les détails de paiement.",
    },
  },
  availability: {
    label: "Planning",
    title: "Disponibilités hebdomadaires",
    subtitle: "Horaires en heure de Kyiv. Convertis automatiquement ci-dessous selon votre fuseau horaire.",
    book: "Réserver un créneau",
    available: "Disponible",
    unavailable: "Réservé / Indisponible",
    noSlotTitle: "Pas de créneau disponible ?",
    noSlotDesc:
      "Contactez Mikhail directement et il fera de son mieux pour s'adapter à votre emploi du temps.",
    contactMikhail: "Contacter Mikhail",
    localTimeNote: "Heure locale affichée (détectée automatiquement)",
    kyivTimeNote: "Heure de Kyiv :",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  },
  contact: {
    label: "Contact",
    title: "Prendre contact",
    subtitle:
      "Vous avez une question ou souhaitez discuter de cours ? Envoyez un message et Mikhail vous répondra dans les 48 heures.",
    emailLabel: "Email",
    responseLabel: "Délai de réponse",
    responseTime: "Dans les 48 heures",
    profilesLabel: "Profils d'échecs",
    form: {
      name: "Nom",
      namePH: "Votre nom",
      email: "Email",
      subject: "Sujet",
      subjectPH: "Demande de cours, question, etc.",
      message: "Message",
      messagePH: "Votre message…",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
    },
    success: {
      title: "Message envoyé !",
      message: "Mikhail vous répondra dans les 48 heures.",
    },
  },
};

export default fr;
export type Dictionary = typeof fr;
