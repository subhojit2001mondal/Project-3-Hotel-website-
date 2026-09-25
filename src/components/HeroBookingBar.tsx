import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Star,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Mountain,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { PROPERTIES } from '../data/hotels';
import { useTheme } from '../context/ThemeContext';

interface HeroBookingBarProps {
  selectedProperty: 'gangtok' | 'kalyani';
  setSelectedProperty: (prop: 'gangtok' | 'kalyani') => void;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  adults: number;
  setAdults: (num: number) => void;
  childrenCount: number;
  setChildrenCount: (num: number) => void;
  purpose: 'leisure' | 'medical' | 'corporate';
  setPurpose: (p: 'leisure' | 'medical' | 'corporate') => void;
  onSearch: () => void;
  isLoading: boolean;
}

// Panoramic Mount Kanchenjunga sliding photos for the main head banner
const KANCHENJUNGA_HERO_SLIDES = [
  {
    id: 'kanchenjunga-dawn-alpenglow',
    title: 'Mount Kanchenjunga (8,586m) — Golden Dawn Alpenglow',
    subtitle: 'Sacred Himalayan summit bathed in morning crimson & amber light',
    tag: 'Direct View from Trikuta Residency Balconies',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'kanchenjunga-morning-ridge',
    title: 'The Great Kanchenjunga Massif from Gangtok Ridges',
    subtitle: 'Crystal-clear alpine skies overlooking eternal snow chutes & glaciers',
    tag: '3rd Highest Mountain in the World',
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'kanchenjunga-sea-of-clouds',
    title: 'Kanchenjunga above the Valley Cloud Inversion',
    subtitle: 'Rolling white mist blankets the valley while snow spires float in the blue',
    tag: 'Teesta Valley Mist & Sacred Crests',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'kanchenjunga-sunset-glow',
    title: 'Fiery Golden Sunset across the Kangbachen Ridges',
    subtitle: 'Himalayan ice walls radiating in warm amber before twilight falls',
    tag: 'Eastern Himalayan Horizon',
    url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'kanchenjunga-sacred-summits',
    title: 'Glacial Splendor & Twin Snow Pyramids',
    subtitle: 'Sharp razor ridges and high altitude serenity in Sikkim',
    tag: 'Main, West & South Summits',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
  }
];

