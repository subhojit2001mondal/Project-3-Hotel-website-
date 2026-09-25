/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroBookingBar } from './components/HeroBookingBar';
import { PropertyComparison } from './components/PropertyComparison';
import { PropertyShowcase } from './components/PropertyShowcase';
import { LocalGuidesAndTrust } from './components/LocalGuidesAndTrust';
import { Footer } from './components/Footer';
import { BookingFunnelModal } from './components/BookingFunnelModal';
import { HelpChatBubble } from './components/HelpChatBubble';
import { Room, ROOMS } from './data/hotels';

function MainAppContent() {
  const { isNight } = useTheme();

  // Global booking state
  const [selectedProperty, setSelectedProperty] = useState<'gangtok' | 'kalyani'>('gangtok');

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

        {/* Property Comparison Strip */}
        <PropertyComparison
          activeProperty={selectedProperty}
          onChooseProperty={handleSelectProperty}
        />

        {/* Dedicated Property Showcases & Room Cards */}
        <PropertyShowcase
          activeProperty={selectedProperty}
          purpose={purpose}
          onReserveRoom={(room) => setActiveBookingRoom(room)}
          isLoading={isLoadingAvailability}
        />

        {/* Local Guides, Testimonials, Policies, & FAQs */}
        <LocalGuidesAndTrust />
      </main>

      {/* Footer with Contact Cards & Mobile Sticky Action Bar */}
      <Footer
        onBookNow={handleBookNowCTA}
        onSelectProperty={handleSelectProperty}
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
          onClose={() => setActiveBookingRoom(null)}
          onSuccess={() => {}}
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
