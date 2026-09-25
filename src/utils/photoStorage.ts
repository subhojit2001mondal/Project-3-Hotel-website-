/**
 * Persistent high-capacity photo storage utility using IndexedDB + Canvas compression.
 * Avoids localStorage 5MB quota errors when uploading high-resolution phone/camera photos.
 */

const DB_NAME = 'parijai_hospitality_db';
const DB_VERSION = 2;
const STORE_GANGTOK = 'gangtok_photos';
const STORE_KALYANI = 'kalyani_photos';

export interface StoredPhoto {
  id: string;
  url: string;
  title: string;
  caption?: string;
  tag?: string;
  addedAt: number;
}

function getStoreName(property: 'gangtok' | 'kalyani' = 'gangtok'): string {
  return property === 'kalyani' ? STORE_KALYANI : STORE_GANGTOK;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_GANGTOK)) {
        db.createObjectStore(STORE_GANGTOK, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_KALYANI)) {
        db.createObjectStore(STORE_KALYANI, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getStoredPhotos(property: 'gangtok' | 'kalyani' = 'gangtok'): Promise<StoredPhoto[]> {
  try {
    const db = await openDB();
    const storeName = getStoreName(property);
    return new Promise((resolve) => {
      if (!db.objectStoreNames.contains(storeName)) {
        resolve([]);
        return;
      }
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => {
        const result = (req.result as StoredPhoto[]) || [];
        // Sort by newest added first
        result.sort((a, b) => b.addedAt - a.addedAt);
        resolve(result);
      };
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.warn('IndexedDB not available, returning empty list', err);
    return [];
  }
}

export async function savePhotosToStorage(
  photos: StoredPhoto[],
  property: 'gangtok' | 'kalyani' = 'gangtok'
): Promise<void> {
  try {
    const db = await openDB();
    const storeName = getStoreName(property);
    return new Promise((resolve) => {
      if (!db.objectStoreNames.contains(storeName)) {
        resolve();
        return;
      }
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      photos.forEach((photo) => store.put(photo));
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Failed to save photos to IndexedDB', err);
  }
}

export async function deletePhotoFromStorage(
  id: string,
  property: 'gangtok' | 'kalyani' = 'gangtok'
): Promise<void> {
  try {
    const db = await openDB();
    const storeName = getStoreName(property);
    return new Promise((resolve) => {
      if (!db.objectStoreNames.contains(storeName)) {
        resolve();
        return;
      }
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Failed to delete photo from IndexedDB', err);
  }
}

export async function clearBrokenPhotosFromStorage(
  property: 'gangtok' | 'kalyani' = 'gangtok'
): Promise<void> {
  try {
    const db = await openDB();
    const storeName = getStoreName(property);
    return new Promise((resolve) => {
      if (!db.objectStoreNames.contains(storeName)) {
        resolve();
        return;
      }
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => {
        const items = (req.result as StoredPhoto[]) || [];
        items.forEach((item) => {
          if (
            !item.url ||
            (!item.url.startsWith('data:') &&
              !item.url.startsWith('http://') &&
              !item.url.startsWith('https://') &&
              !item.url.startsWith('blob:'))
          ) {
            store.delete(item.id);
          }
        });
        resolve();
      };
      req.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Failed to clear broken photos', err);
  }
}

export async function clearAllPhotosFromStorage(
  property: 'gangtok' | 'kalyani' = 'gangtok'
): Promise<void> {
  try {
    const db = await openDB();
    const storeName = getStoreName(property);
    return new Promise((resolve) => {
      if (!db.objectStoreNames.contains(storeName)) {
        resolve();
        return;
      }
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Failed to clear all photos from IndexedDB', err);
  }
}

/**
 * Resizes and compresses an image file to max 1600px width/height and JPEG 0.85.
 * Shrinks 10-15MB camera photos to ~250KB while retaining crisp retina quality.
 */
export function compressImageFile(file: File, maxDim = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}
