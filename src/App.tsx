import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { SystemService } from './types';

// Public Pages
import { HeaderNavbar } from './components/common/HeaderNavbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/public/LandingPage';
import { ProfilePage } from './components/public/ProfilePage';
import { NewsPage } from './components/public/NewsPage';
import { EventsPage } from './components/public/EventsPage';
import { AchievementsPage } from './components/public/AchievementsPage';
import { GalleryPage } from './components/public/GalleryPage';
import { PPDBPage } from './components/public/PPDBPage';
import { PublicVerificationPage } from './components/public/PublicVerificationPage';
import { BOSPPage } from './components/public/BOSPPage';
import { AkademikPage } from './components/public/AkademikPage';
import { TeachersPage } from './components/public/TeachersPage';
import { JournalismPage } from './components/public/JournalismPage';

// Portal & Authentication
import { LoginPage } from './components/portal/LoginPage';
import { PortalLayout } from './components/portal/PortalLayout';
import { DashboardHome } from './components/portal/DashboardHome';
import { ESuratModule } from './components/portal/ESuratModule';
import { EJurnalModule } from './components/portal/EJurnalModule';
import { EPresensiModule } from './components/portal/EPresensiModule';
import { EPoinModule } from './components/portal/EPoinModule';
import { EKelulusanModule } from './components/portal/EKelulusanModule';
import { CMSModule } from './components/portal/CMSModule';

// Common Modals & Elements
import { ExternalAppModal } from './components/common/ExternalAppModal';
import { StickyCapsuleFooter } from './components/common/StickyCapsuleFooter';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Custom router state synchronized with browser history and popstate
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || window.location.pathname || '/';
  });

  const [externalModalService, setExternalModalService] = useState<SystemService | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentPath(hash || window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState(null, '', `#${path}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExternalService = (service: SystemService) => {
    if (service.openMode === 'MODAL') {
      setExternalModalService(service);
    } else {
      window.open(service.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine which page to render
  const isPortalRoute = currentPath.startsWith('/portal');

  // If user accesses login page or tries to access portal while not authenticated, show standalone fullscreen LoginPage
  if ((isPortalRoute && !isAuthenticated) || currentPath === '/login' || currentPath === '/portal/login') {
    return (
      <LoginPage navigate={navigate} redirectPath={currentPath === '/login' || currentPath === '/portal/login' ? '/portal' : currentPath} />
    );
  }

  // Portal Layout with sub-modules
  if (isPortalRoute) {
    let portalContent = <DashboardHome navigate={navigate} onOpenExternalModal={handleOpenExternalService} />;

    if (currentPath === '/portal/e-surat') {
      portalContent = <ESuratModule />;
    } else if (currentPath === '/portal/e-jurnal') {
      portalContent = <EJurnalModule />;
    } else if (currentPath === '/portal/e-presensi') {
      portalContent = <EPresensiModule />;
    } else if (currentPath === '/portal/e-poin') {
      portalContent = <EPoinModule />;
    } else if (currentPath === '/portal/e-kelulusan') {
      portalContent = <EKelulusanModule />;
    } else if (currentPath === '/portal/cms') {
      portalContent = <CMSModule />;
    }

    return (
      <PortalLayout currentSection={currentPath} navigate={navigate}>
        {portalContent}
        <ExternalAppModal
          service={externalModalService}
          isOpen={!!externalModalService}
          onClose={() => setExternalModalService(null)}
        />
        <StickyCapsuleFooter />
      </PortalLayout>
    );
  }

  // Public Routes rendering
  let publicPage = <LandingPage navigate={navigate} onOpenExternalModal={handleOpenExternalService} />;

  if (currentPath === '/profil') {
    publicPage = <ProfilePage />;
  } else if (currentPath.startsWith('/bosp')) {
    // Extract year from query param or default to 2026
    const urlParams = new URLSearchParams(window.location.search || (currentPath.includes('?') ? currentPath.split('?')[1] : ''));
    const yearParam = urlParams.get('tahun') || '2026';
    publicPage = <BOSPPage initialYear={yearParam} navigate={navigate} />;
  } else if (currentPath.startsWith('/akademik')) {
    let initialTab: 'kosp' | 'jadwal' | 'administrasi' = 'kosp';
    if (currentPath.includes('jadwal')) initialTab = 'jadwal';
    else if (currentPath.includes('administrasi')) initialTab = 'administrasi';
    publicPage = <AkademikPage initialTab={initialTab} navigate={navigate} />;
  } else if (currentPath === '/pengajar' || currentPath === '/guru') {
    publicPage = <TeachersPage navigate={navigate} />;
  } else if (currentPath === '/jurnalistik') {
    publicPage = <JournalismPage navigate={navigate} />;
  } else if (currentPath === '/berita') {
    publicPage = <NewsPage navigate={navigate} />;
  } else if (currentPath === '/agenda') {
    publicPage = <EventsPage />;
  } else if (currentPath === '/prestasi') {
    publicPage = <AchievementsPage />;
  } else if (currentPath === '/galeri') {
    publicPage = <GalleryPage />;
  } else if (currentPath === '/ppdb') {
    publicPage = <PPDBPage />;
  } else if (currentPath === '/verify' || currentPath === '/verifikasi' || currentPath.startsWith('/verify') || currentPath.startsWith('/verifikasi')) {
    // Extract token query or parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || undefined;
    publicPage = <PublicVerificationPage navigate={navigate} initialToken={token} />;
  } else if (currentPath === '/login') {
    publicPage = <LoginPage navigate={navigate} redirectPath="/portal" />;
  }

  return (
    <div className="min-h-screen bg-[#f7faf9] text-teal-950 flex flex-col justify-between selection:bg-amber-400/40 selection:text-teal-950 transition-colors duration-300">
      <HeaderNavbar currentPath={currentPath} navigate={navigate} />
      <main className="flex-1">
        {publicPage}
      </main>
      <Footer navigate={navigate} />

      {/* Sticky Capsule Footer matching user's design */}
      <StickyCapsuleFooter />

      {/* External Service Google Apps Script Modal */}
      <ExternalAppModal
        service={externalModalService}
        isOpen={!!externalModalService}
        onClose={() => setExternalModalService(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
