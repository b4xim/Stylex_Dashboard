import {
  Appointment,
  DaySchedule,
  BlackoutDate,
  ServiceItem,
  PromoCode,
  CarouselBanner,
  Stylist,
  VIPClient,
  ConciergeInquiry,
  SalonSettings
} from './types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1VBo3KteTmHWci_KXFQrFVQAFwbZb45oZ5m5qxbwrLdx1TXulIuGAAeuyzqToWzghOiP3jU1D63ysDpX_pEhGjxtB2Jwr4WDlVSSJ-v8fVXpk-dph5fBhlt_orD3AS6IrkoFfmIZJMBwaYevPKFdy012oC-9o__H4_8kgc0PJkydqrpLOkwfGsSYcPmFWWXZOcWvZganZPKw0M4z27cOpvSmCNMhV-NXVRFt9u5ypLVf3lyn8N96KTcHJNn_vN_aOE-rzYdSwAaoA";

export const PROMO_BANNER_URL = "https://lh3.googleusercontent.com/aida/AEtjO1XLFXPsXqKzyXqX_v2jEqMUEfPlymM71lSvyplrAl4G-qqpC7gsjYWnZiYWMfivETjG563ezKes05n4Ds-3D5a0G9wZbaUhLlKuRLY_TOh8X65YEqDPzqMn7d7GTIwfixFD5SOSB-hPHL8pOZCzIFBRcN0SyC0d-ZQZZyWEiVftP9GtcPiISKaKY5CvG5lVzDB3Ss6TrzSGUJkJGnusCXrrRfsGZ3iNMnhy61GkPyMTC6k-M9oFP800xSyW";

