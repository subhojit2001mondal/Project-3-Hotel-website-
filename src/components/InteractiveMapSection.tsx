import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  HeartPulse,
  Clock,
  Car,
  Footprints,
  ExternalLink,
  PhoneCall,
  Sparkles,
  Mountain,
  Building,
  Layers,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface Landmark {
  id: string;
  name: string;
  distance: string;
  distanceKm: number;
  walkTime: string;
  driveTime: string;
  category: 'medical' | 'sightseeing' | 'transit' | 'market' | 'nature';
  categoryLabel: string;
  x: number; // percentage coordinate on SVG radar (0 to 100)
  y: number; // percentage coordinate on SVG radar (0 to 100)
  description: string;
  travelTip: string;
  googleMapQuery: string;
}

interface PropertyMapData {
  id: 'gangtok' | 'kalyani';
  name: string;
  subtitle: string;
  location: string;
  address: string;
  badge: string;
  hotelIcon: 'mountain' | 'building';
  color: string;
  accentBg: string;
  googleEmbedSrc: string;
  googleDirectionsUrl: string;
  landmarks: Landmark[];
}

const GANGTOK_MAP_DATA: PropertyMapData = {
  id: 'gangtok',
  name: 'Trikuta Residency',
  subtitle: 'Gangtok, Sikkim',
  location: 'Near Ridge Park, Upper Gangtok',
  address: 'Trikuta Residency, Upper Sichey / Ridge Road, Gangtok, Sikkim 737101',
  badge: '1.2 km to MG Marg · Quiet Ridge Park Enclave',
  hotelIcon: 'mountain',
  color: 'amber',
  accentBg: 'from-amber-500/20 to-amber-600/10',
  googleEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14163.784534728514!2d88.60831635!3d27.3389363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a5682e8e040f%3A0x6b2e38c352a78f3!2sMG%20Marg%2C%20Gangtok%2C%20Sikkim!5e0!3m2!1sen!2sin!4v1700000000000',
  googleDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=MG+Marg+Gangtok+Sikkim',
  landmarks: [
    {
      id: 'g-ridge',
      name: 'Ridge Park & Flower Exhibition Centre',
      distance: '400 m',
      distanceKm: 0.4,
      walkTime: '4 mins walk',
      driveTime: '2 mins',
      category: 'nature',
      categoryLabel: 'Botanical & Views',
      x: 58,
      y: 38,
      description: 'Lush botanical walkway and year-round orchid exhibition overlooking mountain mist.',
      travelTip: 'Gentle, scenic stroll along Ridge road; highly recommended for morning walks.',
      googleMapQuery: 'Flower+Exhibition+Centre+Gangtok'
    },
    {
      id: 'g-mgmarg',
      name: 'MG Marg Promenade & Town Centre',
      distance: '1.2 km',
      distanceKm: 1.2,
      walkTime: '7 mins walk',
      driveTime: '4 mins cab',
      category: 'market',
      categoryLabel: 'Mall & Dining',
      x: 50,
      y: 68,
      description: 'Spit-free, vehicle-free pedestrian promenade with European-style cafes, souvenir craft stores, and Sikkim cuisine.',
      travelTip: 'Pedestrian only. Enjoy hot momos, bakery treats, and evening valley lights.',
      googleMapQuery: 'MG+Marg+Gangtok'
    },
    {
      id: 'g-enchey',
      name: 'Enchey Monastery',
      distance: '1.8 km',
      distanceKm: 1.8,
      walkTime: '20 mins hike',
      driveTime: '8 mins cab',
      category: 'sightseeing',
      categoryLabel: 'Monastery & Heritage',
      x: 42,
      y: 26,
      description: '200-year-old Nyingma Buddhist monastery nestled amidst high pines with sweeping Kanchenjunga panoramas.',
      travelTip: 'Visit around 6:30 AM or 4:00 PM to experience monk prayer chants and fluttering prayer flags.',
      googleMapQuery: 'Enchey+Monastery+Gangtok'
    },
    {
      id: 'g-taxi',
      name: 'Vajra Cinema & North Sikkim Safari Stand',
      distance: '800 m',
      distanceKm: 0.8,
      walkTime: '5 mins walk',
      driveTime: '2 mins cab',
      category: 'transit',
      categoryLabel: 'Safari & Transit',
      x: 34,
      y: 45,
      description: 'Main coordination hub for shared and reserved 4x4 safari jeeps to Lachen, Lachung, and Yumthang Valley.',
      travelTip: 'Trikuta reception coordinates your taxi pickup directly at hotel entrance.',
      googleMapQuery: 'Vajra+Cinema+Gangtok'
    },
    {
      id: 'g-ropeway',
      name: 'Deorali Cable Car Ropeway',
      distance: '2.4 km',
      distanceKm: 2.4,
      walkTime: '25 mins walk',
      driveTime: '10 mins cab',
      category: 'sightseeing',
      categoryLabel: 'Aerial Sightseeing',
      x: 65,
      y: 76,
      description: '1 km double-cable aerial ropeway providing panoramic 360-degree vistas of Gangtok township and ravines.',
      travelTip: 'Board on clear mornings before 11 AM for unobstructed Kanchenjunga visibility.',
      googleMapQuery: 'Gangtok+Ropeway+Deorali'
    },
    {
      id: 'g-ganesh',
      name: 'Ganesh Tok & Tashi View Point',
      distance: '4.5 km',
      distanceKm: 4.5,
      walkTime: '1 hr hike',
      driveTime: '14 mins cab',
      category: 'nature',
      categoryLabel: 'Scenic Viewpoint',
      x: 74,
      y: 22,
      description: 'High vantage temple viewpoint famous for sunrise illumination on snow-covered mountain peaks.',
      travelTip: 'Best at dawn (5:30 AM); enjoy hot ginger tea from the local viewing stalls.',
      googleMapQuery: 'Ganesh+Tok+Gangtok'
    },
    {
      id: 'g-nathula',
      name: 'Tsomgo Lake & Nathula Permit Checkpoint',
      distance: '3.1 km',
      distanceKm: 3.1,
      walkTime: '35 mins walk',
      driveTime: '10 mins cab',
      category: 'transit',
      categoryLabel: 'Permit & Highway',
      x: 78,
      y: 52,
      description: 'Official Sikkim Police & Tourism permit verification checkpost along Jawaharlal Nehru Marg towards the high border.',
      travelTip: 'Bring 2 passport photos and Voter/Aadhaar ID; Trikuta travel desk issues permits the evening prior.',
      googleMapQuery: '3rd+Mile+Checkpost+JN+Marg+Gangtok'
    },
    {
      id: 'g-rumtek',
      name: 'Rumtek Monastery (Dharma Chakra Centre)',
      distance: '22 km',
      distanceKm: 22.0,
      walkTime: '4.5 hrs',
      driveTime: '50 mins drive',
      category: 'sightseeing',
      categoryLabel: 'World Heritage Monastery',
      x: 22,
      y: 84,
      description: 'Global seat of the Karma Kagyu lineage, housing sacred Tibetan Buddhist relics, golden stupas, and murals.',
      travelTip: 'Book a half-day private taxi excursion through our reception desk.',
      googleMapQuery: 'Rumtek+Monastery+Sikkim'
    }
  ]
};

