import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole, RoleType } from '../../types';
import {
  LayoutDashboard,
  Mail,
  BookOpen,
  QrCode,
  Award,
  GraduationCap,
  Settings,
  ShieldCheck,
  LogOut,
  UserCheck,
  Layers,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  School,
  FileText,
  Clock,
  Calendar,
  Bell,
  Trophy,
  Filter,
  HardDrive,
  Image as ImageIcon,
  Newspaper,
  Link as LinkIcon,
  Sliders,
  PlusCircle,
  CheckCircle2,
  Activity,
  Users,
  Menu,
  X,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  ArrowRight,
  FileCheck
} from 'lucide-react';

interface SubMenuItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  path?: string;
}

interface PrimaryModule {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  path: string;
  show: boolean;
  badge?: string | number;
  badgeColor?: string;
  description: string;
  subMenus: SubMenuItem[];
}

interface PortalLayoutProps {
  currentSection: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  currentSection,
  navigate,
  children
}) => {
  const { user, logout, hasPermission, activeRole, setActiveRole } = useAuth();
  const { letters, websiteSettings, mediaAssets, students, dailyAttendance } = useApp();

  // Secondary sidebar collapse state (persisted in localStorage or default open)
  const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<string>('');
  const [subMenuSearch, setSubMenuSearch] = useState<string>('');
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // Pending signature count for headmaster / admin
  const pendingLettersCount = letters.filter((l) => l.status === 'REVIEW' || l.status === 'APPROVED').length;

  const modules: PrimaryModule[] = [
    {
      id: 'dashboard',
      label: 'Dashboard SSO',
      shortLabel: 'SSO',
      icon: LayoutDashboard,
      path: '/portal',
      show: true,
      description: 'Pusat kontrol terpadu & integrasi layanan aplikasi',
      subMenus: [
        {
          id: 'overview',
          label: 'Ringkasan & Metrik',
          description: 'Statistik aktivitas & status aplikasi',
          icon: LayoutDashboard
        },
        {
          id: 'external-apps',
          label: 'Layanan GAS Eksternal',
          description: 'CBT, E-Rapor, E-Perpus & Sistem GAS',
          icon: Layers
        },
        {
          id: 'activity-log',
          label: 'Aktivitas & Log Audit',
          description: 'Riwayat login & pembaruan data',
          icon: Activity
        },
        {
          id: 'user-profile',
          label: 'Profil & Hak Akses',
          description: 'Detail otentikasi & peran aktif',
          icon: Users
        }
      ]
    },
    {
      id: 'e-surat',
      label: 'E-Surat & ETTD',
      shortLabel: 'E-TTD',
      icon: Mail,
      path: '/portal/e-surat',
      show: hasPermission('e-surat:read') || hasPermission('letter.view'),
      badge: pendingLettersCount > 0 && (activeRole === 'KEPALA_SEKOLAH' || activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') ? `${pendingLettersCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white',
      description: 'Layanan persuratan dinas & tanda tangan elektronik',
      subMenus: [
        {
          id: 'outbox',
          label: 'Surat Keluar (Arsip)',
          description: 'Daftar semua arsip surat terbit',
          icon: FileText
        },
        {
          id: 'pending_sign',
          label: 'Menunggu E-TTD Kepsek',
          description: 'Approval & verifikasi tanda tangan PIN',
          icon: ShieldCheck,
          badge: pendingLettersCount > 0 ? `${pendingLettersCount} Baru` : undefined,
          badgeColor: 'bg-rose-500 text-white font-bold'
        },
        {
          id: 'create',
          label: 'Buat Surat Baru',
          description: 'Form otomatis & template surat resmi',
          icon: PlusCircle
        },
        {
          id: 'inbox',
          label: 'Surat Masuk & Disposisi',
          description: 'Agenda surat masuk & disposisi digital',
          icon: Mail
        },
        {
          id: 'public_verify',
          label: 'Verifikasi QR Publik',
          description: 'Buka scanner validasi dokumen',
          icon: CheckCircle2,
          path: '/verify'
        }
      ]
    },
    {
      id: 'e-jurnal',
      label: 'E-Jurnal Mengajar',
      shortLabel: 'Jurnal',
      icon: BookOpen,
      path: '/portal/e-jurnal',
      show: hasPermission('e-jurnal:read') || hasPermission('journal.view'),
      description: 'Jurnal KBM harian, jadwal & rekap penilaian guru',
      subMenus: [
        {
          id: 'journals',
          label: 'Riwayat Jurnal KBM',
          description: 'Daftar materi & catatan harian mengajar',
          icon: BookOpen
        },
        {
          id: 'schedules',
          label: 'Jadwal Pembelajaran',
          description: 'Jadwal tatap muka & alokasi jam kelas',
          icon: Clock
        },
        {
          id: 'grades',
          label: 'Buku Nilai Siswa',
          description: 'Rekapitulasi asesmen & nilai formatif',
          icon: Award
        }
      ]
    },
    {
      id: 'e-presensi',
      label: 'E-Presensi Live QR',
      shortLabel: 'Presensi',
      icon: QrCode,
      path: '/portal/e-presensi',
      show: hasPermission('e-presensi:read') || hasPermission('attendance.view'),
      description: 'Presensi dinamis QR code & notifikasi kehadiran realtime',
      subMenus: [
        {
          id: 'live_qr',
          label: 'Live QR Code Presensi',
          description: 'QR dinamis berpenghitung mundur',
          icon: QrCode
        },
        {
          id: 'history',
          label: 'Log Presensi Harian',
          description: 'Rekap kehadiran santri & guru harian',
          icon: Calendar
        },
        {
          id: 'notifications',
          label: 'Notifikasi Ortu',
          description: 'Broadcast status kehadiran ke wali',
          icon: Bell
        }
      ]
    },
    {
      id: 'e-poin',
      label: 'E-Poin Karakter',
      shortLabel: 'Poin',
      icon: Award,
      path: '/portal/e-poin',
      show: hasPermission('e-poin:read') || hasPermission('point.view'),
      description: 'Pencatatan poin apresiasi prestasi & kedisiplinan santri',
      subMenus: [
        {
          id: 'transactions',
          label: 'Catatan Poin Siswa',
          description: 'Log transaksi reward & pelanggaran',
          icon: Award
        },
        {
          id: 'leaderboard',
          label: 'Peringkat Santri Teladan',
          description: 'Top santri berprestasi',
          icon: Trophy
        },
        {
          id: 'categories',
          label: 'Katalog & Kriteria Poin',
          description: 'Daftar pedoman poin reward & sanksi',
          icon: Filter
        }
      ]
    },
    {
      id: 'e-kelulusan',
      label: 'E-Kelulusan & SKL',
      shortLabel: 'SKL',
      icon: GraduationCap,
      path: '/portal/e-kelulusan',
      show: hasPermission('e-kelulusan:read') || hasPermission('graduation.view'),
      description: 'Penerbitan Surat Keterangan Lulus & portal pengumuman',
      subMenus: [
        {
          id: 'records',
          label: 'Daftar SKL Santri',
          description: 'Surat Keterangan Lulus ber-barcode resmi',
          icon: GraduationCap
        },
        {
          id: 'publish',
          label: 'Status Pengumuman',
          description: 'Publikasi kelulusan & cetak berkas',
          icon: CheckCircle2
        }
      ]
    },
    {
      id: 'cms',
      label: 'Admin CMS & Drive',
      shortLabel: 'CMS',
      icon: Settings,
      path: '/portal/cms',
      show: hasPermission('cms:edit') || hasPermission('cms.edit') || hasPermission('cms.view'),
      badge: 'Drive',
      badgeColor: 'bg-emerald-600 text-white',
      description: 'Pengaturan identitas sekolah, berita & drive media',
      subMenus: [
        {
          id: 'media',
          label: 'Drive Media Situs',
          description: 'Ruang penyimpanan foto & aset ala WordPress',
          icon: HardDrive,
          badge: `${mediaAssets.length} Aset`,
          badgeColor: 'bg-teal-700 text-white'
        },
        {
          id: 'identity',
          label: 'Identitas & TTD Kepsek',
          description: 'Logo, banner 1343x342, spesimen TTD',
          icon: School
        },
        {
          id: 'slides',
          label: 'Carousel Hero Slides',
          description: 'Banner berputar halaman beranda',
          icon: ImageIcon
        },
        {
          id: 'news',
          label: 'Berita & Pengumuman',
          description: 'Manajemen artikel & karya santri',
          icon: Newspaper
        },
        {
          id: 'services',
          label: 'Integrasi Layanan & GAS',
          description: 'Pengaturan link aplikasi eksternal',
          icon: LinkIcon
        },
        {
          id: 'navigation',
          label: 'Menu Navigasi Publik',
          description: 'Struktur navbar website publik',
          icon: Sliders
        }
      ]
    }
  ];

  // Identify active primary module from currentSection
  const activeModule = modules.find((m) => {
    if (m.path === '/portal') {
      return currentSection === '/portal' || currentSection === 'portal' || currentSection === 'portal/';
    }
    return currentSection.startsWith(m.path) || currentSection.startsWith(m.path.substring(1));
  }) || modules[0];

  // Switch Sub-Tab handler
  const handleSubMenuClick = (sub: SubMenuItem) => {
    setActiveSubTab(sub.id);
    setMobileDrawerOpen(false);

    if (sub.path) {
      navigate(sub.path);
      return;
    }

    // Ensure we are on the active module page
    if (!currentSection.startsWith(activeModule.path)) {
      navigate(activeModule.path);
    }

    // Dispatch global event for the submodule to update its internal tab state
    window.dispatchEvent(
      new CustomEvent('portal-subtab-change', {
        detail: { module: activeModule.id, tab: sub.id }
      })
    );
  };

  const handleModuleClick = (mod: PrimaryModule) => {
    navigate(mod.path);
    setActiveSubTab('');
    setMobileDrawerOpen(false);
  };

  const getRoleDisplayName = (role: RoleType | string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMIN':
        return 'Admin CMS';
      case 'KEPALA_SEKOLAH':
        return 'Kepala Sekolah';
      case 'GURU':
        return 'Guru Mapel';
      case 'WALI_KELAS':
        return 'Wali Kelas';
      case 'TU':
        return 'Tata Usaha';
      case 'SISWA':
        return 'Siswa';
      case 'ORANG_TUA':
        return 'Orang Tua';
      default:
        return role;
    }
  };

  // Filtered sub-menus based on search inside secondary sidebar
  const filteredSubMenus = activeModule.subMenus.filter((sub) =>
    sub.label.toLowerCase().includes(subMenuSearch.toLowerCase()) ||
    (sub.description && sub.description.toLowerCase().includes(subMenuSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-teal-950 flex flex-col antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Top Header Bar for Portal (Slim, Unified Breadcrumb, Actions & Profile) */}
      <header className="sticky top-0 z-40 h-16 bg-white/85 backdrop-blur-xl border-b border-teal-100/90 shadow-2xs px-4 sm:px-6 flex items-center justify-between transition-all">
        
        {/* Left: Mobile Toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden p-2 rounded-xl bg-teal-50/80 text-teal-800 hover:bg-teal-100 border border-teal-200/70 transition-colors cursor-pointer"
            aria-label="Buka Menu Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* School Brand & Monogram (Desktop) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/portal')}
              className="flex items-center gap-2 text-left cursor-pointer group"
              title={`Portal SSO - ${websiteSettings.schoolName}`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-800 via-teal-700 to-emerald-600 text-white flex items-center justify-center font-extrabold shadow-sm shadow-teal-900/20 group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-heading font-extrabold text-sm text-teal-950 leading-tight">
                    Portal SSO Terpadu
                  </h1>
                  <span className="px-1.5 py-0.2 rounded-md bg-teal-100 text-teal-800 text-[10px] font-mono font-bold">
                    v2.6
                  </span>
                </div>
                <p className="text-[11px] text-teal-700/70 truncate max-w-[200px] md:max-w-[280px]">
                  {websiteSettings.schoolName}
                </p>
              </div>
            </button>

            <span className="hidden md:inline text-teal-300 font-light">/</span>

            {/* Breadcrumb Module & Submenu */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-teal-800">
              <activeModule.icon className="w-4 h-4 text-teal-600" />
              <span>{activeModule.label}</span>
              {activeSubTab && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-950 font-bold capitalize">
                    {activeModule.subMenus.find((s) => s.id === activeSubTab)?.label || activeSubTab}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Tools, Role Selector, User Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Public Site Link */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-teal-800 bg-teal-50/80 hover:bg-teal-100 border border-teal-200/70 transition-all shadow-2xs cursor-pointer"
            title="Buka Website Publik Sekolah"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Web Publik</span>
          </button>

          {/* Active Role Selector */}
          {user && user.roles.length > 1 && (
            <div className="hidden md:flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-teal-200 text-xs shadow-2xs">
              <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Peran:</span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-bold text-teal-900 focus:outline-none cursor-pointer pr-1"
              >
                {user.roles.map((r) => (
                  <option key={r} value={r} className="text-teal-950 bg-white">
                    {getRoleDisplayName(r)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* User Profile Pill & Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-white/90 hover:bg-white border border-teal-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-teal-400/50"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-teal-950 leading-none truncate max-w-[110px]">
                    {user.name.split(' ')[0]}
                  </p>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-teal-600 transition-transform ${userDropdownOpen ? 'rotate-90' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-2xl border border-teal-100 shadow-2xl shadow-teal-950/15 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5"
                >
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-extrabold text-teal-950 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {getRoleDisplayName(activeRole)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/portal');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-teal-600" />
                    <span>Dashboard SSO</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/verify');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50/80 hover:text-teal-800 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verifikasi E-TTD Publik</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left mt-1 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar dari Portal</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Logout Shortcut Button */}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="p-2 rounded-full text-rose-500 hover:text-rose-700 hover:bg-rose-50/90 border border-rose-100 transition-colors cursor-pointer"
            title="Keluar SSO"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dual Sidebar & Content Workspace Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ========================================================= */}
        {/* SIDEBAR 1: PRIMARY MAIN MODULE RAIL (Desktop Left)       */}
        {/* ========================================================= */}
        <aside className="hidden lg:flex flex-col justify-between w-[76px] shrink-0 bg-[#09221e] border-r border-[#153a34] text-slate-300 py-4 px-2 z-30 select-none shadow-md shadow-teal-950/20">
          
          {/* Top Primary Navigation Modules */}
          <div className="space-y-4">
            
            {/* Primary Modules Stack */}
            <nav className="flex flex-col gap-2">
              {modules
                .filter((m) => m.show)
                .map((mod) => {
                  const Icon = mod.icon;
                  const isModActive = activeModule.id === mod.id;

                  return (
                    <button
                      key={mod.id}
                      onClick={() => handleModuleClick(mod)}
                      className={`relative group flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                        isModActive
                          ? 'bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-bold shadow-lg shadow-teal-900/40 scale-[1.03]'
                          : 'text-slate-400 hover:text-teal-100 hover:bg-white/5'
                      }`}
                      title={`${mod.label} - ${mod.description}`}
                    >
                      {/* Active Indicator Bar on Left */}
                      {isModActive && (
                        <div className="absolute -left-2 top-2.5 bottom-2.5 w-1 rounded-r-full bg-emerald-400" />
                      )}

                      <div className="relative">
                        <Icon className={`w-5 h-5 transition-transform duration-150 ${isModActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                        {mod.badge && (
                          <span className={`absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black leading-tight border border-[#09221e] ${mod.badgeColor || 'bg-amber-400 text-teal-950'}`}>
                            {mod.badge}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-bold mt-1 text-center leading-tight tracking-tight">
                        {mod.shortLabel}
                      </span>

                      {/* Tooltip on Hover */}
                      <div className="absolute left-[84px] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
                        <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-slate-700">
                          {mod.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
            </nav>
          </div>

          {/* Bottom Rail Actions */}
          <div className="pt-3 border-t border-white/10 flex flex-col items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-xl text-slate-400 hover:text-teal-200 hover:bg-white/5 transition-colors cursor-pointer"
              title="Lihat Website Publik"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* SIDEBAR 2: SECONDARY SUB-MENU & SYSTEM SIDEBAR           */}
        {/* ========================================================= */}
        <aside
          className={`hidden lg:flex flex-col justify-between shrink-0 bg-white border-r border-teal-100/90 transition-all duration-300 z-20 shadow-xs ${
            isSecondaryCollapsed ? 'w-0 overflow-hidden opacity-0 border-none' : 'w-[268px] opacity-100'
          }`}
        >
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4">
            
            {/* Active Module Header Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 via-teal-50/50 to-emerald-50/30 border border-teal-100/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-teal-800 text-white font-mono text-[9px] font-extrabold uppercase tracking-wider">
                  Modul Sistem
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Sistem Aktif" />
              </div>
              <h2 className="font-heading font-extrabold text-sm text-teal-950 flex items-center gap-2">
                <activeModule.icon className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="truncate">{activeModule.label}</span>
              </h2>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {activeModule.description}
              </p>
            </div>

            {/* Sub-menu Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari menu sub-sistem..."
                value={subMenuSearch}
                onChange={(e) => setSubMenuSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-teal-100/80 text-xs text-teal-950 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition-all"
              />
            </div>

            {/* Sub-menu System Navigation List */}
            <div className="space-y-1">
              <div className="px-2 pb-1 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                  Sub Menu Sistem
                </span>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded">
                  {filteredSubMenus.length}
                </span>
              </div>

              <div className="space-y-1">
                {filteredSubMenus.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = activeSubTab === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubMenuClick(sub)}
                      className={`w-full group flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                        isSubActive
                          ? 'bg-teal-50/90 text-teal-950 font-bold border border-teal-200/80 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-teal-900 border border-transparent'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                        isSubActive
                          ? 'bg-teal-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-800'
                      }`}>
                        <SubIcon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold truncate">
                            {sub.label}
                          </span>
                          {sub.badge && (
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${sub.badgeColor || 'bg-teal-100 text-teal-800'}`}>
                              {sub.badge}
                            </span>
                          )}
                        </div>
                        {sub.description && (
                          <p className="text-[10px] text-slate-600 truncate mt-0.5">
                            {sub.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Context Action based on Active Module */}
            {activeModule.id === 'e-surat' && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSubMenuClick({ id: 'create', label: 'Buat Surat Baru', icon: PlusCircle })}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 shadow-sm shadow-teal-950/10 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Buat Surat Baru</span>
                </button>
              </div>
            )}

            {activeModule.id === 'cms' && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSubMenuClick({ id: 'media', label: 'Drive Media Situs', icon: HardDrive })}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 shadow-2xs transition-all cursor-pointer"
                >
                  <HardDrive className="w-4 h-4 text-teal-700" />
                  <span>Buka Drive Media</span>
                </button>
              </div>
            )}
          </div>

          {/* Secondary Sidebar Footer Card */}
          <div className="p-3 border-t border-teal-100/70 bg-slate-50/60 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span className="font-bold text-teal-950">{getRoleDisplayName(activeRole)}</span>
            </div>
            <span className="font-mono text-[10px]">Al Hikmah v2.6</span>
          </div>
        </aside>

        {/* Toggle Collapse Button for Secondary Sidebar (Floating on Desktop) */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => setIsSecondaryCollapsed(!isSecondaryCollapsed)}
            className="w-4 h-12 -ml-2 z-30 flex items-center justify-center rounded-r-md bg-white border border-l-0 border-teal-200/90 text-teal-700 hover:text-teal-950 hover:bg-teal-50 shadow-2xs transition-all cursor-pointer"
            title={isSecondaryCollapsed ? 'Tampilkan Sidebar Sub Menu' : 'Sembunyikan Sidebar'}
          >
            {isSecondaryCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>

        {/* ========================================================= */}
        {/* MOBILE DRAWER: DUAL STACKED SIDEBAR FOR MOBILE & TABLET   */}
        {/* ========================================================= */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-teal-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Slide-in Drawer with Dual Stack */}
            <div className="relative flex w-full max-w-sm bg-white shadow-2xl z-50 h-full animate-in slide-in-from-left duration-200">
              
              {/* Primary Rail in Mobile Drawer */}
              <div className="w-20 bg-[#09221e] text-slate-300 py-4 px-1.5 flex flex-col justify-between shrink-0">
                <div className="space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold">
                    <School className="w-6 h-6" />
                  </div>

                  <nav className="flex flex-col gap-1.5">
                    {modules
                      .filter((m) => m.show)
                      .map((mod) => {
                        const Icon = mod.icon;
                        const isModActive = activeModule.id === mod.id;

                        return (
                          <button
                            key={mod.id}
                            onClick={() => handleModuleClick(mod)}
                            className={`flex flex-col items-center p-2 rounded-xl text-center cursor-pointer ${
                              isModActive
                                ? 'bg-teal-600 text-white font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[9px] font-bold mt-0.5">{mod.shortLabel}</span>
                          </button>
                        );
                      })}
                  </nav>
                </div>

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/50 flex flex-col items-center"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-[8px] font-bold">Keluar</span>
                </button>
              </div>

              {/* Secondary Submenu Column in Mobile Drawer */}
              <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto bg-white">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-heading font-extrabold text-sm text-teal-950">
                        {activeModule.label}
                      </h3>
                      <p className="text-[10px] text-slate-500">Sub Menu Sistem</p>
                    </div>
                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {activeModule.subMenus.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeSubTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubMenuClick(sub)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left cursor-pointer ${
                            isSubActive
                              ? 'bg-teal-50 text-teal-950 font-bold border border-teal-200'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <SubIcon className="w-4 h-4 text-teal-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">{sub.label}</p>
                            {sub.description && (
                              <p className="text-[10px] text-slate-600 truncate">{sub.description}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-teal-800 bg-teal-50 rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Lihat Web Publik</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN WORKSPACE CONTENT AREA                              */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto bg-[#f4f7f6] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
