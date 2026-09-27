export type NavTab = 
  | 'overview'
  | 'appointments'
  | 'schedule-control'
  | 'artisans-and-stylists'
  | 'service-menu'
  | 'promotions'
  | 'clients-and-vip'
  | 'concierge-desk'
  | 'atelier-settings';

export type AppointmentStatus = 'CONFIRMED' | 'IN_SESSION' | 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  time: string;
  durationMin: number;
  clientName: string;
  clientPhone: string;
  clientInitials: string;
  clientTier?: 'VIP Platinum' | 'VIP Gold' | 'VIP Member' | 'New Guest' | 'Standard';
  serviceName: string;
  station: string;
  stylistName: string;
  stylistAvatar: string;
  depositStatus: 'Deposit Paid' | 'Pending Deposit' | 'Complimentary' | 'Full Paid';
  depositAmount?: number;
  totalPrice: number;
  status: AppointmentStatus;
  dateStr: string; // e.g. "2024-10-24"
  notes?: string;
}

export interface DaySchedule {
  dayName: string;
  label: string; // "Today", "Tomorrow", "Weekend", etc.
  dateStr: string; // "Thu, Oct 24"
  isOpen: boolean;
  statusText: string; // "Open", "Blackout", "Closed"
  subText: string;
  hours: string;
}

export interface BlackoutDate {
  id: string;
  month: string;
  day: string;
  title: string;
  timeRange: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'spa';
  durationMin: number;
  price: number;
  description: string;
  showOnWebsite: boolean;
}

export interface PromoCode {
  id: string;
  code: string;
  discount: string;
  totalUses: string;
  isActive: boolean;
  colorScheme: 'green' | 'yellow' | 'orange';
}

export interface CarouselBanner {
  id: string;
  title: string;
  validity: string;
  imageUrl: string;
  isActive: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  station: string;
  specialty: string;
  appointmentsCount: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  isAvailableToday: boolean;
}

export interface VIPClient {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  tier: 'VIP Platinum' | 'VIP Gold' | 'VIP Member';
  preferredStylist: string;
  totalVisits: number;
  favoriteRitual: string;
  notes: string;
  lastVisit: string;
}

export interface ConciergeInquiry {
  id: string;
  clientName: string;
  clientTier?: string;
  phone: string;
  serviceRequested: string;
  preferredDate: string;
  message: string;
  status: 'Unread' | 'In Progress' | 'Resolved';
  timeAgo: string;
}

export interface SalonSettings {
  salonName: string;
  phone: string;
  email: string;
  address: string;
  requireOnlineDeposit: boolean;
  reschedulePolicy24h: boolean;
  smsWhatsappReminders: boolean;
  emailCalendarInvites: boolean;
}
