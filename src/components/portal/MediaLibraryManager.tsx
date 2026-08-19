import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MediaAsset, MediaCategory } from '../../types';
import {
  FolderOpen,
  Upload,
  Search,
  Grid,
  List,
  Trash2,
  Edit2,
  Copy,
  Check,
  ExternalLink,
  Download,
  Eye,
  Plus,
  Filter,
  Image as ImageIcon,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  X,
  FileImage,
  Calendar,
  User,
  HardDrive
} from 'lucide-react';

export const MediaLibraryManager: React.FC = () => {
  const { mediaAssets, addMediaAsset, updateMediaAsset, deleteMediaAsset, uploadMediaFile } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Selected item for Inspection / Details View
  const [inspectedAssetId, setInspectedAssetId] = useState<string | null>(null);

  // Edit Metadata State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editCategory, setEditCategory] = useState<MediaCategory>('umum');
  const [editAltText, setEditAltText] = useState<string>('');

  // Upload States
  const [showUploadDropzone, setShowUploadDropzone] = useState<boolean>(false);
  const [uploadCategory, setUploadCategory] = useState<MediaCategory>('umum');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filtered Media Assets
  const filteredAssets = mediaAssets.filter((asset) => {
    const matchCat = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.tags && asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCat && matchSearch;
  });

  const inspectedAsset = mediaAssets.find((a) => a.id === inspectedAssetId) || null;

  // Handle Copy URL
  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Multi-file Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgressMsg(`Mengunggah 0/${files.length} gambar...`);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressMsg(`Mengunggah ${i + 1}/${files.length}: ${file.name}...`);
        await uploadMediaFile(file, uploadCategory);
      }
      setUploadProgressMsg('Semua gambar berhasil disimpan ke Drive Situs!');
      setTimeout(() => {
        setUploadProgressMsg(null);
        setShowUploadDropzone(false);
      }, 1500);
    } catch (err: any) {
      alert(`Gagal mengunggah file: ${err.message || 'Error'}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle Save Edited Metadata
  const handleSaveEdit = () => {
    if (!inspectedAsset) return;
    updateMediaAsset(inspectedAsset.id, {
      title: editTitle.trim() || inspectedAsset.title,
      category: editCategory,
      altText: editAltText.trim()
    });
    setIsEditing(false);
  };

  // Start Editing
  const startEditingAsset = (asset: MediaAsset) => {
    setEditTitle(asset.title);
    setEditCategory(asset.category);
    setEditAltText(asset.altText || '');
    setIsEditing(true);
  };

  // Category counts
  const categoryCounts = {
    all: mediaAssets.length,
    banner: mediaAssets.filter((a) => a.category === 'banner').length,
    logo: mediaAssets.filter((a) => a.category === 'logo').length,
    berita: mediaAssets.filter((a) => a.category === 'berita').length,
    galeri: mediaAssets.filter((a) => a.category === 'galeri').length,
    prestasi: mediaAssets.filter((a) => a.category === 'prestasi').length,
    guru: mediaAssets.filter((a) => a.category === 'guru').length,
    umum: mediaAssets.filter((a) => a.category === 'umum').length
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner & Storage Overview */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-bold border border-teal-400/20">
              <HardDrive className="w-3.5 h-3.5 text-teal-300" />
              <span>Media Library & Drive Situs (WordPress Style)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Pusat Penyimpanan Media & Aset Gambar
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
              Kelola dan simpan seluruh gambar sekolah di database situs sendiri. Anda dapat langsung mengunggah dari komputer atau memilih gambar yang sudah ada saat mengisi formulir Banner Header, Berita, Galeri, atau Slide tanpa perlu mengetik link URL manual.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setShowUploadDropzone((prev) => !prev);
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-950/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{showUploadDropzone ? 'Tutup Uploader' : 'Unggah Gambar Baru'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-[11px] text-teal-200 font-bold uppercase tracking-wider">Total Aset Media</p>
            <p className="text-xl font-black text-white mt-0.5">{mediaAssets.length} <span className="text-xs font-normal text-teal-200">File</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-[11px] text-teal-200 font-bold uppercase tracking-wider">Banner & Header</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">{categoryCounts.banner} <span className="text-xs font-normal text-teal-200">File</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-[11px] text-teal-200 font-bold uppercase tracking-wider">Berita & Galeri</p>
            <p className="text-xl font-black text-emerald-300 mt-0.5">{categoryCounts.berita + categoryCounts.galeri} <span className="text-xs font-normal text-teal-200">File</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-[11px] text-teal-200 font-bold uppercase tracking-wider">Penyimpanan</p>
            <p className="text-xl font-black text-white mt-0.5">Lokal Database</p>
          </div>
        </div>
      </div>

      {/* Upload Dropzone (Collapsible) */}
      {showUploadDropzone && (
        <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-teal-400/80 bg-teal-50/20 shadow-lg space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-teal-700" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Unggah File Gambar ke Drive Situs
              </h3>
            </div>
            <button
              onClick={() => setShowUploadDropzone(false)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 bg-white rounded-2xl border border-teal-200 hover:border-teal-500 hover:bg-teal-50/40 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group shadow-xs"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-teal-100 group-hover:bg-teal-700 text-teal-700 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Klik untuk memilih file atau seret file gambar ke sini
                </p>
                <p className="text-[11px] text-slate-500">
                  Mendukung JPG, PNG, WebP, SVG, GIF (Maksimal fleksibel, multi-file sekaligus)
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700">
                Tetapkan Kategori Default
              </label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as MediaCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="banner">Banner & Header (1343x342 / Hero)</option>
                <option value="logo">Logo & Identitas Sekolah</option>
                <option value="berita">Berita & Artikel</option>
                <option value="galeri">Galeri Dokumentasi</option>
                <option value="prestasi">Prestasi Siswa / Guru</option>
                <option value="guru">Dewan Pengajar & Staf</option>
                <option value="umum">Aset Umum</option>
              </select>

              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/60 text-[11px] text-teal-900 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 text-teal-800 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Auto Indexing
                </p>
                Dimensi gambar, rasio, dan ukuran file akan dianalisis secara otomatis saat pengunggahan.
              </div>
            </div>
          </div>

          {uploadProgressMsg && (
            <div className="p-3 bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{uploadProgressMsg}</span>
            </div>
          )}
        </div>
      )}

      {/* Control Bar: Categories Filter, Search & View Toggle */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Semua', count: categoryCounts.all },
            { id: 'banner', label: 'Banner & Header', count: categoryCounts.banner },
            { id: 'logo', label: 'Logo', count: categoryCounts.logo },
            { id: 'berita', label: 'Berita', count: categoryCounts.berita },
            { id: 'galeri', label: 'Galeri', count: categoryCounts.galeri },
            { id: 'prestasi', label: 'Prestasi', count: categoryCounts.prestasi },
            { id: 'guru', label: 'Guru', count: categoryCounts.guru },
            { id: 'umum', label: 'Umum', count: categoryCounts.umum }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & View Mode */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Asset Display */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Tidak ada aset media ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada gambar yang cocok dengan filter saat ini. Unggah gambar baru dari komputer untuk menambahkannya ke Drive situs.
          </p>
          <button
            onClick={() => setShowUploadDropzone(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all inline-flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Gambar Pertama</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => {
            const isInspected = inspectedAssetId === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => setInspectedAssetId(asset.id)}
                className={`group bg-white rounded-2xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col shadow-xs hover:shadow-md ${
                  isInspected
                    ? 'border-teal-600 ring-4 ring-teal-500/20 shadow-md'
                    : 'border-slate-200/80 hover:border-teal-300'
                }`}
              >
                {/* Image Box */}
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Category Pill */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-black/60 text-white backdrop-blur-xs">
                    {asset.category}
                  </span>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(asset);
                      }}
                      className="p-2 bg-white text-slate-800 hover:text-teal-700 rounded-xl shadow-md transition-transform hover:scale-110"
                      title="Salin Data URL"
                    >
                      {copiedId === asset.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedAssetId(asset.id);
                      }}
                      className="p-2 bg-white text-slate-800 hover:text-teal-700 rounded-xl shadow-md transition-transform hover:scale-110"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-teal-700 transition-colors">
                    {asset.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-medium">
                    <span>{asset.dimensions || 'Image'}</span>
                    <span>{asset.fileSize}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Pratinjau</th>
                  <th className="py-3 px-4">Nama File & Judul</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Dimensi / Ukuran</th>
                  <th className="py-3 px-4">Tanggal Unggah</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    onClick={() => setInspectedAssetId(asset.id)}
                    className="hover:bg-teal-50/40 transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-4 w-16">
                      <img
                        src={asset.url}
                        alt={asset.title}
                        className="w-12 h-10 object-cover rounded-lg border border-slate-200"
                      />
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-800">
                      <p className="line-clamp-1">{asset.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{asset.fileName}</p>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-teal-100 text-teal-800">
                        {asset.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 font-medium">
                      <p>{asset.dimensions || '-'}</p>
                      <p className="text-[10px] text-slate-400">{asset.fileSize}</p>
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 font-medium">
                      {asset.uploadedAt}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleCopyUrl(asset)}
                          className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-lg"
                          title="Salin Link"
                        >
                          {copiedId === asset.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setInspectedAssetId(asset.id)}
                          className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-lg"
                          title="Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INSPECTION / DETAIL MODAL */}
      {inspectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <FileImage className="w-5 h-5 text-teal-700" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Detail & Pratinjau Media
                </h3>
              </div>
              <button
                onClick={() => {
                  setInspectedAssetId(null);
                  setIsEditing(false);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Preview Box */}
              <div className="relative rounded-2xl bg-slate-950/5 border border-slate-200 p-4 flex items-center justify-center max-h-72 overflow-hidden">
                <img
                  src={inspectedAsset.url}
                  alt={inspectedAsset.altText || inspectedAsset.title}
                  className="max-h-64 max-w-full object-contain rounded-xl shadow-md"
                />
              </div>

              {/* Information Grid & Form */}
              {isEditing ? (
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Edit Metadata Media
                  </h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Gambar</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as MediaCategory)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                      >
                        <option value="banner">Banner & Header</option>
                        <option value="logo">Logo & Identitas</option>
                        <option value="berita">Berita & Artikel</option>
                        <option value="galeri">Galeri Dokumentasi</option>
                        <option value="prestasi">Prestasi</option>
                        <option value="guru">Dewan Pengajar</option>
                        <option value="umum">Umum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Alt Text (Deskripsi Foto)</label>
                      <input
                        type="text"
                        value={editAltText}
                        onChange={(e) => setEditAltText(e.target.value)}
                        placeholder="Deskripsi untuk aksesibilitas"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500/20"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-5 py-2 text-xs font-extrabold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Judul Aset:</span>
                      <p className="font-extrabold text-slate-800 text-sm">{inspectedAsset.title}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Nama File Asli:</span>
                      <p className="font-medium text-slate-700">{inspectedAsset.fileName}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Kategori:</span>
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-teal-100 text-teal-800">
                        {inspectedAsset.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Dimensi / Resolusi:</span>
                      <p className="font-extrabold text-teal-800">{inspectedAsset.dimensions || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Ukuran File:</span>
                      <p className="font-semibold text-slate-700">{inspectedAsset.fileSize}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Diupload Oleh & Tanggal:</span>
                      <p className="font-medium text-slate-700">{inspectedAsset.uploadedBy || 'Admin'} • {inspectedAsset.uploadedAt}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Link Box */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Data URL / Tautan Media</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={inspectedAsset.url}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-100 text-slate-600 font-mono select-all"
                  />
                  <button
                    onClick={() => handleCopyUrl(inspectedAsset)}
                    className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {copiedId === inspectedAsset.id ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === inspectedAsset.id ? 'Tersalin!' : 'Salin URL'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/60">
              <div>
                {deleteConfirmId === inspectedAsset.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-600">Yakin hapus?</span>
                    <button
                      onClick={() => {
                        deleteMediaAsset(inspectedAsset.id);
                        setInspectedAssetId(null);
                        setDeleteConfirmId(null);
                      }}
                      className="px-3 py-1.5 text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(inspectedAsset.id)}
                    className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus Gambar</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isEditing && (
                  <button
                    onClick={() => startEditingAsset(inspectedAsset)}
                    className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-200/80 hover:bg-slate-300 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Metadata</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setInspectedAssetId(null);
                    setIsEditing(false);
                  }}
                  className="px-5 py-2 text-xs font-extrabold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
