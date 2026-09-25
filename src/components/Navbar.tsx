import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneCall, MessageCircle, Menu, X, Calendar, Compass, ShieldCheck, Sun, Moon, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onBookClick: () => void;
  onSelectProperty: (propertyId: 'gangtok' | 'kalyani') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, onSelectProperty }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPhoneCard, setShowPhoneCard] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const phoneCardRef = useRef<HTMLDivElement>(null);
  const { theme, isNight, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close phone dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (phoneCardRef.current && !phoneCardRef.current.contains(event.target as Node)) {
        setShowPhoneCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCallIconClick = (e: React.MouseEvent) => {
    // Detect mobile / touch environment
    const isMobile =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768);

    if (isMobile) {
      // Direct call on mobile / goes straight to call log
      window.location.href = 'tel:+919163008361';
    } else {
      // Desktop: toggle showing the number card
      e.stopPropagation();
      setShowPhoneCard((prev) => !prev);
    }
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('+91 91630 08361');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2500);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isNight
              ? 'bg-slate-950/95 backdrop-blur-md py-2.5 shadow-md border-b border-slate-800'
              : 'bg-white/95 backdrop-blur-md py-2.5 shadow-md border-b border-slate-200'
            : isNight
            ? 'bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent py-4'
            : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#top"
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
            >
              <span
                className={`text-xl sm:text-2xl font-serif font-bold tracking-tight transition-colors ${
                  isNight
                    ? 'text-white group-hover:text-amber-300'
                    : 'text-slate-900 group-hover:text-amber-600'
                }`}
              >
                Parijai Group
              </span>
              <span
                className={`text-[11px] font-sans tracking-wide hidden sm:inline-block ${
                  isNight ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Hotels & Residencies · Gangtok & Kalyani
              </span>
            </a>

            {/* Zone 2: Clean text navigation links */}
            <nav
              className={`hidden lg:flex items-center gap-7 text-sm font-medium ${
                isNight ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              <button
                onClick={() => onSelectProperty('gangtok')}
                className={`transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 py-1 ${
                  isNight ? 'hover:text-amber-300' : 'hover:text-amber-600'
                }`}
              >
                Trikuta Residency (Gangtok)
              </button>
              <button
                onClick={() => onSelectProperty('kalyani')}
                className={`transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 py-1 ${
                  isNight ? 'hover:text-amber-300' : 'hover:text-amber-600'
                }`}
              >
                Hotel Parijaye (AIIMS Kalyani)
              </button>
              <a
                href="#comparison"
                className={`transition-colors py-1 ${
                  isNight ? 'hover:text-amber-300' : 'hover:text-amber-600'
                }`}
              >
                Compare
              </a>
              <a
                href="#guides"
                className={`transition-colors py-1 ${
                  isNight ? 'hover:text-amber-300' : 'hover:text-amber-600'
                }`}
              >
                AIIMS & Sikkim Guides
              </a>
              <a
                href="#faqs"
                className={`transition-colors py-1 ${
                  isNight ? 'hover:text-amber-300' : 'hover:text-amber-600'
                }`}
              >
                FAQs & Policies
              </a>
            </nav>

            {/* Zone 3: Actions + Day/Night Mood Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Day / Night Mood Toggle Button */}
              <button
                onClick={toggleTheme}
                type="button"
                aria-label={`Switch to ${isNight ? 'Day' : 'Night'} mood`}
                title={`Switch to ${isNight ? 'Day' : 'Night'} mood`}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer shadow-sm active:scale-95 border ${
                  isNight
                    ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-400/30 ring-1 ring-amber-400/20'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300/80 ring-1 ring-amber-200'
                }`}
              >
                {isNight ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                    <span className="hidden sm:inline font-semibold">Day Mood</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-700" />
                    <span className="hidden sm:inline font-semibold">Night Mood</span>
                  </>
                )}
              </button>

              <a
                href="https://wa.me/919163008361?text=Hello%20Parijai%20Group,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                target="_blank"
                rel="noreferrer"
                aria-label="Instant WhatsApp Inquiry"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors border ${
                  isNight
                    ? 'text-emerald-400 border-emerald-500/40 hover:bg-emerald-950/40'
                    : 'text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Calling Sign (Mobile: dials directly into call log; Desktop: reveals phone number card) */}
              <div className="relative" ref={phoneCardRef}>
                <button
                  onClick={handleCallIconClick}
                  aria-label="Call Hotel Reception (+91 91630 08361)"
                  title="Call Hotel Reception (+91 91630 08361)"
                  className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center active:scale-90 ${
                    showPhoneCard
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                      : isNight
                      ? 'bg-slate-900 border-slate-700/80 text-amber-400 hover:bg-slate-800 hover:text-amber-300'
                      : 'bg-white border-slate-300 text-amber-600 hover:bg-amber-50 hover:text-amber-700 shadow-sm'
                  }`}
                >
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                </button>

                {/* Desktop Phone Popover Card */}
                {showPhoneCard && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                      isNight
                        ? 'bg-slate-900/98 border-slate-700 text-white backdrop-blur-xl'
                        : 'bg-white/98 border-slate-200 text-slate-900 backdrop-blur-xl shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                          24/7 Reception Desk
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
                      <div className="text-lg font-bold font-mono tracking-tight mt-0.5 text-amber-500 dark:text-amber-400">
                        +91 91630 08361
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a
                        href="tel:+919163008361"
                        className="py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Now</span>
                      </a>

                      <button
                        onClick={handleCopyPhone}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
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
                      <span className="text-slate-400">Trikuta & Parijaye</span>
                      <a
                        href="https://wa.me/919163008361?text=Hello%20Parijai%20Group,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-500 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 rounded-md hover:from-amber-300 hover:to-amber-200 transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className={`lg:hidden p-2 rounded-md ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isNight ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-50 lg:hidden backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto ${
            isNight ? 'bg-slate-950/95 text-slate-200' : 'bg-white/98 text-slate-800'
          }`}
        >
          <div>
            <div
              className={`flex items-center justify-between pb-5 border-b ${
                isNight ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <div>
                <span
                  className={`text-xl font-serif font-bold ${
                    isNight ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  Parijai Group
                </span>
                <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                  Thoughtful Hospitality, Dedicated Care
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className={`p-2 rounded-md ${
                  isNight ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Day / Night Mood Switcher */}
            <div className="py-4">
              <button
                onClick={toggleTheme}
                className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between border transition-all ${
                  isNight
                    ? 'bg-slate-900 border-amber-400/40 text-amber-300'
                    : 'bg-amber-50 border-amber-300 text-amber-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isNight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  <span className="text-xs font-semibold">
                    Current Mood: {isNight ? 'Night Mood (Dark)' : 'Day Mood (Light)'}
                  </span>
                </div>
                <span className="text-[11px] underline">
                  Switch to {isNight ? 'Day' : 'Night'}
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm font-medium">
              <button
                onClick={() => {
                  onSelectProperty('gangtok');
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-3 px-3 rounded-lg border flex items-center justify-between ${
                  isNight
                    ? 'hover:bg-slate-900 border-slate-800 bg-slate-900/50'
                    : 'hover:bg-slate-100 border-slate-200 bg-slate-50'
                }`}
              >
                <div>
                  <div className={`font-semibold ${isNight ? 'text-white' : 'text-slate-900'}`}>
                    Trikuta Residency
                  </div>
                  <div className={`text-xs ${isNight ? 'text-amber-300' : 'text-amber-700'}`}>
                    Gangtok, Sikkim · Mountain Retreat
                  </div>
                </div>
                <Compass className="w-5 h-5 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onSelectProperty('kalyani');
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-3 px-3 rounded-lg border flex items-center justify-between ${
                  isNight
                    ? 'hover:bg-slate-900 border-slate-800 bg-slate-900/50'
                    : 'hover:bg-slate-100 border-slate-200 bg-slate-50'
                }`}
              >
                <div>
                  <div className={`font-semibold ${isNight ? 'text-white' : 'text-slate-900'}`}>
                    Hotel Parijaye
                  </div>
                  <div className={`text-xs ${isNight ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Kalyani, West Bengal · 3-min to AIIMS
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-slate-400" />
              </button>

              <a
                href="#comparison"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded hover:text-amber-500 transition-colors ${
                  isNight ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Property Comparison
              </a>
              <a
                href="#guides"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded hover:text-amber-500 transition-colors ${
                  isNight ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                AIIMS & Sikkim Local Guides
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded hover:text-amber-500 transition-colors ${
                  isNight ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Guest Reviews
              </a>
              <a
                href="#faqs"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded hover:text-amber-500 transition-colors ${
                  isNight ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Frequently Asked Questions
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded hover:text-amber-500 transition-colors ${
                  isNight ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Contact & Directions
              </a>
            </div>
          </div>

          <div
            className={`pt-5 border-t flex flex-col gap-3 ${
              isNight ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3.5 bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Room Availability</span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+919163008361"
                className={`py-2.5 px-3 border rounded-lg flex items-center justify-center gap-1.5 ${
                  isNight
                    ? 'bg-slate-900 text-slate-200 border-slate-800'
                    : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Call Desk</span>
              </a>
              <a
                href="https://wa.me/919163008361?text=Hello%20Parijai%20Group,%20I%20would%20like%20to%20inquire%20about%20rooms."
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-1.5"
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
