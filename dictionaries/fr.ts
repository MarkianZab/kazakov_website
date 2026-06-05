const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    availability: "Réserver",
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
    subtitle: "Choisissez un créneau disponible et réservez en quelques secondes.",
    firstFree: "Votre première leçon est entièrement gratuite — aucun paiement nécessaire pour commencer.",
    firstFreeHeadline: "Première leçon gratuite",
    firstFreeSub: "Aucun paiement requis. Réservez, rencontrez Mikhail, et décidez ensuite.",
    sessionName: "Leçon privée individuelle",
    sessionDetails: "90 minutes · Zoom ou Microsoft Teams",
    sessionPrice: "50 $",
    sessionDesc: "Session personnalisée adaptée à votre niveau et vos objectifs. Mikhail vous enverra le lien Zoom/Teams après confirmation.",
    slotsTitle: "Créneaux disponibles",
    noSlots: "Aucun créneau disponible pour le moment. Contactez Mikhail pour convenir d'un horaire.",
    contactMikhail: "Contacter Mikhail",
    localTimeNote: "Horaires affichés en heure locale",
    kyivNote: "Heure de Kyiv :",
    selectPrompt: "Sélectionnez un créneau pour réserver",
    form: {
      name: "Votre nom",
      namePH: "Nom complet",
      email: "Votre email",
      confirm: "Confirmer la réservation",
      confirming: "Confirmation…",
      cancel: "Annuler",
    },
    success: {
      title: "Session réservée !",
      message: "Mikhail vous enverra le lien Zoom/Teams par email sous peu. À bientôt sur l'échiquier !",
    },
    slotTaken: "Ce créneau vient d'être réservé. Veuillez en choisir un autre.",
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
