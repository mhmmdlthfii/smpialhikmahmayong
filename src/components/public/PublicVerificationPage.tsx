import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../../context/AppContext';
import { VerificationRecord } from '../../types';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Lock,
  Printer,
  FileText,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Camera,
  Info
} from 'lucide-react';

interface PublicVerificationPageProps {
  initialToken?: string;
  navigate: (path: string) => void;
}

export const PublicVerificationPage: React.FC<PublicVerificationPageProps> = ({
  initialToken = '',
  navigate
}) => {
  const { verifyDocument, verificationRecords, websiteSettings } = useApp();
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [currentRecord, setCurrentRecord] = useState<VerificationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [selectedDocumentForModal, setSelectedDocumentForModal] = useState<VerificationRecord | null>(null);

  // Perform search on mount if initialToken is provided in URL
  useEffect(() => {
    if (initialToken) {
      setTokenInput(initialToken);
      performSearch(initialToken);
    }
  }, [initialToken]);

  const performSearch = (token: string) => {
    setHasSearched(true);
    const result = verifyDocument(token);
    setCurrentRecord(result);

    if (result) {
      const verifyUrl = `${window.location.origin}/verify/${result.token}`;
      QRCode.toDataURL(verifyUrl, {
        width: 180,
        margin: 1,
        color: { dark: '#115e59', light: '#ffffff' }
      }).then(setQrCodeDataUrl).catch(console.error);
    } else {
      setQrCodeDataUrl('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    performSearch(tokenInput.trim());
  };

  const handleSelectSample = (sampleToken: string) => {
    setTokenInput(sampleToken);
    performSearch(sampleToken);
  };

  const handleSimulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const sample = verificationRecords[0]?.token || 'DOC-2026-SR-9481';
      setTokenInput(sample);
      performSearch(sample);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Liquid Glow */}
      <div className="liquid-glow w-96 h-96 bg-teal-500/10 top-10 right-1/4" />
      <div className="liquid-glow w-96 h-96 bg-amber-500/10 bottom-10 left-10" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Public Document Verification Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
            Verifikasi Keaslian Dokumen Resmi
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Layanan publik mandiri tanpa login untuk menguji validitas Surat Keterangan Lulus (SKL), Surat Rekomendasi, dan Tanda Tangan Elektronik (ETTD) {websiteSettings.schoolName}.
          </p>
        </div>

        {/* Token Search Box & QR Scanner */}
        <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100 shadow-xl space-y-5">
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-950">
              Masukkan Kode Token / Nomor Dokumen:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Contoh: DOC-2026-SR-9481 atau 421.3/084/SMPI-AHM/II/2026"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-mono bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 shadow-md shadow-teal-700/25 cursor-pointer transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verifikasi</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateQRScan}
                  disabled={isScanning}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold text-teal-800 glass-panel border border-teal-200 hover:bg-teal-50 transition-colors cursor-pointer"
                  title="Pindai QR Dokumen"
                >
                  {isScanning ? (
                    <RefreshCw className="w-4 h-4 text-teal-600 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-teal-600" />
                  )}
                  <span className="hidden sm:inline">Pindai QR</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Demo Sample Tokens */}
          <div className="pt-3 border-t border-teal-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px] font-semibold">Uji Coba Sampel:</span>
            <button
              type="button"
              onClick={() => handleSelectSample('DOC-2026-SR-9481')}
              className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-mono text-[11px] border border-teal-200 hover:bg-teal-100 cursor-pointer"
            >
              DOC-2026-SR-9481 (Surat OSN Valid)
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('DOC-2026-SKL-1029')}
              className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-mono text-[11px] border border-teal-200 hover:bg-teal-100 cursor-pointer"
            >
              DOC-2026-SKL-1029 (SKL Lulus)
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('DOC-2025-MUT-7712')}
              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-mono text-[11px] border border-rose-200 hover:bg-rose-100 cursor-pointer"
            >
              DOC-2025-MUT-7712 (Dicabut / Revoked)
            </button>
          </div>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {currentRecord ? (
              // Document Found
              <div className={`p-6 sm:p-8 rounded-3xl glass-panel-strong border shadow-2xl space-y-6 ${
                currentRecord.status === 'VALID'
                  ? 'border-teal-300 bg-teal-50/40'
                  : currentRecord.status === 'REVOKED'
                  ? 'border-amber-300 bg-amber-50/40'
                  : 'border-rose-300 bg-rose-50/40'
              }`}>
                
                {/* Result Header Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-teal-100">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      currentRecord.status === 'VALID'
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-teal-600/20'
                        : currentRecord.status === 'REVOKED'
                        ? 'bg-amber-500 text-white shadow-amber-500/20'
                        : 'bg-rose-500 text-white shadow-rose-500/20'
                    }`}>
                      {currentRecord.status === 'VALID' ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : currentRecord.status === 'REVOKED' ? (
                        <AlertTriangle className="w-8 h-8" />
                      ) : (
                        <ShieldX className="w-8 h-8" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                          currentRecord.status === 'VALID'
                            ? 'bg-teal-100 text-teal-800 border border-teal-300'
                            : currentRecord.status === 'REVOKED'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}>
                          STATUS: {currentRecord.status}
                        </span>
                        <span className="text-xs text-slate-500 font-mono font-bold">
                          {currentRecord.token}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-teal-950 mt-1">
                        {currentRecord.status === 'VALID'
                          ? 'Dokumen Asli & Sah Terverifikasi'
                          : currentRecord.status === 'REVOKED'
                          ? 'Dokumen Telah Dicabut (Revoked)'
                          : 'Dokumen Kadaluarsa (Expired)'}
                      </h2>
                    </div>
                  </div>

                  {currentRecord.status === 'VALID' && (
                    <button
                      onClick={() => setSelectedDocumentForModal(currentRecord)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 shadow-md shadow-teal-700/20 transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Lihat & Cetak Dokumen Asli</span>
                    </button>
                  )}
                </div>

                {/* Revoked Notice if applicable */}
                {currentRecord.status === 'REVOKED' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Pemberitahuan Pencabutan Dokumen:</span>
                    </p>
                    <p>
                      Dokumen ini pernah diterbitkan oleh {websiteSettings.schoolName}, namun saat ini telah <strong>DICABUT / TIDAK BERLAKU LAGI</strong>.
                    </p>
                    {currentRecord.revocationReason && (
                      <p className="font-medium pt-1">
                        Alasan Pencabutan: <em>"{currentRecord.revocationReason}"</em>
                      </p>
                    )}
                  </div>
                )}

                {/* Verification Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-teal-100 space-y-2 shadow-xs">
                    <p className="font-bold text-teal-950 uppercase tracking-wider text-[11px]">
                      Informasi Dokumen
                    </p>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-slate-500">Judul Dokumen:</span>
                        <p className="font-semibold text-teal-950">{currentRecord.title}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Nomor Dokumen:</span>
                        <p className="font-mono font-bold text-teal-700">{currentRecord.documentNumber}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Penerima / Pemilik:</span>
                        <p className="font-semibold text-teal-950">
                          {currentRecord.recipientName} {currentRecord.recipientIdentifier ? `(NISN: ${currentRecord.recipientIdentifier})` : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-teal-100 space-y-2 shadow-xs">
                    <p className="font-bold text-teal-950 uppercase tracking-wider text-[11px]">
                      Otoritas & Penandatangan
                    </p>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-slate-500">Instansi Penerbit:</span>
                        <p className="font-semibold text-teal-950">{currentRecord.issuerOrg}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Penandatangan Resmi:</span>
                        <p className="font-semibold text-teal-950">
                          {currentRecord.signerName} ({currentRecord.signerRole})
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono font-medium">NIP: {currentRecord.signerNip}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Tanggal Penerbitan:</span>
                        <p className="font-medium text-teal-950">{currentRecord.issuedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cryptographic ETTD Hash & QR Stamp */}
                <div className="p-4 rounded-2xl bg-white border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-teal-950 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                      <Lock className="w-3 h-3 text-teal-600" />
                      <span>Electronic Signature Hash (ETTD BSrE):</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-600 break-all max-w-lg">
                      {currentRecord.ettDigitalSignatureHash}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Waktu Verifikasi Real-time: {new Date().toLocaleString('id-ID')} WIB
                    </p>
                  </div>

                  {qrCodeDataUrl && (
                    <img
                      src={qrCodeDataUrl}
                      alt="Verification QR"
                      className="w-20 h-20 rounded-xl border border-teal-200 shrink-0 bg-white p-1"
                    />
                  )}
                </div>

              </div>
            ) : (
              // NOT FOUND State
              <div className="p-8 rounded-3xl glass-panel-strong border border-rose-300 bg-rose-50/40 text-center space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <ShieldX className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-teal-950">
                    Dokumen Tidak Ditemukan!
                  </h2>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Kode token atau nomor dokumen <strong>"{tokenInput}"</strong> tidak terdaftar dalam basis data resmi {websiteSettings.schoolName}.
                  </p>
                </div>

                <div className="p-4 max-w-md mx-auto rounded-2xl bg-rose-100/70 border border-rose-200 text-xs text-rose-900 text-left space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Peringatan Keamanan:</span>
                  </p>
                  <p>
                    Pastikan Anda memasukkan kode token dengan benar. Waspadai segala bentuk pemalsuan dokumen atau ijazah yang mengatasnamakan sekolah.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Printable Document Modal */}
        <DocumentViewerModal
          isOpen={!!selectedDocumentForModal}
          onClose={() => setSelectedDocumentForModal(null)}
          verificationRecord={selectedDocumentForModal || undefined}
        />

      </div>
    </div>
  );
};
