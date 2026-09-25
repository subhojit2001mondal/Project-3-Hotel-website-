import React, { useState } from 'react';
import {
  Compass,
  HeartPulse,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Building,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../data/hotels';
import { useTheme } from '../context/ThemeContext';

export const LocalGuidesAndTrust: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openPolicyTab, setOpenPolicyTab] = useState<'medical' | 'permits' | 'hygiene'>('medical');
  const { isNight } = useTheme();

  return (
    <div
      id="guides"
      className={`py-16 md:py-24 border-t transition-colors duration-500 ${
        isNight
          ? 'bg-slate-900 text-slate-100 border-slate-800'
          : 'bg-slate-100/80 text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* LOCAL GUIDES: AIIMS KALYANI & GANGTOK */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              Surrounding Area Intelligence
            </span>
            <h2
              className={`text-2xl sm:text-4xl font-serif font-bold mt-1 ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Local Guides & Landmark Proximity
            </h2>
            <p className={`mt-2 text-sm ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              Clear distances and neighborhood support so you never feel lost.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Guide 1: AIIMS Kalyani Care Guide */}
            <div
              className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-colors shadow-sm ${
                isNight ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4" />
                  <span>Medical Convenience Hub</span>
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-serif font-bold mt-1 ${
                    isNight ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  AIIMS Kalyani Patient & Attendant Guide
                </h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isNight ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Navigating treatments can be taxing. Hotel Parijaye is situated right on the NH-12 connector to AIIMS, providing rapid transit and round-the-clock emergency access.
                </p>

                <div className="mt-6 space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold">AIIMS Kalyani Main Gate & OPD</span>
                    </div>
                    <span className="font-mono text-emerald-600 dark:text-emerald-300 font-semibold">
                      800 meters · 3 mins (Free Shuttle)
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>24/7 Pharmacies & Diagnostic Blood Labs</span>
                    </div>
                    <span className="font-mono">200 meters · 2 mins walk</span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Kalyani Main Railway Station</span>
                    </div>
                    <span className="font-mono">3.2 km · 8 mins cab</span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Netaji Subhash Chandra Bose Int. Airport (CCU)</span>
                    </div>
                    <span className="font-mono">42 km · 55 mins via Express NH-12</span>
                  </div>
                </div>
              </div>

              <div
                className={`mt-6 pt-4 border-t text-[11px] flex items-center justify-between ${
                  isNight ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span>Free attendant assistance for wheelchair transfers</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">24/7 Desk Support</span>
              </div>
            </div>

            {/* Guide 2: Gangtok Tourist Guide */}
            <div
              className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-colors shadow-sm ${
                isNight ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Sikkim Leisure Explorer</span>
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-serif font-bold mt-1 ${
                    isNight ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  Gangtok Mountain & Sightseeing Guide
                </h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isNight ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Trikuta Residency sits peacefully near Ridge Park, away from noisy congestion yet within brisk walking reach of Gangtok's vibrant promenades and viewpoints.
                </p>

                <div className="mt-6 space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-semibold">MG Marg Mall Promenade</span>
                    </div>
                    <span className="font-mono text-amber-600 dark:text-amber-300 font-semibold">
                      1.2 km · 7 mins walk or cab
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Gangtok Ropeway Cable Car</span>
                    </div>
                    <span className="font-mono">2.4 km · 10 mins</span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Rumtek Monastery & Enchey Gompa</span>
                    </div>
                    <span className="font-mono">Scenic 30-40 mins day excursion</span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      isNight
                        ? 'bg-slate-900 border-slate-800/80 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Tsomgo (Changu) Lake & Nathula Pass</span>
                    </div>
                    <span className="font-mono">Permits processed at hotel travel desk</span>
                  </div>
                </div>
              </div>

              <div
                className={`mt-6 pt-4 border-t text-[11px] flex items-center justify-between ${
                  isNight ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span>Direct Sikkim government registered tourist assistance</span>
                <span className="text-amber-500 font-semibold">Travel Desk On-Site</span>
              </div>
            </div>
          </div>
        </div>

        {/* GUEST TESTIMONIALS */}
        <div id="reviews">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
                Verified Resident Feedback
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-serif font-bold mt-1 ${
                  isNight ? 'text-white' : 'text-slate-950'
                }`}
              >
                Real Stories From Our Guests
              </h2>
            </div>

            <div className={`flex items-center gap-3 text-xs ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="font-semibold">4.8 / 5.0</span>
              <span>·</span>
              <span>Based on 810+ Google & TripAdvisor Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors shadow-sm ${
                  isNight ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                        isNight
                          ? 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {review.badge}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed italic ${
                      isNight ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    "{review.text}"
                  </p>
                </div>

                <div
                  className={`mt-5 pt-4 border-t ${
                    isNight ? 'border-slate-800/80' : 'border-slate-100'
                  }`}
                >
                  <div className={`text-sm font-semibold ${isNight ? 'text-white' : 'text-slate-950'}`}>
                    {review.name}
                  </div>
                  <div className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                    {review.role}
                  </div>
                  <div className="text-[11px] text-amber-500 dark:text-amber-300 font-medium mt-0.5">
                    {review.property}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POLICIES & CARE ACCORDION */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border transition-colors shadow-sm ${
            isNight ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Guest Commitments
            </span>
            <h3
              className={`text-xl sm:text-2xl font-serif font-bold mt-1 ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Safety, Cleanliness & Booking Policies
            </h3>
          </div>

          <div
            className={`flex flex-wrap gap-2 border-b pb-4 mb-6 ${
              isNight ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <button
              onClick={() => setOpenPolicyTab('medical')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                openPolicyTab === 'medical'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : isNight
                  ? 'text-slate-400 hover:text-white bg-slate-900'
                  : 'text-slate-600 hover:text-slate-950 bg-slate-100'
              }`}
            >
              Flexible Medical Cancellation
            </button>
            <button
              onClick={() => setOpenPolicyTab('permits')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                openPolicyTab === 'permits'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : isNight
                  ? 'text-slate-400 hover:text-white bg-slate-900'
                  : 'text-slate-600 hover:text-slate-950 bg-slate-100'
              }`}
            >
              Check-in ID & Sikkim Permits
            </button>
            <button
              onClick={() => setOpenPolicyTab('hygiene')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                openPolicyTab === 'hygiene'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : isNight
                  ? 'text-slate-400 hover:text-white bg-slate-900'
                  : 'text-slate-600 hover:text-slate-950 bg-slate-100'
              }`}
            >
              Sanitization & Dietary Standards
            </button>
          </div>

          <div
            className={`text-xs leading-relaxed space-y-2 ${
              isNight ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {openPolicyTab === 'medical' && (
              <div className="space-y-2">
                <p>
                  <strong>Flexible Emergency Modification:</strong> We know medical appointments and hospital discharge dates change unexpectedly. We allow hassle-free adjustments and date changes for patients and attendants without penalty when informed 24 hours prior.
                </p>
                <p>
                  For non-medical cancellations, full refund is provided if cancelled up to 48 hours before check-in.
                </p>
              </div>
            )}

            {openPolicyTab === 'permits' && (
              <div className="space-y-2">
                <p>
                  <strong>Government ID Requirement:</strong> All Indian adult guests must present a valid government-issued photo ID (Aadhar Card, Voter ID, Passport, or Driving License). PAN Cards are not accepted per local hotel regulations.
                </p>
                <p>
                  <strong>Sikkim Protected Area Permits:</strong> To visit Nathula Pass or Tsomgo Lake, guests must provide 2 passport photos and Voter ID or Passport copy. Foreign nationals require an Inner Line Permit (ILP) which we help coordinate at Gangtok.
                </p>
              </div>
            )}

            {openPolicyTab === 'hygiene' && (
              <div className="space-y-2">
                <p>
                  <strong>Hospital-Grade Cleanliness at Kalyani:</strong> Every room undergoes strict high-temperature linen laundering and antimicrobial surface sanitization prior to check-in.
                </p>
                <p>
                  <strong>Custom Dietary Food:</strong> Our kitchen can prepare mild, salt-free, or specific convalescent diets recommended by treating AIIMS physicians.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <div id="faqs" className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              Clear Answers
            </span>
            <h3
              className={`text-2xl font-serif font-bold mt-1 ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border overflow-hidden transition-colors shadow-sm ${
                    isNight ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className={`w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors ${
                      isNight ? 'text-white hover:text-amber-300' : 'text-slate-900 hover:text-amber-600'
                    }`}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      className={`px-4 pb-4 pt-1 text-xs leading-relaxed border-t ${
                        isNight
                          ? 'border-slate-900 text-slate-400'
                          : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