export const STYLIST_AVATARS = {
  elena: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV8JQfDGMb7n8Xbab27rDm63jRghaeStkPOzQ_er0ijydttzWMVLpKE4haPHDMTQznRiFwxUwxJGRGHuZdI3bUYtbDUczY7enejpxFev3CBxSXY_Ly-oEP82AW4hN_Q9WAT6dUSecznze4NxHkLBZWCMN0DWSw7MCqjyjj9CymXL-R2RU-atsClZ0OPSTWvq4nPoZw1VHRDo2KocuZoYeOmwbmN64yj2PeXm9CKbyBifSMaO5OJxrI8Q",
  marcus: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwCWHs5JTxPn_7bdSoeGE84zy2a0I5ZxX7SrGgIxqFvz57uNk8in9ksmjTOxEQhIrF0txYBrP_pQUCX5zKR9VlSvyKlAFJfLJZiy3pD4MaDqVmBMnZV-UUWsqd4m0phfDW8jRi2ynvcM_Ck83NcY48ZtnsAessEKe7XSpQcySYy5Q377uIZMVoVltKMY6Pn2YqIoi0LRpAk7t1ijILdSnCxfC4fpUkvpWBFLPU09buyadyGr7UBtQrSw",
  sora: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4UprCWdimHdNrixfxb1sHXSsYdlOELkE2ESjOVuN-svJce5gCZL4IihBbTFAvbt7IqAOt0dDWFU4wjY7zyYcxRUasMQF7_m1hR3wy5ZkA8fjxWn1wLXkm7CbFUFRwFn4qutzBSKi5xzBGdIb9paMUFRZAz66NNMVDtvs1YWAi-erw0ywhdbb4eaouyb4GmEoCjmsNdOI2epxN6pDrdNylxn4RhPtnt6Uqwr60DBOaRtaFkvGcCnUl9w",
  chloe: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaoFGalI0lxT7s82p7GGZStnqmBuy26HBeO7zqrP8nR0nUC04wWsNDX1TmXh7U74Z3rmif4dVrPXFkJHKJjKDQJWktuWewmZpcXFenFR5V6c_idtzxz3aiNg5bRaDChccFhyh4zUYNqB-v3YoHmntgAxOwo4NtBz0ke-46TtoD2fQQMz7KAoh7PkOcrJ1ociGth0z1OSUERvVmtjyqw1KYhDnniLiBipzOn0dshxLQPEmHiIQs23lSSQ",
  elenaAlt: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgimlmArDg6eVWjx3nBpOkR318NnI-IZ9yVnNxhMWUtWKkV2jylzgGB-n_y3GpidDZIs1OSov6O3ujBeHTF-_2jqztPcu08FBwcsXYrJMxOcqC0bbKLAPzXOrniFXNS5zfErI2kVudxxxfsTSANlKFi73M8CIsVOcalBsbj-Z68uSEZeeQiTPibSmUISaf0GuB61c5AkIH1X4m5EvINXSkbsrsYBKbSE7DAbfPxLLr3MTF4Xy0CtzQkQ"
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    time: "10:00 AM",
    durationMin: 75,
    clientName: "Camille Vance",
    clientPhone: "(310) 849-2201",
    clientInitials: "CV",
    clientTier: "VIP Platinum",
    serviceName: "Nordic Gloss Balayage",
    station: "Atelier Suite 1",
    stylistName: "Elena Vance",
    stylistAvatar: STYLIST_AVATARS.elena,
    depositStatus: "Deposit Paid",
    depositAmount: 85,
    totalPrice: 340,
    status: "IN_SESSION",
    dateStr: "Thursday, Oct 24",
    notes: "Requires custom ice-champagne toner. Prefers sparkling lavender tea upon arrival."
  },
  {
    id: "apt-2",
    time: "11:30 AM",
    durationMin: 90,
    clientName: "Julian Moreau",
    clientPhone: "(323) 555-0144",
    clientInitials: "MT",
    clientTier: "VIP Gold",
    serviceName: "Botanical Scalp Spa & Steam",
    station: "Aromatherapy Pod 3",
    stylistName: "Marcus Thorne",
    stylistAvatar: STYLIST_AVATARS.marcus,
    depositStatus: "Deposit Paid",
    depositAmount: 45,
    totalPrice: 240,
    status: "CONFIRMED",
    dateStr: "Thursday, Oct 24",
    notes: "High scalp sensitivity; use biodynamic eucalyptus clay exfoliant."
  },
  {
    id: "apt-3",
    time: "02:00 PM",
    durationMin: 60,
    clientName: "Anya Rostova",
    clientPhone: "(415) 309-8874",
    clientInitials: "AR",
    clientTier: "VIP Gold",
    serviceName: "Couture Cut & Velvet Blowout",
    station: "Styling Station Chair 4",
    stylistName: "Sora Takahashi",
    stylistAvatar: STYLIST_AVATARS.sora,
    depositStatus: "Deposit Paid",
    depositAmount: 50,
    totalPrice: 180,
    status: "CONFIRMED",
    dateStr: "Thursday, Oct 24",
    notes: "Attending evening premiere; extra hold velvet spray."
  },
  {
    id: "apt-4",
    time: "04:30 PM",
    durationMin: 120,
    clientName: "Sienna King",
    clientPhone: "(650) 802-9912",
    clientInitials: "SK",
    clientTier: "New Guest",
    serviceName: "Full Architectural Blonding",
    station: "Styling Station Chair 2",
    stylistName: "Elena Vance",
    stylistAvatar: STYLIST_AVATARS.elena,
    depositStatus: "Pending Deposit",
    depositAmount: 0,
    totalPrice: 380,
    status: "PENDING",
    dateStr: "Thursday, Oct 24",
    notes: "First time at atelier; thorough consultation needed."
  },
  {
    id: "apt-5",
    time: "05:45 PM",
    durationMin: 45,
    clientName: "Marcus Sterling",
    clientPhone: "(310) 902-4411",
    clientInitials: "MS",
    clientTier: "VIP Member",
    serviceName: "Silk Press & Scalp Care",
    station: "Executive Station Chair 1",
    stylistName: "Chloe Dupont",
    stylistAvatar: STYLIST_AVATARS.chloe,
    depositStatus: "Deposit Paid",
    depositAmount: 60,
    totalPrice: 210,
    status: "CONFIRMED",
    dateStr: "Thursday, Oct 24",
    notes: "Requires deep hydrating bio-lipid mask."
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "svc-1",
    name: "Nordic Gloss Balayage & Tonal Glaze",
    category: "hair",
    durationMin: 120,
    price: 340,
    description: "Hand-painted French balayage blending with custom ash or mocha dimensions.",
    showOnWebsite: true
  },
  {
    id: "svc-2",
    name: "Botanical Cellular Scalp Spa & Steam",
    category: "spa",
    durationMin: 90,
    price: 240,
    description: "Sensory biodynamic clay exfoliation and jade comb stimulation under negative-ion steam.",
    showOnWebsite: true
  },
  {
    id: "svc-3",
    name: "Couture Cut & Velvet Blowout",
    category: "hair",
    durationMin: 60,
    price: 180,
    description: "Customized bone-structure framing cut perfected for natural movement and airy silhouette.",
    showOnWebsite: true
  },
  {
    id: "svc-4",
    name: "Botanical Silk Press & Keratin Glaze",
    category: "hair",
    durationMin: 75,
    price: 210,
    description: "Thermal realignment with bio-lipid protective infusion for mirror shine and humidity defense.",
    showOnWebsite: true
  },
  {
    id: "svc-5",
    name: "High-Definition Gloss & Velvet Finish",
    category: "hair",
    durationMin: 45,
    price: 140,
    description: "Translucent color-refresh gloss therapy that cancels brassiness and seals cuticles.",
    showOnWebsite: true
  }
];

