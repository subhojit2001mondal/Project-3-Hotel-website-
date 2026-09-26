/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroBookingBar } from './components/HeroBookingBar';
import { PropertyShowcase } from './components/PropertyShowcase';
import { LocalGuidesAndTrust } from './components/LocalGuidesAndTrust';
import { Footer } from './components/Footer';
import { BookingFunnelModal } from './components/BookingFunnelModal';
import { HelpChatBubble } from './components/HelpChatBubble';
import { DatabaseRecordsModal } from './components/DatabaseRecordsModal';
import { ManagePhotosModal } from './components/ManagePhotosModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { BookingSuccessToast } from './components/BookingSuccessToast';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { Room, ROOMS, BookingConfirmationSummary } from './data/hotels';
import {
  GalleryId,
  GalleryPhoto,
  subscribeToGalleryPhotos
} from './services/dbService';

function MainAppContent() {
  const { isNight } = useTheme();

  // Global booking state
  const [selectedProperty, setSelectedProperty] = useState<'gangtok' | 'kalyani'>('gangtok');

  // Database Records modal state
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState<boolean>(false);

  // Manage Photos modal state & gallery selection
  const [isManagePhotosOpen, setIsManagePhotosOpen] = useState<boolean>(false);
  const [selectedManageGallery, setSelectedManageGallery] = useState<GalleryId>('rooms/view-room');

  // Booking confirmation success modal and floating toast state
  const [bookingSuccessSummary, setBookingSuccessSummary] = useState<BookingConfirmationSummary | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Real-time persistent gallery photos from Firestore
  const [galleryPhotos, setGalleryPhotos] = useState<Record<GalleryId, GalleryPhoto[]>>({
    'rooms/view-room': [],
    'rooms/non-view-room': [],
    'common/reception': [],
    'common/dining': []
  });

  // Subscribe to real-time changes across the 4 galleries
  useEffect(() => {
    const unsub = subscribeToGalleryPhotos((data) => {
      setGalleryPhotos(data);
    });
    return () => unsub();
  }, []);

  const handleOpenManagePhotos = (galleryId: GalleryId = 'rooms/view-room') => {
    setSelectedManageGallery(galleryId);
    setIsManagePhotosOpen(true);
  };

  const handleBookingCompleted = (summary: BookingConfirmationSummary) => {
    setBookingSuccessSummary(summary);
    setShowSuccessToast(true);
  };

  // Format standard date defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDefault = new Date(tomorrow);
  checkoutDefault.setDate(checkoutDefault.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(formatDate(tomorrow));
  const [checkOutDate, setCheckOutDate] = useState<string>(formatDate(checkoutDefault));
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [purpose, setPurpose] = useState<'leisure' | 'medical' | 'corporate'>('leisure');

  // Loading shimmer state for inventory check (400-600ms)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState<boolean>(false);

  // Active room for booking modal
  const [activeBookingRoom, setActiveBookingRoom] = useState<Room | null>(null);

  // Search handler with realistic skeleton shimmer
  const handleSearch = () => {
    setIsLoadingAvailability(true);
    setTimeout(() => {
      setIsLoadingAvailability(false);
      const element = document.getElementById('properties');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleSelectProperty = (prop: 'gangtok' | 'kalyani') => {
    setSelectedProperty(prop);
    if (prop === 'kalyani' && purpose === 'leisure') {
      setPurpose('medical');
    } else if (prop === 'gangtok' && purpose === 'medical') {
      setPurpose('leisure');
    }
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowCTA = () => {
    // Open booking modal for the first room of current property
    const matchingRoom = ROOMS.find((r) => r.propertyId === selectedProperty) || ROOMS[0];
    setActiveBookingRoom(matchingRoom);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans theme-transition selection:bg-amber-400 selection:text-slate-950 ${
        isNight ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Sticky Navigation Bar with Day / Night Mood Toggle */}
      <Navbar
        onBookClick={handleBookNowCTA}
        onSelectProperty={handleSelectProperty}
        onOpenDatabaseRecords={() => setIsDatabaseModalOpen(true)}
        onOpenManagePhotos={() => handleOpenManagePhotos('rooms/view-room')}
      />

      {/* Main Content Landmark */}
      <main className="flex-1 theme-transition">
        {/* Main Head Banner: Thoughtful Hospitality, Dedicated Care with Mount Kanchenjunga Dynamic Sliding Vista */}
        <HeroBookingBar
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          adults={adults}
          setAdults={setAdults}
          childrenCount={childrenCount}
          setChildrenCount={setChildrenCount}
          purpose={purpose}
          setPurpose={setPurpose}
          onSearch={handleSearch}
          isLoading={isLoadingAvailability}
        />

        {/* Dedicated Property Showcases & Room Cards */}
        <PropertyShowcase
          activeProperty={selectedProperty}
          purpose={purpose}
          onReserveRoom={(room) => setActiveBookingRoom(room)}
          isLoading={isLoadingAvailability}
          galleryPhotos={galleryPhotos}
          onOpenManagePhotos={handleOpenManagePhotos}
        />

        {/* Interactive Landmark Map & Distance Section */}
        <InteractiveMapSection initialProperty={selectedProperty} />

        {/* Local Guides, Testimonials, Policies, & FAQs */}
        <LocalGuidesAndTrust />
      </main>

      {/* Footer with Contact Cards & Mobile Sticky Action Bar */}
      <Footer
        onBookNow={handleBookNowCTA}
        onSelectProperty={handleSelectProperty}
        onOpenDatabaseRecords={() => setIsDatabaseModalOpen(true)}
        onOpenManagePhotos={() => handleOpenManagePhotos('rooms/view-room')}
      />

      {/* Cloud Firestore Database Records & Customer Input Modal */}
      <DatabaseRecordsModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
        onSelectProperty={handleSelectProperty}
      />

      {/* Persistent Cloud Photo Manager Modal */}
      <ManagePhotosModal
        isOpen={isManagePhotosOpen}
        onClose={() => setIsManagePhotosOpen(false)}
        galleryPhotos={galleryPhotos}
        initialGallery={selectedManageGallery}
      />

      {/* Multi-Step Booking Funnel Modal */}
      {activeBookingRoom && (
        <BookingFunnelModal
          room={activeBookingRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adults={adults}
          childrenCount={childrenCount}
          purpose={purpose}
          onClose={() => {
            setActiveBookingRoom(null);
            if (bookingSuccessSummary) {
              setIsSuccessModalOpen(true);
            }
          }}
          onSuccess={handleBookingCompleted}
        />
      )}

      {/* Official Booking Success & Summary Voucher Modal */}
      <BookingSuccessModal
        summary={bookingSuccessSummary}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onOpenDatabase={() => setIsDatabaseModalOpen(true)}
      />

      {/* Floating Success Toast Notification with Reference Number & Quick Actions */}
      {showSuccessToast && (
        <BookingSuccessToast
          summary={bookingSuccessSummary}
          onOpenSummaryModal={() => setIsSuccessModalOpen(true)}
          onDismiss={() => setShowSuccessToast(false)}
        />
      )}

      {/* Non-intrusive floating help launcher */}
      <HelpChatBubble onSelectProperty={handleSelectProperty} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
