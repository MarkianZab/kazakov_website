import type { Dictionary } from "./fr";

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    availability: "Book",
    contact: "Contact",
    book: "Book",
  },
  footer: {
    tagline: "Grandmaster & Chess Coach",
    navigation: "Navigation",
    findMe: "Find Me",
    rights: "All rights reserved.",
  },
  home: {
    badge: "FIDE Grandmaster",
    subtitle: "Grandmaster & Chess Coach",
    intro:
      "[PLACEHOLDER: 2–3 sentence intro about Mikhail and what students can expect from working with him.]",
    firstFree: "First lesson is free",
    cta: "Book a Session",
    learnMore: "Learn More",
    stats: {
      yearsCoaching: "Years Coaching",
      studentsTrained: "Students Trained",
      fideTitle: "FIDE Title",
      peakRating: "Peak Rating",
    },
    offerLabel: "What I Offer",
    offerTitle: "Chess at Every Level",
    offerSubtitle:
      "From beginners building fundamentals to advanced players preparing for tournaments — every session is built around your goals.",
    highlights: [
      {
        title: "About Mikhail",
        description:
          "Grandmaster, international competitor, and dedicated coach with decades of experience at the highest levels.",
      },
      {
        title: "Book a Session",
        description:
          "Private lessons and game analysis — tailored to your level.",
      },
      {
        title: "Availability",
        description: "Browse open time slots and find a schedule that works for you.",
      },
    ],
    learnMoreLink: "Learn more →",
    ctaBannerTitle: "Ready to improve your game?",
    ctaBannerSubtitle:
      "Book your first session today and get a personalised plan from a Grandmaster.",
    getInTouch: "Get in Touch",
  },
  bio: {
    label: "About",
    subtitle: "FIDE Grandmaster · Chess Coach",
    rating: "FIDE Rating",
    titleLabel: "Title",
    grandmaster: "Grandmaster (GM)",
    placeholderOpening:
      "[PLACEHOLDER: Opening paragraph — background, where Mikhail grew up, when he started playing chess, early influences.]",
    placeholderCareer:
      "[PLACEHOLDER: Chess career paragraph — titles earned, notable tournaments, peak rating, international experience.]",
    placeholderCoaching:
      "[PLACEHOLDER: Coaching transition paragraph — when and why Mikhail started coaching, approach.]",
    achievementsTitle: "Notable Achievements",
    philosophyTitle: "Coaching Philosophy",
    philosophyText:
      "[PLACEHOLDER: 2–3 sentences on Mikhail's coaching style.]",
    book: "Book a Session",
  },
  booking: {
    label: "Booking",
    title: "Book a Session",
    subtitle: "Pick an available slot and book instantly.",
    firstFree: "Your first lesson is completely free — no payment needed to get started.",
    firstFreeHeadline: "First lesson is free",
    firstFreeSub: "No payment required. Book a session, meet Mikhail, and decide from there.",
    sessionName: "1-on-1 Private Lesson",
    sessionDetails: "90 minutes · Zoom or Microsoft Teams",
    sessionPrice: "$50",
    sessionDesc: "Personalised session tailored to your level and goals. Mikhail will send you the Zoom/Teams link after booking.",
    slotsTitle: "Available Slots",
    noSlots: "No slots available right now. Contact Mikhail to arrange a time.",
    contactMikhail: "Contact Mikhail",
    localTimeNote: "Times shown in your local timezone",
    kyivNote: "Kyiv time:",
    selectPrompt: "Select a slot to book",
    form: {
      name: "Your name",
      namePH: "Full name",
      email: "Your email",
      confirm: "Confirm Booking",
      confirming: "Confirming…",
      cancel: "Cancel",
    },
    success: {
      title: "Session booked!",
      message: "Mikhail will send you the Zoom/Teams link by email shortly. See you on the board!",
    },
    slotTaken: "This slot was just taken. Please choose another.",
  },
  availability: {
    label: "Schedule",
    title: "Weekly Availability",
    subtitle: "Times in Kyiv time. Automatically converted below to your timezone.",
    book: "Book a Slot",
    available: "Available",
    unavailable: "Booked / Unavailable",
    noSlotTitle: "Don't see a time that works?",
    noSlotDesc:
      "Reach out directly and Mikhail will do his best to accommodate your schedule.",
    contactMikhail: "Contact Mikhail",
    localTimeNote: "Local time shown (auto-detected)",
    kyivTimeNote: "Kyiv time:",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  contact: {
    label: "Contact",
    title: "Get in Touch",
    subtitle:
      "Have a question or want to discuss lessons? Send a message and Mikhail will get back to you within 48 hours.",
    emailLabel: "Email",
    responseLabel: "Response Time",
    responseTime: "Within 48 hours",
    profilesLabel: "Chess Profiles",
    form: {
      name: "Name",
      namePH: "Your name",
      email: "Email",
      subject: "Subject",
      subjectPH: "Lesson inquiry, question, etc.",
      message: "Message",
      messagePH: "Your message…",
      submit: "Send Message",
      sending: "Sending…",
    },
    success: {
      title: "Message sent!",
      message: "Mikhail will get back to you within 48 hours.",
    },
  },
};

export default en;
