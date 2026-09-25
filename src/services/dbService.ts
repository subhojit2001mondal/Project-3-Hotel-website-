import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  Unsubscribe
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { compressImageFile } from '../utils/photoStorage';

export type GalleryId = 'rooms/view-room' | 'rooms/non-view-room' | 'common/reception' | 'common/dining';

export interface GalleryPhoto {
  id: string;
  galleryId: GalleryId;
  url: string;
  title: string;
  caption?: string;
  storagePath?: string;
  uploadedAt: string;
  timestamp: number;
}

export const GALLERY_PLACEHOLDERS: Record<
  GalleryId,
  {
    name: string;
    sectionTitle: string;
    badge: string;
    description: string;
    placeholderUrl: string;
    additionalPlaceholders: string[];
  }
> = {
  'rooms/view-room': {
    name: 'View Room (Deluxe)',
    sectionTitle: 'View Room (Deluxe) Gallery',
    badge: 'Hillside & Valley View',
    description:
      'Window faces the hillside, offering direct views of the Kanchenjunga range and verdant valley mist.',
    placeholderUrl:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    additionalPlaceholders: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  'rooms/non-view-room': {
    name: 'Non-View Room (Regular)',
    sectionTitle: 'Non-View Room (Regular) Gallery',
    badge: 'Standard Window',
    description:
      'Standard window without hillside view, peaceful mountain room with wooden aesthetics.',
    placeholderUrl:
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    additionalPlaceholders: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  'common/reception': {
    name: 'Reception Area',
    sectionTitle: 'Reception & Check-in Lobby',
    badge: 'Common Area',
    description:
      'Warm welcoming check-in desk, marble staircase, cozy leather seating lounge, and dedicated travel permit desk for Nathula Pass & North Sikkim.',
    placeholderUrl:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    additionalPlaceholders: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  'common/dining': {
    name: 'Dining Area',
    sectionTitle: 'In-House Dining & Restaurant',
    badge: 'Common Area',
    description:
      'Authentic in-house Sikkimese organic specialty dining along with comforting North & South Indian meals, mountain tea, and breakfast spread.',
    placeholderUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    additionalPlaceholders: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ]
  }
};

export interface DatabasePhoto {
  id: string;
  propertyId: 'gangtok' | 'kalyani';
  url: string;
  title: string;
  caption?: string;
  tag?: string;
  addedAt: number;
  addedBy?: string;
}

export interface BookingRecord {
  id: string;
  bookingRef: string;
  propertyId: 'gangtok' | 'kalyani';
  propertyName: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  childrenCount: number;
  purpose: 'leisure' | 'medical' | 'corporate';
  specialNeeds: string;
  selectedAddOns: { id: string; name: string; price: number }[];
  baseTariff: number;
  addOnsTotal: number;
  subTotal: number;
  gst: number;
  grandTotal: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'pay_at_hotel';
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  createdAt: string;
  createdTimestamp?: number;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyId?: 'gangtok' | 'kalyani' | 'general';
  subject: string;
  message: string;
  source: 'website_inquiry' | 'newsletter' | 'frontdesk';
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

const PHOTOS_COLLECTION = 'photos';
const BOOKINGS_COLLECTION = 'bookings';
const INQUIRIES_COLLECTION = 'customerInquiries';

// -------------------------------------------------------------
// PHOTOS DATABASE REPOSITORY
// -------------------------------------------------------------

/**
 * Save photo to Firestore
 */
export async function savePhotoToDb(photo: DatabasePhoto): Promise<void> {
  const photoRef = doc(db, PHOTOS_COLLECTION, photo.id);
  await setDoc(photoRef, {
    ...photo,
    updatedAt: Date.now()
  });
}

/**
 * Save multiple photos in batch / parallel
 */
export async function savePhotosToDb(photos: DatabasePhoto[]): Promise<void> {
  await Promise.all(photos.map((p) => savePhotoToDb(p)));
}

/**
 * Fetch photos from Firestore for a given property
 */
export async function getPhotosFromDb(propertyId: 'gangtok' | 'kalyani'): Promise<DatabasePhoto[]> {
  try {
    const q = query(
      collection(db, PHOTOS_COLLECTION),
      where('propertyId', '==', propertyId)
    );
    const snap = await getDocs(q);
    const results: DatabasePhoto[] = [];
    snap.forEach((d) => {
      const data = d.data() as DatabasePhoto;
      results.push({ ...data, id: d.id });
    });
    // Sort descending by addedAt
    return results.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
  } catch (error) {
    console.error('Error fetching photos from database:', error);
    return [];
  }
}

/**
 * Subscribe to realtime photo changes for a property
 */
export function subscribeToPhotos(
  propertyId: 'gangtok' | 'kalyani',
  callback: (photos: DatabasePhoto[]) => void
): Unsubscribe {
  const q = query(
    collection(db, PHOTOS_COLLECTION),
    where('propertyId', '==', propertyId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const photos: DatabasePhoto[] = [];
      snapshot.forEach((d) => {
        photos.push({ ...(d.data() as DatabasePhoto), id: d.id });
      });
      photos.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
      callback(photos);
    },
    (err) => {
      console.warn('Realtime photos error (fallback available):', err);
    }
  );
}

/**
 * Delete a photo from Firestore
 */
export async function deletePhotoFromDb(photoId: string): Promise<void> {
  const photoRef = doc(db, PHOTOS_COLLECTION, photoId);
  await deleteDoc(photoRef);
}

// -------------------------------------------------------------
// CUSTOMER BOOKINGS & RECORDS REPOSITORY
// -------------------------------------------------------------

/**
 * Create / Save a new customer booking record
 */
export async function saveBookingToDb(
  bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>
): Promise<BookingRecord> {
  const newBookingId = bookingData.bookingRef || 'PJ-' + Date.now().toString(36).toUpperCase();
  const docRef = doc(db, BOOKINGS_COLLECTION, newBookingId);

  const fullRecord: BookingRecord = {
    ...bookingData,
    id: newBookingId,
    bookingRef: newBookingId,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    createdTimestamp: Date.now()
  };

  await setDoc(docRef, fullRecord);
  return fullRecord;
}

/**
 * Fetch all customer bookings
 */
export async function getAllBookingsFromDb(): Promise<BookingRecord[]> {
  try {
    const snap = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const results: BookingRecord[] = [];
    snap.forEach((d) => {
      results.push({ ...(d.data() as BookingRecord), id: d.id });
    });
    return results.sort((a, b) => (b.createdTimestamp || 0) - (a.createdTimestamp || 0));
  } catch (error) {
    console.error('Error fetching bookings from database:', error);
    return [];
  }
}

/**
 * Subscribe to realtime bookings
 */
export function subscribeToBookings(
  callback: (bookings: BookingRecord[]) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, BOOKINGS_COLLECTION),
    (snapshot) => {
      const records: BookingRecord[] = [];
      snapshot.forEach((d) => {
        records.push({ ...(d.data() as BookingRecord), id: d.id });
      });
      records.sort((a, b) => (b.createdTimestamp || 0) - (a.createdTimestamp || 0));
      callback(records);
    },
    (err) => {
      console.warn('Realtime bookings listener notice:', err);
    }
  );
}

/**
 * Search or find booking by reference number or guest phone
 */
export async function findBookingByRefOrPhone(searchQuery: string): Promise<BookingRecord[]> {
  const clean = searchQuery.trim().toLowerCase();
  const all = await getAllBookingsFromDb();
  return all.filter(
    (b) =>
      b.bookingRef.toLowerCase().includes(clean) ||
      b.guestPhone.replace(/\D/g, '').includes(clean.replace(/\D/g, '')) ||
      b.guestName.toLowerCase().includes(clean)
  );
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingRecord['status']
): Promise<void> {
  const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
  await setDoc(docRef, { status: newStatus }, { merge: true });
}

// -------------------------------------------------------------
// CUSTOMER INQUIRIES & DIRECT INPUT REPOSITORY
// -------------------------------------------------------------

/**
 * Save customer inquiry or direct feedback
 */
export async function saveCustomerInquiryToDb(
  inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>
): Promise<CustomerInquiry> {
  const id = 'INQ-' + Date.now().toString(36).toUpperCase();
  const docRef = doc(db, INQUIRIES_COLLECTION, id);

  const fullInquiry: CustomerInquiry = {
    ...inquiry,
    id,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  await setDoc(docRef, fullInquiry);
  return fullInquiry;
}

/**
 * Fetch customer inquiries
 */
export async function getCustomerInquiriesFromDb(): Promise<CustomerInquiry[]> {
  try {
    const snap = await getDocs(collection(db, INQUIRIES_COLLECTION));
    const results: CustomerInquiry[] = [];
    snap.forEach((d) => {
      results.push({ ...(d.data() as CustomerInquiry), id: d.id });
    });
    return results.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  } catch (error) {
    console.error('Error fetching inquiries from database:', error);
    return [];
  }
}

// -------------------------------------------------------------
// PERMANENT ROOM & COMMON-AREA GALLERY REPOSITORY
// -------------------------------------------------------------

const GALLERY_COLLECTION = 'galleryPhotos';

/**
 * Uploads a photo to Cloud Storage and saves document to Firestore
 */
export async function uploadGalleryPhoto(
  galleryId: GalleryId,
  file: File,
  customTitle?: string,
  caption?: string
): Promise<GalleryPhoto> {
  const docId = `gp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  let finalUrl = '';
  let storagePath: string | undefined = undefined;

  // 1. Attempt Cloud Storage upload
  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    storagePath = `${galleryId}/${Date.now()}_${cleanName}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    finalUrl = await getDownloadURL(storageRef);
  } catch (storageErr) {
    console.warn('Cloud Storage direct upload notice (using optimized fallback):', storageErr);
  }

  // 2. If storage upload didn't return URL, compress to compact data URL
  if (!finalUrl) {
    finalUrl = await compressImageFile(file, 1280, 0.78);
  }

  const cleanTitle = customTitle?.trim() || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

  const photoRecord: GalleryPhoto = {
    id: docId,
    galleryId,
    url: finalUrl,
    title: cleanTitle || GALLERY_PLACEHOLDERS[galleryId].name,
    caption: caption || GALLERY_PLACEHOLDERS[galleryId].description,
    storagePath,
    uploadedAt: new Date().toISOString(),
    timestamp: Date.now()
  };

  // 3. Save to Firestore
  const docRef = doc(db, GALLERY_COLLECTION, docId);
  await setDoc(docRef, photoRecord);

  return photoRecord;
}

/**
 * Save photo via direct web URL
 */
export async function saveGalleryPhotoUrl(
  galleryId: GalleryId,
  url: string,
  title?: string,
  caption?: string
): Promise<GalleryPhoto> {
  const docId = `gp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const photoRecord: GalleryPhoto = {
    id: docId,
    galleryId,
    url: url.trim(),
    title: title?.trim() || `${GALLERY_PLACEHOLDERS[galleryId].name} Photo`,
    caption: caption || GALLERY_PLACEHOLDERS[galleryId].description,
    uploadedAt: new Date().toISOString(),
    timestamp: Date.now()
  };

  const docRef = doc(db, GALLERY_COLLECTION, docId);
  await setDoc(docRef, photoRecord);
  return photoRecord;
}

/**
 * Fetch all gallery photos from Firestore
 */
export async function getAllGalleryPhotosFromDb(): Promise<Record<GalleryId, GalleryPhoto[]>> {
  const result: Record<GalleryId, GalleryPhoto[]> = {
    'rooms/view-room': [],
    'rooms/non-view-room': [],
    'common/reception': [],
    'common/dining': []
  };

  try {
    const snap = await getDocs(collection(db, GALLERY_COLLECTION));
    snap.forEach((d) => {
      const data = d.data() as GalleryPhoto;
      if (result[data.galleryId]) {
        result[data.galleryId].push({ ...data, id: d.id });
      }
    });

    // Sort descending by timestamp
    for (const key of Object.keys(result) as GalleryId[]) {
      result[key].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }
  } catch (err) {
    console.warn('Error fetching gallery photos from Firestore:', err);
  }

  return result;
}

/**
 * Real-time subscription to all gallery photos
 */
export function subscribeToGalleryPhotos(
  callback: (photos: Record<GalleryId, GalleryPhoto[]>) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, GALLERY_COLLECTION),
    (snapshot) => {
      const result: Record<GalleryId, GalleryPhoto[]> = {
        'rooms/view-room': [],
        'rooms/non-view-room': [],
        'common/reception': [],
        'common/dining': []
      };

      snapshot.forEach((d) => {
        const data = d.data() as GalleryPhoto;
        if (result[data.galleryId]) {
          result[data.galleryId].push({ ...data, id: d.id });
        }
      });

      for (const key of Object.keys(result) as GalleryId[]) {
        result[key].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      }

      callback(result);
    },
    (err) => {
      console.warn('Gallery photos subscription notice:', err);
    }
  );
}

/**
 * Delete photo from Firestore & Storage
 */
export async function deleteGalleryPhotoFromDb(photo: GalleryPhoto): Promise<void> {
  // 1. Delete Firestore doc
  const docRef = doc(db, GALLERY_COLLECTION, photo.id);
  await deleteDoc(docRef);

  // 2. Delete from Cloud Storage if path exists
  if (photo.storagePath) {
    try {
      const storageRef = ref(storage, photo.storagePath);
      await deleteObject(storageRef);
    } catch (e) {
      console.warn('Storage delete notice:', e);
    }
  }
}

