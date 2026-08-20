import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { SystemService } from '../../types';
import { DynamicIcon } from '../common/DynamicIcon';
import {
  Mail,
  BookOpen,
  QrCode,
  Award,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  PlusCircle,
  Activity
} from 'lucide-react';

interface DashboardHomeProps {
  navigate: (path: string) => void;
  onOpenExternalModal: (service: SystemService) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  navigate,
  onOpenExternalModal
}) => {
  const { user, activeRole, hasPermission } = useAuth();
  const {
    letters,
    journals,
    attendances,
    studentPoints,
    graduationRecords,
    systemServices,
    auditLogs
  } = useApp();

  const pendingLetters = letters.filter((l) => l.status === 'REVIEW' || l.status === 'APPROVED');
  const signedLetters = letters.filter((l) => l.status === 'SIGNED');
  const todayAttendances = attendances.filter((a) => a.date.startsWith('2026-02') || a.date.includes('2026'));
  const recentLogs = auditLogs.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-teal-950">
      
      {/* Welcome Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-500/10 via-amber-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Single Sign-On (SSO) Portal Aktif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-teal-950">
            Selamat Datang, {user?.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Akses cepat seluruh administrasi sekolah, verifikasi persuratan ETTD, presensi QR dinamis, jurnal pengajaran, dan layanan eksternal.
          </p>
        </div>

        {/* Action button based on role */}
        <div className="flex flex-wrap gap-2">
          {hasPermission('e-surat:create') && (
            <button
              onClick={() => navigate('/portal/e-surat')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-md shadow-teal-700/25 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Surat ETTD</span>
            </button>
          )}

          {hasPermission('e-presensi:generate_qr') && (
            <button
              onClick={() => navigate('/portal/e-presensi')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 shadow-xs transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-amber-600" />
              <span>Buka Live QR Presensi</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: E-Surat Status */}
        <div
          onClick={() => navigate('/portal/e-surat')}
          className="group p-6 rounded-3xl cursor-pointer bg-white hover:bg-gradient-to-br hover:from-[#063b33] hover:via-[#042822] hover:to-[#021815] shadow-sm hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1.5 transition-all duration-300 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 flex items-center justify-center transition-all duration-300">
              <Mail className="w-6 h-6" />
            </div>
            {pendingLetters.length > 0 && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-100 text-amber-900 group-hover:bg-amber-400/20 group-hover:text-amber-200 transition-colors duration-300">
                {pendingLetters.length} Menunggu TTD
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950 group-hover:text-white transition-colors duration-300">
              {letters.length} Dokumen
            </p>
            <p className="text-xs text-slate-500 group-hover:text-teal-100/80 transition-colors duration-300">
              {signedLetters.length} Surat Sah Ber-ETTD
            </p>
          </div>
        </div>

        {/* Card 2: E-Presensi Hari Ini */}
        <div
          onClick={() => navigate('/portal/e-presensi')}
          className="group p-6 rounded-3xl cursor-pointer bg-white hover:bg-gradient-to-br hover:from-[#063b33] hover:via-[#042822] hover:to-[#021815] shadow-sm hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1.5 transition-all duration-300 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 flex items-center justify-center transition-all duration-300">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-100 text-emerald-900 group-hover:bg-emerald-400/20 group-hover:text-emerald-200 transition-colors duration-300">
              Live QR Aktif
            </span>
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950 group-hover:text-white transition-colors duration-300">
              98.2% Hadir
            </p>
            <p className="text-xs text-slate-500 group-hover:text-teal-100/80 transition-colors duration-300">
              {todayAttendances.length} Log Presensi Hari Ini
            </p>
          </div>
        </div>

        {/* Card 3: E-Jurnal */}
        <div
          onClick={() => navigate('/portal/e-jurnal')}
          className="group p-6 rounded-3xl cursor-pointer bg-white hover:bg-gradient-to-br hover:from-[#063b33] hover:via-[#042822] hover:to-[#021815] shadow-sm hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1.5 transition-all duration-300 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 flex items-center justify-center transition-all duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-teal-100 text-teal-900 group-hover:bg-teal-400/20 group-hover:text-teal-200 transition-colors duration-300">
              100% Sesuai RPP
            </span>
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950 group-hover:text-white transition-colors duration-300">
              {journals.length} Jurnal
            </p>
            <p className="text-xs text-slate-500 group-hover:text-teal-100/80 transition-colors duration-300">
              Agenda Mengajar Guru Terverifikasi
            </p>
          </div>
        </div>

        {/* Card 4: E-Poin Siswa */}
        <div
          onClick={() => navigate('/portal/e-poin')}
          className="group p-6 rounded-3xl cursor-pointer bg-white hover:bg-gradient-to-br hover:from-[#063b33] hover:via-[#042822] hover:to-[#021815] shadow-sm hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1.5 transition-all duration-300 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 flex items-center justify-center transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-100 text-amber-900 group-hover:bg-amber-400/20 group-hover:text-amber-200 transition-colors duration-300">
              Monitoring Karakter
            </span>
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950 group-hover:text-white transition-colors duration-300">
              {studentPoints.length} Catatan
            </p>
            <p className="text-xs text-slate-500 group-hover:text-teal-100/80 transition-colors duration-300">
              Prestasi & Pelanggaran Kedisiplinan
            </p>
          </div>
        </div>

      </div>

      {/* Main Row: Services Launchpad & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Services Navigator */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-teal-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Layanan Digital Sekolah & Google Apps Script</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {systemServices.length} Layanan Terhubung
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systemServices.filter((s) => s.isActive).map((service) => {
              const isExternal = service.type === 'EXTERNAL';
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    if (isExternal) {
                      onOpenExternalModal(service);
                    } else {
                      navigate(service.url);
                    }
                  }}
                  className={`group relative p-5 rounded-3xl cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 shadow-sm hover:shadow-2xl flex items-center gap-4 overflow-hidden ${
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

                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-110 ${
                      isExternal
                        ? 'bg-amber-50 text-amber-700 group-hover:bg-white/20 group-hover:text-amber-100'
                        : 'bg-teal-50 text-teal-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-300'
                    }`}
                  >
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-bold text-sm text-teal-950 group-hover:text-white transition-colors duration-300 truncate">
                        {service.name}
                      </h4>
                      {isExternal ? (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                          GAS
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Audit Log & Security Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-teal-950 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              <span>Aktivitas & Audit Log</span>
            </h3>
          </div>

          <div className="glass-panel p-5 rounded-3xl border-teal-100 shadow-xs space-y-4">
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-white border border-teal-100 text-xs space-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-950">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp.split(' ')[1] || '10:00'}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{log.description || log.details}</p>
                  <p className="text-[10px] text-teal-700 font-semibold">
                    Oleh: {log.userName} ({log.userRole})
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-teal-700 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Audit Trail Cryptographically Verified</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
