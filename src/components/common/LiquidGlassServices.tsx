import React, { useState } from 'react';
import { SystemService } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { DynamicIcon } from './DynamicIcon';
import {
  ExternalLink,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  FileCode2,
  CheckCircle2
} from 'lucide-react';

interface LiquidGlassServicesProps {
  navigate: (path: string) => void;
  onOpenExternalModal?: (service: SystemService) => void;
}

export const LiquidGlassServices: React.FC<LiquidGlassServicesProps> = ({
  navigate,
  onOpenExternalModal
}) => {
  const { systemServices } = useApp();
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter only active services and sort
  const activeServices = systemServices
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const categories = [
    { id: 'all', label: 'Semua Layanan' },
    { id: 'academic', label: 'Akademik' },
    { id: 'administration', label: 'Administrasi & E-Surat' },
    { id: 'student', label: 'Kesiswaan & Karakter' },
    { id: 'finance', label: 'Keuangan & Eksternal GAS' }
  ];

  const filteredServices = activeCategory === 'all'
    ? activeServices
    : activeServices.filter((s) => s.category === activeCategory || (activeCategory === 'finance' && s.type === 'EXTERNAL'));

  const handleServiceClick = (service: SystemService) => {
    if (service.type === 'INTERNAL') {
      if (service.authRequired && !isAuthenticated) {
        navigate('/portal/login?redirect=' + encodeURIComponent(service.url));
      } else {
        navigate(service.url);
      }
    } else {
      // External service (e.g. Google Apps Script)
      if (onOpenExternalModal) {
        onOpenExternalModal(service);
      } else {
        window.open(service.url, service.target || '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <section id="services" className="relative py-20 overflow-hidden bg-[#f7faf9]">
      {/* Subtle Liquid Glow Elements */}
      <div className="liquid-glow w-96 h-96 bg-teal-500/10 -top-20 -left-20" />
      <div className="liquid-glow w-96 h-96 bg-amber-500/10 -bottom-20 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Digital Services Navigator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
            Pusat Layanan Digital Terpadu
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Akses satu pintu seluruh sistem operasional sekolah, manajemen persuratan ETTD, presensi QR dinamis, jurnal pengajaran, hingga integrasi Google Apps Script.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:text-teal-700 hover:border-teal-300 border border-teal-100 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const isExternal = service.type === 'EXTERNAL';
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="group relative glass-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between overflow-hidden border-teal-100/90 hover:border-teal-400/60 shadow-xs hover:shadow-lg hover:shadow-teal-900/5 transition-all"
              >
                {/* Subtle top indicator highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Icon & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${
                      isExternal
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-teal-50 text-teal-700 border border-teal-200'
                    }`}>
                      <DynamicIcon name={service.icon} className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {service.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isExternal
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-teal-100 text-teal-800 border border-teal-300'
                        }`}>
                          {service.badge}
                        </span>
                      )}
                      {service.authRequired && !isAuthenticated && (
                        <span className="p-1 rounded-md bg-slate-100 text-slate-500" title="Memerlukan Login SSO">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-lg text-teal-950 group-hover:text-teal-700 transition-colors flex items-center gap-1.5">
                    <span>{service.name}</span>
                    {isExternal && (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0" />
                    )}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Interactive Meta */}
                <div className="mt-6 pt-4 border-t border-teal-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                    {isExternal ? (
                      <>
                        <FileCode2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Google Apps Script</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        <span>Internal Portal SSO</span>
                      </>
                    )}
                  </div>

                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-teal-50 text-teal-700 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Integration Notice */}
        <div className="mt-12 glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal-200 shadow-xs">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-950">
                Sistem Dinamis & Terintegrasi
              </p>
              <p className="text-xs text-slate-600">
                Layanan di atas dikelola langsung melalui CMS System Manager dan mendukung penambahan aplikasi baru maupun Google Apps Script tanpa re-deploy.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/portal/login')}
            className="px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            Akses Seluruh Portal →
          </button>
        </div>

      </div>
    </section>
  );
};
