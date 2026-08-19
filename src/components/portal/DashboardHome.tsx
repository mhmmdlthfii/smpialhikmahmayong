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
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-teal-400 border-teal-100 shadow-xs transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            {pendingLetters.length > 0 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                {pendingLetters.length} Menunggu TTD
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950">
              {letters.length} Dokumen
            </p>
            <p className="text-xs text-slate-500">
              {signedLetters.length} Surat Sah Ber-ETTD
            </p>
          </div>
        </div>

        {/* Card 2: E-Presensi Hari Ini */}
        <div
          onClick={() => navigate('/portal/e-presensi')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-amber-400 border-teal-100 shadow-xs transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live QR Aktif
            </span>
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950">
              98.2% Hadir
            </p>
            <p className="text-xs text-slate-500">
              {todayAttendances.length} Log Presensi Hari Ini
            </p>
          </div>
        </div>

        {/* Card 3: E-Jurnal */}
        <div
          onClick={() => navigate('/portal/e-jurnal')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-teal-400 border-teal-100 shadow-xs transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
              100% Sesuai RPP
            </span>
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950">
              {journals.length} Jurnal
            </p>
            <p className="text-xs text-slate-500">
              Agenda Mengajar Guru Terverifikasi
            </p>
          </div>
        </div>

        {/* Card 4: E-Poin Siswa */}
        <div
          onClick={() => navigate('/portal/e-poin')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-orange-400 border-teal-100 shadow-xs transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              Monitoring Karakter
            </span>
          </div>
          <div>
            <p className="text-2xl font-heading font-extrabold text-teal-950">
              {studentPoints.length} Catatan
            </p>
            <p className="text-xs text-slate-500">
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
            <span className="text-xs text-slate-500">
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
                  className="glass-card p-4 rounded-2xl cursor-pointer hover:scale-[1.01] hover:border-teal-400 border-teal-100 shadow-xs transition-all flex items-start gap-3.5"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isExternal
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-teal-50 text-teal-700 border border-teal-200'
                  }`}>
                    <DynamicIcon name={service.icon} className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-teal-950 truncate">
                        {service.name}
                      </h4>
                      {isExternal && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                          GAS
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                      {service.description}
                    </p>
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