export const INITIAL_WEEK_SCHEDULE: DaySchedule[] = [
  {
    dayName: "Monday",
    label: "Monday",
    dateStr: "Mon, Oct 28",
    isOpen: false,
    statusText: "Closed",
    subText: "Scalp Lab sanitation",
    hours: "Closed for Walk-ins & Public Bookings"
  },
  {
    dayName: "Tuesday",
    label: "Tuesday",
    dateStr: "Tue, Oct 29",
    isOpen: true,
    statusText: "Open",
    subText: "Standard public hours",
    hours: "9:00 AM – 8:00 PM"
  },
  {
    dayName: "Wednesday",
    label: "Wednesday",
    dateStr: "Wed, Oct 30",
    isOpen: true,
    statusText: "Open",
    subText: "Standard public hours",
    hours: "9:00 AM – 8:00 PM"
  },
  {
    dayName: "Thursday",
    label: "Today",
    dateStr: "Thu, Oct 24",
    isOpen: true,
    statusText: "Open",
    subText: "2 public slots remaining",
    hours: "9:00 AM – 8:00 PM"
  },
  {
    dayName: "Friday",
    label: "Tomorrow",
    dateStr: "Fri, Oct 25",
    isOpen: false,
    statusText: "Blackout",
    subText: "VIP Private Gala buyout",
    hours: "Closed (VIP Gala Buyout)"
  },
  {
    dayName: "Saturday",
    label: "Weekend",
    dateStr: "Sat, Oct 26",
    isOpen: true,
    statusText: "Open",
    subText: "14 slots open (9:00 AM – 7:30 PM)",
    hours: "9:00 AM – 7:00 PM"
  },
  {
    dayName: "Sunday",
    label: "Sunday",
    dateStr: "Sun, Oct 27",
    isOpen: true,
    statusText: "Open",
    subText: "10:00 AM – 4:00 PM",
    hours: "10:00 AM – 5:00 PM"
  }
];

export const INITIAL_BLACKOUT_DATES: BlackoutDate[] = [
  {
    id: "bo-1",
    month: "OCT",
    day: "25",
    title: "VIP Private Gala Buyout",
    timeRange: "All Day",
    description: "Private floor event; public reservations closed."
  },
  {
    id: "bo-2",
    month: "NOV",
    day: "04",
    title: "Stylist Masterclass & Purge",
    timeRange: "9:00 AM – 1:00 PM",
    description: "Morning session closed. Reopening at 1:15 PM."
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    id: "promo-1",
    code: "STYLEXFIRST",
    discount: "15% off first salon ritual",
    totalUses: "48 / 100 uses",
    isActive: true,
    colorScheme: "green"
  },
  {
    id: "promo-2",
    code: "VIPSANCTUARY",
    discount: "Complimentary Valet & Scalp Treatment",
    totalUses: "112 uses",
    isActive: true,
    colorScheme: "yellow"
  },
  {
    id: "promo-3",
    code: "AUTUMNGLOW",
    discount: "$30 Off Glossing & Blowout Duo",
    totalUses: "63 / 75 uses",
    isActive: true,
    colorScheme: "orange"
  }
];

export const INITIAL_BANNERS: CarouselBanner[] = [
  {
    id: "ban-1",
    title: "Hair Spa & Anti-Dandruff Treatment",
    validity: "Oct 15, 2024 – Nov 30, 2024",
    imageUrl: PROMO_BANNER_URL,
    isActive: true
  }
];

export const INITIAL_STYLISTS: Stylist[] = [
  {
    id: "stylist-1",
    name: "Elena Vance",
    role: "Atelier Master & Founder",
    avatar: STYLIST_AVATARS.elena,
    station: "Private Suite 1 & Chair 2",
    specialty: "Nordic Blonding, Balayage, Precision Color",
    appointmentsCount: 6,
    rating: 5.0,
    reviewsCount: 148,
    bio: "Over 14 years curating architectural cuts and bespoke blonding for Los Angeles and European clientele.",
    isAvailableToday: true
  },
  {
    id: "stylist-2",
    name: "Marcus Thorne",
    role: "Senior Scalp & Texture Specialist",
    avatar: STYLIST_AVATARS.marcus,
    station: "Zen Aromatherapy Pod 3",
    specialty: "Cellular Scalp Spa, Steam Rituals, Japanese Trichology",
    appointmentsCount: 4,
    rating: 4.9,
    reviewsCount: 92,
    bio: "Certified trichologist focused on scalp health restoration and sensory meditative steam therapies.",
    isAvailableToday: true
  },
  {
    id: "stylist-3",
    name: "Sora Takahashi",
    role: "Creative Editorial Stylist",
    avatar: STYLIST_AVATARS.sora,
    station: "Styling Station Chair 4",
    specialty: "Couture Cuts, Geometric Framing, Velvet Blowouts",
    appointmentsCount: 5,
    rating: 4.9,
    reviewsCount: 110,
    bio: "Paris Fashion Week collaborator specializing in feather-light layering and dimensional curtain fringes.",
    isAvailableToday: true
  },
  {
    id: "stylist-4",
    name: "Chloe Dupont",
    role: "Thermal & Hair Health Artisan",
    avatar: STYLIST_AVATARS.chloe,
    station: "Executive Station Chair 1",
    specialty: "Botanical Silk Press, Keratin Glazes, Curl Restoration",
    appointmentsCount: 3,
    rating: 4.8,
    reviewsCount: 76,
    bio: "Master of non-damaging thermal smoothing rituals and custom humidity-resistant protein infusions.",
    isAvailableToday: true
  }
];

