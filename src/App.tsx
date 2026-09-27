import React, { useState, useEffect } from 'react';
import {
  NavTab,
  Appointment,
  ServiceItem,
  DaySchedule,
  BlackoutDate,
  PromoCode,
  CarouselBanner,
  Stylist,
  VIPClient,
  ConciergeInquiry,
  SalonSettings,
} from './types';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_SERVICES,
  INITIAL_WEEK_SCHEDULE,
  INITIAL_BLACKOUT_DATES,
  INITIAL_PROMO_CODES,
  INITIAL_BANNERS,
  INITIAL_STYLISTS,
  INITIAL_VIP_CLIENTS,
  INITIAL_CONCIERGE_INQUIRIES,
  INITIAL_SETTINGS,
} from './mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer, ToastMessage } from './components/Toast';
import { OverviewView } from './components/OverviewView';
import { AppointmentsView } from './components/AppointmentsView';
import { ScheduleView } from './components/ScheduleView';
import { ArtisansView } from './components/ArtisansView';
import { ServiceMenuView } from './components/ServiceMenuView';
import { PromotionsView } from './components/PromotionsView';
import { ClientsView } from './components/ClientsView';
import { ConciergeView } from './components/ConciergeView';
import { SettingsView } from './components/SettingsView';
import { AdminSignIn } from './components/AdminSignIn';

// Modals
import { NewBookingModal } from './components/modals/NewBookingModal';
import { ExpressWalkInModal } from './components/modals/ExpressWalkInModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { AddServiceModal } from './components/modals/AddServiceModal';
import { AddBlackoutModal } from './components/modals/AddBlackoutModal';
import { AddPromotionModal } from './components/modals/AddPromotionModal';
import { RunSheetModal } from './components/modals/RunSheetModal';

