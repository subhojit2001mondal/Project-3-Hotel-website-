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
import { ParijaiLogo } from './ParijaiLogo';

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

// Curated tour viewpoint slides covering Trikuta Residency's actual sightseeing packages
export interface ViewpointSlide {
  id: string;
  name: string;
  altitude: string;
  tag: string;
  headline: string;
  subtext: string;
  url: string;
  focalPoint: string;
  routeHighlight: string;
}

const TOUR_VIEWPOINT_SLIDES: ViewpointSlide[] = [
  {
    id: 'gurudongmar-lake',
    name: 'Gurudongmar Lake',
    altitude: '17,800 ft',
    tag: 'North Sikkim Glacial Sanctuary',
    headline: 'One of the Highest Lakes on Earth.',
    subtext: 'Gurudongmar Lake, Sikkim (17,800 ft) — sacred turquoise glacial waters under snow-capped peaks, part of our guided North Sikkim journeys.',
    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-center',
    routeHighlight: 'Included in Trikuta 2N/3D North Sikkim Circuit'
  },
  {
    id: 'yumthang-valley',
    name: 'Yumthang Valley',
    altitude: '11,693 ft',
    tag: 'The Valley of Flowers',
    headline: 'Where the Himalayan Valley Blooms.',
    subtext: 'Yumthang Valley — the celebrated Valley of Flowers with wild rhododendrons, hot springs & alpine meadows on our Lachung routes.',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-[center_40%]',
    routeHighlight: 'Sanctuary of Rhododendrons & Alpine Meadows'
  },
  {
    id: 'tsomgo-lake',
    name: 'Tsomgo (Changu) Lake',
    altitude: '12,310 ft',
    tag: 'East Sikkim Glacial Wonder',
    headline: 'Sacred Turquoise Waters in the Clouds.',
    subtext: 'Tsomgo Lake (12,310 ft) — glacial serenity reflecting alpine skies and yak trails, an easy and scenic day excursion from Gangtok.',
    url: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-center',
    routeHighlight: 'Dedicated same-day permit & cab booking at our desk'
  },
  {
    id: 'nathula-pass',
    name: 'Nathula Pass',
    altitude: '14,140 ft',
    tag: 'Historic Old Silk Route',
    headline: 'Stand at the Indo-China Border.',
    subtext: 'Nathula Pass (14,140 ft) — winding mountain frontier through Himalayan heights, a signature day trip arranged from Trikuta Residency.',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-[center_35%]',
    routeHighlight: 'Exclusive Indian citizen frontier permit desk'
  },
  {
    id: 'baba-mandir',
    name: 'Baba Harbhajan Singh Mandir',
    altitude: '13,123 ft',
    tag: 'Revered Mountain Shrine',
    headline: 'Legend & Devotion on the Ridge.',
    subtext: 'Baba Mandir — honoring the revered soldier-saint guarding the eastern frontier, draped in sacred prayer flags above the cloud line.',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-center',
    routeHighlight: 'Seamlessly combined with the Tsomgo-Nathula route'
  },
  {
    id: 'lachung-zero-point',
    name: 'Lachung & Zero Point',
    altitude: '15,300 ft',
    tag: 'Yumesamdong Snow Paradise',
    headline: 'Pristine Snow & Alpine Silence.',
    subtext: 'Lachung & Zero Point (Yumesamdong) — where civilian roads end and eternal snowfields begin under the Kanchenjunga range.',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-center',
    routeHighlight: 'North Sikkim high-altitude snow journey'
  },
  {
    id: 'seven-sisters-waterfalls',
    name: 'Seven Sisters Waterfalls',
    altitude: 'Scenic Highway',
    tag: 'Cascading Mountain Wonder',
    headline: 'Cascading Wonders in the Hills.',
    subtext: 'Seven Sisters Waterfalls — multi-tiered crystalline falls surrounded by lush emerald rainforest on the scenic highway to North Sikkim.',
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-center',
    routeHighlight: 'Popular photo stopover on North Sikkim transfers'
  },
  {
    id: 'mg-marg-gangtok',
    name: 'MG Marg, Gangtok',
    altitude: '5,410 ft',
    tag: 'Heart of the Capital',
    headline: 'The Vibrant Heart of Gangtok.',
    subtext: 'MG Marg — lively pedestrian boulevard of mountain cafes, Sikkimese craft shops, and charm, minutes from Trikuta Residency.',
    url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1920&h=1080&q=85',
    focalPoint: 'object-center',
    routeHighlight: 'Centrally located base for all Sikkim excursions'
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
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { isNight } = useTheme();

  const activeProp = PROPERTIES[selectedProperty];

  // Respect user preference for reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Auto-advance viewpoint slideshow every 5.5 seconds (paused on hover, tap, or reduced-motion)
  useEffect(() => {
    if (!isSlidePlaying || isHovered || reducedMotion) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % TOUR_VIEWPOINT_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSlidePlaying, isHovered, reducedMotion]);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % TOUR_VIEWPOINT_SLIDES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + TOUR_VIEWPOINT_SLIDES.length) % TOUR_VIEWPOINT_SLIDES.length);
  };

  const currentSlide = TOUR_VIEWPOINT_SLIDES[slideIndex];

  return (
    <div
      id="top"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2500)}
      className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 overflow-hidden theme-transition"
    >
      {/* Auto-sliding Background Showcase of Real Tour Viewpoints: 100% Crisp, Pure Full Brightness, Zero Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {TOUR_VIEWPOINT_SLIDES.map((slide, idx) => {
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
                alt={`${slide.name} — ${slide.tag}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${slide.focalPoint} ${
                  isActive && !reducedMotion ? 'animate-kenburns' : 'scale-100'
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* CENTERED HERO TEXT: Clean, Bold, Direct on Image, Responsive font sizes */}
        <div className="pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 flex flex-col items-center justify-center text-center">
          {/* Subtle Viewpoint Location Eyebrow */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-white/20 text-amber-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3 sm:mb-4 shadow-md animate-fade-in">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{currentSlide.name}</span>
            <span className="text-white/40">·</span>
            <span>{currentSlide.altitude}</span>
          </div>

          {/* Large Bold Headline: Scaled responsively for phone, windowed preview, and desktop */}
          <h1
            key={`head-${currentSlide.id}`}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] sm:leading-[1.12] max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] animate-fade-in px-2 sm:px-4"
          >
            {currentSlide.headline}
          </h1>

          {/* Clean One-Line Subtitle: Responsive font scaling */}
          <p
            key={`sub-${currentSlide.id}`}
            className="mt-3 sm:mt-4 text-xs xs:text-sm sm:text-lg md:text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] animate-fade-in px-2 sm:px-4"
          >
            {currentSlide.subtext}
          </p>

          {/* Minimal Viewpoint Switcher Dots */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1.5 sm:gap-2">
            {TOUR_VIEWPOINT_SLIDES.map((slide, idx) => {
              const isActive = idx === slideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setSlideIndex(idx)}
                  aria-label={`Switch to ${slide.name}`}
                  title={`${slide.name} (${slide.altitude})`}
                  className="p-1.5 cursor-pointer focus:outline-none group transition-transform"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-amber-400 shadow-lg ring-2 ring-black/50'
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/80 hover:bg-white shadow-md group-hover:scale-125'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
