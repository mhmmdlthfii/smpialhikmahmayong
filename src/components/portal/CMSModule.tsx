import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { SystemService, NewsItem, EventItem, HeroSlide, MediaCategory } from '../../types';
import {
  Settings,
  Globe,
  Newspaper,
  Calendar,
  Layers,
  Save,
  PlusCircle,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  X,
  Sparkles,
  Image as ImageIcon,
  Check,
  Eye,
  Sliders,
  Link as LinkIcon,
  HardDrive,
  FolderOpen,
  Upload,
  FileImage
} from 'lucide-react';
import { MediaLibraryManager } from './MediaLibraryManager';
import { MediaPickerModal } from './MediaPickerModal';

export const CMSModule: React.FC = () => {
  const { user, activeRole } = useAuth();
  const {
    websiteSettings,
    updateWebsiteSettings,
    news,
    addNews,
    updateNews,
    deleteNews,
    events,
    addEvent,
    systemServices,
    addSystemService,
    updateSystemService,
    deleteSystemService,
    reorderSystemServices,
    navItems,
    updateNavItems,
    heroSlides,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    reorderHeroSlides,
    mediaAssets,
    uploadMediaFile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'media' | 'slides' | 'identity' | 'news' | 'services' | 'navigation'>('media');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Media Picker Dialog State
  const [showMediaPicker, setShowMediaPicker] = useState<boolean>(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'header_banner' | 'school_logo' | 'headmaster_signature' | 'slide_image' | 'news_cover' | null>(null);
  const [mediaPickerTitle, setMediaPickerTitle] = useState<string>('Pilih Gambar dari Drive Situs');
  const [mediaPickerCategory, setMediaPickerCategory] = useState<MediaCategory | undefined>(undefined);
  const [mediaPickerAspect, setMediaPickerAspect] = useState<string | undefined>(undefined);

  // Identity Form State
  const [identityForm, setIdentityForm] = useState(websiteSettings);

  // Hero Slide Add/Edit Modal
  const [showSlideModal, setShowSlideModal] = useState<boolean>(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideTitle, setSlideTitle] = useState<string>('');
  const [slideSubtitle, setSlideSubtitle] = useState<string>('');
  const [slideBadgeText, setSlideBadgeText] = useState<string>('PPDB 2026/2027');
  const [slideBadgeColor, setSlideBadgeColor] = useState<string>('from-amber-500 to-orange-500');
  const [slideImageUrl, setSlideImageUrl] = useState<string>('');
  const [slideCtaText, setSlideCtaText] = useState<string>('Daftar PPDB');
  const [slideCtaLink, setSlideCtaLink] = useState<string>('/ppdb');
  const [slideIsActive, setSlideIsActive] = useState<boolean>(true);

  // News Add/Edit Modal
  const [showNewsModal, setShowNewsModal] = useState<boolean>(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState<string>('');
  const [newsCategory, setNewsCategory] = useState<string>('Akademik');
  const [newsContent, setNewsContent] = useState<string>('');
  const [newsImageUrl, setNewsImageUrl] = useState<string>('');

  // Service Add/Edit Modal
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [serviceName, setServiceName] = useState<string>('');
  const [serviceCategory, setServiceCategory] = useState<string>('Akademik');
  const [serviceUrl, setServiceUrl] = useState<string>('');
  const [serviceDescription, setServiceDescription] = useState<string>('');
  const [serviceOpenMode, setServiceOpenMode] = useState<SystemService['openMode']>('NEW_TAB');

  // Sample Image Presets for Quick Selection
  const imagePresets = [
    {
      label: 'Siswa & Diskusi Kelompok',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'
    },
    {
      label: 'Laboratorium Sains & Komputer',
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80'
    },
    {
      label: 'Tahfidz & Pembelajaran Qur\'ani',
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80'
    },
    {
      label: 'Prestasi & Kejuaraan Lomba',
      url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=800&auto=format&fit=crop&q=80'
    },
    {
      label: 'Perpustakaan & Literasi',
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80'
    },
    {
      label: 'Aktivitas Ekstrakurikuler',
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteSettings(identityForm);
    setSaveSuccess('Pengaturan identitas sekolah berhasil disimpan.');
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleOpenAddSlide = () => {
    setEditingSlideId(null);
    setSlideTitle('SMP Islam Al Hikmah Mayong');
    setSlideSubtitle('Mewujudkan santri dan siswa berdaya saing global, berkepribadian luhur, dan cerdas teknologi.');
    setSlideBadgeText('PPDB 2026/2027 • Jalur Prestasi');
    setSlideBadgeColor('from-amber-500 to-orange-500');
    setSlideImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80');
    setSlideCtaText('Daftar PPDB');
    setSlideCtaLink('/ppdb');
    setSlideIsActive(true);
    setShowSlideModal(true);
  };

  const handleOpenEditSlide = (slide: HeroSlide) => {
    setEditingSlideId(slide.id);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle || '');
    setSlideBadgeText(slide.badgeText || '');
    setSlideBadgeColor(slide.badgeColor || 'from-amber-500 to-orange-500');
    setSlideImageUrl(slide.imageUrl);
    setSlideCtaText(slide.ctaText || '');
    setSlideCtaLink(slide.ctaLink || '');
    setSlideIsActive(slide.isActive !== false);
    setShowSlideModal(true);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideTitle.trim() || !slideImageUrl.trim()) return;

    if (editingSlideId) {
      updateHeroSlide(editingSlideId, {
        title: slideTitle,
        subtitle: slideSubtitle,
        badgeText: slideBadgeText,
        badgeColor: slideBadgeColor,
        imageUrl: slideImageUrl,
        ctaText: slideCtaText,
        ctaLink: slideCtaLink,
        isActive: slideIsActive
      });
      setSaveSuccess('Slide hero berhasil diperbarui.');
    } else {
      addHeroSlide({
        title: slideTitle,
        subtitle: slideSubtitle,
        badgeText: slideBadgeText,
        badgeColor: slideBadgeColor,
        imageUrl: slideImageUrl,
        ctaText: slideCtaText,
        ctaLink: slideCtaLink,
        isActive: slideIsActive,
        order: heroSlides.length + 1
      });
      setSaveSuccess('Slide hero baru berhasil ditambahkan.');
    }

    setShowSlideModal(false);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleMoveSlide = (index: number, newIndex: number) => {
    if (newIndex < 0 || newIndex >= heroSlides.length) return;
    const items = [...heroSlides];
    const [moved] = items.splice(index, 1);
    items.splice(newIndex, 0, moved);
    reorderHeroSlides(items);
  };

  const handleToggleSlideActive = (slide: HeroSlide) => {
    updateHeroSlide(slide.id, { isActive: !slide.isActive });
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim()) return;

    if (editingNewsId) {
      updateNews(editingNewsId, {
        title: newsTitle,
        category: newsCategory,
        content: newsContent,
        coverImage: newsImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
        imageUrl: newsImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
      });
    } else {
      addNews({
        title: newsTitle,
        slug: newsTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: newsCategory,
        summary: newsContent.slice(0, 120),
        content: newsContent,
        author: user?.name || 'Admin Sekolah',
        publishedAt: new Date().toISOString().split('T')[0],
        date: new Date().toISOString().split('T')[0],
        coverImage: newsImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
        imageUrl: newsImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
        isFeatured: true
      });
    }

    setNewsTitle('');
    setNewsContent('');
    setNewsImageUrl('');
    setEditingNewsId(null);
    setShowNewsModal(false);
  };

  const handleMoveService = (index: number, newIndex: number) => {
    if (newIndex < 0 || newIndex >= systemServices.length) return;
    const items = [...systemServices];
    const [moved] = items.splice(index, 1);
    items.splice(newIndex, 0, moved);
    reorderSystemServices(items);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !serviceUrl.trim()) return;

    addSystemService({
      name: serviceName,
      slug: serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: serviceCategory,
      type: 'EXTERNAL',
      authRequired: false,
      target: serviceOpenMode === 'NEW_TAB' ? '_blank' : '_self',
      url: serviceUrl,
      icon: 'Globe',
      iconName: 'Globe',
      description: serviceDescription,
      openMode: serviceOpenMode,
      targetAudience: 'SEMUA',
      colorGradient: 'from-blue-600 to-indigo-600',
      isActive: true,
      sortOrder: systemServices.length + 1,
      displayOrder: systemServices.length + 1
    });

    setServiceName('');
    setServiceUrl('');
    setServiceDescription('');
    setShowServiceModal(false);
  };

  // Open Media Picker Helper
  const openMediaPicker = (
    target: 'header_banner' | 'school_logo' | 'headmaster_signature' | 'slide_image' | 'news_cover',
    modalTitle: string,
    category?: MediaCategory,
    aspect?: string
  ) => {
    setMediaPickerTarget(target);
    setMediaPickerTitle(modalTitle);
    setMediaPickerCategory(category);
    setMediaPickerAspect(aspect);
    setShowMediaPicker(true);
  };

  // Handle Selected Media from Modal
  const handleMediaSelected = (url: string) => {
    if (mediaPickerTarget === 'header_banner') {
      setIdentityForm((prev) => ({ ...prev, headerBannerUrl: url, headerDisplayMode: 'photo_banner' }));
    } else if (mediaPickerTarget === 'school_logo') {
      setIdentityForm((prev) => ({ ...prev, schoolLogoUrl: url }));
    } else if (mediaPickerTarget === 'headmaster_signature') {
      setIdentityForm((prev) => ({ ...prev, headmasterSignatureUrl: url }));
    } else if (mediaPickerTarget === 'slide_image') {
      setSlideImageUrl(url);
    } else if (mediaPickerTarget === 'news_cover') {
      setNewsImageUrl(url);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-teal-950">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-teal-950">
              CMS Manajemen Portal & Konten Publik
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Pusat penyimpanan Drive media gambar internal, konfigurasi banner header 1343x342 px, hero carousel, berita, dan identitas sekolah.
          </p>
        </div>

        {/* Tab Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* TAB 0: MEDIA LIBRARY (DRIVE SITUS) */}
          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'media'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-teal-900 hover:text-teal-950 hover:bg-teal-50 border-teal-200'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-amber-300" />
            <span>Drive Media ({mediaAssets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'slides'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Slider Hero ({heroSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Identitas Sekolah
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'news'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Berita ({news.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Layanan Eksternal ({systemServices.length})
          </button>

          <button
            onClick={() => setActiveTab('navigation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'navigation'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Menu Navigasi ({navItems.length})
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* TAB 0: DRIVE & MEDIA LIBRARY (WORDPRESS STYLE STORAGE) */}
      {activeTab === 'media' && (
        <div className="space-y-4">
          <MediaLibraryManager />
        </div>
      )}

      {/* TAB: SLIDER HERO MANAGEMENT */}
      {activeTab === 'slides' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-teal-50/60 p-4 rounded-2xl border border-teal-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-teal-950 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-teal-600" />
                <span>Pengelolaan Foto & Slide Hero Banner Beranda</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Atur foto yang tampil di hero section beranda. Anda dapat menambah, mengubah URL foto, mengatur urutan slide, dan teks overlay.
              </p>
            </div>
            <button
              onClick={handleOpenAddSlide}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Slide Foto Baru</span>
            </button>
          </div>

          {/* Slide List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heroSlides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`glass-card p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  slide.isActive !== false ? 'border-teal-200 bg-white/80' : 'border-slate-200 opacity-60 bg-slate-50/80'
                }`}
              >
                <div className="flex gap-3.5 items-start">
                  {/* Thumbnail Image */}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-teal-100 shadow-xs group">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-teal-950/80 text-white text-[10px] font-bold">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Slide Info */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {slide.badgeText && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${slide.badgeColor || 'from-amber-500 to-orange-500'}`}>
                          {slide.badgeText}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        slide.isActive !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {slide.isActive !== false ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-xs text-teal-950 line-clamp-1">
                      {slide.title}
                    </h4>

                    {slide.subtitle && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>
                    )}

                    {slide.ctaText && slide.ctaLink && (
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-700">
                        <LinkIcon className="w-3 h-3" />
                        <span>{slide.ctaText} ({slide.ctaLink})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Controls Footer */}
                <div className="pt-2.5 border-t border-teal-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleSlideActive(slide)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                        slide.isActive !== false
                          ? 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {slide.isActive !== false ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveSlide(index, index - 1)}
                      disabled={index === 0}
                      title="Geser ke Atas / Lebih Awal"
                      className="p-1 text-slate-400 hover:text-teal-700 disabled:opacity-30 cursor-pointer rounded hover:bg-teal-50"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveSlide(index, index + 1)}
                      disabled={index === heroSlides.length - 1}
                      title="Geser ke Bawah / Selanjutnya"
                      className="p-1 text-slate-400 hover:text-teal-700 disabled:opacity-30 cursor-pointer rounded hover:bg-teal-50"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditSlide(slide)}
                      title="Edit Slide"
                      className="p-1 text-teal-700 hover:bg-teal-100 rounded cursor-pointer ml-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHeroSlide(slide.id)}
                      title="Hapus Slide"
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {heroSlides.length === 0 && (
            <div className="p-8 text-center glass-panel rounded-3xl border border-dashed border-teal-200">
              <ImageIcon className="w-10 h-10 text-teal-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-teal-900">Belum ada Slide Foto di Hero</p>
              <p className="text-xs text-slate-500 mt-1">Klik tombol &ldquo;Tambah Slide Foto Baru&rdquo; untuk menambahkan slide banner.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: IDENTITAS SEKOLAH & HEADER BANNER */}
      {activeTab === 'identity' && (
        <form onSubmit={handleSaveIdentity} className="space-y-6">
          
          {/* Section: Header Banner Photo (1343 x 342 px) */}
          <div className="glass-panel p-6 rounded-3xl border border-teal-200/80 bg-white/80 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-teal-100">
              <div>
                <h3 className="font-heading font-extrabold text-sm text-teal-950 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-teal-600" />
                  <span>Foto / Banner Header Navigasi (Ukuran: 1343 x 342 Pixel)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Foto header persegi panjang (1343x342 px) yang akan tampil di sisi kiri atas navbar utama sebagai identitas visual sekolah.
                </p>
              </div>
              
              {/* Display Mode Switch */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-teal-50 border border-teal-200">
                <button
                  type="button"
                  onClick={() => setIdentityForm({ ...identityForm, headerDisplayMode: 'photo_banner' })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    identityForm.headerDisplayMode !== 'logo_text'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-teal-900 hover:bg-white/60'
                  }`}
                >
                  Gunakan Foto Banner
                </button>
                <button
                  type="button"
                  onClick={() => setIdentityForm({ ...identityForm, headerDisplayMode: 'logo_text' })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    identityForm.headerDisplayMode === 'logo_text'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-teal-900 hover:bg-white/60'
                  }`}
                >
                  Icon & Teks Saja
                </button>
              </div>
            </div>

            {/* Live Banner Preview Box */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-teal-950">
                Preview Tampilan Banner (Proporsi Asli 1343 × 342)
              </label>
              <div className="relative w-full max-w-2xl aspect-[1343/342] rounded-2xl overflow-hidden border-2 border-dashed border-teal-300 bg-teal-950/5 flex items-center justify-center shadow-xs group">
                {identityForm.headerBannerUrl ? (
                  <img
                    src={identityForm.headerBannerUrl}
                    alt={identityForm.headerBannerAlt || 'Header Banner'}
                    className="w-full h-full object-contain object-left bg-white/40"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-8 h-8 text-teal-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-teal-900">Belum Ada URL Foto Banner</p>
                    <p className="text-[11px] text-slate-500">Masukkan tautan foto berukuran 1343x342 px di bawah.</p>
                  </div>
                )}

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-teal-950/80 text-white text-[10px] font-mono font-bold">
                  1343 × 342 px
                </div>
              </div>
            </div>

            {/* Input URL & Media Picker Controls */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => openMediaPicker('header_banner', 'Pilih Banner Header (1343 x 342)', 'banner', '1343:342')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pilih dari Drive Media Situs</span>
                </button>

                <label className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-teal-300 text-teal-900 hover:bg-teal-50 flex items-center gap-2 shadow-xs cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-teal-600" />
                  <span>Unggah Banner File (1343x342 px)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const asset = await uploadMediaFile(file, 'banner', 'Banner Header Utama Navigasi');
                          setIdentityForm((prev) => ({
                            ...prev,
                            headerBannerUrl: asset.url,
                            headerDisplayMode: 'photo_banner'
                          }));
                          setSaveSuccess('Banner header berhasil diunggah ke Drive dan dipilih!');
                          setTimeout(() => setSaveSuccess(null), 3000);
                        } catch (err) {
                          alert('Gagal mengunggah file.');
                        }
                      }
                    }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-teal-950 mb-1">
                    URL Foto Banner Header (Direct Link / Data URL)
                  </label>
                  <input
                    type="text"
                    placeholder="https://.../banner-1343x342.jpg atau pilih dari drive"
                    value={identityForm.headerBannerUrl || ''}
                    onChange={(e) => setIdentityForm({ ...identityForm, headerBannerUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-teal-950 mb-1">
                    Teks Alternatif / Alt Text Banner
                  </label>
                  <input
                    type="text"
                    placeholder="Header Banner Resmi SMP Islam Al Hikmah Mayong"
                    value={identityForm.headerBannerAlt || ''}
                    onChange={(e) => setIdentityForm({ ...identityForm, headerBannerAlt: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Quick Presets for 1343x342 Header Banner */}
            <div className="pt-2 border-t border-teal-100">
              <span className="block text-[11px] font-bold text-teal-800 mb-1.5">
                Pilih Contoh Preset Banner Header:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIdentityForm({
                    ...identityForm,
                    headerBannerUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1343&h=342&fit=crop&q=85',
                    headerDisplayMode: 'photo_banner'
                  })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors"
                >
                  🟢 Preset Edukasi & Kampus Islami
                </button>
                <button
                  type="button"
                  onClick={() => setIdentityForm({
                    ...identityForm,
                    headerBannerUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1343&h=342&fit=crop&q=85',
                    headerDisplayMode: 'photo_banner'
                  })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors"
                >
                  🟡 Preset Aktivitas Santri & Belajar
                </button>
                <button
                  type="button"
                  onClick={() => setIdentityForm({
                    ...identityForm,
                    headerBannerUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1343&h=342&fit=crop&q=85',
                    headerDisplayMode: 'photo_banner'
                  })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors"
                >
                  🔵 Preset Tahfidz & Quranic School
                </button>
              </div>
            </div>
          </div>

          {/* Master Identity Form */}
          <div className="glass-panel p-6 rounded-3xl border border-teal-100 space-y-4 shadow-xs">
            <h3 className="font-heading font-extrabold text-sm text-teal-950 pb-2 border-b border-teal-100">
              Informasi Umum Sekolah
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-teal-950 mb-1">Nama Resmi Sekolah</label>
                <input
                  type="text"
                  value={identityForm.schoolName}
                  onChange={(e) => setIdentityForm({ ...identityForm, schoolName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Tagline / Visi Singkat</label>
                <input
                  type="text"
                  value={identityForm.tagline}
                  onChange={(e) => setIdentityForm({ ...identityForm, tagline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">NPSN</label>
                <input
                  type="text"
                  value={identityForm.npsn}
                  onChange={(e) => setIdentityForm({ ...identityForm, npsn: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-mono shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Akreditasi</label>
                <input
                  type="text"
                  value={identityForm.akreditasi}
                  onChange={(e) => setIdentityForm({ ...identityForm, akreditasi: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Nama Kepala Sekolah</label>
                <input
                  type="text"
                  value={identityForm.headmasterName}
                  onChange={(e) => setIdentityForm({ ...identityForm, headmasterName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">NIP Kepala Sekolah</label>
                <input
                  type="text"
                  value={identityForm.headmasterNip}
                  onChange={(e) => setIdentityForm({ ...identityForm, headmasterNip: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-mono shadow-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-teal-950 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={identityForm.address}
                  onChange={(e) => setIdentityForm({ ...identityForm, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                />
              </div>

              {/* Logo Sekolah & Tanda Tangan Kepsek with Drive Pickers */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-teal-950">Logo Resmi Sekolah</label>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('school_logo', 'Pilih Logo Sekolah dari Drive', 'logo', '1:1')}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                  >
                    <HardDrive className="w-3 h-3 text-amber-500" />
                    <span>Pilih dari Drive</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl border border-teal-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                    {identityForm.schoolLogoUrl ? (
                      <img src={identityForm.schoolLogoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-teal-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="URL Logo atau pilih dari Drive"
                    value={identityForm.schoolLogoUrl || ''}
                    onChange={(e) => setIdentityForm({ ...identityForm, schoolLogoUrl: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 font-mono text-[11px] shadow-xs"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-teal-950">Tanda Tangan Elektronik Kepala Sekolah (PNG Transparan)</label>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('headmaster_signature', 'Pilih Tanda Tangan Kepsek dari Drive', 'dokumen', '3:2')}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                  >
                    <HardDrive className="w-3 h-3 text-amber-500" />
                    <span>Pilih dari Drive</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-xl border border-teal-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                    {identityForm.headmasterSignatureUrl ? (
                      <img src={identityForm.headmasterSignatureUrl} alt="TTD" className="w-full h-full object-contain" />
                    ) : (
                      <FileImage className="w-5 h-5 text-teal-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="URL Tanda Tangan atau pilih dari Drive"
                    value={identityForm.headmasterSignatureUrl || ''}
                    onChange={(e) => setIdentityForm({ ...identityForm, headmasterSignatureUrl: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 font-mono text-[11px] shadow-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Identitas & Header Sekolah</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: BERITA & ARTIKEL */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-teal-950">
              Daftar Publikasi Berita Sekolah
            </h3>
            <button
              onClick={() => {
                setEditingNewsId(null);
                setNewsTitle('');
                setNewsContent('');
                setNewsImageUrl('');
                setShowNewsModal(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tulis Berita Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map((item) => (
              <div key={item.id} className="glass-card p-4 rounded-2xl flex gap-4 border-teal-100 shadow-xs">
                <img
                  src={item.coverImage || item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'}
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0 border border-teal-100"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                      {item.category}
                    </span>
                    <h4 className="font-heading font-bold text-xs text-teal-950 line-clamp-2 mt-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                    <span>{item.publishedAt || item.date}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingNewsId(item.id);
                          setNewsTitle(item.title);
                          setNewsCategory(item.category);
                          setNewsContent(item.content);
                          setNewsImageUrl(item.coverImage || item.imageUrl || '');
                          setShowNewsModal(true);
                        }}
                        className="p-1 rounded text-teal-700 hover:bg-teal-50 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="p-1 rounded text-rose-500 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LAYANAN EKSTERNAL */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-teal-950">
              Tautan Layanan Sistem & Aplikasi Eksternal
            </h3>
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tambah Layanan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemServices.map((srv, index) => (
              <div key={srv.id} className="glass-card p-5 rounded-2xl space-y-3 flex flex-col justify-between border-teal-100 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {srv.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      Mode: {srv.openMode}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-teal-950 mt-2">
                    {srv.name}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{srv.description}</p>
                </div>

                <div className="pt-3 border-t border-teal-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-teal-700 font-bold truncate max-w-[150px]">
                    {srv.url}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveService(index, index - 1)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-teal-700 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveService(index, index + 1)}
                      disabled={index === systemServices.length - 1}
                      className="p-1 text-slate-400 hover:text-teal-700 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteSystemService(srv.id)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MENU NAVIGASI */}
      {activeTab === 'navigation' && (
        <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-teal-100 flex items-center justify-between bg-teal-50/50">
            <span className="text-xs font-bold text-teal-950">Pengaturan Urutan & Visibilitas Menu Header</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
              <tr>
                <th className="p-3">Urutan</th>
                <th className="p-3">Label Menu</th>
                <th className="p-3">URL Tautan</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-100">
              {navItems.map((item, idx) => (
                <tr key={item.id} className="hover:bg-white/60">
                  <td className="p-3 font-mono font-bold text-slate-400">#{idx + 1}</td>
                  <td className="p-3 font-bold text-teal-950">{item.label}</td>
                  <td className="p-3 font-mono text-slate-600">{item.href}</td>
                  <td className="p-3 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: ADD / EDIT HERO SLIDE */}
      {showSlideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-xl w-full glass-panel-strong rounded-3xl border border-teal-200 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-lg text-teal-950">
                  {editingSlideId ? 'Edit Slide Banner Hero' : 'Tambah Slide Banner Hero Baru'}
                </h3>
              </div>
              <button 
                onClick={() => setShowSlideModal(false)} 
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
              
              {/* Image URL & Drive Media Picker */}
              <div className="space-y-2 p-3 bg-teal-50/60 rounded-2xl border border-teal-100">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-teal-950">Foto Banner Slide *</label>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('slide_image', 'Pilih Gambar Banner Hero dari Drive', 'banner', '16:9')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-amber-300" />
                    <span>Pilih dari Drive Situs</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={slideImageUrl}
                    onChange={(e) => setSlideImageUrl(e.target.value)}
                    placeholder="Pilih dari Drive atau masukkan URL foto..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-teal-300 text-teal-900 hover:bg-teal-50 flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 text-teal-600" />
                    <span>Unggah File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const asset = await uploadMediaFile(file, 'banner', slideTitle || 'Slide Hero Banner');
                            setSlideImageUrl(asset.url);
                          } catch (err) {
                            alert('Gagal mengunggah file.');
                          }
                        }
                      }}
                    />
                  </label>
                </div>

                {slideImageUrl && (
                  <div className="relative rounded-xl overflow-hidden aspect-21/9 bg-slate-900 border border-teal-200">
                    <img src={slideImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                
                {/* Image Presets */}
                <div className="pt-1">
                  <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                    Atau pilih preset cepat:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {imagePresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSlideImageUrl(preset.url)}
                        className={`text-left p-1.5 rounded-lg border text-[10px] transition-all cursor-pointer truncate ${
                          slideImageUrl === preset.url
                            ? 'bg-teal-100/80 border-teal-400 font-bold text-teal-900'
                            : 'bg-white/70 border-teal-100 hover:bg-white text-slate-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-teal-950">Judul Slide *</label>
                  <input
                    type="text"
                    required
                    value={slideTitle}
                    onChange={(e) => setSlideTitle(e.target.value)}
                    placeholder="Contoh: SMP Islam Al Hikmah Mayong"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-teal-950">Label Badge</label>
                  <input
                    type="text"
                    value={slideBadgeText}
                    onChange={(e) => setSlideBadgeText(e.target.value)}
                    placeholder="Contoh: PPDB 2026/2027 • Jalur Prestasi"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="block font-bold text-teal-950">Deskripsi / Subtitle</label>
                <textarea
                  rows={2}
                  value={slideSubtitle}
                  onChange={(e) => setSlideSubtitle(e.target.value)}
                  placeholder="Keterangan singkat slide banner..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              {/* Badge Color Preset */}
              <div className="space-y-1.5">
                <label className="block font-bold text-teal-950">Warna Gradasi Badge</label>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setSlideBadgeColor('from-amber-500 to-orange-500')}
                    className={`p-2 rounded-xl text-white font-bold bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-between cursor-pointer border ${
                      slideBadgeColor === 'from-amber-500 to-orange-500' ? 'ring-2 ring-amber-500 border-white' : 'border-transparent'
                    }`}
                  >
                    <span>Amber / Gold</span>
                    {slideBadgeColor === 'from-amber-500 to-orange-500' && <Check className="w-3 h-3" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlideBadgeColor('from-teal-600 to-emerald-600')}
                    className={`p-2 rounded-xl text-white font-bold bg-gradient-to-r from-teal-600 to-emerald-600 flex items-center justify-between cursor-pointer border ${
                      slideBadgeColor === 'from-teal-600 to-emerald-600' ? 'ring-2 ring-teal-500 border-white' : 'border-transparent'
                    }`}
                  >
                    <span>Teal / Hijau</span>
                    {slideBadgeColor === 'from-teal-600 to-emerald-600' && <Check className="w-3 h-3" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlideBadgeColor('from-blue-600 to-indigo-600')}
                    className={`p-2 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between cursor-pointer border ${
                      slideBadgeColor === 'from-blue-600 to-indigo-600' ? 'ring-2 ring-blue-500 border-white' : 'border-transparent'
                    }`}
                  >
                    <span>Biru / Indigo</span>
                    {slideBadgeColor === 'from-blue-600 to-indigo-600' && <Check className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* CTA Button Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-teal-950">Teks Tombol Aksi (CTA)</label>
                  <input
                    type="text"
                    value={slideCtaText}
                    onChange={(e) => setSlideCtaText(e.target.value)}
                    placeholder="Contoh: Daftar PPDB"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-teal-950">Tautan Tujuan (Link)</label>
                  <input
                    type="text"
                    value={slideCtaLink}
                    onChange={(e) => setSlideCtaLink(e.target.value)}
                    placeholder="Contoh: /ppdb atau /profil"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs font-mono"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="slideIsActive"
                  checked={slideIsActive}
                  onChange={(e) => setSlideIsActive(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <label htmlFor="slideIsActive" className="text-xs font-bold text-teal-950 cursor-pointer">
                  Tampilkan Slide ini secara Aktif di Beranda
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-teal-100">
                <button
                  type="button"
                  onClick={() => setShowSlideModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-bold shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  {editingSlideId ? 'Simpan Perubahan' : 'Tambah Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-lg w-full glass-panel-strong rounded-3xl border border-teal-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-teal-950">
                {editingNewsId ? 'Edit Berita' : 'Tulis Berita Baru'}
              </h3>
              <button onClick={() => setShowNewsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-teal-950 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Kategori</label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Pengumuman">Pengumuman</option>
                </select>
              </div>

              {/* News Cover Image with Drive Picker */}
              <div className="space-y-2 p-3 bg-teal-50/60 rounded-2xl border border-teal-100">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-teal-950">Foto Sampul Berita</label>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('news_cover', 'Pilih Sampul Berita dari Drive', 'berita', '16:9')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-amber-300" />
                    <span>Pilih dari Drive</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newsImageUrl}
                    onChange={(e) => setNewsImageUrl(e.target.value)}
                    placeholder="URL Gambar atau pilih dari Drive..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-teal-300 text-teal-900 hover:bg-teal-50 flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 text-teal-600" />
                    <span>Unggah File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const asset = await uploadMediaFile(file, 'berita', newsTitle || 'Sampul Berita');
                            setNewsImageUrl(asset.url);
                          } catch (err) {
                            alert('Gagal mengunggah file.');
                          }
                        }
                      }}
                    />
                  </label>
                </div>

                {newsImageUrl && (
                  <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-900 border border-teal-200">
                    <img src={newsImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Konten Lengkap Berita</label>
                <textarea
                  rows={4}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-teal-100">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-bold shadow-md shadow-amber-500/20"
                >
                  Publikasikan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-lg w-full glass-panel-strong rounded-3xl border border-teal-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Tambah Layanan Eksternal
              </h3>
              <button onClick={() => setShowServiceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-teal-950 mb-1">Nama Layanan *</label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Contoh: E-Rapor Kemendikbud"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">URL Target Layanan *</label>
                <input
                  type="url"
                  required
                  value={serviceUrl}
                  onChange={(e) => setServiceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Kategori</label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Kementerian">Kementerian / Dinas</option>
                  <option value="Administrasi">Administrasi</option>
                  <option value="Perpustakaan">Perpustakaan & Media</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Deskripsi Singkat</label>
                <input
                  type="text"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Platform penilaian dan rekapitulasi rapor nasional..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-teal-100">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-bold shadow-md shadow-amber-500/20"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Media Picker Modal */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaSelected}
        title={mediaPickerTitle}
        defaultCategory={mediaPickerCategory}
        recommendedAspect={mediaPickerAspect}
      />

    </div>
  );
};
