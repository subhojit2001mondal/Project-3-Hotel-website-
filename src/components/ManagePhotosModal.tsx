import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Upload,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Link as LinkIcon,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  GalleryId,
  GalleryPhoto,
  GALLERY_PLACEHOLDERS,
  uploadGalleryPhoto,
  saveGalleryPhotoUrl,
  deleteGalleryPhotoFromDb
} from '../services/dbService';

interface ManagePhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryPhotos: Record<GalleryId, GalleryPhoto[]>;
  initialGallery?: GalleryId;
}

const DEFAULT_PASSCODE = 'parijai';

export const ManagePhotosModal: React.FC<ManagePhotosModalProps> = ({
  isOpen,
  onClose,
  galleryPhotos,
  initialGallery = 'rooms/view-room'
}) => {
  const { isNight } = useTheme();

  // Passcode gate state
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Active gallery selection
  const [activeGallery, setActiveGallery] = useState<GalleryId>(initialGallery);

  // Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Direct URL state
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  // Lightbox preview
  const [previewPhoto, setPreviewPhoto] = useState<GalleryPhoto | null>(null);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === DEFAULT_PASSCODE) {
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus(`Uploading ${files.length} photo${files.length > 1 ? 's' : ''} to Cloud Storage & Firestore...`);
    setErrorStatus(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadGalleryPhoto(activeGallery, file);
      }
      setUploadStatus(`Successfully stored ${files.length} photo${files.length > 1 ? 's' : ''} in cloud database!`);
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorStatus(err.message || 'Error saving photo to cloud storage.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setIsUploading(true);
    setUploadStatus('Saving photo URL to Firestore...');
    try {
      await saveGalleryPhotoUrl(activeGallery, imageUrl.trim(), imageTitle.trim());
      setImageUrl('');
      setImageTitle('');
      setShowUrlInput(false);
      setUploadStatus('Photo successfully saved to cloud database!');
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err: any) {
      setErrorStatus(err.message || 'Error saving photo URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    if (confirm(`Remove this photo from ${GALLERY_PLACEHOLDERS[activeGallery].name}?`)) {
      try {
        await deleteGalleryPhotoFromDb(photo);
        if (previewPhoto?.id === photo.id) setPreviewPhoto(null);
      } catch (err: any) {
        alert('Failed to delete photo: ' + err.message);
      }
    }
  };

  const currentGalleryPhotos = galleryPhotos[activeGallery] || [];
  const galleryConfig = GALLERY_PLACEHOLDERS[activeGallery];

  const galleryTabs: { id: GalleryId; label: string; badge: string }[] = [
    { id: 'rooms/view-room', label: 'View Room (Deluxe)', badge: 'Hillside View' },
    { id: 'rooms/non-view-room', label: 'Non-View Room (Regular)', badge: 'Standard Window' },
    { id: 'common/reception', label: 'Reception Area', badge: 'Common Space' },
    { id: 'common/dining', label: 'Dining Area', badge: 'Common Space' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className={`border rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] transition-colors duration-200 ${
          isNight ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Top Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isNight ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center shadow">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-serif font-bold ${isNight ? 'text-white' : 'text-slate-950'}`}>
                  Manage Permanent Photos
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Owner Admin
                </span>
              </div>
              <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Trikuta Residency rooms & common areas (Permanent Cloud Storage & Firestore)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isNight ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PASSCODE GATE: If not yet unlocked */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-500 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h4 className={`text-xl font-serif font-bold ${isNight ? 'text-white' : 'text-slate-950'}`}>
                Owner Access Verification
              </h4>
              <p className={`text-xs mt-1.5 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                This section controls persistent photos seen by all website visitors. Please enter the passcode to upload or manage photos.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  placeholder="Enter passcode (Default: parijai)"
                  autoFocus
                  className={`w-full px-4 py-2.5 rounded-xl text-center text-sm font-mono tracking-widest border focus:outline-none transition-colors ${
                    isNight
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-400'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
                {passcodeError && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect passcode. Default passcode is &quot;parijai&quot;.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Photo Manager</span>
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400">
              Passcode hint: <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">parijai</code>
            </div>
          </div>
        ) : (
          /* UNLOCKED: PHOTO MANAGER */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Gallery Tabs (The 4 designated galleries) */}
            <div
              className={`px-4 sm:px-6 border-b flex gap-2 overflow-x-auto text-xs font-semibold ${
                isNight ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100/70 border-slate-200'
              }`}
            >
              {galleryTabs.map((tab) => {
                const count = (galleryPhotos[tab.id] || []).length;
                const isActive = activeGallery === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveGallery(tab.id);
                      setShowUrlInput(false);
                    }}
                    className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'border-amber-400 text-amber-500'
                        : isNight
                        ? 'border-transparent text-slate-400 hover:text-slate-200'
                        : 'border-transparent text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        count > 0
                          ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                          : 'bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      {count > 0 ? `${count} photo${count > 1 ? 's' : ''}` : 'Placeholder'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Gallery Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* Header Box for Active Gallery */}
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isNight ? 'bg-slate-950/70 border-slate-800' : 'bg-amber-50/60 border-amber-200/80'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-base text-amber-500">
                      {galleryConfig.sectionTitle}
                    </h4>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-400">
                      {galleryConfig.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {galleryConfig.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px]">
                    <span className="text-slate-400">Target path:</span>
                    <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-slate-800">
                      {activeGallery}
                    </code>
                    {currentGalleryPhotos.length > 0 ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{currentGalleryPhotos.length} real photo(s) active on site</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Showing Unsplash placeholder until real photo is uploaded</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Upload Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo(s)</span>
                  </button>

                  <button
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className={`px-3 py-2 border rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors ${
                      isNight
                        ? 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Web URL</span>
                  </button>
                </div>
              </div>

              {/* Status alerts */}
              {isUploading && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{uploadStatus || 'Uploading to Cloud Storage & Firestore...'}</span>
                </div>
              )}

              {uploadStatus && !isUploading && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{uploadStatus}</span>
                </div>
              )}

              {errorStatus && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>{errorStatus}</span>
                </div>
              )}

              {/* Web Link Modal/Input */}
              {showUrlInput && (
                <form
                  onSubmit={handleAddUrl}
                  className={`p-4 rounded-xl border space-y-3 ${
                    isNight ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-400">Save Photo via Direct URL</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/photo.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className={`px-3 py-2 text-xs rounded-lg border outline-none ${
                        isNight
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Photo title (optional)"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      className={`px-3 py-2 text-xs rounded-lg border outline-none ${
                        isNight
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300"
                    >
                      Save to Database
                    </button>
                  </div>
                </form>
              )}

              {/* Photos Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
                    {currentGalleryPhotos.length > 0
                      ? `Real Photos Saved in Firestore (${currentGalleryPhotos.length})`
                      : 'Current Placeholder Preview'}
                  </h5>
                  {currentGalleryPhotos.length > 0 && (
                    <span className="text-[11px] text-emerald-400">
                      ✓ Permanently replaces placeholder for all visitors
                    </span>
                  )}
                </div>

                {currentGalleryPhotos.length === 0 ? (
                  /* Shows Placeholder with explanation */
                  <div
                    className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 ${
                      isNight ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="w-full sm:w-64 aspect-16/10 rounded-xl overflow-hidden border border-slate-700 relative group shrink-0">
                      <img
                        src={galleryConfig.placeholderUrl}
                        alt={galleryConfig.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 border border-amber-400/30">
                        Placeholder
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <h6 className="font-serif font-bold text-sm text-white">
                        No custom photos uploaded yet for this gallery
                      </h6>
                      <p className="text-slate-400">
                        The site is currently showing this high-quality Unsplash image so the gallery is never empty.
                        As soon as you upload one or more real photos of {galleryConfig.name}, they will automatically replace this placeholder permanently.
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-1 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Real Photos Now</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Shows Real Uploaded Photos in Grid */
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {currentGalleryPhotos.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className={`group relative rounded-xl overflow-hidden border transition-all ${
                          isNight ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                        }`}
                      >
                        <div className="aspect-16/10 overflow-hidden relative">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/90 text-white">
                            Photo #{idx + 1}
                          </span>
                        </div>

                        <div className="p-2.5 flex items-center justify-between text-xs">
                          <div className="truncate mr-2">
                            <span className="font-semibold block truncate text-[11px] text-white">
                              {photo.title}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(photo.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setPreviewPhoto(photo)}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(photo)}
                              className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 cursor-pointer"
                              title="Delete this photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Lightbox for Preview */}
        {previewPhoto && (
          <div
            className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPreviewPhoto(null)}
          >
            <div
              className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{previewPhoto.title}</span>
                <button
                  onClick={() => setPreviewPhoto(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={previewPhoto.url}
                  alt={previewPhoto.title}
                  className="max-h-[65vh] w-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