const KALYANI_MAP_DATA: PropertyMapData = {
  id: 'kalyani',
  name: 'Hotel Parijaye',
  subtitle: 'Kalyani, West Bengal',
  location: 'NH-12 AIIMS Expressway Connector',
  address: 'Hotel Parijaye, NH-12 Connector Road, Near AIIMS Campus, Kalyani, West Bengal 741245',
  badge: '800 meters to AIIMS Main Gate · 3-min Free Shuttle',
  hotelIcon: 'building',
  color: 'emerald',
  accentBg: 'from-emerald-500/20 to-emerald-600/10',
  googleEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14690.66981881734!2d88.43577715!3d22.97503715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89524458f27cf%3A0xe5a2d0ee71c1f71a!2sAIIMS%20Kalyani!5e0!3m2!1sen!2sin!4v1700000000000',
  googleDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=AIIMS+Kalyani+West+Bengal',
  landmarks: [
    {
      id: 'k-aiims-opd',
      name: 'AIIMS Kalyani Main Gate & OPD Entrance',
      distance: '800 m',
      distanceKm: 0.8,
      walkTime: '8 mins walk',
      driveTime: '3 mins (Free Shuttle)',
      category: 'medical',
      categoryLabel: 'AIIMS Outpatient Care',
      x: 68,
      y: 48,
      description: 'Central hospital registration, specialist outpatient doctor chambers, and day-care diagnostic pavilions.',
      travelTip: 'Hotel Parijaye provides free scheduled morning patient shuttles directly to Gate 1.',
      googleMapQuery: 'AIIMS+Kalyani+Main+Gate'
    },
    {
      id: 'k-aiims-trauma',
      name: 'AIIMS Emergency & Trauma Ward',
      distance: '950 m',
      distanceKm: 0.95,
      walkTime: '10 mins walk',
      driveTime: '3 mins drive',
      category: 'medical',
      categoryLabel: '24/7 Critical Care',
      x: 74,
      y: 60,
      description: 'Round-the-clock emergency casualty, resuscitation bays, ICU, and trauma operation theatres.',
      travelTip: 'Direct 3-minute transit down the straight service road with 24/7 hotel vehicle standby.',
      googleMapQuery: 'AIIMS+Kalyani+Emergency'
    },
    {
      id: 'k-pharma',
      name: '24/7 Pharmacies & Diagnostic Labs',
      distance: '200 m',
      distanceKm: 0.2,
      walkTime: '2 mins walk',
      driveTime: '1 min',
      category: 'medical',
      categoryLabel: 'Medicine & Blood Tests',
      x: 50,
      y: 32,
      description: 'Round-the-clock generic Jan Aushadhi medicine counters, SRL/Dr Lal blood test centres, and radiology.',
      travelTip: 'Immediate adjacent access along NH-12 frontage road with home-sample collection to your room.',
      googleMapQuery: 'Pharmacy+Near+AIIMS+Kalyani'
    },
    {
      id: 'k-station-main',
      name: 'Kalyani Main Railway Station',
      distance: '3.2 km',
      distanceKm: 3.2,
      walkTime: '35 mins walk',
      driveTime: '8 mins cab / toto',
      category: 'transit',
      categoryLabel: 'Train Junction',
      x: 30,
      y: 68,
      description: 'Major suburban rail terminal with frequent local trains to Sealdah (Kolkata) and express services.',
      travelTip: 'Abundant e-rickshaws (Totos) and auto-taxis available outside station round the clock.',
      googleMapQuery: 'Kalyani+Railway+Station'
    },
    {
      id: 'k-station-silpanchal',
      name: 'Kalyani Silpanchal Station',
      distance: '1.9 km',
      distanceKm: 1.9,
      walkTime: '20 mins walk',
      driveTime: '5 mins toto',
      category: 'transit',
      categoryLabel: 'Suburban Train Stop',
      x: 44,
      y: 72,
      description: 'Alternative quieter local railway stop serving industrial and health workers.',
      travelTip: 'Convenient 5-minute electric toto ride directly from Hotel Parijaye front gate.',
      googleMapQuery: 'Kalyani+Silpanchal+Railway+Station'
    },
    {
      id: 'k-park',
      name: 'Kalyani Central Park & Picnic Lake',
      distance: '3.8 km',
      distanceKm: 3.8,
      walkTime: '45 mins walk',
      driveTime: '10 mins drive',
      category: 'nature',
      categoryLabel: 'Park & Convalescence',
      x: 28,
      y: 30,
      description: 'Expansive landscaped municipal park with lotus lake, peaceful walking trails, and shade trees.',
      travelTip: 'Recommended for recovering patients and family attendants needing fresh air and respite.',
      googleMapQuery: 'Kalyani+Picnic+Garden'
    },
    {
      id: 'k-airport',
      name: 'Kolkata International Airport (CCU)',
      distance: '42 km',
      distanceKm: 42.0,
      walkTime: '8 hrs',
      driveTime: '50 mins express',
      category: 'transit',
      categoryLabel: 'Airport Highway Link',
      x: 50,
      y: 92,
      description: 'Netaji Subhash Chandra Bose Int. Airport connecting domestic metros and global destinations.',
      travelTip: 'Hotel Parijaye arranges direct pre-booked AC airport pick-up & drop cabs via 6-lane NH-12.',
      googleMapQuery: 'Netaji+Subhash+Chandra+Bose+International+Airport'
    }
  ]
};

