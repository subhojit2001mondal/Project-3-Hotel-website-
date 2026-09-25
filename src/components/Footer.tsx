import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  FileText,
  ShieldCheck,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PROPERTIES } from '../data/hotels';
import { useTheme } from '../context/ThemeContext';
import { saveCustomerInquiryToDb } from '../services/dbService';
import { ParijaiLogo } from './ParijaiLogo';

interface FooterProps {
  onBookNow: () => void;
  onSelectProperty: (prop: 'gangtok' | 'kalyani') => void;
  onOpenDatabaseRecords?: () => void;
  onOpenManagePhotos?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onBookNow,
  onSelectProperty,
  onOpenDatabaseRecords,
  onOpenManagePhotos
}) => {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const { isNight } = useTheme();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterInput.trim()) {
      const contactVal = newsletterInput.trim();
      setSubscribed(true);
      setNewsletterInput('');
      try {
        await saveCustomerInquiryToDb({
          name: 'Subscriber',
          phone: contactVal.includes('@') ? '' : contactVal,
          email: contactVal.includes('@') ? contactVal : '',
          propertyId: 'general',
          subject: 'Newsletter & Seasonal Rate Advisory Subscription',
          message: `User subscribed with contact: ${contactVal}`,
          source: 'newsletter'
        });
      } catch (err) {
        console.warn('Failed to save newsletter contact to DB:', err);
      }
    }
  };

  return (
    <>
      <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact & Map Cards for Both Properties */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 border-b border-slate-800">
            {/* Gangtok Contact Card */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
              <div className="text-xs text-amber-300 font-semibold uppercase">Gangtok · Sikkim</div>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">Trikuta Residency</h3>
              <p className="text-xs text-slate-400 mt-1">{PROPERTIES.gangtok.address}</p>

              <div className="mt-5 space-y-2 text-xs">
                <a
                  href={`tel:${PROPERTIES.gangtok.phone}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reception & Desk: {PROPERTIES.gangtok.phone}</span>
                </a>
                <a
                  href={`mailto:${PROPERTIES.gangtok.email}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{PROPERTIES.gangtok.email}</span>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                <a
                  href={PROPERTIES.gangtok.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-slate-950 text-xs text-slate-200 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get Directions (Google Maps)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <button
                  onClick={() => onSelectProperty('gangtok')}
                  className="px-3.5 py-2 rounded-lg bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Gangtok Rooms
                </button>
              </div>
            </div>

            {/* Kalyani Contact Card */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
              <div className="text-xs text-emerald-400 font-semibold uppercase">Kalyani · West Bengal</div>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">Hotel Parijaye</h3>
              <p className="text-xs text-slate-400 mt-1">{PROPERTIES.kalyani.address}</p>

              <div className="mt-5 space-y-2 text-xs">
                <a
                  href={`tel:${PROPERTIES.kalyani.phone}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AIIMS Patient Desk: {PROPERTIES.kalyani.phone}</span>
                </a>
                <a
                  href={`mailto:${PROPERTIES.kalyani.email}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{PROPERTIES.kalyani.email}</span>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                <a
                  href={PROPERTIES.kalyani.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-slate-950 text-xs text-slate-200 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Get Directions (Google Maps)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <button
                  onClick={() => onSelectProperty('kalyani')}
                  className="px-3.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Kalyani Rooms
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links & Newsletter */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center gap-3">
                <ParijaiLogo size={46} />
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                    Parijai Group of Hotels
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                    Hospitality & Care
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hospitality engineered for serenity in Sikkim and caring medical convenience in Kalyani.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Sanitary Hospitality</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Quick Navigation
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button onClick={() => onSelectProperty('gangtok')} className="hover:text-amber-300 cursor-pointer">
                    Trikuta Residency, Gangtok
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectProperty('kalyani')} className="hover:text-amber-300 cursor-pointer">
                    Hotel Parijaye, AIIMS Kalyani
                  </button>
                </li>
                <li>
                  <a href="#comparison" className="hover:text-amber-300">
                    Property Comparison
                  </a>
                </li>
                <li>
                  <a href="#guides" className="hover:text-amber-300">
                    Local Guides & Transit
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-amber-300">
                    Guest Testimonials
                  </a>
                </li>
                {onOpenDatabaseRecords && (
                  <li>
                    <button
                      onClick={onOpenDatabaseRecords}
                      className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <span>Cloud Database & Records</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">Live</span>
                    </button>
                  </li>
                )}
                {onOpenManagePhotos && (
                  <li>
                    <button
                      onClick={onOpenManagePhotos}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <span>Manage Photos (Owner)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300">Admin</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Resources & Downloads
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button
                    onClick={() => setShowTariffModal(true)}
                    className="flex items-center gap-1.5 hover:text-amber-300 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download Seasonal Tariff Card (PDF)</span>
                  </button>
                </li>
                <li>
                  <a href="#guides" className="hover:text-amber-300">
                    Sikkim Permit Documentation Checklist
                  </a>
                </li>
                <li>
                  <a href="#guides" className="hover:text-amber-300">
                    AIIMS Kalyani OPD Appointment Schedule
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-amber-300">
                    Flexible Cancellation Terms
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Direct Updates & Offers
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Receive AIIMS travel advisories and Sikkim seasonal rate updates directly.
              </p>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                  ✓ Thank you! You're subscribed to Parijai Group of Hotels direct updates.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter WhatsApp or Email"
                    value={newsletterInput}
                    onChange={(e) => setNewsletterInput(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>© {new Date().getFullYear()} Parijai Group of Hotels. All rights reserved.</div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Stay</span>
              <span>·</span>
              <span>FSSAI Certified In-House Kitchen</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE ACTION BAR (Height capped to <15% of viewport, 3 touch-friendly buttons) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden backdrop-blur-md border-t px-4 py-2.5 shadow-2xl transition-colors duration-300 ${
          isNight ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-xl'
        }`}
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a
            href="tel:+919163008361"
            className={`flex flex-col items-center justify-center py-2 rounded-xl border transition-colors ${
              isNight
                ? 'bg-slate-900 active:bg-slate-800 text-slate-200 border-slate-800'
                : 'bg-slate-100 active:bg-slate-200 text-slate-800 border-slate-200'
            }`}
          >
            <Phone className="w-4 h-4 text-amber-500 mb-0.5" />
            <span className="text-[11px] font-semibold">Call Desk</span>
          </a>

          <a
            href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
            target="_blank"
            rel="noreferrer"
            className={`flex flex-col items-center justify-center py-2 rounded-xl border transition-colors ${
              isNight
                ? 'bg-emerald-950/70 active:bg-emerald-900 text-emerald-300 border-emerald-800/60'
                : 'bg-emerald-600 active:bg-emerald-700 text-white border-emerald-600'
            }`}
          >
            <MessageCircle className={`w-4 h-4 mb-0.5 ${isNight ? 'text-emerald-400' : 'text-white'}`} />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </a>

          <button
            onClick={onBookNow}
            className="flex flex-col items-center justify-center py-2 bg-amber-400 active:bg-amber-500 rounded-xl text-slate-950 font-bold shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[11px]">Book Now</span>
          </button>
        </div>
      </div>

      {/* Styled Tariff Card Download Modal */}
      {showTariffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`border rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl transition-colors ${
              isNight ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <div
              className={`flex justify-between items-center border-b pb-3 ${
                isNight ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <h4 className={`text-base font-serif font-bold ${isNight ? 'text-white' : 'text-slate-950'}`}>
                Official Parijai Group of Hotels Tariff Card
              </h4>
              <button
                onClick={() => setShowTariffModal(false)}
                className={`p-1 ${isNight ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'}`}
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div
                className={`p-3 rounded-lg border ${
                  isNight ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-semibold text-amber-500">Trikuta Residency — Gangtok, Sikkim</div>
                <div className={`mt-1 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                  Deluxe Valley: ₹2,850 · Mountain Exec Suite: ₹3,950 · Attic Family: ₹5,200 (Includes Heaters & Bed Warmers)
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border ${
                  isNight ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-semibold text-emerald-600 dark:text-emerald-400">Hotel Parijaye — Kalyani, West Bengal</div>
                <div className={`mt-1 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                  Deluxe Twin Care: ₹1,950 · Executive Kitchenette Suite: ₹2,850 · Doctor Studio: ₹2,350 (Includes Free AIIMS Shuttle)
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  window.print();
                  setShowTariffModal(false);
                }}
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow cursor-pointer"
              >
                Print / Save PDF
              </button>
              <button
                onClick={() => setShowTariffModal(false)}
                className={`px-4 py-2 rounded-lg text-xs cursor-pointer ${
                  isNight ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
