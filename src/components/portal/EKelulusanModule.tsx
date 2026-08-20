import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { GraduationRecord } from '../../types';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  FileCheck,
  Award,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Download,
  Share2,
  Calendar,
  X
} from 'lucide-react';
import { DocumentViewerModal } from '../common/DocumentViewerModal';

export const EKelulusanModule: React.FC = () => {
  const { user, activeRole, hasPermission } = useAuth();
  const {
    graduationRecords,
    updateGraduationStatus,
    publishGraduation,
    batchPublishGraduation,
    websiteSettings,
    signLetterETTD,
    letters
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedRecordForSKL, setSelectedRecordForSKL] = useState<GraduationRecord | null>(null);

  const [activeTab, setActiveTab] = useState<'records' | 'publish'>('records');

  // Synchronize tab with Secondary Sidebar events
  React.useEffect(() => {
    const handleSubTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ module: string; tab: string }>;
      if (customEvent.detail?.module === 'e-kelulusan' && customEvent.detail?.tab) {
        const tab = customEvent.detail.tab;
        if (tab === 'batch_publish' || tab === 'publish') {
          if (window.confirm('Publikasikan status kelulusan untuk semua siswa angkatan?')) {
            batchPublishGraduation();
          }
        } else if (tab === 'records') {
          setActiveTab('records');
        }
      }
    };
    window.addEventListener('portal-subtab-change', handleSubTabEvent);
    return () => window.removeEventListener('portal-subtab-change', handleSubTabEvent);
  }, [batchPublishGraduation]);

  const filteredRecords = graduationRecords.filter((rec) => {
    const matchStatus = filterStatus === 'ALL' || rec.status === filterStatus;
    const matchSearch =
      searchQuery === '' ||
      rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.nisn.includes(searchQuery) ||
      rec.sklNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalGraduated = graduationRecords.filter((r) => r.status === 'LULUS').length;
  const totalPublished = graduationRecords.filter((r) => r.isPublished).length;

  const handlePrintSKL = (record: GraduationRecord) => {
    setSelectedRecordForSKL(record);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-teal-950">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-teal-950">
            E-Kelulusan & Penerbitan SKL Digital
          </h2>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Pengumuman kelulusan serentak, verifikasi nilai akhir, dan pencetakan Surat Keterangan Lulus (SKL) ber-ETTD sah BSrE.
        </p>
      </div>

      {/* Graduation Countdown & Banner */}
      <div className="glass-panel-strong p-6 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200 inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Pengumuman Kelulusan Telah Dibuka</span>
          </span>
          <h3 className="font-heading font-extrabold text-xl text-teal-950">
            Tahun Ajaran 2025/2026 Angkatan Ke-45
          </h3>
          <p className="text-xs text-slate-600">
            Siswa dapat mencetak Surat Keterangan Lulus (SKL) mandiri ber-QR Code untuk pendaftaran PTN/Kedinasan.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center p-3 rounded-2xl bg-white border border-teal-100 shadow-xs min-w-[90px]">
            <span className="text-xl font-extrabold font-heading text-teal-700">{graduationRecords.length}</span>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Total Siswa</span>
          </div>
          <div className="text-center p-3 rounded-2xl bg-white border border-teal-100 shadow-xs min-w-[90px]">
            <span className="text-xl font-extrabold font-heading text-emerald-600">{totalGraduated}</span>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Lulus (100%)</span>
          </div>
          <div className="text-center p-3 rounded-2xl bg-white border border-teal-100 shadow-xs min-w-[90px]">
            <span className="text-xl font-extrabold font-heading text-amber-600">{totalPublished}</span>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Terbit SKL</span>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border-teal-100 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, NISN, atau no SKL..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-bold">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 shadow-xs"
          >
            <option value="ALL">Semua Status</option>
            <option value="LULUS">Lulus</option>
            <option value="TIDAK_LULUS">Tidak Lulus</option>
            <option value="DITUNDA">Ditunda</option>
          </select>
        </div>
      </div>

      {/* Graduation List Table */}
      <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
              <tr>
                <th className="py-3 px-4">Nama Siswa & NISN</th>
                <th className="py-3 px-4">Nomor SKL Resmi</th>
                <th className="py-3 px-4">Rata-Rata Nilai</th>
                <th className="py-3 px-4">Status Kelulusan</th>
                <th className="py-3 px-4">Token BSrE</th>
                <th className="py-3 px-4 text-right">Aksi SKL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-50 text-slate-700 bg-white">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-teal-50/40">
                  <td className="py-3 px-4">
                    <span className="font-bold text-teal-950 block">{rec.studentName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">NISN: {rec.nisn} • {rec.className}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-700">
                    {rec.sklNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold font-mono text-teal-700 text-sm">
                      {rec.averageScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      rec.status === 'LULUS'
                        ? 'bg-teal-100 text-teal-800 border border-teal-300'
                        : 'bg-rose-100 text-rose-700 border border-rose-300'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                    {rec.verificationToken || 'VER-BSRE-OK'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handlePrintSKL(rec)}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-teal-600" />
                      <span>Cetak SKL</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SKL Document Viewer Modal */}
      {selectedRecordForSKL && (
        <DocumentViewerModal
          letter={{
            id: selectedRecordForSKL.id,
            category: 'KELUAR',
            type: 'SURAT_KETERANGAN_LULUS',
            letterNumber: selectedRecordForSKL.sklNumber,
            title: `Surat Keterangan Lulus (SKL) - ${selectedRecordForSKL.studentName}`,
            regarding: 'Keterangan Kelulusan Siswa Tingkat Akhir',
            sender: websiteSettings.schoolName,
            recipient: selectedRecordForSKL.studentName,
            recipientIdentifier: selectedRecordForSKL.nisn,
            date: selectedRecordForSKL.graduationDate || '2026-05-05',
            status: 'SIGNED',
            verificationToken: selectedRecordForSKL.verificationToken || `SKL-${selectedRecordForSKL.nisn.slice(-6)}`,
            signedBy: websiteSettings.headmasterName,
            signerNip: websiteSettings.headmasterNip,
            signedAt: '2026-05-05T08:00:00.000Z',
            createdById: 'usr-admin',
            createdByName: 'Staf Administrasi',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            contentHtml: `
              <p>Yang bertanda tangan di bawah ini Kepala Sekolah ${websiteSettings.schoolName}, menerangkan bahwa:</p>
              <table style="width: 100%; margin: 15px 0;">
                <tr><td style="width: 180px; font-weight: bold;">Nama Lengkap</td><td>: ${selectedRecordForSKL.studentName}</td></tr>
                <tr><td style="font-weight: bold;">NISN</td><td>: ${selectedRecordForSKL.nisn}</td></tr>
                <tr><td style="font-weight: bold;">Kelas / Jurusan</td><td>: ${selectedRecordForSKL.className}</td></tr>
                <tr><td style="font-weight: bold;">Rata-Rata Nilai Ijazah</td><td>: ${selectedRecordForSKL.averageScore.toFixed(2)}</td></tr>
              </table>
              <p>Berdasarkan Kriteria Kelulusan Satuan Pendidikan yang telah ditetapkan, peserta didik tersebut dinyatakan:</p>
              <div style="text-align: center; margin: 20px 0; font-size: 20px; font-weight: bold; color: #16a34a; letter-spacing: 2px;">
                *** ${selectedRecordForSKL.status} ***
              </div>
              <p>Surat Keterangan ini dapat dipergunakan sebagai pengganti ijazah sementara untuk keperluan pendaftaran perguruan tinggi atau kedinasan.</p>
            `
          }}
          onClose={() => setSelectedRecordForSKL(null)}
        />
      )}

    </div>
  );
};
