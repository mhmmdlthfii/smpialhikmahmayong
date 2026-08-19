import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Letter, LetterType, LetterStatus } from '../../types';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import {
  Mail,
  PlusCircle,
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Archive,
  Ban,
  Download,
  Eye,
  Send,
  Lock
} from 'lucide-react';

export const ESuratModule: React.FC = () => {
  const { letters, addLetter, signLetterETTD, revokeDocument, websiteSettings } = useApp();
  const { user, activeRole, hasPermission } = useAuth();

  const [activeTab, setActiveTab] = useState<'outbox' | 'inbox' | 'create' | 'pending_sign'>('outbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedLetterForModal, setSelectedLetterForModal] = useState<Letter | null>(null);

  // Form State for Creating New Letter
  const [title, setTitle] = useState('');
  const [type, setType] = useState<LetterType>('SURAT_KETERANGAN_AKTIF');
  const [regarding, setRegarding] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientIdentifier, setRecipientIdentifier] = useState('');
  const [contentHtml, setContentHtml] = useState(
    '<p>Menerangkan bahwa nama siswa tersebut di atas adalah benar terdaftar aktif sebagai peserta didik kelas IX-A pada SMP Islam Al Hikmah Mayong Tahun Pelajaran 2025/2026 dan berkelakuan baik.</p>'
  );

  // Revocation Modal State
  const [revokingLetter, setRevokingLetter] = useState<Letter | null>(null);
  const [revocationReason, setRevocationReason] = useState('');

  // Signature PIN State
  const [signingLetterId, setSigningLetterId] = useState<string | null>(null);
  const [signPin, setSignPin] = useState('123456');

  const filteredLetters = letters.filter((l) => {
    const matchSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.letterNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'ALL' || l.type === selectedType;
    return matchSearch && matchType;
  });

  const pendingLetters = letters.filter((l) => l.status === 'REVIEW' || l.status === 'APPROVED');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !recipient) return;

    const count = letters.length + 1;
    const pad = count.toString().padStart(3, '0');
    const letterNumber = `421.3/${pad}/SMPI-AHM/2026`;

    addLetter({
      category: 'KELUAR',
      type,
      letterNumber,
      title,
      regarding,
      sender: websiteSettings.schoolName,
      recipient,
      recipientIdentifier,
      date: new Date().toISOString().split('T')[0],
      status: 'REVIEW',
      contentHtml,
      createdById: user?.id || 'usr-3',
      createdByName: user?.name || 'Staf Tata Usaha'
    });

    // Reset Form
    setTitle('');
    setRegarding('');
    setRecipient('');
    setRecipientIdentifier('');
    setActiveTab('outbox');
  };

  const handleSignLetter = (letterId: string) => {
    signLetterETTD(
      letterId,
      user?.name || websiteSettings.headmasterName,
      user?.nip || websiteSettings.headmasterNip
    );
    setSigningLetterId(null);
  };

  const handleConfirmRevoke = () => {
    if (!revokingLetter || !revocationReason) return;
    if (revokingLetter.verificationToken) {
      revokeDocument(revokingLetter.verificationToken, revocationReason);
    }
    setRevokingLetter(null);
    setRevocationReason('');
  };

  const getStatusBadge = (status: LetterStatus) => {
    switch (status) {
      case 'SIGNED':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-teal-600" />
            <span>ETTD Sah</span>
          </span>
        );
      case 'REVIEW':
      case 'APPROVED':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Menunggu TTD</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1">
            <Ban className="w-3 h-3 text-rose-500" />
            <span>Ditolak</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-teal-950">
      
      {/* Module Title & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-teal-950">
              E-Surat & Manajemen Dokumen Terpadu (ETTD)
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Penomoran otomatis, draft surat resmi, verifikasi Tanda Tangan Elektronik BSrE, dan cetak PDF.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('outbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'outbox'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Arsip Surat Keluar ({letters.length})
          </button>

          {(activeRole === 'KEPALA_SEKOLAH' || activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') && (
            <button
              onClick={() => setActiveTab('pending_sign')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pending_sign'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'glass-panel text-amber-700 hover:bg-amber-50 border-amber-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Antrean TTD ({pendingLetters.length})</span>
            </button>
          )}

          {hasPermission('e-surat:create') && (
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Buat Surat Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: ARSIP SURAT KELUAR */}
      {activeTab === 'outbox' && (
        <div className="space-y-4">
          
          {/* Search & Filter Controls */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border-teal-100 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor surat, judul, atau nama penerima..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-600 font-bold whitespace-nowrap">Jenis:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
              >
                <option value="ALL">Semua Jenis Surat</option>
                <option value="SURAT_KETERANGAN_AKTIF">Surat Keterangan Aktif</option>
                <option value="SURAT_REKOMENDASI">Surat Rekomendasi</option>
                <option value="SURAT_TUGAS">Surat Tugas</option>
                <option value="SURAT_UNDANGAN">Surat Undangan</option>
                <option value="SURAT_MUTASI">Surat Mutasi Siswa</option>
              </select>
            </div>
          </div>

          {/* Letter Records Table */}
          <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
                  <tr>
                    <th className="py-3 px-4">Nomor & Tanggal</th>
                    <th className="py-3 px-4">Judul & Perihal</th>
                    <th className="py-3 px-4">Penerima / Pemilik</th>
                    <th className="py-3 px-4">Status & ETTD</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50 text-slate-700 bg-white">
                  {filteredLetters.map((letter) => (
                    <tr key={letter.id} className="hover:bg-teal-50/40 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-teal-700 block">
                          {letter.letterNumber}
                        </span>
                        <span className="text-[11px] text-slate-400">{letter.date}</span>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <span className="font-bold text-teal-950 block truncate">
                          {letter.title}
                        </span>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{letter.regarding}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-teal-950 block">
                          {letter.recipient}
                        </span>
                        {letter.recipientIdentifier && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {letter.recipientIdentifier}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {getStatusBadge(letter.status)}
                        {letter.verificationToken && (
                          <span className="text-[9px] font-mono text-slate-400 block mt-1 truncate max-w-[120px]">
                            {letter.verificationToken}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLetterForModal(letter)}
                            className="p-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-colors"
                            title="Pratinjau / Cetak Dokumen"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          {(letter.status === 'REVIEW' || letter.status === 'APPROVED') && (activeRole === 'KEPALA_SEKOLAH' || activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') && (
                            <button
                              onClick={() => setSigningLetterId(letter.id)}
                              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs cursor-pointer"
                              title="Tanda Tangan ETTD Sekarang"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>TTD</span>
                            </button>
                          )}

                          {letter.status === 'SIGNED' && hasPermission('e-surat:revoke') && (
                            <button
                              onClick={() => setRevokingLetter(letter)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-rose-100 transition-colors cursor-pointer"
                              title="Cabut Dokumen (Revoke)"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ANTREAN TTD ELEKTRONIK (KEPALA SEKOLAH) */}
      {activeTab === 'pending_sign' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Dokumen di bawah ini telah diverifikasi oleh staf Tata Usaha dan siap dibubuhi <strong>Tanda Tangan Elektronik (ETTD)</strong> resmi Kepala Sekolah.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingLetters.map((l) => (
              <div key={l.id} className="glass-panel-strong p-5 rounded-3xl border border-amber-300 space-y-4 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-teal-700">
                      {l.letterNumber}
                    </span>
                    <h3 className="font-heading font-bold text-base text-teal-950 mt-0.5">
                      {l.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Menunggu TTD
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-600">
                  <p><strong>Penerima:</strong> {l.recipient}</p>
                  <p><strong>Perihal:</strong> {l.regarding}</p>
                  <p><strong>Tanggal:</strong> {l.date}</p>
                </div>

                <div className="pt-3 border-t border-teal-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedLetterForModal(l)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-teal-700"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Draf</span>
                  </button>

                  <button
                    onClick={() => setSigningLetterId(l.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-md shadow-teal-700/25 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bubuhkan ETTD Resmi</span>
                  </button>
                </div>
              </div>
            ))}

            {pendingLetters.length === 0 && (
              <div className="col-span-2 p-8 text-center glass-panel rounded-3xl text-xs text-slate-500 border-teal-100">
                Tidak ada dokumen yang menunggu tanda tangan saat ini.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BUAT SURAT BARU */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreateSubmit} className="glass-panel-strong p-8 rounded-3xl border border-teal-100 shadow-xl space-y-6 max-w-4xl mx-auto">
          
          <div className="border-b border-teal-100 pb-4">
            <h3 className="font-heading font-bold text-lg text-teal-950">
              Formulir Pembuatan Dokumen & Surat Resmi
            </h3>
            <p className="text-xs text-slate-600">
              Sistem akan mengalokasikan nomor surat resmi secara otomatis sesuai format unit kerja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-teal-950">Jenis Dokumen / Surat *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as LetterType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 focus:ring-2 focus:ring-teal-500 shadow-xs"
              >
                <option value="SURAT_KETERANGAN_AKTIF">Surat Keterangan Aktif Sekolah</option>
                <option value="SURAT_REKOMENDASI">Surat Rekomendasi Lomba / Beasiswa</option>
                <option value="SURAT_TUGAS">Surat Tugas Guru / Pembina</option>
                <option value="SURAT_UNDANGAN">Surat Undangan Rapat / Orang Tua</option>
                <option value="SURAT_PANGGILAN_ORTU">Surat Panggilan Orang Tua</option>
                <option value="SURAT_MUTASI">Surat Keterangan Pindah / Mutasi</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-teal-950">Judul Dokumen *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Surat Rekomendasi Mengikuti OSN Kimia 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 focus:ring-2 focus:ring-teal-500 shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-teal-950">Perihal / Hal *</label>
              <input
                type="text"
                required
                value={regarding}
                onChange={(e) => setRegarding(e.target.value)}
                placeholder="Contoh: Permohonan Dispensasi Mengikuti Lomba"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 focus:ring-2 focus:ring-teal-500 shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-teal-950">Nama Penerima / Siswa / Instansi *</label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Contoh: Muhammad Zidan Al-Fatih (Kelas IX-A)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 focus:ring-2 focus:ring-teal-500 shadow-xs"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-teal-950">NISN / NIP / NIK Penerima (Opsional)</label>
              <input
                type="text"
                value={recipientIdentifier}
                onChange={(e) => setRecipientIdentifier(e.target.value)}
                placeholder="Contoh: NISN 0089123456"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 focus:ring-2 focus:ring-teal-500 font-mono shadow-xs"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-teal-950">Isi / Batang Tubuh Surat</label>
              <textarea
                rows={5}
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 focus:ring-2 focus:ring-teal-500 font-sans shadow-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-teal-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('outbox')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-md shadow-teal-700/25 cursor-pointer"
            >
              Ajukan Surat ke Kepala Sekolah →
            </button>
          </div>

        </form>
      )}

      {/* ETTD Signature Verification Modal */}
      {signingLetterId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md p-6 rounded-3xl glass-panel-strong border border-teal-400 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Otorisasi Tanda Tangan Elektronik
              </h3>
              <p className="text-xs text-slate-600">
                Masukkan PIN Otorisasi Sertifikat Digital BSrE untuk menyematkan stempel ETTD dan Hash Kriptografi pada dokumen ini.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-teal-950">PIN Keamanan Digital</label>
              <input
                type="password"
                value={signPin}
                onChange={(e) => setSignPin(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl bg-white border border-teal-300 shadow-xs"
              />
              <p className="text-[10px] text-center text-slate-500">Default Demo PIN: <strong>123456</strong></p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSigningLetterId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={() => handleSignLetter(signingLetterId)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 shadow-md shadow-teal-700/25"
              >
                Sahkan Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revocation Reason Modal */}
      {revokingLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md p-6 rounded-3xl glass-panel-strong border border-rose-300 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Ban className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Pencabutan Dokumen Resmi
              </h3>
              <p className="text-xs text-slate-600">
                Dokumen yang dicabut akan otomatis ditandai sebagai <strong>REVOKED</strong> pada laman verifikasi publik.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-teal-950">
                Alasan Pencabutan / Pembatalan *
              </label>
              <textarea
                rows={3}
                required
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                placeholder="Contoh: Terjadi kesalahan penulisan nama atau perpindahan sekolah dibatalkan..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-rose-200 text-teal-950 shadow-xs"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRevokingLetter(null)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmRevoke}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/25"
              >
                Konfirmasi Cabut
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Printable Preview Modal */}
      <DocumentViewerModal
        isOpen={!!selectedLetterForModal}
        onClose={() => setSelectedLetterForModal(null)}
        letter={selectedLetterForModal || undefined}
      />

    </div>
  );
};
