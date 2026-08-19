import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Building2,
  Users,
  BookOpen,
  Laptop,
  Check,
  AlertCircle,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

interface BOSPPageProps {
  initialYear?: string;
  navigate?: (path: string) => void;
}

export const BOSPPage: React.FC<BOSPPageProps> = ({ initialYear = '2026', navigate }) => {
  // Available BOSP Fiscal Years: Start from 2026 up to upcoming years
  const availableYears = ['2026', '2027', '2028'];
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'TW1' | 'TW2' | 'TW3' | 'TW4'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // BOSP Financial Summary Data by Fiscal Year
  const bospDataByYear: Record<string, {
    totalBudget: number;
    realization: number;
    remaining: number;
    totalStudents: number;
    unitCostPerStudent: number;
    bosReguler: number;
    bosKinerja: number;
    statusLPJ: string;
    lastUpdated: string;
    categories: {
      id: string;
      name: string;
      code: string;
      budget: number;
      spent: number;
      quarter: string;
      percentage: number;
      itemsCount: number;
    }[];
    lpjDocuments: {
      id: string;
      title: string;
      quarter: string;
      date: string;
      fileSize: string;
      signedBy: string;
      verificationCode: string;
    }[];
  }> = {
    '2026': {
      totalBudget: 528000000,
      realization: 245600000,
      remaining: 282400000,
      totalStudents: 480,
      unitCostPerStudent: 1100000,
      bosReguler: 480000000,
      bosKinerja: 48000000,
      statusLPJ: 'TERVERIFIKASI & TERKIRIM (BOS Salur & ARKAS Kemendikbudristek)',
      lastUpdated: '15 Agustus 2026',
      categories: [
        { id: 'cat-1', name: 'Pengembangan Perpustakaan & Pengadaan Buku Teks', code: '01.01', budget: 52800000, spent: 48500000, quarter: 'TW1', percentage: 91.8, itemsCount: 14 },
        { id: 'cat-2', name: 'Penerimaan Peserta Didik Baru (PPDB Online)', code: '01.02', budget: 24000000, spent: 22400000, quarter: 'TW2', percentage: 93.3, itemsCount: 8 },
        { id: 'cat-3', name: 'Kegiatan Pembelajaran & Ekstrakurikuler Santri', code: '01.03', budget: 75000000, spent: 42000000, quarter: 'TW1', percentage: 56.0, itemsCount: 19 },
        { id: 'cat-4', name: 'Pelaksanaan Asesmen, Evaluasi & Ujian Berbasis CBT', code: '01.04', budget: 48000000, spent: 26800000, quarter: 'TW2', percentage: 55.8, itemsCount: 11 },
        { id: 'cat-5', name: 'Pelaksanaan Administrasi Kegiatan Sekolah & Digitalisasi', code: '01.05', budget: 62000000, spent: 34500000, quarter: 'TW1', percentage: 55.6, itemsCount: 22 },
        { id: 'cat-6', name: 'Pengembangan Profesi Pendidik & Tenaga Kependidikan', code: '01.06', budget: 35000000, spent: 18200000, quarter: 'TW2', percentage: 52.0, itemsCount: 7 },
        { id: 'cat-7', name: 'Langganan Daya, Jasa Listrik, Internet Dedicated & Server', code: '01.07', budget: 42000000, spent: 21000000, quarter: 'TW1', percentage: 50.0, itemsCount: 6 },
        { id: 'cat-8', name: 'Pemeliharaan Sarana & Prasarana Kampus Sekolah', code: '01.08', budget: 85000000, spent: 32200000, quarter: 'TW2', percentage: 37.8, itemsCount: 15 },
        { id: 'cat-9', name: 'Penyediaan Alat Multi Media Pembelajaran Digital', code: '01.09', budget: 44200000, spent: 0, quarter: 'TW3', percentage: 0, itemsCount: 4 },
        { id: 'cat-10', name: 'Pembayaran Honor Guru & Tenaga Kependidikan Non-ASN', code: '01.10', budget: 60000000, spent: 0, quarter: 'TW3', percentage: 0, itemsCount: 12 }
      ],
      lpjDocuments: [
        { id: 'doc-1', title: 'Laporan Realisasi BOSP Tahap 1 (Triwulan 1 & 2) TA 2026', quarter: 'Tahap 1', date: '10 Juli 2026', fileSize: '2.4 MB', signedBy: "M.Syafi'i, S.Th.I (Kepala Sekolah) & Bendahara BOSP", verificationCode: 'BOSP-2026-THP1-8932' },
        { id: 'doc-2', title: 'Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) BOSP 2026', quarter: 'Tahunan', date: '15 Januari 2026', fileSize: '1.1 MB', signedBy: "M.Syafi'i, S.Th.I (Kepala Sekolah)", verificationCode: 'SPTJM-BOSP-2026-0041' },
        { id: 'doc-3', title: 'Rekapitulasi Penggunaan Dana BOS Reguler Berdasarkan Standar Nasional Pendidikan', quarter: 'Semester 1', date: '05 Juli 2026', fileSize: '3.1 MB', signedBy: 'Tim Manajemen BOSP Sekolah', verificationCode: 'REKAP-BOSP-2026-SM1' }
      ]
    },
    '2027': {
      totalBudget: 561000000,
      realization: 0,
      remaining: 561000000,
      totalStudents: 510,
      unitCostPerStudent: 1100000,
      bosReguler: 510000000,
      bosKinerja: 51000000,
      statusLPJ: 'DRAF RKAS TAHUN ANGGARAN 2027 (Dalam Proses Sinkronisasi ARKAS)',
      lastUpdated: '1 Januari 2027',
      categories: [
        { id: 'cat-2027-1', name: 'Pengembangan Perpustakaan & Laboratorium', code: '01.01', budget: 58000000, spent: 0, quarter: 'TW1', percentage: 0, itemsCount: 16 },
        { id: 'cat-2027-2', name: 'Penerimaan Peserta Didik Baru (PPDB 2027/2028)', code: '01.02', budget: 26000000, spent: 0, quarter: 'TW2', percentage: 0, itemsCount: 9 },
        { id: 'cat-2027-3', name: 'Kegiatan Pembelajaran & Digital Smart Class', code: '01.03', budget: 82000000, spent: 0, quarter: 'TW1', percentage: 0, itemsCount: 22 }
      ],
      lpjDocuments: [
        { id: 'doc-2027-1', title: 'Rencana Kegiatan dan Anggaran Sekolah (RKAS) BOSP TA 2027', quarter: 'Rancangan', date: '10 Januari 2027', fileSize: '1.8 MB', signedBy: 'Kepala Sekolah & Komite Sekolah', verificationCode: 'RKAS-BOSP-2027-DRAFT' }
      ]
    },
    '2028': {
      totalBudget: 594000000,
      realization: 0,
      remaining: 594000000,
      totalStudents: 540,
      unitCostPerStudent: 1100000,
      bosReguler: 540000000,
      bosKinerja: 54000000,
      statusLPJ: 'PROYEKSI ANGGARAN BOSP TAHUN 2028 (Perencanaan Jangka Menengah)',
      lastUpdated: '1 Januari 2028',
      categories: [
        { id: 'cat-2028-1', name: 'Pengembangan Sarana Digital & Perpustakaan', code: '01.01', budget: 65000000, spent: 0, quarter: 'TW1', percentage: 0, itemsCount: 15 }
      ],
      lpjDocuments: [
        { id: 'doc-2028-1', title: 'Draf Proyeksi Pagu BOSP dan Program Prioritas TA 2028', quarter: 'Proyeksi', date: '15 Januari 2028', fileSize: '1.2 MB', signedBy: 'Tim Pengembang Kurikulum & BOSP', verificationCode: 'PROYEKSI-BOSP-2028' }
      ]
    }
  };

  const currentYearData = bospDataByYear[selectedYear] || bospDataByYear['2026'];

  const filteredCategories = currentYearData.categories.filter((cat) => {
    const matchesQuarter = selectedQuarter === 'ALL' || cat.quarter === selectedQuarter;
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || cat.code.includes(searchQuery);
    return matchesQuarter && matchesSearch;
  });

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const percentSpent = currentYearData.totalBudget > 0
    ? Math.round((currentYearData.realization / currentYearData.totalBudget) * 100)
    : 0;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100/90 shadow-sm relative overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white">
        <div className="liquid-glow w-96 h-96 bg-amber-400/20 -right-10 -top-10" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Portal Transparansi Publik Dana BOSP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Laporan Realisasi & Transparansi BOSP
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Penyampaian pertanggungjawaban pengelolaan Bantuan Operasional Satuan Pendidikan (BOSP) SMP Islam Al Hikmah Mayong secara akuntabel, transparan, dan terintegrasi dengan ARKAS Kemendikbudristek.
          </p>

          {/* Year Selector Tabs */}
          <div className="pt-3 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-teal-200 uppercase tracking-wider mr-1">Pilih Tahun Anggaran:</span>
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
                }`}
              >
                Tahun {yr} {yr === '2026' ? '(Aktif)' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-card p-5 rounded-2xl border-teal-100 shadow-xs space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Pagu BOSP {selectedYear}</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-extrabold text-teal-950">
            {formatRupiah(currentYearData.totalBudget)}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Reguler: {formatRupiah(currentYearData.bosReguler)}</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-teal-100 shadow-xs space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Realisasi Belanja</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-extrabold text-emerald-600">
            {formatRupiah(currentYearData.realization)}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-semibold pt-1 border-t border-slate-100">
            <span>Terserap: {percentSpent}% dari pagu anggaran</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-teal-100 shadow-xs space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Sisa Anggaran</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-extrabold text-amber-600">
            {formatRupiah(currentYearData.remaining)}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Kinerja: {formatRupiah(currentYearData.bosKinerja)}</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-teal-100 shadow-xs space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Basis Data Siswa</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-extrabold text-teal-950">
            {currentYearData.totalStudents} Siswa
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Satuan: {formatRupiah(currentYearData.unitCostPerStudent)} / siswa / th</span>
          </div>
        </div>

      </div>

      {/* Progress Bar & Status Info */}
      <div className="glass-panel p-5 rounded-2xl border border-teal-100 space-y-3 bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-teal-950">{currentYearData.statusLPJ}</span>
          </div>
          <span className="text-[11px] text-slate-500">Pembaruan data terakhir: {currentYearData.lastUpdated}</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-600 via-emerald-500 to-amber-400 transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(2, percentSpent))}%` }}
          />
        </div>
      </div>

      {/* Main Content Layout: Categories & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Component Breakdown Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-heading font-bold text-lg text-teal-950">
                Rincian Realisasi Komponen Penggunaan Dana BOSP ({selectedYear})
              </h2>
              <p className="text-xs text-slate-500">
                Sesuai Permendikbudristek tentang Petunjuk Teknis Pengelolaan Dana BOSP
              </p>
            </div>

            {/* Filter Quarter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-teal-50/80 border border-teal-100 text-[11px] font-bold">
              {(['ALL', 'TW1', 'TW2', 'TW3', 'TW4'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuarter(q)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    selectedQuarter === q
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-teal-800'
                  }`}
                >
                  {q === 'ALL' ? 'Semua' : q}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari komponen pembiayaan BOSP atau kode rekening..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-teal-200 text-xs text-teal-950 placeholder:text-slate-400 focus:outline-teal-600 shadow-xs"
            />
          </div>

          {/* Categories List */}
          <div className="glass-panel-strong rounded-2xl border border-teal-100 overflow-hidden divide-y divide-teal-100 bg-white">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="p-4 hover:bg-teal-50/40 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 text-teal-800 border border-teal-200">
                      {cat.code}
                    </span>
                    <h3 className="font-heading font-bold text-xs text-teal-950">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 w-fit">
                    {cat.quarter}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Pagu Anggaran:</span>
                    <span className="font-bold text-slate-700">{formatRupiah(cat.budget)}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Realisasi Pengeluaran:</span>
                    <span className="font-bold text-emerald-600">{formatRupiah(cat.spent)}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                      <span>Penyerapan</span>
                      <span className="font-bold text-teal-800">{cat.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-600"
                        style={{ width: `${Math.min(100, cat.percentage)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                Tidak ada komponen anggaran yang sesuai dengan filter pencarian.
              </div>
            )}
          </div>
        </div>

        {/* Right: Downloadable LPJ Documents & Compliance Badges */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* LPJ Documents Download Box */}
          <div className="glass-panel p-5 rounded-3xl border border-teal-100 space-y-4 bg-white shadow-xs">
            <div className="flex items-center gap-2 text-teal-950">
              <FileText className="w-5 h-5 text-teal-600" />
              <h3 className="font-heading font-bold text-sm">
                Dokumen Resmi & LPJ BOSP {selectedYear}
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Unduh salinan berkas LPJ resmi yang telah divalidasi dan ditandatangani secara digital oleh Kepala Sekolah & Bendahara.
            </p>

            <div className="space-y-3">
              {currentYearData.lpjDocuments.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-2xl border border-teal-100 bg-teal-50/40 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs text-teal-950 leading-snug">
                      {doc.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 shrink-0">
                      {doc.quarter}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{doc.date} • {doc.fileSize}</span>
                    <span className="font-mono text-teal-700 font-bold">{doc.verificationCode}</span>
                  </div>

                  <button
                    onClick={() => alert(`Mengunduh berkas resmi ${doc.title} (Simulasi PDF Resmi BOSP Terverifikasi TTE BSrE)`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-xs cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Dokumen LPJ (PDF)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Audit Assurance Badge */}
          <div className="p-5 rounded-3xl border border-amber-200 bg-amber-50/70 space-y-3 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Jaminan Akuntabilitas Publik</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900/90">
              Pengelolaan dana BOSP di SMP Islam Al Hikmah Mayong dilaporkan secara berkala ke Dinas Dikpora Kabupaten Jepara, Kementerian Pendidikan Dasar dan Menengah melalui sistem <strong>ARKAS 4.0</strong>, serta diawasi oleh Komite Sekolah.
            </p>
            <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[10px] font-semibold text-amber-800">
              <span>NPSN: 20318492</span>
              <span>Status: WTP (Wajar Tanpa Pengecualian)</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
