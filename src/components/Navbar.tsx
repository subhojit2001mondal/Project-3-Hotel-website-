import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  Calendar,
  Compass,
  ShieldCheck,
  Sun,
  Moon,
  Copy,
  Check,
  Database,
  Camera,
  ChevronDown,
  Mountain,
  Building,
  Heart,
  History,
  Briefcase,
  Globe,
  HelpCircle,
  FileText,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ParijaiLogo } from './ParijaiLogo';

interface NavbarProps {
  onBookClick: () => void;
  onSelectProperty: (propertyId: 'gangtok' | 'kalyani') => void;
  onOpenDatabaseRecords?: () => void;
  onOpenManagePhotos?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onSelectProperty,
  onOpenDatabaseRecords,
  onOpenManagePhotos
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [showPhoneCard, setShowPhoneCard] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const phoneCardRef = useRef<HTMLDivElement>(null);
  const propertiesDropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  const { isNight, toggleTheme } = useTheme();

  // Scroll detection for glassy transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (phoneCardRef.current && !phoneCardRef.current.contains(target)) {
        setShowPhoneCard(false);
      }
      if (propertiesDropdownRef.current && !propertiesDropdownRef.current.contains(target)) {
        setPropertiesDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(target)) {
        setAdminDropdownOpen(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCallIconClick = (e: React.MouseEvent) => {
    const isMobile =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768);

    if (isMobile) {
      window.location.href = 'tel:+919163008361';
    } else {
      e.stopPropagation();
      setShowPhoneCard((prev) => !prev);
      setPropertiesDropdownOpen(false);
      setAdminDropdownOpen(false);
    }
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('+91 91630 08361');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5 sm:py-3'
            : 'bg-black/10 backdrop-blur-xs border-b border-white/10 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between gap-1.5 sm:gap-3">
            {/* BRAND LOGO / WORDMARK */}
            <a
              href="#top"
              className="group flex items-center gap-2 sm:gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg select-none min-w-0"
              aria-label="Parijai Group of Hotels - Home"
            >
              {/* Official Deep Green & Gold Circular Medallion Logo */}
              <div className="shrink-0 relative">
                <ParijaiLogo size={38} className="sm:w-[44px] sm:h-[44px]" />
                <div className="absolute inset-0 rounded-full ring-1 ring-amber-400/40 pointer-events-none" />
              </div>

              {/* Complete Brand Typography with Luxury Metallic Gold Foil Texture */}
              <div className="flex flex-col min-w-0 justify-center">
                <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
                  <span className="font-brand-cinzel text-[12px] xs:text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold tracking-[0.06em] sm:tracking-[0.08em] uppercase text-luxury-gold whitespace-nowrap transition-transform duration-300 group-hover:brightness-110">
                    PARIJAI GROUP
                  </span>
                  <span className="font-brand-cinzel text-[12px] xs:text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold tracking-[0.06em] sm:tracking-[0.08em] uppercase text-luxury-gold whitespace-nowrap transition-transform duration-300 group-hover:brightness-110">
                    OF HOTELS
                  </span>
                </div>

                {/* Regional Heritage Badge: High-contrast warm gold & ivory with dark frosted backing for 100% readability */}
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm border border-amber-400/25 text-[7px] xs:text-[7.5px] sm:text-[8.5px] font-sans font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-amber-100/90">
                    <span className="w-1 h-1 rounded-full bg-amber-400 inline-block shrink-0" />
                    <span>Sikkim & Bengal</span>
                    <span className="text-amber-400/60">·</span>
                    <span className="text-amber-200/90">Gangtok & Kalyani</span>
                  </span>
                </div>
              </div>
            </a>

            {/* CENTER GUEST NAVIGATION (Visible ONLY on extra-large screens: >= 1280px) */}
            <nav className="hidden 2xl:flex items-center gap-5 xl:gap-7 text-xs tracking-wider uppercase font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {/* Properties Dropdown */}
              <div className="relative" ref={propertiesDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setPropertiesDropdownOpen((prev) => !prev);
                    setAdminDropdownOpen(false);
                    setShowPhoneCard(false);
                  }}
                  className={`inline-flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                    propertiesDropdownOpen
                      ? 'text-amber-400'
                      : 'text-white hover:text-amber-300'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      propertiesDropdownOpen ? 'rotate-180 text-amber-400' : 'text-white/80'
                    }`}
                  />
                </button>

                {propertiesDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-76 p-2 rounded-2xl border border-slate-700/80 bg-slate-950/95 text-white shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProperty('gangtok');
                        setPropertiesDropdownOpen(false);
                      }}
                      className="w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group hover:bg-slate-800/80"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Mountain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs tracking-normal normal-case group-hover:text-amber-300 transition-colors text-white">
                          Trikuta Residency
                        </div>
                        <div className="text-[11px] text-slate-300 normal-case tracking-normal">
                          Gangtok, Sikkim · Kanchenjunga Valley Views
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectProperty('kalyani');
                        setPropertiesDropdownOpen(false);
                      }}
                      className="w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group hover:bg-slate-800/80"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs tracking-normal normal-case group-hover:text-emerald-300 transition-colors text-white">
                          Hotel Parijaye
                        </div>
                        <div className="text-[11px] text-slate-300 normal-case tracking-normal">
                          Kalyani, West Bengal · 2-min to AIIMS OPD
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <a
                href="#interactive-map"
                className="py-1.5 transition-colors text-white hover:text-amber-300"
              >
                Map & Distances
              </a>

              <a
                href="#guides"
                className="py-1.5 transition-colors text-white hover:text-amber-300"
              >
                Local Guides
              </a>

              <a
                href="#faqs"
                className="py-1.5 transition-colors text-white hover:text-amber-300"
              >
                Policies & FAQs
              </a>
            </nav>

            {/* RIGHT UTILITY & ACTIONS BAR (Responsive, no overlap with scrollbar) */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Admin Menu Icon Button (Hidden on tablet/mobile to save space; accessible in mobile drawer) */}
              {(onOpenDatabaseRecords || onOpenManagePhotos) && (
                <div className="relative hidden xl:block" ref={adminDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminDropdownOpen((prev) => !prev);
                      setPropertiesDropdownOpen(false);
                      setShowPhoneCard(false);
                    }}
                    aria-label="Owner & Admin Controls"
                    title="Owner & Admin Controls (Database & Photos)"
                    className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                      adminDropdownOpen
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-black/30 hover:bg-black/50 text-white border-white/20'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  </button>

                  {adminDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl border border-slate-700/80 bg-slate-950/95 text-white shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Owner & Admin Hub</span>
                      </div>

                      <div className="p-1 space-y-1 mt-1">
                        {onOpenManagePhotos && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenManagePhotos();
                              setAdminDropdownOpen(false);
                            }}
                            className="w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-2.5 cursor-pointer normal-case hover:bg-slate-800"
                          >
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                              <Camera className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">Manage Photos (Cloud)</div>
                              <div className="text-[10px] text-slate-400">Passcode-protected owner upload</div>
                            </div>
                          </button>
                        )}

                        {onOpenDatabaseRecords && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenDatabaseRecords();
                              setAdminDropdownOpen(false);
                            }}
                            className="w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-2.5 cursor-pointer normal-case hover:bg-slate-800"
                          >
                            <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                              <Database className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">Database Records</div>
                              <div className="text-[10px] text-slate-400">Bookings, leads & photo index</div>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Day / Night Mood Toggle */}
              <button
                onClick={toggleTheme}
                type="button"
                aria-label={`Switch to ${isNight ? 'Day' : 'Night'} mood`}
                title={`Switch to ${isNight ? 'Day' : 'Night'} mood`}
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border bg-black/30 hover:bg-black/50 text-white border-white/20"
              >
                {isNight ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
              </button>

              {/* WhatsApp Action (Hidden on small tablets to preserve space for CTA and menu) */}
              <a
                href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                target="_blank"
                rel="noreferrer"
                aria-label="Direct WhatsApp Inquiry"
                title="Direct WhatsApp Inquiry (+91 91630 08361)"
                className="hidden lg:inline-flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full transition-all border bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>

              {/* Helpline Call Button */}
              <div className="relative" ref={phoneCardRef}>
                <button
                  onClick={handleCallIconClick}
                  aria-label="Call Hotel Desk (+91 91630 08361)"
                  title="Call Hotel Desk (+91 91630 08361)"
                  className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                    showPhoneCard
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-black/30 hover:bg-black/50 text-amber-400 border-white/20'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                </button>

                {/* Desk Phone Popover */}
                {showPhoneCard && (
                  <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl border border-slate-700/80 bg-slate-950/95 text-white shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          24/7 Hotel Reception Desk
                        </span>
                      </div>
                      <button
                        onClick={() => setShowPhoneCard(false)}
                        className="text-slate-400 hover:text-white text-xs p-1 cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-3">
                      <div className="text-[11px] text-slate-400">Direct Helpline & Reservations</div>
                      <div className="text-lg font-bold font-mono tracking-tight mt-0.5 text-amber-400">
                        +91 91630 08361
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a
                        href="tel:+919163008361"
                        className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Now</span>
                      </a>

                      <button
                        onClick={handleCopyPhone}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          phoneCopied
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                            : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {phoneCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Gangtok & Kalyani</span>
                      <a
                        href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* PRIMARY CTA: RESERVE STAY - Visible ONLY on wider desktop screens (>=1280px) where full width is available without collision */}
              <button
                onClick={onBookClick}
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-2 rounded-full font-serif font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0 ml-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Stay</span>
              </button>

              {/* THREE-LINE MENU BUTTON: Displays on all screens (with label 'Menu' on md+, icon on mobile) */}
              <div className="relative" ref={menuDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                    setPropertiesDropdownOpen(false);
                    setAdminDropdownOpen(false);
                    setShowPhoneCard(false);
                  }}
                  aria-label="Toggle navigation menu"
                  title="Navigation Menu"
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all cursor-pointer text-xs font-semibold ${
                    mobileMenuOpen
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-black/30 hover:bg-black/50 text-white border-white/20'
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  <span className="hidden sm:inline font-medium">Menu</span>
                </button>

                {/* ANIMATED PROFESSIONAL FLYOUT MENU (Deep luxury smoky glass, high legibility over photo backgrounds) */}
                {mobileMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-[88vw] max-w-[320px] sm:w-80 rounded-2xl border border-white/20 bg-slate-950/92 backdrop-blur-2xl text-white shadow-[0_25px_65px_rgba(0,0,0,0.85)] z-50 animate-menu-fly-in overflow-hidden ring-1 ring-white/10"
                  >
                    <div className="max-h-[80vh] overflow-y-auto divide-y divide-white/10 p-2.5 text-xs menu-scrollbar">
                      {/* Section 1: Trips (Matching Reference Image) */}
                      <div className="py-2 px-1">
                        <div className="text-[11px] font-bold text-white px-3 mb-2 flex items-center justify-between">
                          <span>Trips & Stays</span>
                          <span className="text-[9px] uppercase tracking-wider text-amber-400 font-semibold">Parijai Group of Hotels</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectProperty('gangtok');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group cursor-pointer text-slate-200 hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                            <Mountain className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                            <div>
                              <div className="font-semibold text-white group-hover:text-amber-300">Trikuta Residency</div>
                              <div className="text-[10px] text-slate-300">Gangtok · Kanchenjunga Valley</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            Sikkim
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectProperty('kalyani');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group cursor-pointer text-slate-200 hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                            <Building className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <div>
                              <div className="font-semibold text-white group-hover:text-emerald-300">Hotel Parijaye</div>
                              <div className="text-[10px] text-slate-300">Kalyani · 2-min to AIIMS OPD</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            AIIMS
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onBookClick();
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group cursor-pointer text-slate-200 hover:text-white"
                        >
                          <Briefcase className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                          <span>Bookings & Reservations</span>
                        </button>

                        <a
                          href="#interactive-map"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Compass className="w-4 h-4 text-amber-400" />
                          <span>Map, Routes & Excursions</span>
                        </a>
                      </div>

                      {/* Section 2: Preferences (Matching Reference Image) */}
                      <div className="py-2 px-1">
                        <div className="text-[11px] font-bold text-white px-3 mb-2">
                          Preferences
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            toggleTheme();
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors cursor-pointer text-slate-200 hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                            {isNight ? (
                              <Sun className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Moon className="w-4 h-4 text-indigo-300" />
                            )}
                            <span>Appearance mood</span>
                          </div>
                          <span className="text-[10px] capitalize px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                            {isNight ? 'Night' : 'Day'}
                          </span>
                        </button>

                        <a
                          href="#faqs"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Globe className="w-4 h-4 text-amber-400" />
                          <span>Language & Currency (INR ₹)</span>
                        </a>
                      </div>

                      {/* Section 3: Support (Matching Reference Image) */}
                      <div className="py-2 px-1">
                        <div className="text-[11px] font-bold text-white px-3 mb-2">
                          Support
                        </div>

                        <a
                          href="#faqs"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <HelpCircle className="w-4 h-4 text-amber-400" />
                          <span>Help and support & FAQs</span>
                        </a>

                        <a
                          href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-emerald-300 hover:text-emerald-200 hover:bg-white/10 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>WhatsApp Desk (24/7)</span>
                        </a>

                        <a
                          href="tel:+919163008361"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <PhoneCall className="w-4 h-4 text-amber-400" />
                          <span>Call Reception (+91 91630 08361)</span>
                        </a>

                        {onOpenManagePhotos && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenManagePhotos();
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors text-slate-200 hover:text-white cursor-pointer"
                          >
                            <Camera className="w-4 h-4 text-emerald-400" />
                            <span>Parijai Photo Manager</span>
                          </button>
                        )}

                        {onOpenDatabaseRecords && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenDatabaseRecords();
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors text-slate-200 hover:text-white cursor-pointer"
                          >
                            <Database className="w-4 h-4 text-amber-400" />
                            <span>Database Records & Leads</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA in Flyout Menu */}
                    <div className="p-3 bg-black/40 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onBookClick();
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Reserve Stay</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
