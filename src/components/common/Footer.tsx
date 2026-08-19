import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  School,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  Globe,
  Lock,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { websiteSettings, systemServices } = useApp();

  const activeServices = systemServices.filter((s) => s.isActive).slice(0, 6);

  return (
    <footer className="relative bg-teal-950 text-teal-100/80 border-t border-teal-900 transition-colors pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="liquid-glow w-96 h-96 bg-amber-500/10 -top-20 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-teal-900/80">
          
          {/* Col 1 & 2: School Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg border border-white/20">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {websiteSettings.schoolName}
                </h3>
                <span className="text-xs text-amber-400 font-semibold">
                  School Digital Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-teal-200/70 leading-relaxed pr-6">
              {websiteSettings.tagline}. Ekosistem digital terpadu untuk menghadirkan transparansi administrasi persuratan ber-ETTD, presensi live QR, jurnal pembelajaran real-time, dan verifikasi dokumen publik terpercaya.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="px-3 py-1 rounded-xl bg-teal-900/80 text-xs font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>Akreditasi {websiteSettings.akreditasi}</span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-teal-900/80 text-xs font-mono text-teal-200 border border-teal-800">
                NPSN: {websiteSettings.npsn}
              </div>
            </div>
          </div>

          {/* Col 3: Public Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
              Layanan Publik
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/verify')}
                  className="flex items-center gap-1.5 text-teal-200 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verifikasi Dokumen ETTD</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/bosp?tahun=2026')}
                  className="text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  Transparansi Dana BOSP 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/akademik/kosp')}
                  className="text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  Kurikulum & Berkas KOSP
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pengajar')}
                  className="text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  Dewan Pengajar & Staf
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/jurnalistik')}
                  className="text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  Jurnalistik & Mading Santri
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/ppdb')}
                  className="text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  Pendaftaran Siswa Baru (PPDB)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Digital Services Navigator */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
              Sistem Sekolah
            </h4>
            <ul className="space-y-2 text-xs">
              {activeServices.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      if (service.type === 'INTERNAL') {
                        navigate(service.url);
                      } else {
                        window.open(service.url, '_blank');
                      }
                    }}
                    className="flex items-center gap-1.5 text-teal-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 text-teal-500" />
                    <span>{service.name}</span>
                    {service.type === 'EXTERNAL' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-amber-950/80 text-amber-300 border border-amber-500/30 font-mono">GAS</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
              Kontak Sekolah
            </h4>
            <div className="space-y-2.5 text-xs text-teal-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{websiteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{websiteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{websiteSettings.email}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => navigate('/portal/login')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 border border-teal-600/50 shadow-md shadow-teal-900/40 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Masuk Portal SSO Sekolah</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-300/70">
          <p>
            © {new Date().getFullYear()} {websiteSettings.schoolName}. All rights reserved. • copyright by{' '}
            <span className="font-bold bg-gradient-to-r from-yellow-300 via-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Muhammad Luthfi
            </span>
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Operasional Digital Aktif
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
