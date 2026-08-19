import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../../context/AppContext';
import { Letter, GraduationRecord, VerificationRecord } from '../../types';
import {
  X,
  Printer,
  ShieldCheck,
  Download,
  ExternalLink,
  CheckCircle2,
  Lock,
  School
} from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter?: Letter;
  graduationRecord?: GraduationRecord;
  verificationRecord?: VerificationRecord;
  navigate?: (path: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  letter,
  graduationRecord,
  verificationRecord,
  navigate
}) => {
  const { websiteSettings } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const token = letter?.verificationToken || graduationRecord?.verificationToken || verificationRecord?.token || 'DOC-DEMO';
  const verifyUrl = `${window.location.origin}/verify/${token}`;

  useEffect(() => {
    if (isOpen && token) {
      QRCode.toDataURL(verifyUrl, {
        width: 160,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      }).then(setQrDataUrl).catch(console.error);
    }
  }, [isOpen, token, verifyUrl]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-teal-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-panel-strong border border-teal-200 shadow-2xl overflow-hidden bg-white">
        
        {/* Modal Action Bar (No-print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-teal-100 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-teal-950">
                Pratinjau Dokumen Resmi Ber-ETTD
              </h3>
              <p className="text-[11px] text-slate-500">
                Token Verifikasi: <span className="font-mono font-bold text-teal-700">{token}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {navigate && (
              <button
                onClick={() => {
                  onClose();
                  navigate(`/verify/${token}`);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Uji Verifikasi Publik</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-teal-950 hover:bg-teal-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Letter Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 print-card font-sans">
          
          {/* Official Kop Surat (Letterhead) */}
          <div className="border-b-4 border-double border-slate-900 pb-4 mb-6">
            <div className="flex items-center justify-between gap-4 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-slate-900 flex items-center justify-center p-2 shrink-0">
                <School className="w-12 h-12 text-slate-900" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-800">
                  YAYASAN PENDIDIKAN ISLAM AL HIKMAH MAYONG
                </h4>
                <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-800">
                  DINAS PENDIDIKAN PEMUDA DAN OLAHRAGA KABUPATEN JEPARA
                </h4>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-slate-950 font-serif">
                  {websiteSettings.schoolName}
                </h2>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {websiteSettings.address} | NPSN: {websiteSettings.npsn} | Akreditasi: {websiteSettings.akreditasi}
                </p>
                <p className="text-[10px] text-slate-500">
                  Telp: {websiteSettings.phone} | Website: {websiteSettings.website} | Email: {websiteSettings.email}
                </p>
              </div>
              <div className="w-20 shrink-0 hidden sm:block">
                {/* Balance spacer */}
              </div>
            </div>
          </div>

          {/* Document Content - Dynamic according to type */}
          {graduationRecord ? (
            // Surat Keterangan Lulus (SKL)
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide underline text-slate-950">
                  SURAT KETERANGAN LULUS (SKL)
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  Nomor: {graduationRecord.sklDocumentNumber}
                </p>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                Kepala {websiteSettings.schoolName}, selaku Ketua Penyelenggara Asesmen dan Evaluasi Akhir Jenjang Pendidikan Menengah Atas Tahun Pelajaran 2025/2026, dengan ini menerangkan bahwa:
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-slate-600">Nama Siswa</span>
                  <span className="col-span-2 font-bold text-slate-900">: {graduationRecord.studentName}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-slate-600">NIS / NISN</span>
                  <span className="col-span-2 text-slate-900">: {graduationRecord.nis} / {graduationRecord.nisn}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-slate-600">Program / Kelas</span>
                  <span className="col-span-2 text-slate-900">: {graduationRecord.className}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-slate-600">Nilai Rata-Rata Akhir</span>
                  <span className="col-span-2 font-bold text-slate-900">: {graduationRecord.averageScore.toFixed(1)} (Skala 100)</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
                <p className="text-xs text-emerald-800 font-medium">Berdasarkan kriteria kelulusan satuan pendidikan, siswa bersangkutan dinyatakan:</p>
                <p className="text-xl font-extrabold text-emerald-700 tracking-wider mt-1">L U L U S</p>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                Surat keterangan ini berlaku sementara sebagai dokumen pengganti ijazah yang sah hingga Ijazah Asli diterbitkan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.
              </p>
            </div>
          ) : letter ? (
            // General Surat Keluar / Surat Rekomendasi
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide underline text-slate-950">
                  {letter.title}
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  Nomor: {letter.letterNumber}
                </p>
              </div>

              <div className="text-xs space-y-1">
                <p><strong>Hal :</strong> {letter.regarding}</p>
                <p><strong>Kepada Yth :</strong> {letter.recipient}</p>
              </div>

              {letter.contentHtml ? (
                <div
                  className="text-xs text-slate-800 leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: letter.contentHtml }}
                />
              ) : (
                <p className="text-xs text-slate-800 leading-relaxed text-justify">
                  {letter.regarding}. Surat ini dibuat dengan sebenarnya dan memiliki kekuatan hukum resmi setelah dibubuhi Tanda Tangan Elektronik (ETTD).
                </p>
              )}
            </div>
          ) : (
            // Default Verification Record
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide underline text-slate-950">
                  {verificationRecord?.title || 'DOKUMEN RESMI SEKOLAH'}
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  Nomor: {verificationRecord?.documentNumber}
                </p>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed">
                {verificationRecord?.contentSummary}
              </p>
            </div>
          )}

          {/* Official ETTD Signature Section with QR Code */}
          <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            
            {/* Left: Dynamic QR Verification Seal */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="QR Verifikasi Dokumen"
                  className="w-20 h-20 rounded-lg border border-slate-300 shrink-0"
                />
              )}
              <div className="text-[10px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1 font-bold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DOKUMEN TERVERIFIKASI ETTD</span>
                </div>
                <p>Pindai QR untuk memvalidasi keaslian dokumen pada server sekolah.</p>
                <p className="font-mono text-[9px] text-slate-500 truncate max-w-[200px]">
                  Token: {token}
                </p>
              </div>
            </div>

            {/* Right: Digital Signature Details */}
            <div className="text-right text-xs">
              <p className="text-slate-600">Kota Cerdas, {letter?.date || '18 Februari 2026'}</p>
              <p className="font-semibold text-slate-900 mt-1">Kepala Sekolah,</p>

              {/* Digital Signature Badge */}
              <div className="my-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-left">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold">Ditandatangani Secara Elektronik (ETTD)</p>
                  <p className="text-[9px] text-slate-500 font-mono">BSrE / Sertifikasi Digital Sekolah</p>
                </div>
              </div>

              <p className="font-bold text-slate-950 underline mt-1">{websiteSettings.headmasterName}</p>
              <p className="text-[11px] text-slate-600 font-mono">NIP. {websiteSettings.headmasterNip}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
