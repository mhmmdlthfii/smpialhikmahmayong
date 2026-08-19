import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MediaAsset, MediaCategory } from '../../types';
import {
  X,
  Upload,
  Search,
  Check,
  Image as ImageIcon,
  FolderOpen,
  Plus,
  Sparkles,
  Link as LinkIcon,
  Filter,
  CheckCircle2,
  FileImage,
  Info
} from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedUrl: string, asset?: MediaAsset) => void;
  title?: string;
  defaultCategory?: MediaCategory;
  recommendedAspect?: string; // e.g. "1343 x 342 px (Persegi Panjang)" or "16:9"
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Pilih Gambar dari Drive Situs',
  defaultCategory,
  recommendedAspect
}) => {
  const { mediaAssets, uploadMediaFile, addMediaAsset } = useApp();

  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Upload Tab States
  const [uploadCategory, setUploadCategory] = useState<MediaCategory>(defaultCategory || 'umum');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // URL Tab States
  const [manualUrl, setManualUrl] = useState<string>('');
  const [manualTitle, setManualTitle] = useState<string>('');
  const [saveToLibrary, setSaveToLibrary] = useState<boolean>(true);

  if (!isOpen) return null;

  // Filtered Assets
  const filteredAssets = mediaAssets.filter((asset) => {
    const matchCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.tags && asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCategory && matchSearch;
  });

  const selectedAsset = mediaAssets.find((a) => a.id === selectedAssetId);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        throw new Error('Hanya file gambar (JPG, PNG, WebP, SVG, GIF) yang diperbolehkan');
      }

      const uploaded = await uploadMediaFile(file, uploadCategory, customTitle || undefined);
      setSelectedAssetId(uploaded.id);
      setActiveTab('library');
      setCustomTitle('');
    } catch (err: any) {
      setUploadError(err.message || 'Gagal mengunggah gambar');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;

    if (saveToLibrary) {
      const newAsset = addMediaAsset({
        title: manualTitle.trim() || 'Aset Gambar dari Link',
        fileName: 'external-image.jpg',
        fileSize: 'Link Eksternal',
        mimeType: 'image/jpeg',
        category: uploadCategory,
        url: manualUrl.trim(),
        altText: manualTitle.trim() || 'Gambar SMP Islam Al Hikmah',
        tags: [uploadCategory]
      });
      onSelect(newAsset.url, newAsset);
    } else {
      onSelect(manualUrl.trim());
    }
    onClose();
  };

  const handleConfirmSelect = () => {
    if (selectedAsset) {
      onSelect(selectedAsset.url, selectedAsset);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600/10 text-teal-700 flex items-center justify-center border border-teal-200/60 shadow-xs">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>{title}</span>
                {recommendedAspect && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    Rasio: {recommendedAspect}
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Pilih atau unggah aset gambar langsung dari ruang penyimpanan internal situs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center justify-between px-6 border-b border-slate-200/80 bg-white">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'border-teal-600 text-teal-800 bg-teal-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileImage className="w-4 h-4" />
              <span>Media Library ({mediaAssets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-teal-600 text-teal-800 bg-teal-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Unggah File Baru</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'border-teal-600 text-teal-800 bg-teal-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>Dari Link URL</span>
            </button>
          </div>

          {activeTab === 'library' && (
            <div className="hidden sm:flex items-center gap-2 py-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama gambar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-44"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="all">Semua Kategori</option>
                <option value="banner">Banner & Header</option>
                <option value="logo">Logo & Identitas</option>
                <option value="berita">Berita & Informasi</option>
                <option value="galeri">Galeri Dokumentasi</option>
                <option value="prestasi">Prestasi</option>
                <option value="guru">Guru & Staf</option>
                <option value="umum">Umum</option>
              </select>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[360px]">
          
          {/* TAB 1: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              
              {/* Mobile Filter Bar */}
              <div className="flex sm:hidden flex-col gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari gambar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="banner">Banner & Header</option>
                  <option value="logo">Logo & Identitas</option>
                  <option value="berita">Berita & Informasi</option>
                  <option value="galeri">Galeri Dokumentasi</option>
                  <option value="prestasi">Prestasi</option>
                  <option value="guru">Guru & Staf</option>
                  <option value="umum">Umum</option>
                </select>
              </div>

              {filteredAssets.length === 0 ? (
                <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-700">Belum ada gambar yang sesuai</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Coba ubah kata kunci pencarian atau unggah file baru dari tab "Unggah File Baru".
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="mt-4 px-4 py-2 text-xs font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 rounded-xl transition-colors inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Gambar Sekarang</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {filteredAssets.map((asset) => {
                    const isSelected = selectedAssetId === asset.id;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        onDoubleClick={() => {
                          setSelectedAssetId(asset.id);
                          onSelect(asset.url, asset);
                          onClose();
                        }}
                        className={`group relative rounded-2xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col bg-white shadow-xs hover:shadow-md ${
                          isSelected
                            ? 'border-teal-600 ring-4 ring-teal-500/20 shadow-md'
                            : 'border-slate-200/80 hover:border-teal-300'
                        }`}
                      >
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video sm:aspect-4/3 w-full bg-slate-100 overflow-hidden flex items-center justify-center p-1">
                          <img
                            src={asset.url}
                            alt={asset.altText || asset.title}
                            className="w-full h-full object-cover rounded-xl transition-transform duration-200 group-hover:scale-105"
                            loading="lazy"
                          />
                          
                          {/* Selection Check Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-teal-600 text-white p-1 rounded-full shadow-md animate-in zoom-in-75 duration-150">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}

                          {/* Category Tag */}
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-black/60 text-white backdrop-blur-xs">
                            {asset.category}
                          </span>
                        </div>

                        {/* Metadata */}
                        <div className="p-2.5 bg-white flex-1 flex flex-col justify-between">
                          <p className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-teal-700 transition-colors">
                            {asset.title}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                            <span>{asset.dimensions || 'Image'}</span>
                            <span>{asset.fileSize}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Selected Item Info Bar */}
              {selectedAsset && (
                <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedAsset.url}
                      alt={selectedAsset.title}
                      className="w-12 h-12 rounded-xl object-cover border border-teal-300 bg-white"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-teal-950 line-clamp-1">{selectedAsset.title}</p>
                      <p className="text-[11px] text-teal-700 font-medium">
                        {selectedAsset.dimensions} • {selectedAsset.fileSize} • Kategori: {selectedAsset.category}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmSelect}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-teal-700 hover:bg-teal-800 shadow-md shadow-teal-900/15 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Gunakan Gambar Ini</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: UPLOAD BARU */}
          {activeTab === 'upload' && (
            <div className="max-w-xl mx-auto space-y-5 py-2">
              
              {/* Drag & Drop Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/30 hover:bg-teal-50/60 rounded-3xl text-center cursor-pointer transition-all duration-200 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-3xl bg-teal-600/10 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-all duration-200 shadow-xs">
                  <Upload className="w-8 h-8" />
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Pilih file gambar dari komputer Anda
                </h3>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  Format didukung: JPG, PNG, WebP, SVG, GIF. Gambar akan otomatis tersimpan permanen di database Drive situs Anda.
                </p>

                <button
                  type="button"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 shadow-md transition-all inline-flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sedang Memproses & Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Pilih File Gambar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Upload Metadata Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kategori Gambar
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as MediaCategory)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="banner">Banner & Header (1343x342 / Hero)</option>
                    <option value="logo">Logo & Identitas Sekolah</option>
                    <option value="berita">Berita & Informasi</option>
                    <option value="galeri">Galeri Dokumentasi</option>
                    <option value="prestasi">Prestasi Siswa / Guru</option>
                    <option value="guru">Dewan Pengajar / Staf</option>
                    <option value="umum">Aset Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Judul Gambar (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Banner Header 2026"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {uploadError}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: INPUT LINK URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleManualUrlSubmit} className="max-w-lg mx-auto space-y-4 py-4">
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200/70 text-xs text-teal-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p>
                  Anda juga dapat memasukkan tautan URL gambar eksternal (misalnya dari Unsplash atau Cloud Storage). Gambar akan otomatis terindeks ke dalam Drive Situs.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tautan URL Gambar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Judul Gambar
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Foto Siswa Berprestasi"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              {manualUrl && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <p className="text-[11px] font-bold text-slate-500 mb-2">Pratinjau Gambar:</p>
                  <img
                    src={manualUrl}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-xl object-contain shadow-xs"
                    onError={(e) => {
                      (e.target as HTMLImageElement).alt = 'Gagal memuat URL gambar';
                    }}
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="saveToLib"
                  checked={saveToLibrary}
                  onChange={(e) => setSaveToLibrary(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="saveToLib" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Simpan juga ke Drive Situs agar bisa digunakan lagi nanti
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white bg-teal-700 hover:bg-teal-800 shadow-md transition-all"
                >
                  Gunakan URL Ini
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/60">
          <div className="text-xs text-slate-500 font-medium">
            {activeTab === 'library' && (
              <span>
                {selectedAsset ? `1 gambar terpilih (${selectedAsset.dimensions || selectedAsset.fileSize})` : 'Klik gambar untuk memilih'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Batal
            </button>

            {activeTab === 'library' && (
              <button
                onClick={handleConfirmSelect}
                disabled={!selectedAsset}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  selectedAsset
                    ? 'text-white bg-teal-700 hover:bg-teal-800 shadow-md shadow-teal-900/15 cursor-pointer'
                    : 'text-slate-400 bg-slate-200 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Pilih Gambar</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