export default function App() {
  // Navigation & Authentication
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Core Data
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('stylex_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('stylex_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(() => {
    const saved = localStorage.getItem('stylex_schedule');
    return saved ? JSON.parse(saved) : INITIAL_WEEK_SCHEDULE;
  });

  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>(() => {
    const saved = localStorage.getItem('stylex_blackouts');
    return saved ? JSON.parse(saved) : INITIAL_BLACKOUT_DATES;
  });

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    const saved = localStorage.getItem('stylex_promos');
    return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
  });

  const [banners, setBanners] = useState<CarouselBanner[]>(() => {
    const saved = localStorage.getItem('stylex_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [stylists] = useState<Stylist[]>(INITIAL_STYLISTS);
  const [clients] = useState<VIPClient[]>(INITIAL_VIP_CLIENTS);

  const [inquiries, setInquiries] = useState<ConciergeInquiry[]>(() => {
    const saved = localStorage.getItem('stylex_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_CONCIERGE_INQUIRIES;
  });

  const [settings, setSettings] = useState<SalonSettings>(() => {
    const saved = localStorage.getItem('stylex_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [isEngineActive, setIsEngineActive] = useState<boolean>(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Modals state
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isExpressWalkInOpen, setIsExpressWalkInOpen] = useState(false);
  const [isRunSheetOpen, setIsRunSheetOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceItem | null>(null);
  const [isAddBlackoutOpen, setIsAddBlackoutOpen] = useState(false);
  const [isAddPromotionOpen, setIsAddPromotionOpen] = useState(false);
  const [checkoutAppointment, setCheckoutAppointment] = useState<Appointment | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('stylex_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('stylex_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('stylex_schedule', JSON.stringify(weekSchedule));
  }, [weekSchedule]);

  useEffect(() => {
    localStorage.setItem('stylex_blackouts', JSON.stringify(blackoutDates));
  }, [blackoutDates]);

  useEffect(() => {
    localStorage.setItem('stylex_promos', JSON.stringify(promoCodes));
  }, [promoCodes]);

  useEffect(() => {
    localStorage.setItem('stylex_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('stylex_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('stylex_settings', JSON.stringify(settings));
  }, [settings]);

  // Operational Handlers
  const handleToggleEngine = () => {
    setIsEngineActive((prev) => {
      const next = !prev;
      addToast(
        next ? 'success' : 'info',
        next ? 'Guest Booking Engine Activated' : 'Public Reservations Blackout Enacted',
        next ? 'Public web portal is now accepting appointments.' : 'Public booking gateway is paused.'
      );
      return next;
    });
  };

  const handleToggleDaySchedule = (index: number) => {
    setWeekSchedule((prev) =>
      prev.map((day, idx) => {
        if (idx === index) {
          const nextOpen = !day.isOpen;
          addToast(
            'info',
            `${day.dateStr} Availability Changed`,
            nextOpen ? 'Public booking slots open.' : 'Day marked closed/blackout.'
          );
          return {
            ...day,
            isOpen: nextOpen,
            statusText: nextOpen ? 'Open' : 'Closed',
          };
        }
        return day;
      })
    );
  };

  const handleAddBooking = (newBooking: Appointment) => {
    setAppointments((prev) => [newBooking, ...prev]);
    addToast(
      'success',
      'Booking Reservation Confirmed',
      `${newBooking.clientName} booked for ${newBooking.serviceName} at ${newBooking.time}.`
    );
  };

  const handleAddWalkIn = (walkIn: Appointment) => {
    setAppointments((prev) => [walkIn, ...prev]);
    addToast(
      'success',
      'Express Walk-In Seated',
      `${walkIn.clientName} seated in ${walkIn.station} for ${walkIn.serviceName}.`
    );
  };

  const handleCheckIn = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: 'IN_SESSION' as const } : a))
    );
    const apt = appointments.find((a) => a.id === aptId);
    addToast(
      'success',
      'Guest Checked In',
      `${apt?.clientName || 'Guest'} marked In Session at ${apt?.station || 'station'}.`
    );
  };

  const handlePrepare = (aptId: string) => {
    const apt = appointments.find((a) => a.id === aptId);
    addToast(
      'info',
      'Station Prepared',
      `${apt?.station || 'Station'} prepared for ${apt?.clientName || 'guest'}.`
    );
  };

  const handleSendLink = (apt: Appointment) => {
    addToast(
      'success',
      'Payment Link Dispatched',
      `Sent deposit invoice link ($95.00) via SMS to ${apt.clientPhone}.`
    );
  };

  const handleCompleteCheckout = (aptId: string, tipAmount: number, paymentMethod: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === aptId
          ? { ...a, status: 'COMPLETED' as const, depositStatus: 'Full Paid' as const }
          : a
      )
    );
    const apt = appointments.find((a) => a.id === aptId);
    addToast(
      'success',
      'Reception Checkout Complete',
      `Payment settled for ${apt?.clientName} via ${paymentMethod} ($${tipAmount} tip included).`
    );
  };

  // Service Menu Handlers
  const handleToggleServiceVisibility = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.showOnWebsite;
          addToast(
            'info',
            'Service Visibility Updated',
            `"${s.name}" is now ${next ? 'visible on' : 'hidden from'} client website.`
          );
          return { ...s, showOnWebsite: next };
        }
        return s;
      })
    );
  };

  const handleSaveService = (service: ServiceItem) => {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.map((s) => (s.id === service.id ? service : s));
      }
      return [...prev, service];
    });
    addToast(
      'success',
      serviceToEdit ? 'Service Details Updated' : 'New Service Published',
      `"${service.name}" is ready in the salon catalog.`
    );
    setServiceToEdit(null);
  };

  const handleDeleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    if (!window.confirm(`Are you sure you want to remove "${target?.name}" from the service menu?`)) {
      return;
    }
    setServices((prev) => prev.filter((s) => s.id !== id));
    addToast('info', 'Service Removed', `"${target?.name}" removed from catalog.`);
  };

  // Blackout Date Handlers
  const handleAddBlackout = (item: BlackoutDate) => {
    setBlackoutDates((prev) => [item, ...prev]);
    addToast(
      'info',
      'Blackout Date Scheduled',
      `${item.title} on ${item.month} ${item.day} registered.`
    );
  };

  const handleDeleteBlackout = (id: string) => {
    setBlackoutDates((prev) => prev.filter((b) => b.id !== id));
    addToast('info', 'Blackout Removed', 'Atelier schedule returned to standard hours.');
  };

  // Promotions Handlers
  const handleToggleBanner = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
    addToast('info', 'Banner Updated', 'Homepage carousel banner display updated.');
  };

  const handleTogglePromo = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    addToast('info', 'Promo Code Updated', 'Client discount code status toggled.');
  };

  const handleAddPromoCode = (code: PromoCode) => {
    setPromoCodes((prev) => [code, ...prev]);
    addToast('success', 'Promo Code Created', `Code ${code.code} is now active.`);
  };

  const handleAddBanner = (banner: CarouselBanner) => {
    setBanners((prev) => [banner, ...prev]);
    addToast('success', 'Banner Campaign Created', `"${banner.title}" added to carousel.`);
  };

  // Concierge Handlers
  const handleResolveInquiry = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'Resolved' as const } : inq))
    );
    addToast('success', 'Inquiry Resolved', 'Marked as completed in concierge ledger.');
  };

  const handleReplyInquiry = (id: string, replyText: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'In Progress' as const } : inq))
    );
    addToast(
      'success',
      'Dispatch Transmitted',
      `Message forwarded to guest: "${replyText.slice(0, 40)}..."`
    );
  };

  // Settings Handlers
  const handleSaveSettings = (newSettings: SalonSettings) => {
    setSettings(newSettings);
    addToast('success', 'Atelier Settings Saved', 'Salon profile, deposits & notification rules updated.');
  };

  // Login & Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    addToast('info', 'Signed Out', 'You have been signed out from the atelier command portal.');
  };

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    addToast('success', 'Welcome Back', 'Elena Vance authenticated as Atelier Master & Admin.');
  };

  // If user signed out, display Admin Sign In screen
  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <AdminSignIn onSignInSuccess={handleSignInSuccess} />
      </>
    );
  }

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'Unread').length;

  return (
    <div className="bg-[#f6faf7] font-body-md text-[#181d1b] antialiased min-h-screen">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setGlobalSearchQuery('');
        }}
        todayAppointmentsCount={18}
        unreadConciergeCount={unreadInquiriesCount}
        onLogout={handleLogout}
      />

      {/* Main Content Pane */}
      <div className="pl-72">
        <Header
          onOpenNewBooking={() => setIsNewBookingOpen(true)}
          searchQuery={globalSearchQuery}
          onSearchChange={setGlobalSearchQuery}
          onProfileClick={() => setCurrentTab('atelier-settings')}
          unreadCount={unreadInquiriesCount}
        />

        <main className="relative pt-20 bg-[#f6faf7] min-h-screen px-6 sm:px-8 py-8">
          {currentTab === 'overview' && (
            <OverviewView
              appointments={appointments}
              weekSchedule={weekSchedule}
              isEngineActive={isEngineActive}
              onToggleEngine={handleToggleEngine}
              onOpenNewBooking={() => setIsNewBookingOpen(true)}
              onOpenExpressWalkIn={() => setIsExpressWalkInOpen(true)}
              onOpenRunSheet={() => setIsRunSheetOpen(true)}
              onOpenAddBlackout={() => setIsAddBlackoutOpen(true)}
              onCheckout={(apt) => setCheckoutAppointment(apt)}
              onCheckIn={handleCheckIn}
              onPrepare={handlePrepare}
              onSendLink={handleSendLink}
              onToggleDaySchedule={handleToggleDaySchedule}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {currentTab === 'appointments' && (
            <AppointmentsView
              appointments={appointments}
              onOpenNewBooking={() => setIsNewBookingOpen(true)}
              onCheckout={(apt) => setCheckoutAppointment(apt)}
              onCheckIn={handleCheckIn}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {currentTab === 'schedule-control' && (
            <ScheduleView
              weekSchedule={weekSchedule}
              blackoutDates={blackoutDates}
              isEngineActive={isEngineActive}
              onToggleEngine={handleToggleEngine}
              onToggleDay={handleToggleDaySchedule}
              onOpenAddBlackout={() => setIsAddBlackoutOpen(true)}
              onDeleteBlackout={handleDeleteBlackout}
            />
          )}

          {currentTab === 'artisans-and-stylists' && (
            <ArtisansView
              stylists={stylists}
              onOpenNewBookingWithStylist={(stylistId) => {
                setIsNewBookingOpen(true);
              }}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {currentTab === 'service-menu' && (
            <ServiceMenuView
              services={services}
              onToggleVisibility={handleToggleServiceVisibility}
              onOpenAddService={() => {
                setServiceToEdit(null);
                setIsAddServiceOpen(true);
              }}
              onEditService={(svc) => {
                setServiceToEdit(svc);
                setIsAddServiceOpen(true);
              }}
              onDeleteService={handleDeleteService}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {currentTab === 'promotions' && (
            <PromotionsView
              banners={banners}
              promoCodes={promoCodes}
              onToggleBanner={handleToggleBanner}
              onTogglePromo={handleTogglePromo}
              onOpenAddPromotion={() => setIsAddPromotionOpen(true)}
            />
          )}

          {currentTab === 'clients-and-vip' && (
            <ClientsView
              clients={clients}
              onBookClient={(name, phone) => {
                setIsNewBookingOpen(true);
              }}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {currentTab === 'concierge-desk' && (
            <ConciergeView
              inquiries={inquiries}
              onResolveInquiry={handleResolveInquiry}
              onReplyInquiry={handleReplyInquiry}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {currentTab === 'atelier-settings' && (
            <SettingsView
              settings={settings}
              onSave={handleSaveSettings}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        services={services}
        stylists={stylists}
        onAddBooking={handleAddBooking}
      />

      <ExpressWalkInModal
        isOpen={isExpressWalkInOpen}
        onClose={() => setIsExpressWalkInOpen(false)}
        services={services}
        stylists={stylists}
        onAddWalkIn={handleAddWalkIn}
      />

      <CheckoutModal
        appointment={checkoutAppointment}
        onClose={() => setCheckoutAppointment(null)}
        onCompleteCheckout={handleCompleteCheckout}
      />

      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={() => {
          setIsAddServiceOpen(false);
          setServiceToEdit(null);
        }}
        onSaveService={handleSaveService}
        serviceToEdit={serviceToEdit}
      />

      <AddBlackoutModal
        isOpen={isAddBlackoutOpen}
        onClose={() => setIsAddBlackoutOpen(false)}
        onAddBlackout={handleAddBlackout}
      />

      <AddPromotionModal
        isOpen={isAddPromotionOpen}
        onClose={() => setIsAddPromotionOpen(false)}
        onAddPromoCode={handleAddPromoCode}
        onAddBanner={handleAddBanner}
      />

      <RunSheetModal
        isOpen={isRunSheetOpen}
        onClose={() => setIsRunSheetOpen(false)}
        appointments={appointments}
        dateStr="Thursday, Oct 24, 2024"
      />
    </div>
  );
}
