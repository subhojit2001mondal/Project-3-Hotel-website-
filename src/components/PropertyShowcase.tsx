import React, { useState, useEffect, useRef } from 'react';
import {
  Bed,
  Maximize2,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
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
  Camera,
  Building
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

// Curated high-res showcase photos for the hotel header gallery (matching Lemon Tree 5-photo grid UI design)
const HOTEL_SHOWCASE_PHOTOS: Record<
  "gangtok" | "kalyani",
  { id: string; url: string; title: string; category: string }[]
> = {
  gangtok: [
    {
      id: "gt-1",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
      title: "Trikuta Residency — Hillside Facade & Mountain Entrance",
      category: "Exterior & Facade"
    },
    {
      id: "gt-2",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85",
      title: "Reception Lobby & Warm Guest Seating Lounge",
      category: "Lobby"
    },
    {
      id: "gt-3",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85",
      title: "Deluxe Bedroom with Scenic Himalayan Valley Window",
      category: "Guest Room"
    },
    {
      id: "gt-4",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85",
      title: "In-House Sikkimese & Indian Dining Restaurant",
      category: "Dining"
    },
    {
      id: "gt-5",
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=85",
      title: "Concierge & Mountain Permit Help Desk",
      category: "Front Desk"
    }
  ],
  kalyani: [
    {
      id: "ky-1",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
      title: "Hotel Parijaye — Executive Healthcare-Adjacent Hotel Facade",
      category: "Exterior & Entrance"
    },
    {
      id: "ky-2",
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=85",
      title: "Sanitized Executive Suite with Bedding & Seating",
      category: "Suites"
    },
    {
      id: "ky-3",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=85",
      title: "24/7 Front Desk, Prescription Support & Medical Assistance",
      category: "Reception"
    },
    {
      id: "ky-4",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85",
      title: "Sanitized In-House Kitchen & Attendant Dining",
      category: "Diet Dining"
    },
    {
      id: "ky-5",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85",
      title: "Sanitized Attached Bath with 24/7 Hot Water Geyser",
      category: "Bath & Hygiene"
    }
  ]
};

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

        {/* 1. LEMON-TREE STYLE HOTEL HEADER & 5-PHOTO MOSAIC GALLERY */}
        <div className="mt-8">
          {/* Header Bar: Hotel Logo/Icon, Title, Address, and Verified Ratings Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start sm:items-center gap-3.5">
              {/* Hotel Brand Emblem */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md border ${
                  activeTab === "gangtok"
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 border-amber-300"
                    : "bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-emerald-300"
                }`}
              >
                {activeTab === "gangtok" ? (
                  <Mountain className="w-7 h-7" />
                ) : (
                  <Building className="w-7 h-7" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
                      isNight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {property.name}
                  </h3>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      activeTab === "gangtok"
                        ? "bg-amber-400/15 text-amber-500 border-amber-400/30"
                        : "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                    }`}
                  >
                    {activeTab === "gangtok" ? "Gangtok, Sikkim" : "AIIMS Kalyani"}
                  </span>
                </div>

                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  title="View Google Maps Location"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{property.address}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* TripAdvisor & Google Ratings Pill Bar (Like Reference UI) */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* TripAdvisor Rating */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                  isNight
                    ? "bg-slate-900/90 border-slate-800 text-slate-200"
                    : "bg-white border-slate-200 text-slate-800 shadow-xs"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">
                  ●
                </div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <span>●●●●◐</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {property.reviewCount * 2}+ reviews
                </span>
              </div>

              {/* Google Verified Reviews */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                  isNight
                    ? "bg-slate-900/90 border-slate-800 text-slate-200"
                    : "bg-white border-slate-200 text-slate-800 shadow-xs"
                }`}
              >
                <span className="font-bold text-xs tracking-tight">
                  <span className="text-blue-500">G</span>
                  <span className="text-rose-500">o</span>
                  <span className="text-amber-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-emerald-500">l</span>
                  <span className="text-rose-500">e</span>
                </span>
                <span className="text-amber-400 font-mono font-bold">
                  {property.rating} ★
                </span>
                <span className="text-[11px] text-slate-400">
                  {property.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>

          {/* 5-PHOTO MOSAIC GALLERY: EXACT LEMON TREE DESIGN */}
          {/* 1 Large Hero on Left + 2x2 Grid on Right */}
          {(() => {
            const defaultSet = HOTEL_SHOWCASE_PHOTOS[activeTab];
            // Combine any user uploaded photos with the default set
            const activeGallery = [
              ...currentPhotos.map((p) => ({
                id: p.id,
                url: p.url,
                title: p.title,
                category: p.caption || "Guest Photo"
              })),
              ...defaultSet
            ];

            const photo0 = activeGallery[0] || defaultSet[0];
            const photo1 = activeGallery[1] || defaultSet[1];
            const photo2 = activeGallery[2] || defaultSet[2];
            const photo3 = activeGallery[3] || defaultSet[3];
            const photo4 = activeGallery[4] || defaultSet[4];

            return (
              <div className="mt-5 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3">
                  {/* Left Big Hero Photo (span 7) */}
                  <div
                    onClick={() =>
                      openLightbox({
                        id: photo0.id,
                        url: photo0.url,
                        title: photo0.title,
                        caption: photo0.category,
                        addedAt: Date.now()
                      })
                    }
                    className="lg:col-span-7 h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-900 border border-slate-700/60 shadow-lg"
                  >
                    <img
                      src={photo0.url}
                      alt={photo0.title}
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Subtle caption bottom */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-4">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                        {photo0.category}
                      </span>
                      <h4 className="text-white font-serif font-bold text-sm sm:text-base mt-1 line-clamp-1 drop-shadow-md">
                        {photo0.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right 2x2 Grid (span 5) */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3 h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px]">
                    {/* Top Left (photo1) */}
                    <div
                      onClick={() =>
                        openLightbox({
                          id: photo1.id,
                          url: photo1.url,
                          title: photo1.title,
                          caption: photo1.category,
                          addedAt: Date.now()
                        })
                      }
                      className="rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-900 border border-slate-700/60 shadow-md"
                    >
                      <img
                        src={photo1.url}
                        alt={photo1.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-slate-200 line-clamp-1">
                          {photo1.category}
                        </span>
                      </div>
                    </div>

                    {/* Top Right (photo2) */}
                    <div
                      onClick={() =>
                        openLightbox({
                          id: photo2.id,
                          url: photo2.url,
                          title: photo2.title,
                          caption: photo2.category,
                          addedAt: Date.now()
                        })
                      }
                      className="rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-900 border border-slate-700/60 shadow-md"
                    >
                      <img
                        src={photo2.url}
                        alt={photo2.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-slate-200 line-clamp-1">
                          {photo2.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Left (photo3) */}
                    <div
                      onClick={() =>
                        openLightbox({
                          id: photo3.id,
                          url: photo3.url,
                          title: photo3.title,
                          caption: photo3.category,
                          addedAt: Date.now()
                        })
                      }
                      className="rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-900 border border-slate-700/60 shadow-md"
                    >
                      <img
                        src={photo3.url}
                        alt={photo3.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-slate-200 line-clamp-1">
                          {photo3.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Right (photo4) with "Show all photos" Button */}
                    <div
                      onClick={() =>
                        openLightbox({
                          id: photo4.id,
                          url: photo4.url,
                          title: photo4.title,
                          caption: photo4.category,
                          addedAt: Date.now()
                        })
                      }
                      className="rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-900 border border-slate-700/60 shadow-md"
                    >
                      <img
                        src={photo4.url}
                        alt={photo4.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors" />

                      {/* "Show all photos" Pill Button (Exact Lemon Tree Style in bottom right) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox({
                            id: photo0.id,
                            url: photo0.url,
                            title: photo0.title,
                            caption: photo0.category,
                            addedAt: Date.now()
                          });
                        }}
                        className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-3 py-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md border border-white/25 shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                      >
                        <GridIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Show all photos</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
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

