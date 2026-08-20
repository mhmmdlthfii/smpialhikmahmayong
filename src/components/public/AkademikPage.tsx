import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  FileText,
  Download,
  Search,
  Clock,
  UserCheck,
  GraduationCap,
  Layers,
  FolderDown,
  CheckCircle2,
  Filter,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AkademikPageProps {
  initialTab?: 'kosp' | 'kalender' | 'jadwal' | 'administrasi';
  navigate?: (path: string) => void;
}

export const AkademikPage: React.FC<AkademikPageProps> = ({ initialTab = 'kosp', navigate }) => {
  const { websiteSettings, teachers } = useApp();
  const [activeTab, setActiveTab] = useState<'kosp' | 'kalender' | 'jadwal' | 'administrasi'>(initialTab);
  const [selectedClass, setSelectedClass] = useState<string>('VII-A');
  const [selectedDay, setSelectedDay] = useState<string>('Senin');
  const [selectedSemester, setSelectedSemester] = useState<'ganjil' | 'genap'>('genap');
  const [searchAdminDoc, setSearchAdminDoc] = useState<string>('');

  // Sample Schedule Data for SMP Islam Al Hikmah Mayong
  const scheduleData: Record<string, { time: string; subject: string; teacher: string; room: string }[]> = {
    'Senin': [
      { time: '06.45 - 07.30', subject: 'Upacara Bendera / Sholat Dhuha Berjamaah', teacher: 'Semua Ustadz/Ustadzah', room: 'Halaman Utama & Masjid' },
      { time: '07.30 - 08.50', subject: 'Pendidikan Agama Islam & Budi Pekerti (PAI)', teacher: 'Ahmad Zainuddin, S.Pd.I', room: 'Ruang Kelas VII-A' },
      { time: '08.50 - 09.30', subject: 'Tahfidz Al-Qur\'an & Karakter Islami', teacher: "M.Syafi'i, S.Th.I", room: 'Masjid Kampus' },
      { time: '09.30 - 10.00', subject: 'Istirahat & Snack Pagi Sehat', teacher: '-', room: 'Kantin & Selasar' },
      { time: '10.00 - 11.20', subject: 'Matematika Terapan & Logika', teacher: 'Fatimatuz Zahra, S.Si.', room: 'Ruang Kelas VII-A' },
      { time: '11.20 - 12.40', subject: 'Bahasa Indonesia', teacher: 'Siti Nurhaliza, S.Pd.', room: 'Ruang Kelas VII-A' },
      { time: '12.40 - 13.30', subject: 'Sholat Dzuhur Berjamaah & Kultum', teacher: 'Ustadz Pembimbing', room: 'Masjid Kampus' }
    ],
    'Selasa': [
      { time: '06.45 - 07.15', subject: 'Sholat Dhuha & Muraja\'ah Juz 30', teacher: 'Wali Kelas VII-A', room: 'Masjid Kampus' },
      { time: '07.15 - 08.35', subject: 'Ilmu Pengetahuan Alam (IPA Terpadu)', teacher: 'Drs. H. Mulyono, M.Pd.I', room: 'Lab Sains IPA' },
      { time: '08.35 - 09.55', subject: 'Informatika & Literasi Digital', teacher: 'Mohammad Rofi\'i, S.Kom.', room: 'Lab Komputer 1' },
      { time: '09.55 - 10.25', subject: 'Istirahat', teacher: '-', room: 'Kantin' },
      { time: '10.25 - 11.45', subject: 'Bahasa Inggris (Speaking & Grammar)', teacher: 'Ustadzah Nurul Hidayah, S.Pd.', room: 'Ruang Kelas VII-A' },
      { time: '11.45 - 12.40', subject: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: 'Bambang Supriyanto, S.Pd.', room: 'Lapangan Olahraga' },
      { time: '12.40 - 13.30', subject: 'Sholat Dzuhur Berjamaah & Pulang', teacher: 'Pembimbing', room: 'Masjid Kampus' }
    ],
    'Rabu': [
      { time: '06.45 - 07.15', subject: 'Sholat Dhuha & Kajian Hadits Arbain', teacher: 'Ustadz Ahmad Zainuddin', room: 'Masjid Kampus' },
      { time: '07.15 - 08.35', subject: 'Bahasa Arab Komunikatif', teacher: 'Ustadz H. Abdul Wahab, Lc.', room: 'Ruang Kelas VII-A' },
      { time: '08.35 - 09.55', subject: 'Ilmu Pengetahuan Sosial (IPS)', teacher: 'Dra. Hj. Sri Wahyuni', room: 'Ruang Kelas VII-A' },
      { time: '09.55 - 10.25', subject: 'Istirahat', teacher: '-', room: 'Kantin' },
      { time: '10.25 - 11.45', subject: 'Pendidikan Pancasila & Kewarganegaraan', teacher: 'Drs. Suwarno', room: 'Ruang Kelas VII-A' },
      { time: '11.45 - 12.40', subject: 'Seni Budaya & Kaligrafi Islami', teacher: 'Ustadz M. Syukron', room: 'Ruang Kesenian' },
      { time: '12.40 - 13.30', subject: 'Sholat Dzuhur Berjamaah & Keputrian/Klub', teacher: 'Pembimbing', room: 'Masjid Kampus' }
    ],
    'Kamis': [
      { time: '06.45 - 07.15', subject: 'Sholat Dhuha & Pembacaan Ratib Al-Haddad', teacher: 'Wali Kelas', room: 'Masjid Kampus' },
      { time: '07.15 - 08.35', subject: 'Ilmu Pengetahuan Alam (IPA Fisika/Biologi)', teacher: 'Drs. H. Mulyono, M.Pd.I', room: 'Lab Sains IPA' },
      { time: '08.35 - 09.55', subject: 'Matematika (Geometri & Aljabar)', teacher: 'Fatimatuz Zahra, S.Si.', room: 'Ruang Kelas VII-A' },
      { time: '09.55 - 10.25', subject: 'Istirahat', teacher: '-', room: 'Kantin' },
      { time: '10.25 - 11.45', subject: 'Prakarya & Kewirausahaan Mandiri', teacher: 'Endang Purwanti, S.Pd.', room: 'Workshop Kriya' },
      { time: '11.45 - 12.40', subject: 'Bahasa Jawa & Budaya Lokal Jepara', teacher: 'Siti Nurhaliza, S.Pd.', room: 'Ruang Kelas VII-A' },
      { time: '12.40 - 13.30', subject: 'Sholat Dzuhur Berjamaah', teacher: 'Pembimbing', room: 'Masjid Kampus' }
    ],
    'Jumat': [
      { time: '06.30 - 07.15', subject: 'Senam Pagi Sehat / Kerja Bakti Lingkungan Asri', teacher: 'Semua Guru & Siswa', room: 'Halaman Kampus' },
      { time: '07.15 - 08.15', subject: 'Tahfidz Al-Qur\'an Juz Amma & Setoran Hafalan', teacher: 'Tim Pengasuh Tahfidz', room: 'Masjid Kampus' },
      { time: '08.15 - 09.30', subject: 'Proyek Penguatan Profil Pelajar Pancasila (P5)', teacher: 'Fasilitator P5', room: 'Aula Pertemuan' },
      { time: '09.30 - 10.45', subject: 'Bimbingan Konseling & Karakter Santri', teacher: 'Dra. Hj. Romlah, M.Si.', room: 'Ruang Konseling' },
      { time: '11.00 - 12.30', subject: 'Persiapan & Pelaksanaan Sholat Jum\'at Berjamaah', teacher: 'Keluarga Besar Sekolah', room: 'Masjid Kampus' }
    ],
    'Sabtu': [
      { time: '06.45 - 07.15', subject: 'Sholat Dhuha & Literasi Membaca Santri', teacher: 'Wali Kelas', room: 'Perpustakaan' },
      { time: '07.15 - 09.30', subject: 'Kegiatan Pengembangan Diri & Ekstrakurikuler Wajib/Pilihan (Pramuka, PMR, Qiroah, Robotik, Jurnalistik)', teacher: 'Pelatih Ekskul', room: 'Area Kampus & Lapangan' },
      { time: '09.30 - 11.30', subject: 'Klub Sains, Olimpiade Matematika & Arabic Club', teacher: 'Guru Pembina Prestasi', room: 'Lab & Ruang Khusus' }
    ]
  };

  // Administration Documents List
  const adminDocuments = [
    { id: 'doc-adm-1', title: 'Kalender Pendidikan SMP Islam Al Hikmah Mayong TA 2026/2027', category: 'Kalender Akademik', type: 'PDF', size: '1.4 MB', updated: 'Januari 2026', code: 'KAL-2026-AHM' },
    { id: 'doc-adm-2', title: 'Format Modul Ajar Kurikulum Merdeka Fase D Terintegrasi Nilai Islami', category: 'Modul Ajar', type: 'DOCX / PDF', size: '2.8 MB', updated: 'Februari 2026', code: 'MODUL-MERDEKA-FASED' },
    { id: 'doc-adm-3', title: 'Panduan Alur Tujuan Pembelajaran (ATP) & Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', category: 'Perangkat Ajar', type: 'PDF', size: '3.2 MB', updated: 'Januari 2026', code: 'ATP-KKTP-2026' },
    { id: 'doc-adm-4', title: 'Format Jurnal Pembelajaran Guru & Lembar Observasi Karakter Santri', category: 'Administrasi Kelas', type: 'XLSX / PDF', size: '1.1 MB', updated: 'Februari 2026', code: 'JURNAL-OBS-2026' },
    { id: 'doc-adm-5', title: 'Instrumen Asesmen Sumatif Akhir Semester (SAS) & Bank Soal Terstandar', category: 'Asesmen & Evaluasi', type: 'ZIP / PDF', size: '4.5 MB', updated: 'Maret 2026', code: 'ASESMEN-SAS-2026' },
    { id: 'doc-adm-6', title: 'Modul Proyek Penguatan Profil Pelajar Pancasila (P5) Tema Kearifan Lokal & Gaya Hidup Berkelanjutan', category: 'Modul P5', type: 'PDF', size: '5.1 MB', updated: 'Januari 2026', code: 'MODUL-P5-LOKAL' },
    { id: 'doc-adm-7', title: 'Standar Operasional Prosedur (SOP) Penilaian Karakter & Kedisiplinan Santri', category: 'SOP & Tata Tertib', type: 'PDF', size: '1.6 MB', updated: 'Januari 2026', code: 'SOP-KARAKTER-2026' }
  ];

  const filteredAdminDocs = adminDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchAdminDoc.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchAdminDoc.toLowerCase()) ||
    doc.code.toLowerCase().includes(searchAdminDoc.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100/90 shadow-sm relative overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white">
        <div className="liquid-glow w-96 h-96 bg-amber-400/20 -right-10 -top-10" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <GraduationCap className="w-4 h-4" />
            <span>Pusat Layanan & Dokumen Akademik</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Portal Akademik & Kurikulum Terpadu
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Akses resmi berkas Kurikulum Operasional Satuan Pendidikan (KOSP), Jadwal Mengajar harian kelas dan guru, serta repositori berkas administrasi pembelajaran bagi pendidik di SMP Islam Al Hikmah Mayong.
          </p>

          {/* Sub Navigation Navigation Pills */}
          <div className="pt-4 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('kosp')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'kosp'
                  ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Berkas KOSP</span>
            </button>

            <button
              onClick={() => setActiveTab('kalender')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'kalender'
                  ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Kalender Akademik</span>
            </button>

            <button
              onClick={() => setActiveTab('jadwal')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'jadwal'
                  ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Jadwal Mengajar</span>
            </button>

            <button
              onClick={() => setActiveTab('administrasi')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'administrasi'
                  ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Administrasi Guru</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BERKAS KOSP */}
      {activeTab === 'kosp' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: KOSP Overview & Key Pillars */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-teal-100 space-y-4 bg-white shadow-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100 inline-block">
                      Kurikulum Merdeka Mandiri Berbagi
                    </span>
                    <h2 className="text-xl sm:text-2xl font-heading font-black text-teal-950">
                      Dokumen KOSP SMP Islam Al Hikmah Mayong TA 2026/2027
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kurikulum Operasional Satuan Pendidikan (KOSP) SMP Islam Al Hikmah Mayong dirancang dengan memadukan Standar Nasional Pendidikan (Kurikulum Merdeka), Penguatan Profil Pelajar Pancasila (P5), serta integrasi nilai-nilai keislaman Ahlussunnah wal Jama'ah dan pembiasaan Tahfidzul Qur'an.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-1">
                    <span className="text-[11px] font-bold text-teal-800 block">Karakteristik Sekolah</span>
                    <p className="text-xs text-slate-600">Berbasis Pesantren Modern & Literasi Digital Terapan</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
                    <span className="text-[11px] font-bold text-amber-800 block">Fase Pembelajaran</span>
                    <p className="text-xs text-slate-600">Fase D (Jenjang Kelas VII, VIII, dan IX SMP)</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-800 block">Status Pengesahan</span>
                    <p className="text-xs text-slate-600">Tervalidasi Pengawas & Disahkan Dinas Dikpora</p>
                  </div>
                </div>
              </div>

              {/* Struktur Dokumen KOSP */}
              <div className="space-y-4">
                <h3 className="text-base font-heading font-bold text-teal-950">
                  Struktur Bab & Isi Utama Dokumen KOSP
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="glass-card p-4 rounded-2xl border-teal-100 bg-white space-y-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center">1</span>
                      <span>Bab I: Karakteristik Satuan Pendidikan</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Analisis konteks geografis Mayong Jepara, potensi peserta didik, pendidik, sarana digital, dan kemitraan masyarakat.
                    </p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border-teal-100 bg-white space-y-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center">2</span>
                      <span>Bab II: Visi, Misi & Tujuan Satuan Pendidikan</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Membentuk generasi Qur'ani, berdaya saing Iptek, terampil berbahasa, dan berakhlak mulia secara berkelanjutan.
                    </p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border-teal-100 bg-white space-y-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center">3</span>
                      <span>Bab III: Pengorganisasian Pembelajaran</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Intrakurikuler, Kokurikuler P5 (Kearifan Lokal Jepara & Bhinneka Tunggal Ika), serta Ekstrakurikuler Pilihan.
                    </p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border-teal-100 bg-white space-y-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center">4</span>
                      <span>Bab IV: Rencana Pembelajaran & Evaluasi</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Perencanaan asesmen diagnostik, formatif, sumatif, serta pendampingan dan pengembangan profesional guru.
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Download Official KOSP Files */}
            <div className="lg:col-span-4 space-y-5">
              
              <div className="glass-panel p-5 rounded-3xl border border-teal-100 space-y-4 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-teal-950 font-heading font-bold text-sm">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span>Unduh Dokumen KOSP Lengkap</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Dokumen KOSP dapat diunduh dalam format PDF resmi dengan tanda tangan elektronik dan stempel legalitas sekolah.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl border border-teal-100 bg-teal-50/40 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-teal-950">
                        Dokumen KOSP Buku I (Utama) TA 2026/2027
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                        PDF • 4.8 MB
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Disahkan oleh Kepala Sekolah & Komite Sekolah
                    </p>
                    <button
                      onClick={() => alert('Mengunduh Dokumen KOSP Buku I (Simulasi PDF)')}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Dokumen KOSP Buku I</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-teal-100 bg-teal-50/40 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-teal-950">
                        Lampiran Capaian Pembelajaran & Modul P5
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        PDF • 6.2 MB
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Modul proyek kearifan lokal & budaya santri
                    </p>
                    <button
                      onClick={() => alert('Mengunduh Lampiran KOSP & Modul P5 (Simulasi PDF)')}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-teal-900 bg-white border border-teal-200 hover:bg-teal-50 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-700" />
                      <span>Unduh Lampiran Modul P5</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Kurikulum Info Card */}
              <div className="p-5 rounded-3xl border border-teal-200 bg-teal-50/60 space-y-2.5 text-xs text-teal-950">
                <div className="flex items-center gap-2 font-bold text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ciri Khas Kurikulum Al Hikmah</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-teal-900/80 list-disc list-inside">
                  <li>Program Hafalan Al-Qur'an (Tahfidz Juz 30 & Pilihan)</li>
                  <li>Penguasaan Dasar Bahasa Arab & Bahasa Inggris Aktif</li>
                  <li>Integrasi TIK & Pemrograman Dasar (Informatika)</li>
                  <li>Pendidikan Karakter Berbasis Adab Santri</li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: KALENDER AKADEMIK */}
      {activeTab === 'kalender' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-teal-950">
                Kalender Pendidikan & Jadwal Akademik
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Tahun Ajaran 2026/2027 • SMP Islam Al Hikmah Mayong Jepara
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSemester('ganjil')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSemester === 'ganjil'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-teal-800 border border-teal-200'
                }`}
              >
                Semester Ganjil (Jul - Des)
              </button>
              <button
                onClick={() => setSelectedSemester('genap')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSemester === 'genap'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-teal-800 border border-teal-200'
                }`}
              >
                Semester Genap (Jan - Jun)
              </button>
              <button
                onClick={() => alert('Mengunduh Kalender Pendidikan Format PDF Resmi')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Kalender PDF</span>
              </button>
            </div>
          </div>

          {/* Agenda Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl bg-white border border-teal-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Pembelajaran Efektif
              </span>
              <h3 className="font-heading font-bold text-sm text-teal-950">Awal Masuk & KBM</h3>
              <p className="text-xs text-slate-500">
                Semester Genap dimulai 5 Januari 2026. Pembelajaran aktif berbasis Kurikulum Merdeka Fase D.
              </p>
            </div>

            <div className="glass-card p-4 rounded-2xl bg-white border border-teal-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Asesmen Formatif
              </span>
              <h3 className="font-heading font-bold text-sm text-teal-950">Penilaian Tengah Semester</h3>
              <p className="text-xs text-slate-500">
                PTS / STS Semester Genap dijadwalkan pada 23 Februari - 2 Maret 2026 berbasis CBT dan unjuk kerja.
              </p>
            </div>

            <div className="glass-card p-4 rounded-2xl bg-white border border-teal-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                Kegiatan Ramadhan
              </span>
              <h3 className="font-heading font-bold text-sm text-teal-950">Pesantren Kilat & Zakat</h3>
              <p className="text-xs text-slate-500">
                Pembinaan intensif tahfidz, kajian kitab akhlak santri, dan pembagian zakat fitrah 11 - 20 Maret 2026.
              </p>
            </div>

            <div className="glass-card p-4 rounded-2xl bg-white border border-teal-100 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                Evaluasi Akhir
              </span>
              <h3 className="font-heading font-bold text-sm text-teal-950">SAS & Pembagian Rapor</h3>
              <p className="text-xs text-slate-500">
                Sumatif Akhir Tahun (SAT) kelas VII-VIII & PSAJ Kelas IX, dilanjutkan penerimaan rapor 20 Juni 2026.
              </p>
            </div>
          </div>

          {/* Timeline Table */}
          <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden bg-white shadow-xs">
            <div className="p-4 bg-teal-50/70 border-b border-teal-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold text-teal-950">
                  Rincian Agenda {selectedSemester === 'ganjil' ? 'Semester Ganjil TA 2026/2027' : 'Semester Genap TA 2026/2027'}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Status: Resmi Berlaku
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="px-5 py-3">Bulan</th>
                    <th className="px-5 py-3">Rentang Tanggal</th>
                    <th className="px-5 py-3">Nama Kegiatan / Agenda</th>
                    <th className="px-5 py-3">Keterangan / Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-teal-950 font-medium">
                  {selectedSemester === 'genap' ? (
                    <>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Januari 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">05 Januari 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Hari Pertama Masuk Semester Genap</td>
                        <td className="px-5 py-3.5 text-slate-600">Apel pagi, pembagian jadwal mengajar & tadarus juz 30</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Januari 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">16 Januari 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Peringatan Isra Mi'raj Nabi Muhammad SAW</td>
                        <td className="px-5 py-3.5 text-slate-600">Pengajian akbar santri & khotmil qur'an</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Februari 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">23 Feb - 02 Mar 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Penilaian Tengah Semester (PTS/STS) Genap</td>
                        <td className="px-5 py-3.5 text-slate-600">Asesmen berbasis komputer dan penilaian portofolio</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Maret 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">11 - 20 Maret 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Pesantren Kilat Ramadhan 1447 H</td>
                        <td className="px-5 py-3.5 text-slate-600">Kajian kitab ta'lim muta'allim, tahfidz & bakti sosial</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Maret - April 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">23 Mar - 04 Apr 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Libur Hari Raya Idul Fitri 1447 H</td>
                        <td className="px-5 py-3.5 text-slate-600">Cuti bersama & silaturahmi Idul Fitri</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Mei 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">11 - 18 Mei 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Penilaian Sumatif Akhir Jenjang (PSAJ) Kelas IX</td>
                        <td className="px-5 py-3.5 text-slate-600">Ujian kelulusan terstandar bagi santri kelas IX</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Juni 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">01 - 08 Juni 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Sumatif Akhir Tahun (SAT) Kelas VII & VIII</td>
                        <td className="px-5 py-3.5 text-slate-600">Evaluasi kenaikan kelas terpadu</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Juni 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">20 Juni 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Penerimaan Rapor & Wisuda Pelepasan Santri</td>
                        <td className="px-5 py-3.5 text-slate-600">Wisuda tahfidz, penyerahan rapor & libur kenaikan kelas</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Juli 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">13 - 15 Juli 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Masa Pengenalan Lingkungan Sekolah (MPLS)</td>
                        <td className="px-5 py-3.5 text-slate-600">Orientasi santri baru, pengenalan adab & kultur Al Hikmah</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Agustus 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">17 Agustus 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Peringatan HUT Kemerdekaan RI Ke-81</td>
                        <td className="px-5 py-3.5 text-slate-600">Upacara bendera & karnaval budaya islami</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">September 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">21 - 28 Sept 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Penilaian Tengah Semester (PTS/STS) Ganjil</td>
                        <td className="px-5 py-3.5 text-slate-600">Evaluasi tengah semester ganjil semua jenjang</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Oktober 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">22 Oktober 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Hari Santri Nasional (HSN 2026)</td>
                        <td className="px-5 py-3.5 text-slate-600">Apel akbar bersarung, lomba kirab & qiro\'ah santri</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">November 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">25 November 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Peringatan Hari Guru Nasional</td>
                        <td className="px-5 py-3.5 text-slate-600">Apresiasi dedikasi ustadz/ustadzah & gelar karya P5</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Desember 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">01 - 08 Des 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Sumatif Akhir Semester (SAS) Ganjil</td>
                        <td className="px-5 py-3.5 text-slate-600">Asesmen akhir semester ganjil berbasis digital</td>
                      </tr>
                      <tr className="hover:bg-teal-50/40">
                        <td className="px-5 py-3.5 font-bold text-teal-800">Desember 2026</td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">19 Desember 2026</td>
                        <td className="px-5 py-3.5 font-bold text-teal-950">Pembagian Rapor Semester Ganjil</td>
                        <td className="px-5 py-3.5 text-slate-600">Pertemuan wali santri & pembagian buku rapor</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: JADWAL MENGAJAR */}
      {activeTab === 'jadwal' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-black text-teal-950">
                Jadwal Mengajar & Pembelajaran Terpadu
              </h2>
              <p className="text-xs text-slate-500">
                Tahun Ajaran 2026/2027 Semester Genap • SMP Islam Al Hikmah Mayong
              </p>
            </div>

            {/* Class Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Pilih Kelas:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-xs font-bold text-teal-950 bg-white focus:outline-teal-600"
              >
                <option value="VII-A">Kelas VII-A (Unggulan)</option>
                <option value="VII-B">Kelas VII-B (Reguler)</option>
                <option value="VIII-A">Kelas VIII-A (Unggulan)</option>
                <option value="VIII-B">Kelas VIII-B (Reguler)</option>
                <option value="IX-A">Kelas IX-A (Tahfidz)</option>
                <option value="IX-B">Kelas IX-B (Reguler)</option>
              </select>
            </div>
          </div>

          {/* Day Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-teal-50/80 border border-teal-100 w-fit">
            {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-800 hover:bg-white/60'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Table */}
          <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden bg-white shadow-xs">
            <div className="p-4 bg-teal-50/70 border-b border-teal-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold text-teal-950">
                  Jadwal Hari {selectedDay} • {selectedClass}
                </span>
              </div>
              <button
                onClick={() => alert(`Mengunduh Jadwal Pelajaran ${selectedClass} (PDF)`)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-teal-800 bg-white border border-teal-200 hover:bg-teal-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Cetak Jadwal</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="px-5 py-3">Waktu (WIB)</th>
                    <th className="px-5 py-3">Mata Pelajaran & Aktivitas</th>
                    <th className="px-5 py-3">Guru Pengampu / Pembina</th>
                    <th className="px-5 py-3">Ruang / Lokasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-teal-950 font-medium">
                  {scheduleData[selectedDay]?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-teal-50/40 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-teal-700 font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.time}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-teal-950">
                        {item.subject}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        {item.teacher}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold">
                          {item.room}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: ADMINISTRASI GURU */}
      {activeTab === 'administrasi' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-black text-teal-950">
                Repositori Berkas & Perangkat Administrasi Guru
              </h2>
              <p className="text-xs text-slate-500">
                Unduh template perangkat ajar, format ATP, KKTP, Modul Merdeka, dan instrumen penilaian resmi.
              </p>
            </div>

            {/* Search Document Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchAdminDoc}
                onChange={(e) => setSearchAdminDoc(e.target.value)}
                placeholder="Cari modul, silabus, RPP..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-teal-200 text-xs text-teal-950 placeholder:text-slate-400 focus:outline-teal-600"
              />
            </div>
          </div>

          {/* Admin Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAdminDocs.map((doc) => (
              <div key={doc.id} className="glass-card p-5 rounded-2xl border-teal-100 bg-white space-y-3 flex flex-col justify-between shadow-xs hover:border-teal-400/60 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 font-mono">
                      {doc.code}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {doc.type}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xs text-teal-950 leading-snug">
                    {doc.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{doc.category}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => alert(`Mengunduh template berkas ${doc.title} (Format ${doc.type})`)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-teal-700" />
                    <span>Unduh Berkas Perangkat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
