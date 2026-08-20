import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { DailyAttendance } from '../../types';
import {
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  Smartphone,
  Send,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  Bell,
  Calendar
} from 'lucide-react';

export const EPresensiModule: React.FC = () => {
  const { user, activeRole, hasPermission } = useAuth();
  const {
    dailyAttendance,
    recordAttendance,
    parentNotifications,
    students,
    classes
  } = useApp();

  const [activeTab, setActiveTab] = useState<'live_qr' | 'history' | 'notifications'>('live_qr');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [qrToken, setQrToken] = useState<string>(`PRES-${Date.now().toString().slice(-6)}`);
  const [countdown, setCountdown] = useState<number>(30);
  const [scanStudentId, setScanStudentId] = useState<string>(students[0]?.id || '');
  const [scanStatus, setScanStatus] = useState<DailyAttendance['status']>('HADIR');
  const [scanSuccessMessage, setScanSuccessMessage] = useState<string | null>(null);

  // Synchronize tab with Secondary Sidebar events
  useEffect(() => {
    const handleSubTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ module: string; tab: string }>;
      if (customEvent.detail?.module === 'e-presensi' && customEvent.detail?.tab) {
        const tab = customEvent.detail.tab;
        if (['live_qr', 'history', 'notifications'].includes(tab)) {
          setActiveTab(tab as any);
        }
      }
    };
    window.addEventListener('portal-subtab-change', handleSubTabEvent);
    return () => window.removeEventListener('portal-subtab-change', handleSubTabEvent);
  }, []);

  // Dynamic QR auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrToken(`PRES-${Math.floor(100000 + Math.random() * 900000)}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s) => s.id === scanStudentId) || students[0];
    if (!st) return;

    recordAttendance({
      studentId: st.id,
      studentName: st.name,
      nisn: st.nisn,
      classId: st.classId,
      className: st.className,
      date: new Date().toISOString().split('T')[0],
      checkInTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: scanStatus,
      method: 'QR_CODE',
      locationLatitude: -6.2088,
      locationLongitude: 106.8456,
      distanceMeters: Math.floor(15 + Math.random() * 25),
      photoProofUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      parentNotified: true,
      notes: 'Presensi otomatis melalui QR Code Dinamis kelas'
    });

    setScanSuccessMessage(`Presensi berhasil dicatat untuk ${st.name} (${scanStatus}). Notifikasi WhatsApp terkirim ke Orang Tua.`);
    setTimeout(() => setScanSuccessMessage(null), 5000);
  };

  const filteredAttendances = dailyAttendance.filter((a) => {
    return selectedClass === 'ALL' || a.className === selectedClass;
  });

  const countHadir = filteredAttendances.filter((a) => a.status === 'HADIR').length;
  const countIzin = filteredAttendances.filter((a) => a.status === 'IZIN').length;
  const countSakit = filteredAttendances.filter((a) => a.status === 'SAKIT').length;
  const countAlpa = filteredAttendances.filter((a) => a.status === 'ALPA').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-teal-950">
      
      {/* Module Title */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <QrCode className="w-4 h-4" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-teal-950">
            E-Presensi Live Dynamic QR & Geofencing
          </h2>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Presensi digital anti-titip absen dengan QR token dinamis, validasi GPS radius sekolah, dan notifikasi instan WhatsApp/SMS wali murid.
        </p>
      </div>

      {/* Overview Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border-l-4 border-teal-600 border-teal-100 shadow-xs">
          <span className="text-xs text-slate-600 font-bold">Total Hadir</span>
          <p className="text-2xl font-bold font-heading text-teal-700 mt-1">{countHadir}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border-l-4 border-amber-500 border-amber-200 shadow-xs">
          <span className="text-xs text-slate-600 font-bold">Izin</span>
          <p className="text-2xl font-bold font-heading text-amber-600 mt-1">{countIzin}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border-l-4 border-orange-500 border-orange-200 shadow-xs">
          <span className="text-xs text-slate-600 font-bold">Sakit</span>
          <p className="text-2xl font-bold font-heading text-orange-600 mt-1">{countSakit}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border-l-4 border-rose-500 border-rose-200 shadow-xs">
          <span className="text-xs text-slate-600 font-bold">Alpa / Terlambat</span>
          <p className="text-2xl font-bold font-heading text-rose-600 mt-1">{countAlpa}</p>
        </div>
      </div>

      {/* Notification Toast Message */}
      {scanSuccessMessage && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-teal-900 text-xs flex items-center gap-3 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
          <span className="font-medium">{scanSuccessMessage}</span>
        </div>
      )}

      {/* TAB 1: LIVE QR & SCANNER */}
      {activeTab === 'live_qr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7 cols: Teacher Dynamic Projection Board */}
          <div className="lg:col-span-7 glass-panel-strong p-6 rounded-3xl border border-teal-100 space-y-5 text-center flex flex-col items-center justify-center shadow-xs">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 inline-flex items-center gap-1.5 border border-teal-200">
                <RefreshCw className="w-3 h-3 animate-spin text-teal-600" />
                <span>Token Otomatis Berganti dalam {countdown} detik</span>
              </span>
              <h3 className="font-heading font-extrabold text-xl text-teal-950 mt-2">
                Pindai QR Code untuk Presensi
              </h3>
              <p className="text-xs text-slate-600">
                Arahkan kamera smartphone ke kode di bawah. Geofencing radius 100m dari koordinat sekolah.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="relative p-5 bg-white rounded-3xl shadow-xl border-4 border-teal-400/40 flex flex-col items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://sekolah.sch.id/presensi/verify?token=${qrToken}`}
                alt="Dynamic Presence QR"
                className="w-52 h-52 object-contain"
              />
              <span className="mt-3 font-mono text-xs font-bold text-teal-950 tracking-wider">
                TOKEN: {qrToken}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Geofence: Max 100 Meter</span>
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <Smartphone className="w-4 h-4 text-amber-500" />
                <span>Single Device Security</span>
              </span>
            </div>
          </div>

          {/* Right 5 cols: Student Scan Simulator */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-teal-100 space-y-4 shadow-xs">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-teal-950 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-teal-700" />
                <span>Simulator Scan Presensi Siswa</span>
              </h3>
              <p className="text-xs text-slate-600">
                Uji coba alur presensi mandiri siswa, verifikasi radius GPS, dan trigger kirim notifikasi ke orang tua.
              </p>
            </div>

            <form onSubmit={handleSimulateScan} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-teal-950 mb-1">
                  Pilih Profil Siswa
                </label>
                <select
                  value={scanStudentId}
                  onChange={(e) => setScanStudentId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.className} - {st.nisn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">
                  Status Presensi
                </label>
                <select
                  value={scanStatus}
                  onChange={(e) => setScanStatus(e.target.value as DailyAttendance['status'])}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
                >
                  <option value="HADIR">Hadir (Tepat Waktu)</option>
                  <option value="IZIN">Izin (Surat Keterangan)</option>
                  <option value="SAKIT">Sakit</option>
                  <option value="ALPA">Alpa</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">Radius GPS saat ini:</span>
                  <span className="font-bold text-teal-700">24 Meter (Di Lingkungan Sekolah)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">Trigger WhatsApp:</span>
                  <span className="font-bold text-amber-600">Otomatis Aktif</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 text-white shadow-md shadow-teal-700/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasikan Scan Presensi</span>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 2: REKAP PRESENSI HARIAN */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-3 border-teal-100 shadow-xs">
            <span className="text-xs text-slate-600 font-bold">Pilih Kelas:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 font-medium shadow-xs"
            >
              <option value="ALL">Semua Kelas</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
                  <tr>
                    <th className="py-3 px-4">Nama Siswa</th>
                    <th className="py-3 px-4">Kelas & NISN</th>
                    <th className="py-3 px-4">Waktu Check-In</th>
                    <th className="py-3 px-4">Metode & Radius GPS</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Notifikasi WA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50 text-slate-700 bg-white">
                  {filteredAttendances.map((att) => (
                    <tr key={att.id} className="hover:bg-teal-50/40">
                      <td className="py-3 px-4">
                        <span className="font-bold text-teal-950 block">{att.studentName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-teal-950">{att.className}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{att.nisn}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-teal-700 font-bold">
                          {att.checkInTime}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{att.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold">
                          {att.method}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {att.distanceMeters ? `Radius ${att.distanceMeters}m` : 'Terverifikasi'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          att.status === 'HADIR'
                            ? 'bg-teal-100 text-teal-800 border border-teal-300'
                            : att.status === 'IZIN'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : att.status === 'SAKIT'
                            ? 'bg-orange-100 text-orange-800 border border-orange-300'
                            : 'bg-rose-100 text-rose-700 border border-rose-300'
                        }`}>
                          {att.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {att.parentNotified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            <span>Terkirim</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Belum</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: NOTIFIKASI ORANG TUA */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parentNotifications.map((notif) => (
              <div
                key={notif.id}
                className="glass-card p-5 rounded-2xl space-y-2.5 border-l-4 border-amber-500 border-teal-100 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-950 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-amber-500" />
                    <span>WhatsApp / SMS Gateway</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.sentAt}</span>
                </div>
                <p className="text-xs text-slate-700 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                  {notif.message}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Penerima: {notif.parentPhone}</span>
                  <span className="text-teal-700 font-bold">STATUS: {notif.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
