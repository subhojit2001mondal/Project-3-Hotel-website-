import React, { useState, useEffect, useRef } from 'react';
import {
  Bed,
  Maximize2,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Mountain,
  UtensilsCrossed,
  Compass,
  Car,
  Accessibility,
  Soup,
  BadgePercent,
  Clock,
  ArrowRight,
  X,
  Eye,
  Grid as GridIcon,
  Maximize,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  AlertCircle,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Printer,
  Sparkle,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Database,
  Tv,
  Wifi,
  Camera
} from 'lucide-react';
import { PROPERTIES, ROOMS, Room } from '../data/hotels';
import { useTheme } from '../context/ThemeContext';
import {
  GalleryId,
  GalleryPhoto,
  GALLERY_PLACEHOLDERS
} from '../services/dbService';
import {
  StoredPhoto as UserPhoto,
  getStoredPhotos,
  savePhotosToStorage,
  deletePhotoFromStorage,
  clearBrokenPhotosFromStorage,
  clearAllPhotosFromStorage,
  compressImageFile
} from '../utils/photoStorage';

export type { UserPhoto };

interface PropertyShowcaseProps {
  activeProperty: 'gangtok' | 'kalyani';
  purpose: 'leisure' | 'medical' | 'corporate';
  onReserveRoom: (room: Room) => void;
  isLoading: boolean;
  galleryPhotos?: Record<GalleryId, GalleryPhoto[]>;
  onOpenManagePhotos?: (galleryId?: GalleryId) => void;
}

// Verified Spaces for Hotel Parijaye (AIIMS Kalyani)
export const PARIJAYE_VERIFIED_SPACES = [
  {
    id: 'parijaye-reception',
    title: 'Executive Reception & Front Desk',
    subtitle: 'Hotel Parijaye · 2 mins walk to AIIMS Kalyani Gate 1',
    category: 'Reception & Front Desk',
    badge: '24/7 Front Desk',
    icon: '🏢',
    accentColor: 'emerald',
    description:
      'Curved blonde wood reception counter with vibrant turquoise borders, crystal-jeweled wall clock, marble backdrop, and round-the-clock check-in service.',
    tags: ['24/7 Check-in', 'Turquoise Trim', 'Crystal Clock', 'Marble Backdrop']
  },
  {
    id: 'parijaye-lobby-assistance',
    title: 'Lobby & Patient Support Services Desk',
    subtitle: 'Hotel Parijaye · 2 mins walk to AIIMS Kalyani Gate 1',
    category: 'Patient Services Desk',
    badge: 'Medical Assistance Desk',
    icon: '🖨️',
    accentColor: 'teal',
    description:
      'Equipped with on-demand printing & scanning for AIIMS doctor slips, lab reports, discharge summaries, intercom phone, and ceiling ambient mood lighting.',
    tags: ['Report Printing', 'Prescription Desk', 'Intercom', 'Mood Lighting']
  },
  {
    id: 'parijaye-staircase',
    title: 'Sunlit Marble Staircase & 1st Floor Landing',
    subtitle: 'Hotel Parijaye · 2 mins walk to AIIMS Kalyani Gate 1',
    category: 'Atrium & Access',
    badge: 'Comfortable Access',
    icon: '🌻',
    accentColor: 'amber',
    description:
      'Wide salt-and-pepper polished granite steps with stainless steel safety railing, sunflower flower arrangement, and large sunlit window on the 1st floor landing.',
    tags: ['Stainless Handrail', 'Wide Granite Steps', 'Daylight Window', 'Sunflower Vase']
  },
  {
    id: 'parijaye-bedroom',
    title: 'Deluxe Patient & Family Bedroom Suite',
    subtitle: 'Hotel Parijaye · 2 mins walk to AIIMS Kalyani Gate 1',
    category: 'Suites & Rooms',
    badge: 'Rest & Recovery',
    icon: '🛏️',
    accentColor: 'cyan',
    description:
      'Spacious restful bedroom featuring a king bed with crisp white linens, vibrant turquoise runner with origami towel lotus fold, matching turquoise cushion, and sofa seating.',
    tags: ['King Bed', 'Turquoise Accent', 'Towel Art', 'Sofa & Coffee Table']
  },
  {
    id: 'parijaye-bathroom',
    title: 'Sanitized Private Bathroom with Geyser',
    subtitle: 'Hotel Parijaye · 2 mins walk to AIIMS Kalyani Gate 1',
    category: 'Hygiene & Bath',
    badge: '24/7 Hot Water',
    icon: '🚿',
    accentColor: 'blue',
    description:
      'Floor-to-ceiling neutral ceramic tiles, wall-mounted electric water geyser for continuous hot water, western commode, wash basin, and chrome shower mixer.',
    tags: ['Hot Water Geyser', 'Western Toilet', 'Sanitized Daily', 'Chrome Shower']
  }
];