interface InteractiveMapSectionProps {
  initialProperty?: 'gangtok' | 'kalyani';
}

export const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({
  initialProperty = 'gangtok'
}) => {
  const [activeProperty, setActiveProperty] = useState<'gangtok' | 'kalyani'>(initialProperty);
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('g-mgmarg');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'radar' | 'google'>('radar');
  const { isNight } = useTheme();

  const propertyData = activeProperty === 'gangtok' ? GANGTOK_MAP_DATA : KALYANI_MAP_DATA;

  // Filter landmarks based on category
  const filteredLandmarks = propertyData.landmarks.filter((l) => {
    if (selectedCategory === 'all') return true;
    return l.category === selectedCategory;
  });

  // Selected landmark object (fallback to first if filtered out)
  const activeLandmark =
    propertyData.landmarks.find((l) => l.id === selectedLandmarkId) || propertyData.landmarks[0];

  // Distinct category tags for pills
  const categories = [
    { id: 'all', label: 'All Landmarks' },
    ...(activeProperty === 'gangtok'
      ? [
          { id: 'nature', label: 'Views & Parks' },
          { id: 'market', label: 'MG Marg & Food' },
          { id: 'sightseeing', label: 'Monasteries' },
          { id: 'transit', label: 'Taxis & Permits' }
        ]
      : [
          { id: 'medical', label: 'AIIMS & Health' },
          { id: 'transit', label: 'Transit & Stations' },
          { id: 'nature', label: 'Parks & Respite' }
        ])
  ];

  const handleSelectProperty = (id: 'gangtok' | 'kalyani') => {
    setActiveProperty(id);
    setSelectedCategory('all');
    setSelectedLandmarkId(id === 'gangtok' ? 'g-mgmarg' : 'k-aiims-opd');
  };

  return (
    <section
      id="interactive-map"
      className={`py-16 md:py-24 border-t transition-colors duration-500 relative overflow-hidden ${
        isNight ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-500 border border-amber-400/20 mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Distance Radar & Transit Guide</span>
            </div>

            <h2
              className={`text-2xl sm:text-4xl font-serif font-bold ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Exact Proximity & Landmark Distances
            </h2>

            <p className={`mt-2 text-xs sm:text-sm max-w-2xl ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              Explore exact distances and transit times from{' '}
              <strong className={activeProperty === 'gangtok' ? 'text-amber-400' : 'text-emerald-400'}>
                {propertyData.name}
              </strong>{' '}
              to key regional destinations, medical gates, viewpoints, and transport hubs.
            </p>
          </div>

          {/* Property Selector Tabs */}
          <div
            className={`p-1.5 rounded-2xl border flex items-center gap-1.5 self-start md:self-auto shadow-sm backdrop-blur-md ${
              isNight ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              onClick={() => handleSelectProperty('gangtok')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeProperty === 'gangtok'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-102'
                  : isNight
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Trikuta (Gangtok)</span>
            </button>

            <button
              onClick={() => handleSelectProperty('kalyani')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeProperty === 'kalyani'
                  ? 'bg-emerald-500 text-white shadow-md scale-102'
                  : isNight
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Parijaye (AIIMS Kalyani)</span>
            </button>
          </div>
        </div>

        {/* Current Active Property Quick Status Banner */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            isNight
              ? 'bg-slate-900/60 border-slate-800 text-slate-300'
              : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                activeProperty === 'gangtok'
                  ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {activeProperty === 'gangtok' ? <Mountain className="w-5 h-5" /> : <HeartPulse className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-white">
                {propertyData.name} · {propertyData.location}
              </div>
              <div className="text-[11px] text-slate-400">{propertyData.address}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                activeProperty === 'gangtok'
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {propertyData.badge}
            </span>

            {/* View Mode Toggle */}
            <div
              className={`p-1 rounded-xl border flex items-center gap-1 text-[11px] font-semibold ${
                isNight ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
              }`}
            >
              <button
                onClick={() => setViewMode('radar')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'radar'
                    ? activeProperty === 'gangtok'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Radar
              </button>
              <button
                onClick={() => setViewMode('google')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'google'
                    ? activeProperty === 'gangtok'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Google Map
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Filter Points:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? activeProperty === 'gangtok'
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                    : 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : isNight
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* MAIN INTERACTIVE MAP & LANDMARK SPOTLIGHT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7-COLUMNS: The Visual Interactive Map Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 min-h-[460px] sm:min-h-[520px] flex items-center justify-center ${
                isNight
                  ? 'bg-slate-950 border-slate-800 shadow-black/50'
                  : 'bg-slate-900 border-slate-300 shadow-slate-200'
              }`}
            >
              {viewMode === 'radar' ? (
                /* INTERACTIVE VECTOR RADAR MAP */
                <div className="w-full h-full absolute inset-0 select-none p-4 sm:p-8 flex items-center justify-center">
                  {/* Background Radar concentric distance rings */}
                  <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 100">
                    <defs>
                      <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                        <stop
                          offset="0%"
                          stopColor={activeProperty === 'gangtok' ? '#f59e0b' : '#10b981'}
                          stopOpacity="0.22"
                        />
                        <stop offset="60%" stopColor="#0f172a" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                      </radialGradient>

                      {/* Animated dash pattern */}
                      <linearGradient id="vectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop
                          offset="0%"
                          stopColor={activeProperty === 'gangtok' ? '#fbbf24' : '#34d399'}
                        />
                        <stop
                          offset="100%"
                          stopColor={activeProperty === 'gangtok' ? '#f59e0b' : '#059669'}
                        />
                      </linearGradient>
                    </defs>

                    {/* Radial background fill */}
                    <circle cx="50" cy="50" r="48" fill="url(#radarGlow)" />

                    {/* Concentric rings for distances */}
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" />

                    {/* Crosshairs */}
                    <line x1="50" y1="2" x2="50" y2="98" stroke="#334155" strokeWidth="0.3" strokeDasharray="1 3" />
                    <line x1="2" y1="50" x2="98" y2="50" stroke="#334155" strokeWidth="0.3" strokeDasharray="1 3" />

                    {/* Dynamic Vector Line from Hotel Center (50,50) to Active Landmark */}
                    {activeLandmark && (
                      <g className="animate-in fade-in duration-300">
                        <line
                          x1="50"
                          y1="50"
                          x2={activeLandmark.x}
                          y2={activeLandmark.y}
                          stroke="url(#vectorGradient)"
                          strokeWidth="0.9"
                          strokeDasharray="2 1.5"
                          className="animate-pulse"
                        />
                        {/* Mid-point Distance Chip along vector */}
                        <circle
                          cx={(50 + activeLandmark.x) / 2}
                          cy={(50 + activeLandmark.y) / 2}
                          r="1.6"
                          fill={activeProperty === 'gangtok' ? '#f59e0b' : '#10b981'}
                        />
                      </g>
                    )}
                  </svg>

                  {/* Compass markings */}
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    N
                  </span>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    S
                  </span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    E
                  </span>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    W
                  </span>

                  {/* Range Indicators */}
                  <span className="absolute top-[35%] right-6 text-[9px] font-mono text-slate-500">
                    ~1 km
                  </span>
                  <span className="absolute top-[22%] right-6 text-[9px] font-mono text-slate-500">
                    ~3 km
                  </span>
                  <span className="absolute top-[8%] right-6 text-[9px] font-mono text-slate-500">
                    ~5 km+
                  </span>

                  {/* CENTER: THE HOTEL BEACON */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
                    title={`${propertyData.name} (Hotel Origin)`}
                  >
                    {/* Animated Pulsing Ring */}
                    <span
                      className={`absolute w-12 h-12 rounded-full animate-ping opacity-60 ${
                        activeProperty === 'gangtok' ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                    <div
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-slate-950 shadow-2xl border-2 border-white transition-transform group-hover:scale-110 ${
                        activeProperty === 'gangtok'
                          ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-500/50'
                          : 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/50'
                      }`}
                    >
                      {activeProperty === 'gangtok' ? (
                        <Mountain className="w-6 h-6 text-slate-950" />
                      ) : (
                        <Building className="w-6 h-6 text-slate-950" />
                      )}
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/90 text-white border border-white/20 shadow-md whitespace-nowrap">
                      ★ {propertyData.name}
                    </span>
                  </div>

                  {/* INTERACTIVE LANDMARK PINS */}
                  {filteredLandmarks.map((landmark) => {
                    const isSelected = landmark.id === activeLandmark?.id;

                    return (
                      <button
                        key={landmark.id}
                        type="button"
                        onClick={() => setSelectedLandmarkId(landmark.id)}
                        style={{
                          left: `${landmark.x}%`,
                          top: `${landmark.y}%`
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 group cursor-pointer focus:outline-none flex flex-col items-center ${
                          isSelected ? 'scale-115 z-30' : 'hover:scale-110 opacity-90 hover:opacity-100'
                        }`}
                      >
                        {/* Pin Bubble */}
                        <div
                          className={`p-2 rounded-xl border shadow-xl flex items-center justify-center transition-all ${
                            isSelected
                              ? activeProperty === 'gangtok'
                                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/30'
                                : 'bg-emerald-500 text-white border-emerald-400 ring-4 ring-emerald-500/30'
                              : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-500 backdrop-blur-md'
                          }`}
                        >
                          {landmark.category === 'medical' ? (
                            <HeartPulse className="w-4 h-4" />
                          ) : landmark.category === 'transit' ? (
                            <Car className="w-4 h-4" />
                          ) : landmark.category === 'market' ? (
                            <Navigation className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                        </div>

                        {/* Title pill on hover or select */}
                        <div
                          className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap shadow-lg transition-all ${
                            isSelected
                              ? 'bg-slate-950 text-amber-300 border border-amber-400/40 opacity-100'
                              : 'bg-slate-950/80 text-slate-300 border border-slate-800 opacity-80 group-hover:opacity-100'
                          }`}
                        >
                          <span>{landmark.name.split(' ')[0]}</span>
                          <span className="font-mono text-amber-400 ml-1 font-bold">
                            {landmark.distance}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* LIVE GOOGLE MAP EMBED VIEW */
                <div className="w-full h-full absolute inset-0">
                  <iframe
                    title={`${propertyData.name} Google Map`}
                    src={propertyData.googleEmbedSrc}
                    className="w-full h-full border-0 filter contrast-105"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs flex items-center gap-2 shadow-xl">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Google Maps Satellite View</span>
                  </div>
                </div>
              )}

              {/* Bottom Radar Controls & Hint */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Click any pin to inspect direct distance & route time</span>
                </span>

                <span className="hidden sm:inline px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-800 font-mono">
                  Origin: 0 km ({propertyData.name})
                </span>
              </div>
            </div>

            {/* Turn-by-Turn Quick Action Button */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                Want street turn-by-turn navigation?
              </span>
              <a
                href={propertyData.googleDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 border border-slate-700 shadow-sm transition-all"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>

          {/* RIGHT 5-COLUMNS: Detailed Landmark Spotlight Card & Quick List */}
          <div className="lg:col-span-5 space-y-5">
            {/* SPOTLIGHT CARD FOR ACTIVE LANDMARK */}
            {activeLandmark && (
              <div
                className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 ${
                  isNight
                    ? 'bg-slate-900/90 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Background glow accent */}
                <div
                  className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-30 ${
                    activeProperty === 'gangtok' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                />

                <div className="relative">
                  {/* Category & Proximity Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        activeProperty === 'gangtok'
                          ? 'bg-amber-400/15 text-amber-400 border-amber-400/30'
                          : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {activeLandmark.categoryLabel}
                    </span>

                    <span className="text-[11px] text-slate-400 font-medium">
                      From {propertyData.name}
                    </span>
                  </div>

                  {/* Landmark Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold leading-snug">
                    {activeLandmark.name}
                  </h3>

                  {/* Travel Metric Badges */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div
                      className={`p-3 rounded-2xl border text-center ${
                        isNight
                          ? 'bg-slate-950/80 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <MapPin
                        className={`w-4 h-4 mx-auto mb-1 ${
                          activeProperty === 'gangtok' ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      />
                      <span className="font-mono text-base font-bold block">
                        {activeLandmark.distance}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Distance
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl border text-center ${
                        isNight
                          ? 'bg-slate-950/80 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <Footprints className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                      <span className="font-semibold text-xs block leading-tight mt-1">
                        {activeLandmark.walkTime}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">
                        Walking
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl border text-center ${
                        isNight
                          ? 'bg-slate-950/80 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <Car
                        className={`w-4 h-4 mx-auto mb-1 ${
                          activeProperty === 'gangtok' ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      />
                      <span className="font-semibold text-xs block leading-tight mt-1">
                        {activeLandmark.driveTime}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">
                        Drive / Cab
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                    {activeLandmark.description}
                  </p>

                  {/* Local Travel Tip Callout */}
                  <div
                    className={`mt-4 p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                      activeProperty === 'gangtok'
                        ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wide opacity-90">
                        Local Proximity Insider Tip:
                      </strong>
                      <span className="opacity-95 leading-relaxed">
                        {activeLandmark.travelTip}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA Row */}
                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                        propertyData.address
                      )}&destination=${encodeURIComponent(activeLandmark.googleMapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg transition-all ${
                        activeProperty === 'gangtok'
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-white'
                      }`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions from Hotel</span>
                    </a>

                    <a
                      href="tel:+919163008361"
                      className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors shadow-sm"
                      title="Call Reception Desk for Taxi or Free Shuttle"
                    >
                      <PhoneCall className="w-4 h-4 text-amber-400" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* QUICK LIST OF ALL LANDMARKS IN THIS PROPERTY */}
            <div
              className={`rounded-2xl border p-4 space-y-2 text-xs ${
                isNight ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Select to Preview Distance</span>
                <span>{filteredLandmarks.length} Landmarks</span>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {filteredLandmarks.map((item) => {
                  const isItemActive = item.id === activeLandmark?.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLandmarkId(item.id)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                        isItemActive
                          ? activeProperty === 'gangtok'
                            ? 'bg-amber-400/20 text-white border border-amber-400/40 font-semibold'
                            : 'bg-emerald-500/20 text-white border border-emerald-500/40 font-semibold'
                          : isNight
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isItemActive
                              ? activeProperty === 'gangtok'
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                              : 'bg-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2 font-mono">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-md ${
                            isItemActive
                              ? 'bg-slate-950 text-amber-300 font-bold'
                              : isNight
                              ? 'bg-slate-950 text-slate-400'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.distance}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
