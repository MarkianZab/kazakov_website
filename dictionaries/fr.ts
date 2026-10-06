import type { ServiceId } from "@/lib/services";

const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
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
      "Grand Maître ukrainien, Mikhail enseigne les échecs depuis plus de 20 ans à des élèves de tous niveaux, du débutant au joueur titré. Ses élèves comptent un champion du monde junior et plusieurs champions de France jeunes. Les cours ont lieu en ligne, en français ou en anglais.",
    firstFree: "Votre première leçon est gratuite",
    firstFreeSub:
      "Sans engagement : rencontrez Mikhail, analysez quelques positions ensemble et voyez si l'approche vous convient.",
    cta: "Réserver ma leçon gratuite",
    learnMore: "En savoir plus",
    stats: {
      yearsCoaching: "Ans de coaching",
      champions: "Champions formés",
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
          "Grand Maître, compétiteur international et coach dévoué avec plus de 20 ans d'expérience au plus haut niveau.",
      },
      {
        title: "Réserver une session",
        description:
          "Leçons privées, parties d'entraînement et analyse — personnalisées selon votre niveau. Première leçon gratuite.",
      },
      {
        title: "Contact",
        description:
          "Une question avant de réserver ? Écrivez à Mikhail — il répond sous 24 heures.",
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
    peakRating: "Classement max.",
    titleLabel: "Titre",
    grandmaster: "Grand Maître (GM)",
    fideProfile: "Profil FIDE →",
    photoAlt: "Portrait de Mikhail Kazakov",
    opening:
      "Mikhail Kazakov est né en 1972 à Lviv, en Ukraine — la capitale des échecs du pays. À sept ans, son père lui apprend à jouer et l'inscrit à l'école sportive d'échecs de la ville. En 1989, il entre à l'Institut d'éducation physique de Lviv, où il décide de faire des échecs son métier.",
    career:
      "Maître International en 1996, il obtient le titre de Grand Maître en 2001 après sa victoire au tournoi fermé à norme de GM de Pavlograd en 2000. De 1990 à 2010, il dispute de nombreux tournois à travers l'Europe et remporte notamment les opens du Touquet (France), d'Untergrombach et d'Oberhausen (Allemagne) et de Lignano Sabbiadoro (Italie). Son classement FIDE culmine à 2527.",
    coaching:
      "Vers 2005, après l'obtention de son diplôme d'entraîneur à l'Institut d'éducation physique de Lviv, Mikhail se consacre à l'enseignement, porté par l'essor des cours à distance. Il a entraîné dans des clubs en France, en Suisse, en Norvège et aux Émirats arabes unis, ainsi que dans une école sportive en Ukraine. Après chaque analyse de parties, il définit avec l'élève un programme qui renforce ses points forts et travaille ses points faibles, complété par des devoirs et des fichiers d'étude accumulés en vingt ans de pratique.",
    achievementsTitle: "Palmarès",
    achievements: [
      "Vainqueur du tournoi fermé à norme de GM, Pavlograd (Ukraine), 2000",
      "1ère place, Open du Touquet (France), 2001",
      "1ère place, Open d'Untergrombach (Allemagne), 2014",
      "1ère place, Open d'Oberhausen (Allemagne), 2015",
      "1ère place, Open de Lignano Sabbiadoro (Italie), 2015",
      "Classement FIDE maximum : 2527",
    ],
    studentsTitle: "Réussites d'élèves",
    students: [
      {
        name: "Alexandre Ipatov",
        detail: "Grand Maître — Champion du monde junior (U20), Athènes 2012",
      },
      {
        name: "Jérôme Blot",
        detail: "Champion de France jeunes (U14), 1996",
      },
      {
        name: "Mickaël Massoni",
        detail: "Maître International — Champion de France jeunes (U16), 2010",
      },
      {
        name: "Chjara Sabiani",
        detail: "Championne de France jeunes (U12) 2014 et (U14) 2018",
      },
      {
        name: "Ruben Harutunian",
        detail: "Champion de France jeunes (U14), 2017",
      },
    ],
    philosophyTitle: "Philosophie d'enseignement",
    philosophyText:
      "Une approche individuelle dès le départ : après l'analyse de vos parties, Mikhail identifie vos points forts et vos points faibles et construit un programme sur mesure. Au cœur de sa méthode, la démarche de Iossif Dorfman pour trouver le bon coup aux moments critiques : évaluation, plan, coups candidats, calcul. Chaque leçon aborde deux ou trois axes — calcul, stratégie, ouvertures — toujours adaptés à votre niveau et à vos besoins.",
    book: "Réserver une session",
  },
  booking: {
    label: "Réservation",
    title: "Réserver une session",
    subtitle: "Choisissez une séance, un créneau, c'est réservé.",
    firstFreeHeadline: "Première leçon gratuite",
    firstFreeSub: "Aucun paiement requis. Réservez, rencontrez Mikhail, et décidez ensuite.",
    prepNote:
      "Pour la première leçon, préparez quelques-unes de vos parties récentes : elles serviront de point de départ à votre programme d'entraînement.",
    contactMikhail: "Contacter Mikhail",
    servicesTitle: "Formules et tarifs",
    services: {
      private: {
        name: "Leçon privée individuelle",
        desc: "Session personnalisée adaptée à votre niveau et vos objectifs.",
      },
      training: {
        name: "Partie d'entraînement avec analyse",
        desc: "Jouez une partie contre Mikhail, puis analysez-la ensemble.",
      },
      group: {
        name: "Cours en groupe",
        desc: "Une leçon collective avec d'autres élèves.",
      },
      simul: {
        name: "Simultanée",
        desc: "Mikhail affronte plusieurs joueurs en même temps.",
      },
      tournament: {
        name: "Accompagnement en tournoi",
        desc: "Préparation des adversaires et analyse de vos parties pendant le tournoi.",
      },
    } satisfies Record<ServiceId, { name: string; desc: string }>,
    choosePrompt: "Choisissez un type de séance pour voir les créneaux disponibles.",
    contactOnlyNote: "Cette prestation s'organise directement avec Mikhail.",
    durationByArrangement: "Durée à convenir",
    priceCustom: "Sur accord",
    timezoneNote:
      "Les horaires sont affichés dans votre fuseau horaire. Les cours ont lieu sur Microsoft Teams ; le lien figure dans votre email de confirmation.",
    cancelNote:
      "Annulation gratuite à tout moment via le lien de votre email de confirmation.",
    paymentTitle: "Paiement",
    paymentText:
      "Le paiement s'effectue après votre première leçon gratuite, par PayPal ou carte bancaire (PrivatBank), en euros ou en dollars US.",
  },
  contact: {
    label: "Contact",
    title: "Prendre contact",
    subtitle:
      "Vous avez une question ou souhaitez discuter de cours ? Envoyez un message et Mikhail vous répondra sous 24 heures.",
    emailLabel: "Email",
    responseLabel: "Délai de réponse",
    responseTime: "Sous 24 heures",
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
      message: "Mikhail vous répondra sous 24 heures.",
    },
  },
};

export default fr;
export type Dictionary = typeof fr;
