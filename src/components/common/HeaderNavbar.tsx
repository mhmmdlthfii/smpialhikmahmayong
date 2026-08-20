import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  ShieldCheck,
  LogIn,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Sparkles,
  Users,
  BookOpen,
  Calendar,
  Award,
  Newspaper,
  FileText,
  Clock,
  Image as ImageIcon,
  Compass,
  MessageSquareQuote,
  Megaphone,
  CheckCircle2,
  CalendarDays,
  Shield
} from 'lucide-react';

interface HeaderNavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ currentPath, navigate }) => {
  const { user, isAuthenticated, logout, activeRole, switchRole } = useAuth();
  const { websiteSettings } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Desktop Dropdown Open States
  const [activeDropdown, setActiveDropdown] = useState<'bosp' | 'kesiswaan' | 'kurikulum' | 'publikasi' | null>(null);

  // Mobile Accordion States
  const [mobileBospOpen, setMobileBospOpen] = useState(false);
  const [mobileKesiswaanOpen, setMobileKesiswaanOpen] = useState(false);
  const [mobileKurikulumOpen, setMobileKurikulumOpen] = useState(false);
  const [mobilePublikasiOpen, setMobilePublikasiOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: 'bosp' | 'kesiswaan' | 'kurikulum' | 'publikasi') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (href: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    navigate(href);
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMIN':
        return 'Admin CMS';
      case 'KEPALA_SEKOLAH':
        return 'Kepala Sekolah';
      case 'TU':
        return 'Tata Usaha';
      case 'GURU':
        return 'Guru Mata Pelajaran';
      case 'WALI_KELAS':
        return 'Wali Kelas';
      case 'SISWA':
        return 'Siswa';
      case 'ORANG_TUA':
        return 'Orang Tua / Wali';
      default:
        return role;
    }
  };

  // Check active routes
  const isProfilActive = currentPath === '/profil';
  const isBospActive = currentPath.startsWith('/bosp');
  const isKesiswaanActive = currentPath.startsWith('/kesiswaan');
  const isKurikulumActive = currentPath.startsWith('/akademik') || currentPath.startsWith('/kurikulum');
  const isGuruActive = currentPath === '/pengajar' || currentPath === '/guru';
  const isPublikasiActive =
    currentPath === '/berita' ||
    currentPath === '/agenda' ||
    currentPath === '/info' ||
    currentPath === '/galeri' ||
    currentPath === '/kata-mereka' ||
    currentPath === '/testimoni' ||
    currentPath === '/jurnalistik';
  const isPpdbActive = currentPath === '/ppdb';

  const defaultBannerUrl = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1343&h=342&fit=crop&q=85';
  const activeHeaderBanner = websiteSettings.headerBannerUrl || defaultBannerUrl;

  return (
    <header className="sticky-header-nav sticky top-0 z-50 w-full bg-white/80 hover:bg-white/90 backdrop-blur-2xl backdrop-saturate-200 border-b border-teal-100/60 shadow-xs shadow-teal-950/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand without outline box / container border */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center group text-left cursor-pointer focus:outline-none py-1 transition-transform duration-200 hover:scale-[1.01]"
            title={`Beranda - ${websiteSettings.schoolName}`}
          >
            <img
              src={activeHeaderBanner}
              alt={websiteSettings.headerBannerAlt || websiteSettings.schoolName}
              className="h-10 sm:h-12 md:h-13 lg:h-14 w-auto max-w-[210px] sm:max-w-[290px] md:max-w-[360px] lg:max-w-[430px] object-contain object-left"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultBannerUrl;
              }}
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-medium">
            
            {/* a. Profil */}
            <button
              onClick={() => handleNavClick('/profil')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isProfilActive
                  ? 'bg-teal-50/90 text-teal-800 font-extrabold shadow-xs border border-teal-200/60'
                  : 'text-slate-700 hover:text-teal-700 hover:bg-white/70'
              }`}
            >
              Profil
            </button>

            {/* b. BOSP (Dropdown: Tahun ke tahun, Tanpa icon Dollar ($)) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('bosp')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('/bosp?tahun=2026')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isBospActive || activeDropdown === 'bosp'
                    ? 'bg-teal-50/90 text-teal-800 font-extrabold shadow-xs border border-teal-200/60'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-white/70'
                }`}
              >
                <span>BOSP</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'bosp' ? 'rotate-180 text-teal-700' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'bosp' && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-2xl border border-teal-100 shadow-2xl shadow-teal-950/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5">
                  <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                    <p className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">
                      Laporan Transparansi BOSP
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">Dana Bantuan Operasional Satuan Pendidikan</p>
                  </div>

                  <button
                    onClick={() => handleNavClick('/bosp?tahun=2026')}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-emerald-600" />
                      <span>Tahun Anggaran 2026</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100/90 text-emerald-800">
                      Aktif
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('/bosp?tahun=2027')}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-teal-600" />
                      <span>Tahun Anggaran 2027</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100/90 text-slate-600">
                      Rencana
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('/bosp?tahun=2028')}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-slate-500" />
                      <span>Tahun Anggaran 2028</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100/90 text-slate-600">
                      Proyeksi
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* c. Kesiswaan (Dropdown: OSIS, Ekstrakurikuler, Prestasi Siswa dan Guru) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('kesiswaan')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('/kesiswaan')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isKesiswaanActive || activeDropdown === 'kesiswaan'
                    ? 'bg-teal-50/90 text-teal-800 font-extrabold shadow-xs border border-teal-200/60'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-white/70'
                }`}
              >
                <span>Kesiswaan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'kesiswaan' ? 'rotate-180 text-teal-700' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'kesiswaan' && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-2xl border border-teal-100 shadow-2xl shadow-teal-950/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5">
                  <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                    <p className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">
                      Pengembangan Potensi Santri
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavClick('/kesiswaan?tab=osis')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Shield className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <span className="block font-bold">OSIS</span>
                      <span className="text-[10px] text-slate-500 font-normal">Struktur pengurus & program kerja</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/kesiswaan?tab=ekskul')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block font-bold">Ekstrakurikuler</span>
                      <span className="text-[10px] text-slate-500 font-normal">Pramuka, Tahfidz, Robotik, Hadroh, dll</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/prestasi')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="block font-bold">Prestasi Siswa dan Guru</span>
                      <span className="text-[10px] text-slate-500 font-normal">Juara MTQ, sains, seni & penghargaan</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* d. Kurikulum (Dropdown: Berkas KOSP, Kalender Akademik, Jadwal Mengajar, Administrasi Guru) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('kurikulum')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('/akademik/kosp')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isKurikulumActive || activeDropdown === 'kurikulum'
                    ? 'bg-teal-50/90 text-teal-800 font-extrabold shadow-xs border border-teal-200/60'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-white/70'
                }`}
              >
                <span>Kurikulum</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'kurikulum' ? 'rotate-180 text-teal-700' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'kurikulum' && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-2xl border border-teal-100 shadow-2xl shadow-teal-950/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5">
                  <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                    <p className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">
                      Kurikulum & Perangkat Pendidikan
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavClick('/akademik/kosp')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <span className="block font-bold">Berkas KOSP</span>
                      <span className="text-[10px] text-slate-500 font-normal">Kurikulum Operasional Satuan Pendidikan</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/akademik/kalender')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block font-bold">Kalender Akademik</span>
                      <span className="text-[10px] text-slate-500 font-normal">Jadwal semester, PTS/PAS & libur</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/akademik/jadwal')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="block font-bold">Jadwal Mengajar</span>
                      <span className="text-[10px] text-slate-500 font-normal">Jadwal pembelajaran harian kelas & guru</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/akademik/administrasi')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                    <div>
                      <span className="block font-bold">Administrasi Guru</span>
                      <span className="text-[10px] text-slate-500 font-normal">Modul ajar, silabus, RPP & perangkat ajar</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* e. Guru */}
            <button
              onClick={() => handleNavClick('/pengajar')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isGuruActive
                  ? 'bg-teal-50/90 text-teal-800 font-extrabold shadow-xs border border-teal-200/60'
                  : 'text-slate-700 hover:text-teal-700 hover:bg-white/70'
              }`}
            >
              Guru
            </button>

            {/* f. Publikasi (Dropdown: Berita, agenda sekolah, info sekolah, galeri, Kata Mereka, Jurnalistik) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('publikasi')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('/berita')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isPublikasiActive || activeDropdown === 'publikasi'
                    ? 'bg-teal-50/90 text-teal-800 font-extrabold shadow-xs border border-teal-200/60'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-white/70'
                }`}
              >
                <span>Publikasi</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'publikasi' ? 'rotate-180 text-teal-700' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'publikasi' && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-2xl border border-teal-100 shadow-2xl shadow-teal-950/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5">
                  <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                    <p className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">
                      Warta, Media & Komunikasi
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavClick('/berita')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Newspaper className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <span className="block font-bold">Berita</span>
                      <span className="text-[10px] text-slate-500 font-normal">Kabar warta & rilis resmi sekolah</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/agenda')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block font-bold">Agenda Sekolah</span>
                      <span className="text-[10px] text-slate-500 font-normal">Jadwal kegiatan madrasah & santri</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/info')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <Megaphone className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="block font-bold">Info Sekolah</span>
                      <span className="text-[10px] text-slate-500 font-normal">Pengumuman & edaran resmi</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/galeri')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <span className="block font-bold">Galeri</span>
                      <span className="text-[10px] text-slate-500 font-normal">Dokumentasi foto sarana & kegiatan</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/kata-mereka')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <MessageSquareQuote className="w-4 h-4 text-rose-500 shrink-0" />
                    <div>
                      <span className="block font-bold">Kata Mereka</span>
                      <span className="text-[10px] text-slate-500 font-normal">Testimoni wali santri, alumni & tokoh</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/jurnalistik')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 transition-colors text-left"
                  >
                    <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
                    <div>
                      <span className="block font-bold">Jurnalistik</span>
                      <span className="text-[10px] text-slate-500 font-normal">Mading santri & karya literasi</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* g. PPDB */}
            <button
              onClick={() => handleNavClick('/ppdb')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isPpdbActive
                  ? 'bg-amber-500 text-white font-extrabold shadow-xs shadow-amber-500/25'
                  : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50/80 font-bold'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isPpdbActive ? 'text-white' : 'text-amber-600'}`} />
              <span>PPDB</span>
            </button>

          </nav>

          {/* Right Action Tools: E-TTD & Auth */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Quick Verification Button (E-TTD) */}
            <button
              onClick={() => handleNavClick('/verify')}
              className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-150 cursor-pointer ${
                currentPath.startsWith('/verify')
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-teal-900 bg-white/70 hover:bg-white border border-teal-200/70 hover:border-teal-400 shadow-2xs hover:shadow-xs'
              }`}
              title="Verifikasi Dokumen & Surat Digital E-TTD"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${currentPath.startsWith('/verify') ? 'text-white' : 'text-emerald-600 group-hover:scale-110'} transition-transform`} />
              <span>E-TTD</span>
            </button>

            {/* Portal Login Auth Area */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-teal-200/80 hover:border-teal-400 bg-white/80 hover:bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  title="Menu Akun"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-teal-500/30"
                  />
                  <span className="text-xs font-bold text-teal-950 block truncate max-w-[90px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-teal-600" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-teal-950/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                      <p className="text-xs font-bold text-teal-950 truncate">{user.name}</p>
                      <p className="text-[11px] text-teal-700/70 truncate">{user.email}</p>
                      
                      {user.roles.length > 1 && (
                        <div className="mt-2 pt-2 border-t border-slate-100/80">
                          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">Pilih Peran Aktif:</p>
                          <div className="flex flex-col gap-1">
                            {user.roles.map((r) => (
                              <button
                                key={r}
                                onClick={() => {
                                  switchRole(r);
                                  setUserDropdownOpen(false);
                                }}
                                className={`text-[11px] text-left px-2 py-1 rounded-md transition-colors ${
                                  activeRole === r
                                    ? 'bg-teal-600 text-white font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {getRoleDisplayName(r)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/portal');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50/80 hover:text-teal-700 rounded-xl transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-teal-600" />
                      <span>Dashboard Portal</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-teal-800 to-teal-900 hover:from-teal-700 hover:to-emerald-800 shadow-sm shadow-teal-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer border border-teal-700/50"
                title="Masuk / Login ke Akun"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-200 group-hover:scale-110 transition-transform" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => handleNavClick('/verify')}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold text-teal-900 bg-white/80 border border-teal-200 shadow-2xs flex items-center gap-1"
              title="E-TTD"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>E-TTD</span>
            </button>

            {isAuthenticated && user ? (
              <button
                onClick={() => handleNavClick('/portal')}
                className="p-1 rounded-full border border-teal-300 bg-white"
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-teal-800 to-teal-900 shadow-2xs flex items-center gap-1"
              >
                <LogIn className="w-3 h-3" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-700 hover:bg-white/80 focus:outline-none cursor-pointer ml-0.5"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-teal-100 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl max-h-[85vh] overflow-y-auto ring-1 ring-black/5">
          
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3 border-b border-slate-100/80">
            <button
              onClick={() => handleNavClick('/verify')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-teal-50/80 text-teal-800 border border-teal-200/80"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Verifikasi ETTD</span>
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => handleNavClick('/portal')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-teal-700 text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Portal</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('/login')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-teal-700 text-white"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="flex flex-col space-y-1 text-sm font-medium">
            
            {/* a. Profil */}
            <button
              onClick={() => handleNavClick('/profil')}
              className={`text-left px-3 py-2.5 rounded-xl font-bold ${
                isProfilActive ? 'bg-teal-50/80 text-teal-800' : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              Profil Sekolah
            </button>

            {/* b. BOSP Accordion (Tanpa Dollar icon) */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileBospOpen(!mobileBospOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-bold text-slate-700 hover:bg-white/70"
              >
                <span>BOSP (Transparansi)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileBospOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {mobileBospOpen && (
                <div className="pl-4 pr-2 space-y-1 border-l-2 border-teal-300 ml-3 animate-in fade-in duration-150">
                  <button
                    onClick={() => handleNavClick('/bosp?tahun=2026')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Laporan BOSP Tahun 2026 (Aktif)
                  </button>
                  <button
                    onClick={() => handleNavClick('/bosp?tahun=2027')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-teal-50/80"
                  >
                    • Rencana BOSP Tahun 2027
                  </button>
                  <button
                    onClick={() => handleNavClick('/bosp?tahun=2028')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-teal-50/80"
                  >
                    • Proyeksi BOSP Tahun 2028
                  </button>
                </div>
              )}
            </div>

            {/* c. Kesiswaan Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileKesiswaanOpen(!mobileKesiswaanOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-bold text-slate-700 hover:bg-white/70"
              >
                <span>Kesiswaan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileKesiswaanOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {mobileKesiswaanOpen && (
                <div className="pl-4 pr-2 space-y-1 border-l-2 border-teal-300 ml-3 animate-in fade-in duration-150">
                  <button
                    onClick={() => handleNavClick('/kesiswaan?tab=osis')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • OSIS (Organisasi Siswa)
                  </button>
                  <button
                    onClick={() => handleNavClick('/kesiswaan?tab=ekskul')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Ekstrakurikuler
                  </button>
                  <button
                    onClick={() => handleNavClick('/prestasi')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Prestasi Siswa dan Guru
                  </button>
                </div>
              )}
            </div>

            {/* d. Kurikulum Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileKurikulumOpen(!mobileKurikulumOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-bold text-slate-700 hover:bg-white/70"
              >
                <span>Kurikulum</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileKurikulumOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {mobileKurikulumOpen && (
                <div className="pl-4 pr-2 space-y-1 border-l-2 border-teal-300 ml-3 animate-in fade-in duration-150">
                  <button
                    onClick={() => handleNavClick('/akademik/kosp')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Berkas KOSP
                  </button>
                  <button
                    onClick={() => handleNavClick('/akademik/kalender')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Kalender Akademik
                  </button>
                  <button
                    onClick={() => handleNavClick('/akademik/jadwal')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Jadwal Mengajar
                  </button>
                  <button
                    onClick={() => handleNavClick('/akademik/administrasi')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Administrasi Guru
                  </button>
                </div>
              )}
            </div>

            {/* e. Guru */}
            <button
              onClick={() => handleNavClick('/pengajar')}
              className={`text-left px-3 py-2.5 rounded-xl font-bold ${
                isGuruActive ? 'bg-teal-50/80 text-teal-800' : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              Guru
            </button>

            {/* f. Publikasi Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobilePublikasiOpen(!mobilePublikasiOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-bold text-slate-700 hover:bg-white/70"
              >
                <span>Publikasi</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePublikasiOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {mobilePublikasiOpen && (
                <div className="pl-4 pr-2 space-y-1 border-l-2 border-teal-300 ml-3 animate-in fade-in duration-150">
                  <button
                    onClick={() => handleNavClick('/berita')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Berita
                  </button>
                  <button
                    onClick={() => handleNavClick('/agenda')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Agenda Sekolah
                  </button>
                  <button
                    onClick={() => handleNavClick('/info')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Info Sekolah
                  </button>
                  <button
                    onClick={() => handleNavClick('/galeri')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Galeri
                  </button>
                  <button
                    onClick={() => handleNavClick('/kata-mereka')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Kata Mereka
                  </button>
                  <button
                    onClick={() => handleNavClick('/jurnalistik')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-teal-900 hover:bg-teal-50/80"
                  >
                    • Jurnalistik
                  </button>
                </div>
              )}
            </div>

            {/* g. PPDB */}
            <button
              onClick={() => handleNavClick('/ppdb')}
              className={`text-left px-3 py-2.5 rounded-xl font-bold flex items-center justify-between ${
                isPpdbActive ? 'bg-amber-100 text-amber-900 font-extrabold' : 'text-amber-800 hover:bg-amber-50/70'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>PPDB 2026/2027</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-extrabold">
                Buka
              </span>
            </button>

          </div>

          {isAuthenticated && (
            <div className="pt-3 border-t border-slate-100/80">
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50/80 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Akun</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