export const INITIAL_VIP_CLIENTS: VIPClient[] = [
  {
    id: "client-1",
    name: "Camille Vance",
    initials: "CV",
    phone: "+1 (310) 849-2201",
    email: "camille.vance@studio.com",
    tier: "VIP Platinum",
    preferredStylist: "Elena Vance",
    totalVisits: 24,
    favoriteRitual: "Nordic Gloss Balayage & Glaze",
    notes: "Prefers silent service during color processing. Sparkling lavender water.",
    lastVisit: "2 weeks ago"
  },
  {
    id: "client-2",
    name: "Julian Moreau",
    initials: "JM",
    phone: "+1 (323) 555-0144",
    email: "jmoreau@designfirm.com",
    tier: "VIP Gold",
    preferredStylist: "Marcus Thorne",
    totalVisits: 16,
    favoriteRitual: "Botanical Cellular Scalp Spa & Steam",
    notes: "Always books Aromatherapy Pod 3 for Tuesday morning sessions.",
    lastVisit: "1 month ago"
  },
  {
    id: "client-3",
    name: "Anya Rostova",
    initials: "AR",
    phone: "+1 (415) 309-8874",
    email: "anya.rostova@gallery.org",
    tier: "VIP Gold",
    preferredStylist: "Sora Takahashi",
    totalVisits: 19,
    favoriteRitual: "Couture Cut & Velvet Blowout",
    notes: "Needs 45 min before red carpet events; likes light champagne spritz.",
    lastVisit: "3 weeks ago"
  },
  {
    id: "client-4",
    name: "Marcus Sterling",
    initials: "MS",
    phone: "+1 (310) 902-4411",
    email: "msterling@beverlywealth.com",
    tier: "VIP Member",
    preferredStylist: "Chloe Dupont",
    totalVisits: 9,
    favoriteRitual: "Silk Press & Scalp Care",
    notes: "Requests 24h reminder via WhatsApp and valet parking spot #2.",
    lastVisit: "2 months ago"
  }
];

export const INITIAL_CONCIERGE_INQUIRIES: ConciergeInquiry[] = [
  {
    id: "inq-1",
    clientName: "Lady Genevieve Clark",
    clientTier: "VIP Platinum",
    phone: "+1 (310) 555-8821",
    serviceRequested: "Private Suite Buyout for Bridal Party",
    preferredDate: "Nov 16, 2024 (Full Afternoon)",
    message: "Seeking complete atelier closure for 6 guests with champagne service and bespoke styling for our destination gala.",
    status: "Unread",
    timeAgo: "18m ago"
  },
  {
    id: "inq-2",
    clientName: "Dr. Alistair Finch",
    clientTier: "VIP Gold",
    phone: "+1 (212) 555-4309",
    serviceRequested: "Botanical Scalp Spa + Express Cut",
    preferredDate: "Friday, Oct 25 (Post 6 PM)",
    message: "Flying in from New York. Wondering if Marcus Thorne has an off-hours slot available due to the gala blackout.",
    status: "Unread",
    timeAgo: "1h ago"
  },
  {
    id: "inq-3",
    clientName: "Valerie Dubois",
    clientTier: "VIP Member",
    phone: "+1 (310) 555-9034",
    serviceRequested: "Nordic Blonding Consultation",
    preferredDate: "Saturday, Oct 26 @ 11 AM",
    message: "Have previous brassy tones from another salon. Elena was highly recommended by Camille Vance.",
    status: "In Progress",
    timeAgo: "3h ago"
  }
];

export const INITIAL_SETTINGS: SalonSettings = {
  salonName: "StyleX Signature Salon",
  phone: "+1 (555) 781-2539",
  email: "concierge@stylexatelier.com",
  address: "450 N Canon Dr, Suite 100, Beverly Hills, CA 90210",
  requireOnlineDeposit: true,
  reschedulePolicy24h: true,
  smsWhatsappReminders: true,
  emailCalendarInvites: true
};