// Verified Spaces for Trikuta Residency (Gangtok)
export const TRIKUTA_VERIFIED_SPACES = [
  {
    id: 'trikuta-exterior',
    title: 'Trikuta Residency — Hillside Facade & Entrance',
    subtitle: 'Trikuta Residency · Upper Arithang, Gangtok',
    category: 'Hotel Exterior',
    badge: 'Mountain Lodge',
    icon: '🏨',
    accentColor: 'amber',
    description:
      '5-story mountain lodge facade with distinctive red trim, grand entrance staircase, and official TRIKUTA RESIDENCY signboard in Gangtok.',
    tags: ['Official Signboard', 'Red Accents', 'Hillside Lodge', 'Grand Staircase']
  },
  {
    id: 'trikuta-bedroom',
    title: 'Deluxe Bedroom with Scenic Valley Window',
    subtitle: 'Trikuta Residency · Upper Arithang, Gangtok',
    category: 'Deluxe Suite',
    badge: 'Hill View Suite',
    icon: '🛏️',
    accentColor: 'amber',
    description:
      'Comfortable double bed with white linens, red satin bed runner with decorative origami towel art, bedside lighting, and scenic valley window.',
    tags: ['Red Satin Runner', 'Origami Towel Art', 'Valley Window', 'Double Bed']
  },
  {
    id: 'trikuta-valley-view',
    title: 'Panoramic Gangtok Valley & Hillside Vista',
    subtitle: 'Trikuta Residency · Upper Arithang, Gangtok',
    category: 'Valley Vista',
    badge: 'Kanchenjunga Vista',
    icon: '🌄',
    accentColor: 'emerald',
    description:
      'Direct panoramic view from the guest room window overlooking lush green Himalayan slopes, colorful mountain homes, and mist-veiled valley ridges.',
    tags: ['Misty Ridges', 'Pine Forests', 'Timber Windows', 'Mountain Homes']
  },
  {
    id: 'trikuta-bathroom',
    title: 'Sanitized Attached Bath with 24/7 Water Geyser',
    subtitle: 'Trikuta Residency · Upper Arithang, Gangtok',
    category: 'Attached Bath',
    badge: '24/7 Hot Water',
    icon: '🚿',
    accentColor: 'blue',
    description:
      'Modern tiled private bathroom equipped with 24/7 electric water geyser, western commode, wash basin, health faucet, and hot/cold shower.',
    tags: ['Electric Geyser', 'Western Toilet', 'Health Faucet', 'Hot & Cold Shower']
  },
  {
    id: 'trikuta-lobby',
    title: 'Hotel Reception Lobby & Guest Lounge',
    subtitle: 'Trikuta Residency · Upper Arithang, Gangtok',
    category: 'Lobby & Lounge',
    badge: 'Guest Lounge',
    icon: '🛋️',
    accentColor: 'amber',
    description:
      'Warm reception seating area with comfortable deep brown leather sofas, marble staircase, and indoor mountain greenery.',
    tags: ['Leather Sofas', 'Indoor Plants', 'Marble Staircase', 'Tour Permits Desk']
  },
  {
    id: 'trikuta-dining',
    title: 'In-House Dining Hall & Restaurant',
    subtitle: 'Trikuta Residency · Upper Arithang, Gangtok',
    category: 'In-House Dining',
    badge: 'Sikkimese Dining',
    icon: '🍽️',
    accentColor: 'amber',
    description:
      'Spacious in-house dining hall with wooden tables, stainless steel cutlery, artistic bamboo motif partition screens, and fresh mountain meals.',
    tags: ['Himalayan Meals', 'Wooden Dining Tables', 'Bamboo Screens', 'Warm Dining']
  }
];

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  activeProperty,
  purpose,
  onReserveRoom,
  isLoading,
  galleryPhotos = {
    'rooms/view-room': [],
    'rooms/non-view-room': [],
    'common/reception': [],
    'common/dining': []
  },
  onOpenManagePhotos
}) => {
  const [activeTab, setActiveTab] = useState<'gangtok' | 'kalyani'>(activeProperty);
  const { isNight } = useTheme();

  // File input refs for each property
  const fileInputGangtokRef = useRef<HTMLInputElement>(null);
  const fileInputKalyaniRef = useRef<HTMLInputElement>(null);

  // Photos for both properties stored in IndexedDB
  const [gangtokPhotos, setGangtokPhotos] = useState<UserPhoto[]>([]);
  const [kalyaniPhotos, setKalyaniPhotos] = useState<UserPhoto[]>([]);

  // Load photos from IndexedDB on mount
  useEffect(() => {
    // Load Gangtok
    clearBrokenPhotosFromStorage('gangtok').then(() => {
      getStoredPhotos('gangtok').then((stored) => {
        const valid = stored.filter(
          (p) =>
            p.url &&
            (p.url.startsWith('data:') ||
              p.url.startsWith('http://') ||
              p.url.startsWith('https://') ||
              p.url.startsWith('blob:'))
        );
        setGangtokPhotos(valid);
      });
    });

    // Load Kalyani
    clearBrokenPhotosFromStorage('kalyani').then(() => {
      getStoredPhotos('kalyani').then((stored) => {
        const valid = stored.filter(
          (p) =>
            p.url &&
            (p.url.startsWith('data:') ||
              p.url.startsWith('http://') ||
              p.url.startsWith('https://') ||
              p.url.startsWith('blob:'))
        );
        setKalyaniPhotos(valid);
      });
    });
  }, []);

  // Gallery view state
  const [galleryViewMode, setGalleryViewMode] = useState<'spotlight' | 'grid'>('spotlight');
  const [selectedSpotlightIndex, setSelectedSpotlightIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<UserPhoto | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  // Sync tab with activeProperty when parent updates
  useEffect(() => {
    setActiveTab(activeProperty);
    setSelectedSpotlightIndex(0);
  }, [activeProperty]);

  const currentPhotos = activeTab === 'gangtok' ? gangtokPhotos : kalyaniPhotos;
  const currentVerifiedSpaces = activeTab === 'gangtok' ? TRIKUTA_VERIFIED_SPACES : PARIJAYE_VERIFIED_SPACES;
  const property = PROPERTIES[activeTab];
  const rooms = ROOMS.filter((r) => r.propertyId === activeTab);

  // Keep spotlight index in bounds
  useEffect(() => {
    if (selectedSpotlightIndex >= currentPhotos.length && currentPhotos.length > 0) {
      setSelectedSpotlightIndex(0);
    }
  }, [currentPhotos.length, selectedSpotlightIndex]);

  // Sort rooms so purpose-recommended rooms appear first
  const sortedRooms = [...rooms].sort((a, b) => {
    const aMatch = a.purposeTags.includes(purpose) ? 1 : 0;
    const bMatch = b.purposeTags.includes(purpose) ? 1 : 0;
    return bMatch - aMatch;
  });

  // Process File list into compressed data URLs and save to IndexedDB
  const handleFiles = async (files: FileList | File[], targetProp: 'gangtok' | 'kalyani') => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    const propName = targetProp === 'gangtok' ? 'Trikuta Residency' : 'Hotel Parijaye';
    setUploadFeedback(`Optimizing and adding ${fileArray.length} photo${fileArray.length > 1 ? 's' : ''} to ${propName}...`);

    const newPhotos: UserPhoto[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      try {
        const compressedDataUrl = await compressImageFile(file, 1600, 0.85);
        if (compressedDataUrl) {
          const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          newPhotos.push({
            id: `${targetProp}-photo-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
            url: compressedDataUrl,
            title: rawName.length > 3 ? rawName : `${propName} Photo ${i + 1}`,
            caption: `Authentic photo of ${propName}`,
            addedAt: Date.now() + i,
          });
        }
      } catch (err) {
        console.warn('Error compressing photo', err);
      }
    }

    if (newPhotos.length > 0) {
      if (targetProp === 'gangtok') {
        setGangtokPhotos((prev) => {
          const updated = [...prev, ...newPhotos];
          savePhotosToStorage(newPhotos, 'gangtok');
          return updated;
        });
      } else {
        setKalyaniPhotos((prev) => {
          const updated = [...prev, ...newPhotos];
          savePhotosToStorage(newPhotos, 'kalyani');
          return updated;
        });
      }
      setUploadFeedback(`Successfully added ${newPhotos.length} photo${newPhotos.length > 1 ? 's' : ''} to ${propName}!`);
      setTimeout(() => setUploadFeedback(null), 4000);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, targetProp: 'gangtok' | 'kalyani') => {
    if (e.target.files) {
      handleFiles(e.target.files, targetProp);
    }
  };

  const handleDrop = (e: React.DragEvent, targetProp: 'gangtok' | 'kalyani') => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files, targetProp);
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const propName = activeTab === 'gangtok' ? 'Trikuta Residency' : 'Hotel Parijaye';
    const newPhoto: UserPhoto = {
      id: `${activeTab}-url-${Date.now()}`,
      url: urlInput.trim(),
      title: `${propName} Photo`,
      caption: `Photo of ${propName}`,
      addedAt: Date.now(),
    };

    if (activeTab === 'gangtok') {
      setGangtokPhotos((prev) => {
        const updated = [...prev, newPhoto];
        savePhotosToStorage([newPhoto], 'gangtok');
        return updated;
      });
    } else {
      setKalyaniPhotos((prev) => {
        const updated = [...prev, newPhoto];
        savePhotosToStorage([newPhoto], 'kalyani');
        return updated;
      });
    }

    setUrlInput('');
    setShowUrlModal(false);
    setUploadFeedback('Photo added successfully!');
    setTimeout(() => setUploadFeedback(null), 4000);
  };

  const deletePhoto = (id: string, targetProp: 'gangtok' | 'kalyani', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (targetProp === 'gangtok') {
      setGangtokPhotos((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        deletePhotoFromStorage(id, 'gangtok');
        return updated;
      });
    } else {
      setKalyaniPhotos((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        deletePhotoFromStorage(id, 'kalyani');
        return updated;
      });
    }
    if (lightboxPhoto?.id === id) {
      setLightboxPhoto(null);
    }
  };

  const handleClearAllPhotos = async (targetProp: 'gangtok' | 'kalyani') => {
    await clearAllPhotosFromStorage(targetProp);
    if (targetProp === 'gangtok') {
      setGangtokPhotos([]);
    } else {
      setKalyaniPhotos([]);
    }
    setLightboxPhoto(null);
    setUploadFeedback('Cleared gallery. Ready to upload new photos!');
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const nextSpotlight = () => {
    if (currentPhotos.length === 0) return;
    setSelectedSpotlightIndex((prev) => (prev + 1) % currentPhotos.length);
  };

  const prevSpotlight = () => {
    if (currentPhotos.length === 0) return;
    setSelectedSpotlightIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);
  };

  // Lightbox navigation
  const openLightbox = (photo: UserPhoto) => {
    setLightboxPhoto(photo);
  };

  const handleOpenCustomLightbox = (photo: { url: string; title: string; caption?: string }) => {
    setLightboxPhoto({
      id: `gallery-lightbox-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      url: photo.url,
      title: photo.title,
      caption: photo.caption || '',
      addedAt: Date.now()
    });
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
  };

  const nextLightbox = () => {
    if (!lightboxPhoto || currentPhotos.length === 0) return;
    const currentIdx = currentPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIdx = (currentIdx + 1) % currentPhotos.length;
    setLightboxPhoto(currentPhotos[nextIdx]);
  };

  const prevLightbox = () => {
    if (!lightboxPhoto || currentPhotos.length === 0) return;
    const currentIdx = currentPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIdx = (currentIdx - 1 + currentPhotos.length) % currentPhotos.length;
    setLightboxPhoto(currentPhotos[prevIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, currentPhotos]);

  const currentSpotlightPhoto = currentPhotos[selectedSpotlightIndex] || currentPhotos[0];

  return (
    <section
      id="properties"
      className={`py-16 md:py-24 transition-colors duration-500 ${
        isNight ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs between Gangtok and Kalyani */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
            isNight ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              Featured Properties & Residencies
            </span>
            <h2
              className={`text-2xl sm:text-4xl font-serif font-bold mt-1 ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Explore Our Stays & Residencies
            </h2>
          </div>

          <div
            className={`flex items-center gap-2 p-1 rounded-xl border self-start sm:self-auto transition-colors ${
              isNight ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/80 border-slate-300'
            }`}
          >
            <button
              onClick={() => setActiveTab('gangtok')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'gangtok'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : isNight
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Mountain className="w-4 h-4 text-amber-500" />
              <span>Trikuta Residency (Gangtok)</span>
            </button>
            <button
              onClick={() => setActiveTab('kalyani')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'kalyani'
                  ? 'bg-emerald-500 text-white shadow-md font-bold'
                  : isNight
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Hotel Parijaye (AIIMS Kalyani)</span>
            </button>
          </div>
        </div>

        {/* 1. Property Feature Banner */}
        <div
          className={`mt-8 rounded-2xl p-6 sm:p-8 relative overflow-hidden border transition-colors shadow-sm ${
            isNight ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-md'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs mb-3 font-medium ${
                  activeTab === 'gangtok'
                    ? isNight
                      ? 'bg-slate-800 text-amber-300'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                    : isNight
                    ? 'bg-slate-800 text-emerald-300'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                <span>{property.location}</span>
                <span>·</span>
                <span>{property.distanceToLandmark}</span>
              </div>
              <h3
                className={`text-2xl sm:text-3xl font-serif font-bold ${
                  isNight ? 'text-white' : 'text-slate-950'
                }`}
              >
                {property.name}
              </h3>

              <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-medium hover:underline transition-colors ${
                    activeTab === 'gangtok'
                      ? 'text-amber-500 hover:text-amber-400'
                      : 'text-emerald-500 hover:text-emerald-400'
                  }`}
                  title="Click to view verified pin on Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{property.address}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>

              <p
                className={`mt-2 text-sm leading-relaxed ${
                  isNight ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {property.description}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.keyAmenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        activeTab === 'gangtok' ? 'text-amber-500' : 'text-emerald-500'
                      }`}
                    />
                    <div>
                      <span className={`font-semibold block ${isNight ? 'text-white' : 'text-slate-900'}`}>
                        {amenity.name}
                      </span>
                      <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                        {amenity.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Google Maps, Call, WhatsApp & Photos */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    activeTab === 'gangtok'
                      ? 'border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20'
                      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Google Maps Location</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={`tel:${property.phone}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isNight
                      ? 'border-slate-700 bg-slate-800 text-slate-200 hover:text-white'
                      : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Call: +91 91630 08361</span>
                </a>

                <a
                  href={`https://wa.me/919163008361?text=${encodeURIComponent(
                    `Hello Parijai Group of Hotels, I am inquiring about booking and tariffs at ${property.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`#${activeTab}-photos`}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isNight
                      ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Photos</span>
                </a>
              </div>
            </div>

            {/* Banner Right-Side: Top Photo OR Architectural Verified Card */}
            <div className="lg:col-span-5 relative">
              {currentPhotos.length > 0 && currentPhotos[0]?.url ? (
                /* Show user's provided photo */
                <div
                  onClick={() => openLightbox(currentPhotos[0])}
                  className="aspect-16/10 rounded-xl overflow-hidden border border-slate-700/80 shadow-xl relative group cursor-pointer bg-slate-950"
                >
                  <img
                    src={currentPhotos[0].url}
                    alt={currentPhotos[0].title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-4">
                    <div className="text-xs text-white">
                      <div className="font-semibold">{currentPhotos[0].title}</div>
                      <div
                        className={`text-[11px] ${
                          activeTab === 'gangtok' ? 'text-amber-300' : 'text-emerald-300'
                        }`}
                      >
                        {property.name}
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border text-xs font-semibold ${
                        activeTab === 'gangtok'
                          ? 'border-amber-400/40 text-amber-300'
                          : 'border-emerald-400/40 text-emerald-300'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{currentPhotos.length} Photo{currentPhotos.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Elegant architectural verified emblem card */
                <div
                  className={`aspect-16/10 rounded-xl p-6 flex flex-col justify-between border relative overflow-hidden ${
                    isNight
                      ? 'bg-slate-950/80 border-slate-800 text-white'
                      : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {activeTab === 'gangtok' ? (
                        <Mountain className="w-6 h-6 text-amber-500" />
                      ) : (
                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      )}
                      <div>
                        <div className="font-serif font-bold text-sm">{property.name}</div>
                        <div className="text-[11px] text-slate-400">{property.location}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        activeTab === 'gangtok'
                          ? 'bg-amber-400/20 text-amber-500 border-amber-400/30'
                          : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                      }`}
                    >
                      Verified Property
                    </span>
                  </div>

                  <div className="py-2">
                    <div className="text-xs font-semibold text-slate-300">{property.landmark}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{property.vibe}</div>
                  </div>

                  <button
                    onClick={() => {
                      if (activeTab === 'gangtok') {
                        fileInputGangtokRef.current?.click();
                      } else {
                        fileInputKalyaniRef.current?.click();
                      }
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-950 text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === 'gangtok'
                        ? 'bg-amber-400 hover:bg-amber-300'
                        : 'bg-emerald-400 hover:bg-emerald-300'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photos of {property.name}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. DEDICATED PHOTO SHOWCASE BANNER FOR ACTIVE PROPERTY */}
        <div id={`${activeTab}-photos`} className="mt-10 scroll-mt-24">
          <div
            className={`p-6 sm:p-8 rounded-2xl border transition-colors shadow-sm ${
              isNight
                ? 'bg-slate-900/90 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-md'
            }`}
          >
            {/* Header with Title & Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${
                    activeTab === 'gangtok'
                      ? 'bg-amber-400/15 text-amber-600 dark:text-amber-400 border-amber-400/30'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {activeTab === 'gangtok' ? (
                    <Mountain className="w-3.5 h-3.5" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {activeTab === 'gangtok'
                      ? 'Trikuta Residency Hotel Photos · Gangtok, Sikkim'
                      : 'Hotel Parijaye Authentic Photos · AIIMS Kalyani, West Bengal'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <h3
                    className={`text-xl sm:text-2xl font-serif font-bold ${
                      isNight ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    Photos of {property.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                    <Database className="w-3 h-3" />
                    <span>Database Synced</span>
                  </span>
                </div>
                <p className={`text-xs sm:text-sm mt-1 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                  {activeTab === 'gangtok'
                    ? 'Authentic photos of Trikuta Residency in Upper Arithang, Gangtok.'
                    : 'Authentic photos of Hotel Parijaye — located 2 minutes from AIIMS Kalyani Gate 1.'}
                </p>
              </div>

              {/* Upload & Management Actions */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                {activeTab === 'gangtok' ? (
                  <input
                    ref={fileInputGangtokRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileInputChange(e, 'gangtok')}
                    className="hidden"
                  />
                ) : (
                  <input
                    ref={fileInputKalyaniRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileInputChange(e, 'kalyani')}
                    className="hidden"
                  />
                )}

                <button
                  onClick={() => {
                    if (activeTab === 'gangtok') {
                      fileInputGangtokRef.current?.click();
                    } else {
                      fileInputKalyaniRef.current?.click();
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow transition-all cursor-pointer active:scale-95 text-slate-950 ${
                    activeTab === 'gangtok'
                      ? 'bg-amber-400 hover:bg-amber-300'
                      : 'bg-emerald-400 hover:bg-emerald-300'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {currentPhotos.length > 0
                      ? `+ Add More Photos`
                      : `Upload Photos of ${activeTab === 'gangtok' ? 'Trikuta' : 'Parijaye'}`}
                  </span>
                </button>

                <button
                  onClick={() => setShowUrlModal(true)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isNight
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Paste Link</span>
                </button>

                {currentPhotos.length > 0 && (
                  <>
                    <button
                      onClick={() => handleClearAllPhotos(activeTab)}
                      title="Clear all photos to re-upload"
                      className={`p-2 rounded-lg text-xs font-medium border transition-colors text-rose-400 hover:bg-rose-500 hover:text-white cursor-pointer ${
                        isNight ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <div
                      className={`p-1 rounded-lg border flex items-center gap-1 ${
                        isNight ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => setGalleryViewMode('spotlight')}
                        className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                          galleryViewMode === 'spotlight'
                            ? activeTab === 'gangtok'
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'bg-emerald-500 text-white font-bold'
                            : isNight
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        Spotlight
                      </button>
                      <button
                        onClick={() => setGalleryViewMode('grid')}
                        className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                          galleryViewMode === 'grid'
                            ? activeTab === 'gangtok'
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'bg-emerald-500 text-white font-bold'
                            : isNight
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        Grid ({currentPhotos.length})
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Upload Feedback Toast */}
            {uploadFeedback && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{uploadFeedback}</span>
              </div>
            )}

            {/* DISPLAY SECTION: IF PHOTOS ARE UPLOADED */}
            {currentPhotos.length > 0 && (
              <div className="mt-6">
                {/* SPOTLIGHT VIEW */}
                {galleryViewMode === 'spotlight' && currentSpotlightPhoto && (
                  <div className="space-y-4">
                    {/* Big Main Viewer */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-16/9 sm:aspect-21/9 border border-slate-700/80 shadow-2xl group flex items-center justify-center">
                      <img
                        src={currentSpotlightPhoto.url}
                        alt={currentSpotlightPhoto.title}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-full h-full object-contain sm:object-cover group-hover:scale-102 transition-transform duration-700"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border text-xs font-semibold ${
                            activeTab === 'gangtok'
                              ? 'border-amber-400/40 text-amber-300'
                              : 'border-emerald-400/40 text-emerald-300'
                          }`}
                        >
                          {property.name}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-slate-300 text-xs">
                          Photo {selectedSpotlightIndex + 1} of {currentPhotos.length}
                        </span>
                      </div>

                      {/* Top Actions: Lightbox & Delete */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                          onClick={() => openLightbox(currentSpotlightPhoto)}
                          aria-label="Enlarge photo in full screen"
                          className="p-2 rounded-full bg-slate-950/80 text-white hover:bg-amber-400 hover:text-slate-950 transition-colors backdrop-blur-md cursor-pointer border border-white/20"
                        >
                          <Maximize className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => deletePhoto(currentSpotlightPhoto.id, activeTab, e)}
                          aria-label="Delete this photo"
                          className="p-2 rounded-full bg-slate-950/80 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors backdrop-blur-md cursor-pointer border border-rose-500/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Navigation Arrows */}
                      {currentPhotos.length > 1 && (
                        <>
                          <button
                            onClick={prevSpotlight}
                            aria-label="Previous photo"
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/75 text-white hover:bg-slate-900 transition-colors backdrop-blur-md cursor-pointer border border-white/20"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextSpotlight}
                            aria-label="Next photo"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/75 text-white hover:bg-slate-900 transition-colors backdrop-blur-md cursor-pointer border border-white/20"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Bottom Caption Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                          <h4 className="text-base sm:text-xl font-serif font-bold text-white">
                            {currentSpotlightPhoto.title}
                          </h4>
                          <p className="text-xs text-slate-200 mt-1">
                            {property.name} · {property.landmark}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openLightbox(currentSpotlightPhoto)}
                            className={`px-3.5 py-1.5 rounded-lg text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer ${
                              activeTab === 'gangtok'
                                ? 'bg-amber-400 hover:bg-amber-300'
                                : 'bg-emerald-400 hover:bg-emerald-300'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Size</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Clickable Thumbnail Strip */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                      {currentPhotos.map((item, idx) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedSpotlightIndex(idx)}
                          className={`relative shrink-0 w-24 sm:w-32 aspect-16/10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group bg-slate-950 ${
                            idx === selectedSpotlightIndex
                              ? activeTab === 'gangtok'
                                ? 'border-amber-400 ring-2 ring-amber-400/40 scale-102'
                                : 'border-emerald-400 ring-2 ring-emerald-400/40 scale-102'
                              : 'border-transparent opacity-65 hover:opacity-100 hover:border-slate-500'
                          }`}
                        >
                          <img
                            src={item.url}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 text-[9px] bg-slate-950/80 text-white px-1 rounded">
                            {idx + 1}
                          </span>
                          <button
                            onClick={(e) => deletePhoto(item.id, activeTab, e)}
                            className="absolute top-1 right-1 p-1 rounded bg-slate-950/80 text-rose-300 hover:text-white hover:bg-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {/* Add More Tile in Strip */}
                      <button
                        onClick={() => {
                          if (activeTab === 'gangtok') {
                            fileInputGangtokRef.current?.click();
                          } else {
                            fileInputKalyaniRef.current?.click();
                          }
                        }}
                        className={`shrink-0 w-24 sm:w-32 aspect-16/10 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 text-xs cursor-pointer transition-colors ${
                          isNight
                            ? 'border-slate-700 hover:border-amber-400 text-slate-400 hover:text-amber-300'
                            : 'border-slate-300 hover:border-amber-500 text-slate-500 hover:text-amber-600'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-[10px] font-semibold">+ Add Photo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* GRID VIEW */}
                {galleryViewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentPhotos.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => openLightbox(item)}
                        className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group flex flex-col justify-between ${
                          isNight ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="relative aspect-16/11 overflow-hidden bg-slate-900">
                          <img
                            src={item.url}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="p-2 rounded-full bg-slate-950/80 text-white">
                              <Eye className="w-4 h-4 text-amber-400" />
                            </span>
                          </div>
                          <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 backdrop-blur-sm">
                            #{idx + 1}
                          </span>
                          <button
                            onClick={(e) => deletePhoto(item.id, activeTab, e)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-3">
                          <h4
                            className={`text-xs font-serif font-bold group-hover:text-amber-500 transition-colors line-clamp-1 ${
                              isNight ? 'text-white' : 'text-slate-950'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400">{property.name}</span>
                        </div>
                      </div>
                    ))}

                    {/* Add photo card in grid */}
                    <div
                      onClick={() => {
                        if (activeTab === 'gangtok') {
                          fileInputGangtokRef.current?.click();
                        } else {
                          fileInputKalyaniRef.current?.click();
                        }
                      }}
                      className={`rounded-xl border-2 border-dashed aspect-16/11 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                        isNight
                          ? 'border-slate-800 hover:border-amber-400 bg-slate-950/50 text-slate-400 hover:text-amber-300'
                          : 'border-slate-300 hover:border-amber-500 bg-slate-50 text-slate-500 hover:text-amber-600'
                      }`}
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-xs font-semibold">Upload More Photos</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VERIFIED SPACES SHOWCASE CARDS (PRESENTABLE FORMAT) */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${
                      activeTab === 'gangtok' ? 'text-amber-500' : 'text-emerald-500'
                    }`}
                  >
                    Verified Spaces & Guest Facilities
                  </div>
                  <h4
                    className={`text-lg sm:text-xl font-serif font-bold mt-1 ${
                      isNight ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {activeTab === 'gangtok'
                      ? '6 Authentic Mountain Lodge Spaces (Trikuta Residency)'
                      : '5 Authentic Healthcare-Adjacent Spaces (Hotel Parijaye)'}
                  </h4>
                </div>

                <button
                  onClick={() => {
                    if (activeTab === 'gangtok') {
                      fileInputGangtokRef.current?.click();
                    } else {
                      fileInputKalyaniRef.current?.click();
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-slate-950 font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition-all active:scale-95 ${
                    activeTab === 'gangtok'
                      ? 'bg-amber-400 hover:bg-amber-300'
                      : 'bg-emerald-400 hover:bg-emerald-300'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select & Display All Photos</span>
                </button>
              </div>

              {/* Grid of Verified Space Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentVerifiedSpaces.map((space, idx) => (
                  <div
                    key={space.id}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                      isNight
                        ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Category Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            activeTab === 'gangtok'
                              ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {space.badge}
                        </span>
                        <span className="text-xl">{space.icon}</span>
                      </div>

                      {/* Title & Subtitle */}
                      <h5
                        className={`text-base font-serif font-bold ${
                          isNight ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {space.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {space.subtitle}
                      </span>

                      {/* Description */}
                      <p
                        className={`text-xs mt-3 leading-relaxed ${
                          isNight ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {space.description}
                      </p>

                      {/* Key Highlights Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {space.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                              isNight
                                ? 'bg-slate-900 border-slate-800 text-slate-300'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3 border-t border-slate-800/50 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        Slot #{idx + 1}
                      </span>
                      <button
                        onClick={() => {
                          if (activeTab === 'gangtok') {
                            fileInputGangtokRef.current?.click();
                          } else {
                            fileInputKalyaniRef.current?.click();
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors ${
                          activeTab === 'gangtok'
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-emerald-400 hover:text-emerald-300'
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload This Photo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guidance Notice */}
              <div
                className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${
                  activeTab === 'gangtok'
                    ? 'bg-amber-400/10 border-amber-400/20 text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    activeTab === 'gangtok' ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                />
                <div className="text-xs leading-relaxed">
                  <strong>How to display your photos:</strong> Click <strong>&quot;Select & Display All Photos&quot;</strong> above to pick your photos from your device. Your browser instantly optimizes and stores them in your private local browser database, displaying them in high-definition across all tabs with zero quota errors!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Rooms Section Header & Clean Architectural Room Cards (Zero Fake Photos) */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                activeTab === 'gangtok' ? 'text-amber-500' : 'text-emerald-500'
              }`}
            >
              Rooms & Accommodations
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-serif font-bold mt-1 ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              Suites & Tariffs at {property.name}
            </h3>
          </div>
          <span className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
            Showing {sortedRooms.length} verified suites (Architectural specifications)
          </span>
        </div>

        {/* Loading Shimmer State */}
        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`rounded-2xl p-6 h-80 animate-pulse flex flex-col justify-between border ${
                  isNight ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className={`h-6 rounded w-3/4 ${isNight ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-1/2 ${isNight ? 'bg-slate-800' : 'bg-slate-200'}`} />
                </div>
                <div className={`h-12 rounded w-full ${isNight ? 'bg-slate-800' : 'bg-slate-200'}`} />
              </div>
            ))}
          </div>
        ) : activeTab === 'gangtok' ? (
          /* Gangtok: Exactly Two Room Types - View Room (Deluxe) & Non-View Room (Regular) */
          <div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sortedRooms.map((room) => {
                const isViewRoom = room.id === 'g-view-deluxe';
                const galleryId: GalleryId = isViewRoom ? 'rooms/view-room' : 'rooms/non-view-room';
                const photosForRoom = galleryPhotos[galleryId] || [];

                return (
                  <TrikutaRoomCard
                    key={room.id}
                    room={room}
                    galleryId={galleryId}
                    photos={photosForRoom}
                    isNight={isNight}
                    onReserve={() => onReserveRoom(room)}
                    onOpenManagePhotos={() => onOpenManagePhotos?.(galleryId)}
                    onOpenLightbox={handleOpenCustomLightbox}
                  />
                );
              })}
            </div>

            {/* COMMON SPACES SECTION (Trikuta Residency) */}
            <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-amber-400/15 text-amber-500 border border-amber-400/30">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Shared Property Spaces · Not Bookable</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-serif font-bold mt-2 ${isNight ? 'text-white' : 'text-slate-950'}`}>
                    Common Spaces & Guest Areas
                  </h3>
                  <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                    Welcoming shared property amenities at Trikuta Residency. These common spaces are included with your stay and are not bookable as rooms.
                  </p>
                </div>

                <button
                  onClick={() => onOpenManagePhotos?.('common/reception')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Manage Common Area Photos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Reception Area */}
                <CommonSpaceCard
                  galleryId="common/reception"
                  name="Reception Area & Check-in Lobby"
                  badge="Lobby & Tour Desk"
                  description="Warm welcoming check-in desk, marble staircase, cozy leather seating lounge, and dedicated travel permit desk for Nathula Pass, Tsomgo Lake, and North Sikkim excursions."
                  highlights={[
                    '24/7 Front Check-in & Concierge Desk',
                    'Dedicated Nathula Pass & Tsomgo Permits Help Desk',
                    'Cozy Leather Sofa Seating & Mountain Heating',
                    'Luggage Holding & Mountain Taxi Coordination'
                  ]}
                  photos={galleryPhotos['common/reception'] || []}
                  isNight={isNight}
                  onOpenManagePhotos={() => onOpenManagePhotos?.('common/reception')}
                  onOpenLightbox={handleOpenCustomLightbox}
                />

                {/* 2. Dining Area */}
                <CommonSpaceCard
                  galleryId="common/dining"
                  name="Dining Area & In-House Restaurant"
                  badge="Sikkimese & Indian Cuisine"
                  description="Authentic in-house Sikkimese organic specialty dining along with comforting North & South Indian meals, mountain tea, and fresh breakfast spread overlooking the valleys."
                  highlights={[
                    'Freshly Prepared Organic Sikkimese Delicacies',
                    'Homestyle North & South Indian Thalis',
                    'Hot Himalayan Spiced Tea & Filter Coffee',
                    'Breakfast Included Options & Room Dining'
                  ]}
                  photos={galleryPhotos['common/dining'] || []}
                  isNight={isNight}
                  onOpenManagePhotos={() => onOpenManagePhotos?.('common/dining')}
                  onOpenLightbox={handleOpenCustomLightbox}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Kalyani: Specialized Medical Suites */
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRooms.map((room) => (
              <ArchitecturalRoomCard
                key={room.id}
                room={room}
                purpose={purpose}
                isNight={isNight}
                onReserve={() => onReserveRoom(room)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. Fullscreen Lightbox Modal for User-Provided Photos */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col justify-between bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title & Close */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/90 text-white">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                    activeTab === 'gangtok'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {property.name}
                </span>
                <span className="text-sm font-serif font-bold truncate max-w-md">
                  {lightboxPhoto.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => deletePhoto(lightboxPhoto.id, activeTab, e)}
                  aria-label="Delete this photo"
                  className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"
                  title="Remove this photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={closeLightbox}
                  aria-label="Close photo view"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Picture Center Container */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 bg-black overflow-hidden min-h-[320px] max-h-[65vh]">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="max-h-[62vh] max-w-full object-contain rounded-lg shadow-lg"
              />

              {/* Prev / Next Chevrons */}
              {currentPhotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer border border-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer border border-white/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Action */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="max-w-3xl">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lightboxPhoto.caption || `Photo of ${property.name}`}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                  <span>
                    Photo {currentPhotos.findIndex((p) => p.id === lightboxPhoto.id) + 1} of{' '}
                    {currentPhotos.length}
                  </span>
                  <span>·</span>
                  <span
                    className={activeTab === 'gangtok' ? 'text-amber-400' : 'text-emerald-400'}
                  >
                    {property.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    closeLightbox();
                    const firstRoom = rooms[0];
                    if (firstRoom) onReserveRoom(firstRoom);
                  }}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer text-slate-950 ${
                    activeTab === 'gangtok'
                      ? 'bg-amber-400 hover:bg-amber-300'
                      : 'bg-emerald-400 hover:bg-emerald-300'
                  }`}
                >
                  <span>Book This Stay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add URL Modal */}
      {showUrlModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          onClick={() => setShowUrlModal(false)}
        >
          <div
            className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl ${
              isNight ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
              <h4 className="font-serif font-bold text-base">Add Photo via Web Link</h4>
              <button
                onClick={() => setShowUrlModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUrl} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Direct Image URL (JPG, PNG, WEBP)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/photo.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                    isNight
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-emerald-400'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 text-white font-bold text-xs rounded-lg hover:bg-emerald-400"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

interface ArchitecturalRoomCardProps {
  room: Room;
  purpose: 'leisure' | 'medical' | 'corporate';
  isNight: boolean;
  onReserve: () => void;
}

/**
 * Architectural Room Card: Displays authentic architectural room specs,
 * amenities, floor size, and pricing. Contains ZERO fake/unprovided stock photos.
 */
const ArchitecturalRoomCard: React.FC<ArchitecturalRoomCardProps> = ({
  room,
  purpose,
  isNight,
  onReserve,
}) => {
  const isRecommended = room.purposeTags.includes(purpose);

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group border relative ${
        isNight
          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-xl'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                room.propertyId === 'gangtok'
                  ? 'bg-amber-400/15 text-amber-500 border-amber-400/30'
                  : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
              }`}
            >
              {room.propertyId === 'gangtok' ? 'Himalayan Suite' : 'AIIMS Care Suite'}
            </span>

            {isRecommended && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  room.propertyId === 'gangtok'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                Recommended
              </span>
            )}
          </div>

          {room.freeCancellation && (
            <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Free Cancel</span>
            </span>
          )}
        </div>

        {/* Room Title & Tagline */}
        <h4
          className={`text-xl font-serif font-bold transition-colors ${
            isNight
              ? room.propertyId === 'gangtok'
                ? 'text-white group-hover:text-amber-300'
                : 'text-white group-hover:text-emerald-300'
              : room.propertyId === 'gangtok'
              ? 'text-slate-950 group-hover:text-amber-600'
              : 'text-slate-950 group-hover:text-emerald-600'
          }`}
        >
          {room.name}
        </h4>

        <p
          className={`text-xs mt-1 leading-relaxed ${
            isNight ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {room.tagline}
        </p>

        {/* Architectural Specs Strip */}
        <div
          className={`mt-4 p-3 rounded-xl border flex items-center justify-between text-xs ${
            isNight
              ? 'bg-slate-950/70 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Maximize2
              className={`w-3.5 h-3.5 shrink-0 ${
                room.propertyId === 'gangtok' ? 'text-amber-500' : 'text-emerald-500'
              }`}
            />
            <span className="font-mono font-bold">{room.sqft}</span>
            <span className="text-[11px] text-slate-400">sq ft</span>
          </div>

          <div className="h-4 w-px bg-slate-700/50" />

          <div className="flex items-center gap-1.5">
            <Bed
              className={`w-3.5 h-3.5 shrink-0 ${
                room.propertyId === 'gangtok' ? 'text-amber-500' : 'text-emerald-500'
              }`}
            />
            <span className="text-[11px]">{room.bed}</span>
          </div>

          <div className="h-4 w-px bg-slate-700/50" />

          <div className="flex items-center gap-1.5">
            <Users
              className={`w-3.5 h-3.5 shrink-0 ${
                room.propertyId === 'gangtok' ? 'text-amber-500' : 'text-emerald-500'
              }`}
            />
            <span className="text-[11px]">{room.occupancy}</span>
          </div>
        </div>

        {/* Key Verified Amenities */}
        <div className="mt-4">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Included In-Room Amenities
          </div>
          <div className="flex flex-wrap gap-1.5">
            {room.amenities.map((item, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                  isNight
                    ? 'bg-slate-950 text-slate-300 border-slate-800'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Urgency Badge */}
        {room.remainingRooms <= 2 && (
          <div className="mt-4 text-[11px] font-semibold text-rose-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Only {room.remainingRooms} suites left for selected dates</span>
          </div>
        )}
      </div>

      {/* Pricing & CTA Footer */}
      <div
        className={`mt-6 pt-4 border-t flex items-center justify-between ${
          isNight ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-2xl font-bold font-mono ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              ₹{room.pricePerNight}
            </span>
            <span className="text-xs text-slate-400 line-through font-mono">
              ₹{room.originalPrice}
            </span>
          </div>
          <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
            + GST · Per Night
          </span>
        </div>

        <button
          onClick={onReserve}
          className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer text-slate-950 ${
            room.propertyId === 'gangtok'
              ? 'bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200'
              : 'bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200'
          }`}
        >
          <span>Reserve Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* PERMANENT GALLERY COMPONENT (Shared by Rooms and Common Spaces)            */
/* -------------------------------------------------------------------------- */

interface PersistentImageGalleryProps {
  galleryId: GalleryId;
  photos: GalleryPhoto[];
  onOpenManagePhotos: () => void;
  onOpenLightbox: (photo: { url: string; title: string; caption?: string }) => void;
  aspectRatioClass?: string;
}

const PersistentImageGallery: React.FC<PersistentImageGalleryProps> = ({
  galleryId,
  photos,
  onOpenManagePhotos,
  onOpenLightbox,
  aspectRatioClass = 'aspect-16/10'
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const config = GALLERY_PLACEHOLDERS[galleryId];

  // If real photos exist, use them; otherwise use placeholder and additionalPlaceholders
  const hasRealPhotos = photos && photos.length > 0;
  const imageList = hasRealPhotos
    ? photos.map((p) => ({ url: p.url, title: p.title, caption: p.caption || '' }))
    : [
        { url: config.placeholderUrl, title: config.name, caption: config.description },
        ...(config.additionalPlaceholders || []).map((url, i) => ({
          url,
          title: `${config.name} (Angle ${i + 2})`,
          caption: config.description
        }))
      ];

  const safeIdx = Math.min(currentIdx, Math.max(0, imageList.length - 1));
  const activeImage = imageList[safeIdx] || imageList[0];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className={`relative ${aspectRatioClass} overflow-hidden rounded-xl bg-slate-950 group select-none`}>
      <img
        src={activeImage.url}
        alt={activeImage.title}
        onClick={() => onOpenLightbox(activeImage)}
        className="w-full h-full object-cover cursor-pointer group-hover:scale-103 transition-transform duration-500"
      />

      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        {hasRealPhotos ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Real Photo ({safeIdx + 1}/{imageList.length})</span>
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/85 text-amber-300 border border-amber-400/30 backdrop-blur-md flex items-center gap-1 shadow">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Placeholder Preview ({safeIdx + 1}/{imageList.length})</span>
          </span>
        )}
      </div>

      {/* Manage Photos Icon Button on Hover */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenManagePhotos();
          }}
          className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 shadow"
          title="Upload or change photos for this gallery"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="text-[10px] hidden sm:inline">Manage</span>
        </button>
      </div>

      {/* Prev / Next Arrows if multiple photos */}
      {imageList.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/70 hover:bg-amber-400 hover:text-slate-950 text-white transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 border border-white/20 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/70 hover:bg-amber-400 hover:text-slate-950 text-white transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 border border-white/20 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-slate-950/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {imageList.map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(i);
                }}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                  i === safeIdx ? 'bg-amber-400 w-3' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Bottom overlay title */}
      <div
        onClick={() => onOpenLightbox(activeImage)}
        className="absolute inset-x-0 bottom-0 pt-6 pb-2 px-3 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent cursor-pointer flex items-end justify-between"
      >
        <span className="text-[11px] text-white font-medium truncate">
          {activeImage.title}
        </span>
        <span className="text-[10px] text-amber-300 flex items-center gap-0.5 shrink-0 ml-2">
          <Eye className="w-3 h-3" />
          <span>Zoom</span>
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TRIKUTA ROOM CARD (Gangtok: Only 2 Room Types - Window View is Only Difference) */
/* -------------------------------------------------------------------------- */

interface TrikutaRoomCardProps {
  room: Room;
  galleryId: 'rooms/view-room' | 'rooms/non-view-room';
  photos: GalleryPhoto[];
  isNight: boolean;
  onReserve: () => void;
  onOpenManagePhotos: () => void;
  onOpenLightbox: (photo: { url: string; title: string; caption?: string }) => void;
}

const TrikutaRoomCard: React.FC<TrikutaRoomCardProps> = ({
  room,
  galleryId,
  photos,
  isNight,
  onReserve,
  onOpenManagePhotos,
  onOpenLightbox
}) => {
  const isViewRoom = galleryId === 'rooms/view-room';

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group border relative ${
        isNight
          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-xl'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl'
      }`}
    >
      <div>
        {/* Photo Gallery Component on Top of Room Card */}
        <div className="mb-4">
          <PersistentImageGallery
            galleryId={galleryId}
            photos={photos}
            onOpenManagePhotos={onOpenManagePhotos}
            onOpenLightbox={onOpenLightbox}
            aspectRatioClass="aspect-16/10"
          />
        </div>

        {/* View Distinction Highlight (The ONLY difference between the two room types) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {isViewRoom ? (
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <Mountain className="w-3.5 h-3.5 text-slate-950" />
              <span>Hillside View</span>
            </span>
          ) : (
            <span
              className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider border flex items-center gap-1.5 ${
                isNight
                  ? 'border-slate-700 text-slate-400 bg-slate-950/60'
                  : 'border-slate-300 text-slate-600 bg-slate-100'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Standard Window (No View)</span>
            </span>
          )}

          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Free Cancellation</span>
          </span>
        </div>

        {/* Room Title & Tagline */}
        <h4
          className={`text-xl font-serif font-bold transition-colors ${
            isNight
              ? 'text-white group-hover:text-amber-300'
              : 'text-slate-950 group-hover:text-amber-600'
          }`}
        >
          {room.name}
        </h4>

        <p
          className={`text-xs mt-1 leading-relaxed ${
            isNight ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {room.tagline}
        </p>

        {/* Architectural Specs Strip (IDENTICAL on both room types) */}
        <div
          className={`mt-4 p-3 rounded-xl border flex items-center justify-between text-xs ${
            isNight
              ? 'bg-slate-950/70 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span className="font-mono font-bold">{room.sqft}</span>
            <span className="text-[11px] text-slate-400">sq ft</span>
          </div>

          <div className="h-4 w-px bg-slate-700/50" />

          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span className="text-[11px]">{room.bed}</span>
          </div>

          <div className="h-4 w-px bg-slate-700/50" />

          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span className="text-[11px]">{room.occupancy}</span>
          </div>
        </div>

        {/* Shared Four Amenities Icon Row (IDENTICAL on both room types) */}
        <div className="mt-5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Included Room Amenities (Identical on both)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs ${
                isNight
                  ? 'bg-slate-950 text-slate-300 border-slate-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-[11px] truncate font-medium">Water heater / geyser</span>
            </div>

            <div
              className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs ${
                isNight
                  ? 'bg-slate-950 text-slate-300 border-slate-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Tv className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-[11px] truncate font-medium">TV</span>
            </div>

            <div
              className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs ${
                isNight
                  ? 'bg-slate-950 text-slate-300 border-slate-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-[11px] truncate font-medium">Mini table</span>
            </div>

            <div
              className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs ${
                isNight
                  ? 'bg-slate-950 text-slate-300 border-slate-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Wifi className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-[11px] truncate font-medium">WiFi</span>
            </div>
          </div>
        </div>

        {/* Urgency Badge */}
        {room.remainingRooms <= 3 && (
          <div className="mt-4 text-[11px] font-semibold text-rose-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Only {room.remainingRooms} rooms left at this tariff</span>
          </div>
        )}
      </div>

      {/* Pricing & CTA Footer */}
      <div
        className={`mt-6 pt-4 border-t flex items-center justify-between ${
          isNight ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-2xl font-bold font-mono ${
                isNight ? 'text-white' : 'text-slate-950'
              }`}
            >
              ₹{room.pricePerNight}
            </span>
            <span className="text-xs text-slate-400 line-through font-mono">
              ₹{room.originalPrice}
            </span>
          </div>
          <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
            + GST · Per Night
          </span>
        </div>

        <button
          onClick={onReserve}
          className="px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200"
        >
          <span>Reserve Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* COMMON SPACE CARD (Reception Area & Dining Area)                          */
/* -------------------------------------------------------------------------- */

interface CommonSpaceCardProps {
  galleryId: 'common/reception' | 'common/dining';
  name: string;
  badge: string;
  description: string;
  highlights: string[];
  photos: GalleryPhoto[];
  isNight: boolean;
  onOpenManagePhotos: () => void;
  onOpenLightbox: (photo: { url: string; title: string; caption?: string }) => void;
}

const CommonSpaceCard: React.FC<CommonSpaceCardProps> = ({
  galleryId,
  name,
  badge,
  description,
  highlights,
  photos,
  isNight,
  onOpenManagePhotos,
  onOpenLightbox
}) => {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
        isNight
          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-sm hover:shadow-lg'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
      }`}
    >
      <div>
        {/* Photo Gallery Component on Top */}
        <div className="mb-4">
          <PersistentImageGallery
            galleryId={galleryId}
            photos={photos}
            onOpenManagePhotos={onOpenManagePhotos}
            onOpenLightbox={onOpenLightbox}
            aspectRatioClass="aspect-16/10"
          />
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-500 border border-amber-400/30">
            {badge}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Shared Space · Open to all guests
          </span>
        </div>

        <h4 className={`text-xl font-serif font-bold ${isNight ? 'text-white' : 'text-slate-950'}`}>
          {name}
        </h4>

        <p className={`text-xs mt-1.5 leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>

        {/* Feature Highlights */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className={isNight ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer explaining non-bookable shared space */}
      <div
        className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
          isNight ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}
      >
        <div className="flex items-center gap-1.5 text-[11px]">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Complimentary property amenity with all stays</span>
        </div>

        <button
          onClick={onOpenManagePhotos}
          className="text-amber-500 hover:underline flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
        >
          <Camera className="w-3 h-3" />
          <span>Manage Area Photos</span>
        </button>
      </div>
    </div>
  );
};

