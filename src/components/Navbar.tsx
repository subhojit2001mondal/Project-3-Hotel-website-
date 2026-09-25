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
  Building
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
            ? isNight
              ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30 py-3'
              : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-3'
            : isNight
            ? 'bg-slate-950/30 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-white/45 backdrop-blur-md border-b border-slate-900/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* BRAND LOGO / WORDMARK */}
            <a
              href="#top"
              className="group flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg select-none"
            >
              {/* Official Deep Green & Gold Circular Medallion Logo */}
              <ParijaiLogo size={44} />

              <div className="flex flex-col">
                <span
                  className={`font-serif text-lg sm:text-xl font-bold tracking-[0.14em] uppercase transition-colors duration-300 ${
                    isNight ? 'text-white group-hover:text-amber-300' : 'text-slate-950 group-hover:text-amber-700'
                  }`}
                >
                  Parijai Group of Hotels
                </span>
                <span
                  className={`text-[9px] tracking-[0.22em] uppercase font-sans font-medium transition-colors duration-300 hidden sm:block ${
                    isNight ? 'text-emerald-400/90' : 'text-emerald-800'
                  }`}
                >
                  Sikkim & Bengal · Trikuta & Parijaye
                </span>
              </div>
            </a>

            {/* CENTER GUEST NAVIGATION (Pure guest links, no clutter, no collision) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs tracking-wider uppercase font-semibold">
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
                      : isNight
                      ? 'text-slate-200 hover:text-amber-300'
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      propertiesDropdownOpen ? 'rotate-180 text-amber-400' : 'opacity-70'
                    }`}
                  />
                </button>

                {propertiesDropdownOpen && (
                  <div
                    className={`absolute left-0 top-full mt-2 w-76 p-2 rounded-2xl border shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
                      isNight
                        ? 'bg-slate-900/98 border-slate-700/80 text-white'
                        : 'bg-white/98 border-slate-200 text-slate-900 shadow-xl'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProperty('gangtok');
                        setPropertiesDropdownOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group ${
                        isNight ? 'hover:bg-slate-800/80' : 'hover:bg-amber-50/70'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Mountain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs tracking-normal normal-case group-hover:text-amber-500 transition-colors">
                          Trikuta Residency
                        </div>
                        <div className="text-[11px] text-slate-400 normal-case tracking-normal">
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
                      className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer group ${
                        isNight ? 'hover:bg-slate-800/80' : 'hover:bg-emerald-50/70'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs tracking-normal normal-case group-hover:text-emerald-500 transition-colors">
                          Hotel Parijaye
                        </div>
                        <div className="text-[11px] text-slate-400 normal-case tracking-normal">
                          Kalyani, West Bengal · 2-min to AIIMS OPD
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <a
                href="#comparison"
                className={`py-1.5 transition-colors ${
                  isNight ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                Compare
              </a>

              <a
                href="#interactive-map"
                className={`py-1.5 transition-colors ${
                  isNight ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                Map & Distances
              </a>

              <a
                href="#guides"
                className={`py-1.5 transition-colors ${
                  isNight ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                Local Guides
              </a>

              <a
                href="#faqs"
                className={`py-1.5 transition-colors ${
                  isNight ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                Policies & FAQs
              </a>
            </nav>

            {/* RIGHT UTILITY & ACTIONS BAR (Unified matching icon row + CTA) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Admin Menu Icon Button (Discreet, matches other circular icons, zero collision) */}
              {(onOpenDatabaseRecords || onOpenManagePhotos) && (
                <div className="relative" ref={adminDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminDropdownOpen((prev) => !prev);
                      setPropertiesDropdownOpen(false);
                      setShowPhoneCard(false);
                    }}
                    aria-label="Owner & Admin Controls"
                    title="Owner & Admin Controls (Database & Photos)"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                      adminDropdownOpen
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                        : isNight
                        ? 'bg-white/5 hover:bg-white/10 text-amber-400 border-white/10 hover:border-amber-400/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-amber-700 border-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>

                  {adminDropdownOpen && (
                    <div
                      className={`absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl border shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
                        isNight
                          ? 'bg-slate-900/98 border-slate-700 text-white'
                          : 'bg-white/98 border-slate-200 text-slate-900 shadow-xl'
                      }`}
                    >
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
                            className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-2.5 cursor-pointer normal-case ${
                              isNight ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                              <Camera className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold">Manage Photos (Cloud)</div>
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
                            className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-2.5 cursor-pointer normal-case ${
                              isNight ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                              <Database className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold">Database Records</div>
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
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border ${
                  isNight
                    ? 'bg-white/5 hover:bg-white/10 text-amber-300 border-white/10 hover:border-amber-400/40'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                {isNight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-700" />}
              </button>

              {/* WhatsApp Action */}
              <a
                href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                target="_blank"
                rel="noreferrer"
                aria-label="Direct WhatsApp Inquiry"
                title="Direct WhatsApp Inquiry (+91 91630 08361)"
                className={`hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full transition-all border ${
                  isNight
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Helpline Call Button */}
              <div className="relative" ref={phoneCardRef}>
                <button
                  onClick={handleCallIconClick}
                  aria-label="Call Hotel Desk (+91 91630 08361)"
                  title="Call Hotel Desk (+91 91630 08361)"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                    showPhoneCard
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : isNight
                      ? 'bg-white/5 hover:bg-white/10 text-amber-400 border-white/10'
                      : 'bg-slate-100 hover:bg-slate-200 text-amber-700 border-slate-300'
                  }`}
                >
                  <PhoneCall className="w-4 h-4" />
                </button>

                {/* Desk Phone Popover */}
                {showPhoneCard && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl ${
                      isNight
                        ? 'bg-slate-900/98 border-slate-700 text-white'
                        : 'bg-white/98 border-slate-200 text-slate-900 shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                          24/7 Hotel Reception Desk
                        </span>
                      </div>
                      <button
                        onClick={() => setShowPhoneCard(false)}
                        className="text-slate-400 hover:text-slate-200 text-xs p-1 cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-3">
                      <div className="text-[11px] text-slate-400">Direct Helpline & Reservations</div>
                      <div className="text-lg font-bold font-mono tracking-tight mt-0.5 text-amber-500">
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
                            : isNight
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
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

                    <div className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Gangtok & Kalyani</span>
                      <a
                        href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-500 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle divider before CTA on desktop */}
              <div
                className={`hidden sm:block h-5 w-px ${
                  isNight ? 'bg-white/15' : 'bg-slate-300'
                }`}
              />

              {/* PRIMARY CTA: RESERVE STAY */}
              <button
                onClick={onBookClick}
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-serif font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Stay</span>
              </button>

              {/* Mobile Drawer Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className={`lg:hidden p-2 rounded-xl border transition-colors ${
                  isNight
                    ? 'border-white/10 text-slate-200 hover:bg-white/10'
                    : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (Transparent glassmorphic overlay) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-30 pt-20 pb-8 px-5 flex flex-col justify-between backdrop-blur-2xl transition-all ${
            isNight ? 'bg-slate-950/95 text-slate-100' : 'bg-white/95 text-slate-900'
          }`}
        >
          <div className="space-y-5 overflow-y-auto">
            {/* Mobile Header Brand Identity */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
              <ParijaiLogo size={42} />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-white">
                  Parijai Group of Hotels
                </span>
                <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-medium">
                  Sikkim & Bengal · Heritage & Care
                </span>
              </div>
            </div>

            {/* Property Selectors */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Residencies & Stays
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onSelectProperty('gangtok');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    isNight ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center">
                      <Mountain className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm">Trikuta Residency</div>
                      <div className="text-xs text-slate-400">Gangtok, Sikkim · Valley View</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-400">
                    Sikkim
                  </span>
                </button>

                <button
                  onClick={() => {
                    onSelectProperty('kalyani');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    isNight ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm">Hotel Parijaye</div>
                      <div className="text-xs text-slate-400">Kalyani · 2-min to AIIMS OPD</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    AIIMS
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Explore & Information
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <a
                  href="#comparison"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isNight ? 'border-slate-800/80 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Property Comparison
                </a>
                <a
                  href="#interactive-map"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isNight ? 'border-slate-800/80 hover:bg-slate-900 text-amber-400' : 'border-slate-200 hover:bg-slate-100 text-amber-700'
                  }`}
                >
                  Map & Distances
                </a>
                <a
                  href="#guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isNight ? 'border-slate-800/80 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Local Guides & Transit
                </a>
                <a
                  href="#faqs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isNight ? 'border-slate-800/80 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  FAQs & Tariffs
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isNight ? 'border-slate-800/80 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Contact & Location
                </a>
              </div>
            </div>

            {/* Management & Database Buttons */}
            {(onOpenDatabaseRecords || onOpenManagePhotos) && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Owner & Management
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                  {onOpenManagePhotos && (
                    <button
                      onClick={() => {
                        onOpenManagePhotos();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center gap-2 text-left"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Manage Photos (Owner)</span>
                    </button>
                  )}
                  {onOpenDatabaseRecords && (
                    <button
                      onClick={() => {
                        onOpenDatabaseRecords();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2.5 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-400 flex items-center gap-2 text-left"
                    >
                      <Database className="w-4 h-4" />
                      <span>Database Records & Leads</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Mobile Action Buttons */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-serif font-bold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Room Now</span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+919163008361"
                className={`py-2.5 px-3 border rounded-xl flex items-center justify-center gap-1.5 font-semibold ${
                  isNight ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Desk</span>
              </a>
              <a
                href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20rooms."
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-1.5 font-semibold shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
