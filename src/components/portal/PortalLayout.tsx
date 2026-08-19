import React from 'react';
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
  ExternalLink,
  School,
  FileCode2,
  Users
} from 'lucide-react';

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
  const { letters, websiteSettings } = useApp();

  // Pending signature count for headmaster / admin
  const pendingLettersCount = letters.filter((l) => l.status === 'REVIEW' || l.status === 'APPROVED').length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard SSO',
      icon: LayoutDashboard,
      path: '/portal',
      show: true
    },
    {
      id: 'e-surat',
      label: 'E-Surat & ETTD',
      icon: Mail,
      path: '/portal/e-surat',
      show: hasPermission('e-surat:read') || hasPermission('letter.view'),
      badge: pendingLettersCount > 0 && (activeRole === 'KEPALA_SEKOLAH' || activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') ? `${pendingLettersCount} Baru` : undefined
    },
    {
      id: 'e-jurnal',
      label: 'E-Jurnal Mengajar',
      icon: BookOpen,
      path: '/portal/e-jurnal',
      show: hasPermission('e-jurnal:read') || hasPermission('journal.view')
    },
    {
      id: 'e-presensi',
      label: 'E-Presensi Live QR',
      icon: QrCode,
      path: '/portal/e-presensi',
      show: hasPermission('e-presensi:read') || hasPermission('attendance.view')
    },
    {
      id: 'e-poin',
      label: 'E-Poin Karakter',
      icon: Award,
      path: '/portal/e-poin',
      show: hasPermission('e-poin:read') || hasPermission('point.view')
    },
    {
      id: 'e-kelulusan',
      label: 'E-Kelulusan & SKL',
      icon: GraduationCap,
      path: '/portal/e-kelulusan',
      show: hasPermission('e-kelulusan:read') || hasPermission('graduation.view')
    },
    {
      id: 'cms',
      label: 'CMS & Layanan',
      icon: Settings,
      path: '/portal/cms',
      show: hasPermission('cms:edit') || hasPermission('cms.edit') || hasPermission('cms.view')
    }
  ];

  const getRoleDisplayName = (role: RoleType | string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Administrator';
      case 'ADMIN':
        return 'Administrator';
      case 'KEPALA_SEKOLAH':
        return 'Kepala Sekolah';
      case 'GURU':
        return 'Guru Mata Pelajaran';
      case 'WALI_KELAS':
        return 'Wali Kelas';
      case 'TU':
        return 'Staf Tata Usaha';
      case 'SISWA':
        return 'Siswa';
      case 'ORANG_TUA':
        return 'Orang Tua / Wali';
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf9] text-teal-950 transition-colors">
      
      {/* Portal Top Bar */}
      <header className="sticky top-0 z-40 glass-panel-strong border-b border-teal-100 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand & Module Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/portal')}
              className="flex items-center gap-2 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-teal-700/20">
                <School className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-sm text-teal-950 leading-tight">
                  Portal Terpadu SSO
                </h1>
                <p className="text-[10px] text-teal-700/70 font-mono">
                  {websiteSettings.schoolName}
                </p>
              </div>
            </button>

            <span className="hidden md:inline text-teal-200">/</span>

            {/* Breadcrumb Section Name */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-teal-700">
              <Layers className="w-3.5 h-3.5" />
              <span className="capitalize">{currentSection.replace('portal/', '').replace('-', ' ') || 'Dashboard'}</span>
            </div>
          </div>

          {/* Right User Profile & Role Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Multi-role switcher if user has more than 1 role */}
            {user && user.roles.length > 1 && (
              <div className="hidden sm:flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-teal-200 text-xs shadow-xs">
                <span className="text-[10px] text-teal-600 font-bold">Peran Aktif:</span>
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as UserRole)}
                  className="bg-transparent text-xs font-bold text-teal-800 focus:outline-none cursor-pointer"
                >
                  {user.roles.map((r) => (
                    <option key={r} value={r} className="text-teal-950 bg-white">
                      {getRoleDisplayName(r)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* User Profile Pill */}
            {user && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl glass-panel border border-teal-200 shadow-xs">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-xl object-cover border border-teal-400/40"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-teal-950 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-teal-700 font-semibold">
                    {getRoleDisplayName(activeRole)}
                  </p>
                </div>
              </div>
            )}

            {/* Public Web View Shortcut */}
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl text-teal-700 hover:text-teal-950 hover:bg-teal-50 border border-teal-100 transition-colors"
              title="Lihat Web Publik"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-2 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 border border-rose-100 transition-colors"
              title="Keluar SSO"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Portal Module Navigation Bar */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-teal-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {menuItems
            .filter((item) => item.show)
            .map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/portal'
                  ? currentSection === 'portal' || currentSection === 'portal/'
                  : currentSection.startsWith(item.path.substring(1));

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:bg-teal-50 hover:text-teal-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </header>

      {/* Main Portal Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  );
};