export const HeroBookingBar: React.FC<HeroBookingBarProps> = ({
  selectedProperty,
  setSelectedProperty,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  purpose,
  setPurpose,
  onSearch,
  isLoading,
}) => {
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const { isNight } = useTheme();

  const activeProp = PROPERTIES[selectedProperty];

  // Auto-slide Mount Kanchenjunga background pictures every 6 seconds
  useEffect(() => {
    if (!isSlidePlaying) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % KANCHENJUNGA_HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isSlidePlaying]);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % KANCHENJUNGA_HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + KANCHENJUNGA_HERO_SLIDES.length) % KANCHENJUNGA_HERO_SLIDES.length);
  };

  const currentSlide = KANCHENJUNGA_HERO_SLIDES[slideIndex];

  return (
    <div
      id="top"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden theme-transition"
    >
      {/* Dynamic Mount Kanchenjunga Sliding & Changing Background with Ken Burns Zoom & Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {KANCHENJUNGA_HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === slideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center ${
                  isActive ? 'animate-kenburns' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Rich atmospheric scrim ensuring Mount Kanchenjunga is vividly visible while text is 100% legible */}
        <div
          className={`absolute inset-0 z-20 transition-all duration-700 ${
            isNight
              ? 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50'
              : 'bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-900/40'
          }`}
        />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Row: Seasonal Direct Offer & Live Kanchenjunga Slide Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Seasonal Trust Alert Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-md border border-slate-700/80 bg-slate-900/80 text-slate-200 shadow-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-amber-300">Seasonal Direct Offer:</span>
            <span>Zero convenience fee & guaranteed late check-out on direct bookings</span>
          </div>

          {/* Mount Kanchenjunga Live Slide Badge & Quick Controls */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-xs shadow-md">
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white font-medium">{currentSlide.title}</span>
            <div className="flex items-center gap-1 ml-2 border-l border-slate-700 pl-2">
              <button
                onClick={prevSlide}
                aria-label="Previous mountain view"
                className="p-1 text-slate-300 hover:text-white rounded cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsSlidePlaying(!isSlidePlaying)}
                aria-label={isSlidePlaying ? 'Pause sliding' : 'Resume sliding'}
                className="p-1 text-amber-400 hover:text-amber-300 rounded cursor-pointer"
              >
                {isSlidePlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next mountain view"
                className="p-1 text-slate-300 hover:text-white rounded cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white text-balance leading-tight drop-shadow-md">
            Thoughtful Hospitality,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
              Dedicated Care.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 text-balance leading-relaxed drop-shadow-sm font-normal">
            From the peaceful Kanchenjunga ridges of <strong>Trikuta Residency (Gangtok)</strong> to the compassionate,
            elevator-equipped comfort at <strong>Hotel Parijaye (3-min to AIIMS Kalyani)</strong>.
          </p>

          {/* Social Proof Badges placed adjacent to decision points */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-200">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-700/80 bg-slate-900/80 shadow-sm backdrop-blur-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.8 / 5.0</span>
              <span className="text-slate-300">· 810+ Verified Stays</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Best Tariff Guarantee
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-medium text-slate-200">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" /> 100% Patient Attendant Care
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Property Switcher Ribbon */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button
            onClick={() => setSelectedProperty('gangtok')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              selectedProperty === 'gangtok'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900/85 text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-sm'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Trikuta Residency — Gangtok, Sikkim</span>
            <span className="text-[10px] opacity-80 font-mono">from ₹2,850</span>
          </button>

          <button
            onClick={() => setSelectedProperty('kalyani')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              selectedProperty === 'kalyani'
                ? 'bg-emerald-500 text-white font-bold shadow-md'
                : 'bg-slate-900/85 text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-sm'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hotel Parijaye — Kalyani (Near AIIMS)</span>
            <span className="text-[10px] opacity-80 font-mono">from ₹1,950</span>
          </button>
        </div>

        {/* Desktop Universal Booking Engine */}
        <div
          className={`hidden lg:block rounded-2xl p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            isNight
              ? 'bg-slate-900/90 border border-slate-800/90 text-white'
              : 'bg-white/98 border border-slate-200 text-slate-900 shadow-2xl'
          }`}
        >
          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Property Selector */}
            <div className="col-span-3">
              <label
                className={`block text-[11px] font-semibold tracking-wide uppercase mb-1 ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Selected Property
              </label>
              <div className="relative">
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value as 'gangtok' | 'kalyani')}
                  className={`w-full rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer appearance-none border transition-colors ${
                    isNight
                      ? 'bg-slate-950 border-slate-700/80 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="gangtok">Trikuta Residency – Gangtok, Sikkim</option>
                  <option value="kalyani">Hotel Parijaye – Kalyani near AIIMS</option>
                </select>
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Check-In Date */}
            <div className="col-span-2">
              <label
                className={`block text-[11px] font-semibold tracking-wide uppercase mb-1 ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Check-in
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className={`w-full rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer border transition-colors ${
                    isNight
                      ? 'bg-slate-950 border-slate-700/80 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Check-Out Date */}
            <div className="col-span-2">
              <label
                className={`block text-[11px] font-semibold tracking-wide uppercase mb-1 ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Check-out
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className={`w-full rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer border transition-colors ${
                    isNight
                      ? 'bg-slate-950 border-slate-700/80 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Guests Selector */}
            <div className="col-span-2">
              <label
                className={`block text-[11px] font-semibold tracking-wide uppercase mb-1 ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Guests & Rooms
              </label>
              <div
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 border transition-colors ${
                  isNight
                    ? 'bg-slate-950 border-slate-700/80 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex items-center justify-between w-full text-xs">
                  <div className="flex items-center gap-1">
                    <span className={isNight ? 'text-slate-400' : 'text-slate-600'}>Ad:</span>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="bg-transparent font-medium focus:outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option
                          key={n}
                          value={n}
                          className={isNight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
                        >
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className={isNight ? 'text-slate-700' : 'text-slate-300'}>|</span>
                  <div className="flex items-center gap-1">
                    <span className={isNight ? 'text-slate-400' : 'text-slate-600'}>Ch:</span>
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value))}
                      className="bg-transparent font-medium focus:outline-none cursor-pointer"
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option
                          key={n}
                          value={n}
                          className={isNight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
                        >
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose Tag (Personalization Hook) */}
            <div className="col-span-3">
              <label
                className={`block text-[11px] font-semibold tracking-wide uppercase mb-1 flex items-center justify-between ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                <span>Purpose of Visit</span>
                <span className="text-[10px] text-amber-500 dark:text-amber-300 lowercase font-normal">
                  customizes perks
                </span>
              </label>
              <div className="flex items-center gap-1">
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as 'leisure' | 'medical' | 'corporate')}
                  className={`w-full rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer border transition-colors ${
                    isNight
                      ? 'bg-slate-950 border-slate-700/80 text-amber-200'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <option value="leisure">🏔️ Mountain Leisure / Vacation</option>
                  <option value="medical">🏥 AIIMS Patient Attendant / Medical Care</option>
                  <option value="corporate">💼 Doctor, Academic & Corporate</option>
                </select>

                <button
                  onClick={onSearch}
                  disabled={isLoading}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Checking...</span>
                    </span>
                  ) : (
                    <>
                      <span>Check</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Context Pill below booking bar */}
          <div
            className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between text-xs transition-colors ${
              isNight
                ? 'border-slate-800/60 text-slate-400'
                : 'border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-semibold ${isNight ? 'text-slate-200' : 'text-slate-900'}`}>
                {activeProp.name}:
              </span>
              <span>{activeProp.distanceToLandmark}</span>
              <span>·</span>
              <span className="text-emerald-500 font-medium">
                {activeProp.vibe}
              </span>
            </div>
            <div className="text-[11px]">
              Personalized recommendations active for:{' '}
              <span className="text-amber-500 dark:text-amber-300 font-semibold capitalize">
                {purpose} travelers
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Booking Summary Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileModalOpen(true)}
            className={`w-full rounded-xl p-3.5 text-left flex items-center justify-between shadow-xl border transition-colors ${
              isNight
                ? 'bg-slate-900/90 backdrop-blur-md border-slate-700 text-white'
                : 'bg-white/95 backdrop-blur-md border-slate-300 text-slate-900'
            }`}
          >
            <div>
              <div className="text-xs text-amber-500 dark:text-amber-300 font-semibold">
                Selected: {activeProp.name}
              </div>
              <div className="text-sm font-bold mt-0.5">
                {checkInDate} → {checkOutDate} · {adults} Guest{adults > 1 ? 's' : ''}
              </div>
              <div className={`text-[11px] mt-0.5 capitalize ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Purpose: {purpose} travel
              </div>
            </div>
            <div className="px-3.5 py-2 bg-amber-400 text-slate-950 rounded-lg text-xs font-bold shrink-0">
              Change / Search
            </div>
          </button>
        </div>

        {/* Mobile Slide Indicator Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {KANCHENJUNGA_HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setSlideIndex(idx)}
              aria-label={`Go to ${slide.title}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === slideIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Mobile Full-Screen Booking Sheet */}
        {mobileModalOpen && (
          <div
            className={`fixed inset-0 z-50 backdrop-blur-xl p-6 overflow-y-auto flex flex-col justify-between ${
              isNight ? 'bg-slate-950/98 text-white' : 'bg-white text-slate-900'
            }`}
          >
            <div>
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  isNight ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <span className="text-lg font-serif font-bold">Find Your Stay</span>
                <button
                  onClick={() => setMobileModalOpen(false)}
                  className={`p-2 text-sm ${isNight ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}
                >
                  ✕ Close
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase mb-1.5 ${
                      isNight ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Select Property
                  </label>
                  <select
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value as 'gangtok' | 'kalyani')}
                    className={`w-full rounded-lg p-3 text-sm border ${
                      isNight
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="gangtok">Trikuta Residency – Gangtok, Sikkim</option>
                    <option value="kalyani">Hotel Parijaye – Kalyani near AIIMS</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase mb-1.5 ${
                        isNight ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className={`w-full rounded-lg p-3 text-sm border ${
                        isNight
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase mb-1.5 ${
                        isNight ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className={`w-full rounded-lg p-3 text-sm border ${
                        isNight
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase mb-1.5 ${
                        isNight ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Adults
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className={`w-full rounded-lg p-3 text-sm border ${
                        isNight
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase mb-1.5 ${
                        isNight ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Children
                    </label>
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value))}
                      className={`w-full rounded-lg p-3 text-sm border ${
                        isNight
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n}>
                          {n} Child{n !== 1 ? 'ren' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold uppercase mb-1.5 ${
                      isNight ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Visit Purpose (Personalized Amenities)
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as 'leisure' | 'medical' | 'corporate')}
                    className={`w-full rounded-lg p-3 text-sm border ${
                      isNight
                        ? 'bg-slate-900 border-slate-700 text-amber-300'
                        : 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                    }`}
                  >
                    <option value="leisure">🏔️ Mountain Leisure / Vacation</option>
                    <option value="medical">🏥 AIIMS Patient Attendant / Medical Care</option>
                    <option value="corporate">💼 Doctor, Academic & Corporate</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileModalOpen(false);
                  onSearch();
                }}
                className="w-full py-4 bg-amber-400 text-slate-950 font-bold rounded-xl text-center shadow-lg cursor-pointer"
              >
                Apply & View Available Rooms
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
