import React, { useState } from 'react';
import { Check, Mountain, ShieldCheck, ArrowRight, HeartPulse, Sparkles, MapPin } from 'lucide-react';
import { PROPERTIES } from '../data/hotels';
import { useTheme } from '../context/ThemeContext';

interface PropertyComparisonProps {
  onChooseProperty: (prop: 'gangtok' | 'kalyani') => void;
  activeProperty: 'gangtok' | 'kalyani';
}

export const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  onChooseProperty,
  activeProperty,
}) => {
  const [filterPreference, setFilterPreference] = useState<'all' | 'leisure' | 'medical'>('all');
  const { isNight } = useTheme();

  return (
    <section
      id="comparison"
      className={`py-16 border-t border-b transition-colors duration-500 ${
        isNight
          ? 'bg-slate-900 text-white border-slate-800'
          : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400 mb-1">
              Quick Decision Matrix
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-serif font-bold text-balance ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Which Parijai property is right for your stay?
            </h2>
            <p className={`mt-1 text-sm ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              Two specialized destinations designed with deliberate hospitality.
            </p>
          </div>

          {/* Interactive filter toggle buttons */}
          <div
            className={`flex items-center gap-1.5 p-1 rounded-lg border self-start md:self-auto transition-colors ${
              isNight ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setFilterPreference('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterPreference === 'all'
                  ? isNight
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-950 shadow-sm font-semibold'
                  : isNight
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setFilterPreference('leisure')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                filterPreference === 'leisure'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : isNight
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Himalayan Leisure</span>
            </button>
            <button
              onClick={() => setFilterPreference('medical')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                filterPreference === 'medical'
                  ? 'bg-emerald-500 text-white font-bold shadow-sm'
                  : isNight
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>AIIMS Medical Care</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trikuta Residency */}
          <div
            className={`relative rounded-2xl p-6 transition-all duration-300 border ${
              activeProperty === 'gangtok' || filterPreference === 'leisure'
                ? isNight
                  ? 'bg-slate-800/90 border-amber-400/80 ring-2 ring-amber-400/30 shadow-xl'
                  : 'bg-amber-50/40 border-amber-400/80 ring-2 ring-amber-400/30 shadow-lg'
                : isNight
                ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            {(activeProperty === 'gangtok' || filterPreference === 'leisure') && (
              <div className="absolute -top-3 right-6 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                Recommended for Nature & Holidays
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-300 font-semibold">
                  Gangtok · Sikkim
                </span>
                <h3 className={`text-xl font-serif font-bold mt-1 ${isNight ? 'text-white' : 'text-slate-950'}`}>
                  Trikuta Residency
                </h3>
                <p className={`text-xs mt-1 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                  Himalayan Mountain Retreat & Valley Scenery
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Starting from</span>
                <div className={`text-xl font-bold font-mono ${isNight ? 'text-white' : 'text-slate-950'}`}>
                  ₹{PROPERTIES.gangtok.startingPrice}
                  <span className={`text-xs font-sans font-normal ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                    /night
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`mt-5 space-y-2.5 text-xs border-t border-b py-4 transition-colors ${
                isNight ? 'border-slate-700/60 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Primary Landmark:</span>
                <span className="font-semibold">{PROPERTIES.gangtok.landmark}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Distance to Town:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-300">
                  {PROPERTIES.gangtok.distanceToLandmark}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Ideal For:</span>
                <span className="font-semibold">Couples, Families, Sikkim explorers</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Guest Rating:</span>
                <span className="font-semibold">
                  ★ {PROPERTIES.gangtok.rating} / 5.0 ({PROPERTIES.gangtok.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider block mb-2 ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Top 3 Signature Amenities:
              </span>
              <ul className={`space-y-1.5 text-xs ${isNight ? 'text-slate-200' : 'text-slate-700'}`}>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Individual electric bed warmers & wooden insulated rooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Unobstructed Kanchenjunga valley-view balconies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Nathula Pass & Tsomgo Lake travel permit processing</span>
                </li>
              </ul>
            </div>

            <div className={`mt-6 pt-4 border-t ${isNight ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                onClick={() => onChooseProperty('gangtok')}
                className="w-full py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <span>Select Trikuta Residency (Gangtok)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hotel Parijaye */}
          <div
            className={`relative rounded-2xl p-6 transition-all duration-300 border ${
              activeProperty === 'kalyani' || filterPreference === 'medical'
                ? isNight
                  ? 'bg-slate-800/90 border-emerald-400/80 ring-2 ring-emerald-400/30 shadow-xl'
                  : 'bg-emerald-50/40 border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-lg'
                : isNight
                ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            {(activeProperty === 'kalyani' || filterPreference === 'medical') && (
              <div className="absolute -top-3 right-6 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                Recommended for AIIMS & Patient Care
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-300 font-semibold">
                  Kalyani · West Bengal
                </span>
                <h3 className={`text-xl font-serif font-bold mt-1 ${isNight ? 'text-white' : 'text-slate-950'}`}>
                  Hotel Parijaye
                </h3>
                <p className={`text-xs mt-1 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                  Pristine Comfort Near AIIMS Kalyani
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Starting from</span>
                <div className={`text-xl font-bold font-mono ${isNight ? 'text-white' : 'text-slate-950'}`}>
                  ₹{PROPERTIES.kalyani.startingPrice}
                  <span className={`text-xs font-sans font-normal ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                    /night
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`mt-5 space-y-2.5 text-xs border-t border-b py-4 transition-colors ${
                isNight ? 'border-slate-700/60 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Primary Landmark:</span>
                <span className="font-semibold">{PROPERTIES.kalyani.landmark}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Transit to AIIMS:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {PROPERTIES.kalyani.distanceToLandmark}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Ideal For:</span>
                <span className="font-semibold">Patient attendants, visiting doctors, researchers</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Guest Rating:</span>
                <span className="font-semibold">
                  ★ {PROPERTIES.kalyani.rating} / 5.0 ({PROPERTIES.kalyani.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider block mb-2 ${
                  isNight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Top 3 Signature Amenities:
              </span>
              <ul className={`space-y-1.5 text-xs ${isNight ? 'text-slate-200' : 'text-slate-700'}`}>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Dedicated e-rickshaw shuttle to AIIMS OPD & Emergency</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Wheelchair-accessible corridors, ramps & hospital-grade elevator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Sanitized diet kitchen (low-sodium/boiled patient food) & kitchenettes</span>
                </li>
              </ul>
            </div>

            <div className={`mt-6 pt-4 border-t ${isNight ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                onClick={() => onChooseProperty('kalyani')}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <span>Select Hotel Parijaye (AIIMS Kalyani)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
