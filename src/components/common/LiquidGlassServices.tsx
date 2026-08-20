import React, { useState } from 'react';
import { SystemService } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { DynamicIcon } from './DynamicIcon';
import {
  ExternalLink,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileCode2,
  ChevronDown,
  ChevronUp,
  LayoutGrid
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Filter only active services and sort
  const activeServices = systemServices
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // By default only show 3 top cards, expand to show all when toggled
  const displayedServices = isExpanded ? activeServices : activeServices.slice(0, 3);

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
    <section id="services" className="relative pt-12 pb-18 overflow-hidden bg-[#f7faf9]">
      {/* Subtle Liquid Glow Elements */}
      <div className="liquid-glow w-96 h-96 bg-teal-500/10 -top-20 -left-20" />
      <div className="liquid-glow w-96 h-96 bg-amber-500/10 -bottom-20 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
            Pusat Layanan Digital Terpadu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Akses satu pintu seluruh sistem operasional sekolah, manajemen persuratan ETTD, presensi QR dinamis, jurnal pengajaran, hingga integrasi Google Apps Script.
          </p>
        </div>

        {/* Dynamic Services Grid - 3 Columns Rectangular Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => {
            const isExternal = service.type === 'EXTERNAL';
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className={`group relative p-6 rounded-3xl cursor-pointer flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 shadow-sm hover:shadow-2xl ${
                  isExternal
                    ? 'bg-white hover:bg-gradient-to-br hover:from-amber-500 hover:via-orange-600 hover:to-amber-700 hover:shadow-orange-950/30'
                    : 'bg-white hover:bg-gradient-to-br hover:from-[#063b33] hover:via-[#042822] hover:to-[#021815] hover:shadow-emerald-950/35'
                }`}
              >
                {/* Subtle top indicator highlight */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    isExternal
                      ? 'bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300'
                      : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-500'
                  }`}
                />

                {/* Card Main Body */}
                <div className="space-y-4">
                  {/* Top Bar: Icon & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-110 ${
                        isExternal
                          ? 'bg-amber-50 text-amber-700 group-hover:bg-white/20 group-hover:text-amber-100 group-hover:shadow-amber-900/30'
                          : 'bg-teal-50 text-teal-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:shadow-emerald-950/40'
                      }`}
                    >
                      <DynamicIcon name={service.icon} className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {service.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all duration-300 ${
                            isExternal
                              ? 'bg-amber-100 text-amber-900 group-hover:bg-white/20 group-hover:text-white'
                              : 'bg-teal-100 text-teal-900 group-hover:bg-emerald-400/25 group-hover:text-emerald-200'
                          }`}
                        >
                          {service.badge}
                        </span>
                      )}
                      {service.authRequired && !isAuthenticated && (
                        <span
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white/80"
                          title="Memerlukan Login SSO"
                        >
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="pt-1">
                    <h3 className="font-heading font-bold text-lg text-teal-950 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <span>{service.name}</span>
                      {isExternal && (
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-200 transition-colors duration-300 shrink-0" />
                      )}
                    </h3>
                  </div>
                </div>

                {/* Bottom Interactive Meta Bar */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between transition-colors duration-300 ${
                    isExternal
                      ? 'border-slate-100 group-hover:border-white/20'
                      : 'border-slate-100 group-hover:border-white/10'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300 ${
                      isExternal
                        ? 'text-slate-500 group-hover:text-amber-100'
                        : 'text-slate-500 group-hover:text-teal-200/90'
                    }`}
                  >
                    {isExternal ? (
                      <>
                        <FileCode2 className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-200 transition-colors duration-300" />
                        <span>Google Apps Script</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600 group-hover:text-emerald-300 transition-colors duration-300" />
                        <span>Internal Portal SSO</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isExternal
                        ? 'bg-amber-50 text-amber-700 group-hover:bg-white group-hover:text-orange-600 group-hover:shadow-md'
                        : 'bg-teal-50 text-teal-700 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-500/30'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle Hide / Unhide Icon Button */}
        {activeServices.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group p-3 rounded-full bg-white hover:bg-teal-700 text-teal-800 hover:text-white shadow-sm hover:shadow-lg hover:shadow-teal-950/20 transition-all duration-300 cursor-pointer flex items-center gap-2 px-5 text-xs font-bold"
              title={isExpanded ? 'Sembunyikan sebagian layanan' : 'Tampilkan seluruh layanan'}
            >
              <LayoutGrid className="w-4 h-4 text-emerald-600 group-hover:text-emerald-300 transition-colors" />
              <span>{isExpanded ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Layanan (${activeServices.length})`}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Akses Seluruh Portal Banner Button with Modern Green Gradient */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-[#042822] via-[#064e3b] to-[#047857] shadow-xl shadow-emerald-950/20 text-white flex flex-col sm:flex-row items-center justify-between gap-5 transition-all">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 backdrop-blur-xs border border-white/15">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-white tracking-wide">
                Portal Tunggal Layanan Madrasah
              </h3>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Masuk dengan akun SSO untuk akses penuh seluruh modul akademik & administrasi.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/portal/login')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-extrabold text-teal-950 bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 hover:from-white hover:to-emerald-100 shadow-md shadow-emerald-950/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Akses Seluruh Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

