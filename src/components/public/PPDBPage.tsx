import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { PPDBTrack, PPDBApplicant } from '../../types';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileText,
  Search,
  ArrowRight,
  Info,
  Users,
  Award,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const PPDBPage: React.FC = () => {
  const { ppdbSetting, ppdbApplicants, registerPPDBApplicant, websiteSettings } = useApp();
  
  const [activeTab, setActiveTab] = useState<'info' | 'register' | 'status'>('info');
  
  // Registration Form State
  const [track, setTrack] = useState<PPDBTrack>('PRESTASI');
  const [fullName, setFullName] = useState('');
  const [nisn, setNisn] = useState('');
  const [nik, setNik] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('2010-06-15');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [previousSchool, setPreviousSchool] = useState('');
  const [averageReportScore, setAverageReportScore] = useState<number>(88.5);
  const [address, setAddress] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [chosenMajor, setChosenMajor] = useState<'MIPA' | 'IPS' | 'BAHASA'>('MIPA');
  const [submittedApplicant, setSubmittedApplicant] = useState<PPDBApplicant | null>(null);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<PPDBApplicant | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nisn || !previousSchool) return;

    const applicant = registerPPDBApplicant({
      track,
      fullName,
      nisn,
      nik,
      birthPlace,
      birthDate,
      gender,
      previousSchool,
      averageReportScore: Number(averageReportScore),
      address,
      parentName,
      parentPhone,
      chosenMajor
    });

    setSubmittedApplicant(applicant);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    const found = ppdbApplicants.find(
      (a) =>
        a.registrationNumber.toUpperCase() === searchQuery.trim().toUpperCase() ||
        a.nisn === searchQuery.trim() ||
        a.nik === searchQuery.trim()
    );
    setSearchResult(found || null);
  };

  const getStatusBadge = (status: PPDBApplicant['status']) => {
    switch (status) {
      case 'ACCEPTED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300 shadow-xs">LOLOS SELEKSI (DITERIMA)</span>;
      case 'VERIFIED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">BERKAS TERVERIFIKASI</span>;
      case 'REJECTED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 shadow-xs">TIDAK LOLOS</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-xs">MENUNGGU VERIFIKASI</span>;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* PPDB Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
          <GraduationCap className="w-4 h-4 text-teal-600" />
          <span>Tahun Pelajaran {ppdbSetting.academicYear}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
          Penerimaan Peserta Didik Baru (PPDB)
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Pendaftaran siswa baru berbasis daring, transparan, objektif, dan akuntabel di {websiteSettings.schoolName}.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'info'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md shadow-teal-700/20'
                : 'glass-panel text-slate-700 hover:text-teal-800 border-teal-100 hover:border-teal-300 shadow-xs'
            }`}
          >
            Informasi & Jalur
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md shadow-teal-700/20'
                : 'glass-panel text-slate-700 hover:text-teal-800 border-teal-100 hover:border-teal-300 shadow-xs'
            }`}
          >
            Formulir Pendaftaran Daring
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md shadow-teal-700/20'
                : 'glass-panel text-slate-700 hover:text-teal-800 border-teal-100 hover:border-teal-300 shadow-xs'
            }`}
          >
            Cek Status Pendaftaran
          </button>
        </div>
      </div>

      {/* TAB 1: INFORMASI & JALUR PPDB */}
      {activeTab === 'info' && (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
          
          {/* Quota Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl text-center space-y-1 border-teal-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Kuota MIPA</span>
              <p className="font-heading font-extrabold text-3xl text-teal-700">
                {ppdbSetting.quotaMIPA} Siswa
              </p>
              <span className="text-[11px] text-slate-400 font-medium">5 Rombongan Belajar</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-1 border-teal-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Kuota IPS</span>
              <p className="font-heading font-extrabold text-3xl text-amber-700">
                {ppdbSetting.quotaIPS} Siswa
              </p>
              <span className="text-[11px] text-slate-400 font-medium">4 Rombongan Belajar</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-1 border-teal-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Kuota Bahasa & Budaya</span>
              <p className="font-heading font-extrabold text-3xl text-emerald-700">
                {ppdbSetting.quotaBahasa} Siswa
              </p>
              <span className="text-[11px] text-slate-400 font-medium">1 Rombongan Belajar</span>
            </div>
          </div>

          {/* 4 Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="glass-card p-6 rounded-3xl space-y-3 border-teal-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Jalur Prestasi (Akademik & Non-Akademik)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diperuntukkan bagi siswa peraih nilai rapor rata-rata minimal 85.00 atau peraih kejuaraan sains (OSN), olahraga (O2SN), seni (FLS2N), dan hafalan Al-Quran.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border-teal-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Jalur Zonasi Domisili
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diperuntukkan bagi calon peserta didik yang berdomisili di dalam wilayah zonasi yang ditetapkan pemerintah provinsi berdasarkan jarak tempat tinggal ke sekolah.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border-teal-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Jalur Afirmasi & KETM
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bagi calon peserta didik dari keluarga ekonomi tidak mampu (pemegang KIP/PKH) dan penyandang disabilitas dengan pendampingan khusus.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border-teal-100 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-heading font-bold text-lg text-teal-950">
                Jalur Perpindahan Tugas Orang Tua / Anak Guru
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diperuntukkan bagi calon siswa yang orang tua/walinya mengalami mutasi dinas atau anak dari tenaga pendidik yang bertugas di sekolah bersangkutan.
              </p>
            </div>

          </div>

          {/* Timeline Table */}
          <div className="glass-panel p-6 rounded-3xl border border-teal-100 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-base text-teal-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>Jadwal Pelaksanaan PPDB {ppdbSetting.academicYear}</span>
            </h3>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="border-b border-teal-100 text-teal-900 font-bold bg-teal-50/50">
                  <tr>
                    <th className="py-2.5 px-3">Tahapan</th>
                    <th className="py-2.5 px-3">Tanggal Pelaksanaan</th>
                    <th className="py-2.5 px-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50 text-slate-700">
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-950">Pendaftaran Daring</td>
                    <td className="py-3 px-3 font-mono font-medium">{ppdbSetting.startDate} s.d. {ppdbSetting.endDate}</td>
                    <td className="py-3 px-3">Mengisi formulir daring & unggah dokumen</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-950">Verifikasi Berkas</td>
                    <td className="py-3 px-3 font-mono font-medium">29 Juni s.d. 02 Juli 2026</td>
                    <td className="py-3 px-3">Verifikasi fisik dan validasi keaslian sertifikat</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-950">Pengumuman Kelulusan Seleksi</td>
                    <td className="py-3 px-3 font-mono text-teal-700 font-bold">{ppdbSetting.announcementDate}</td>
                    <td className="py-3 px-3">Pengumuman daring melalui menu Cek Status PPDB</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-teal-950">Daftar Ulang</td>
                    <td className="py-3 px-3 font-mono font-medium">08 s.d. 12 Juli 2026</td>
                    <td className="py-3 px-3">Registrasi ulang calon siswa yang diterima</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-xs text-slate-500 italic">
              {ppdbSetting.contactPerson}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FORMULIR PENDAFTARAN DARING */}
      {activeTab === 'register' && (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-200">
          
          {submittedApplicant ? (
            // Success Card
            <div className="glass-panel-strong p-8 rounded-3xl border border-teal-200 bg-teal-50/40 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-600/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-heading font-extrabold text-teal-950">
                  Pendaftaran Berhasil Terkirim!
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Simpan Nomor Registrasi berikut untuk melakukan pengecekan berkas dan status seleksi secara berkala.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-teal-200 text-center space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 font-bold uppercase">Nomor Registrasi PPDB</span>
                <p className="text-2xl sm:text-3xl font-mono font-extrabold text-teal-700">
                  {submittedApplicant.registrationNumber}
                </p>
                <p className="text-xs text-slate-700">
                  Nama: <strong>{submittedApplicant.fullName}</strong> • Jalur: <strong>{submittedApplicant.track}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedApplicant(null);
                    setActiveTab('status');
                    setSearchQuery(submittedApplicant.registrationNumber);
                    setSearchResult(submittedApplicant);
                    setHasSearched(true);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  Cek Status Seleksi Saya →
                </button>
              </div>
            </div>
          ) : (
            // Registration Form
            <form onSubmit={handleRegisterSubmit} className="glass-panel-strong p-8 rounded-3xl border border-teal-100 shadow-xl space-y-6">
              
              <div className="border-b border-teal-100 pb-4">
                <h3 className="font-heading font-bold text-lg text-teal-950">
                  Formulir Pendaftaran Siswa Baru
                </h3>
                <p className="text-xs text-slate-600">
                  Isi data calon peserta didik sesuai dengan Kartu Keluarga dan Rapor SMP/MTs.
                </p>
              </div>

              {/* Track Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-teal-950 uppercase">
                  Pilih Jalur Pendaftaran:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['PRESTASI', 'ZONASI', 'AFIRMASI', 'MUTASI'] as PPDBTrack[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTrack(t)}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        track === t
                          ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white border-teal-600 shadow-xs'
                          : 'glass-panel text-slate-700 border-teal-100 hover:border-teal-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-teal-950">Nama Lengkap Siswa *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sesuai Akta Kelahiran / Ijazah SMP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">NISN (10 Digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="Contoh: 0091827364"
                    className="w-full px-3.5 py-2.5 rounded-xl font-mono bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">NIK Siswa (16 Digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="Nomor Induk Kependudukan"
                    className="w-full px-3.5 py-2.5 rounded-xl font-mono bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">Asal SD / MI *</label>
                  <input
                    type="text"
                    required
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    placeholder="Contoh: SD Negeri 1 Pelemkerep Mayong"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">Nilai Rata-rata Rapor (Skala 100) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={100}
                    required
                    value={averageReportScore}
                    onChange={(e) => setAverageReportScore(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl font-mono bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">Pilihan Peminatan Jurusan</label>
                  <select
                    value={chosenMajor}
                    onChange={(e) => setChosenMajor(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="MIPA">MIPA (Matematika & Sains Alam)</option>
                    <option value="IPS">IPS (Ilmu Pengetahuan Sosial)</option>
                    <option value="BAHASA">Bahasa & Budaya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">Jenis Kelamin</label>
                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={gender === 'L'}
                        onChange={() => setGender('L')}
                        name="gender"
                        className="accent-teal-700"
                      />
                      <span>Laki-laki</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        checked={gender === 'P'}
                        onChange={() => setGender('P')}
                        name="gender"
                        className="accent-teal-700"
                      />
                      <span>Perempuan</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-teal-950">Alamat Tempat Tinggal *</label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">Nama Orang Tua / Wali *</label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Nama Ayah/Ibu/Wali"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-teal-950">No. WhatsApp Orang Tua *</label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl font-mono bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-teal-100 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 shadow-md shadow-teal-700/25 transition-all cursor-pointer"
                >
                  Kirim Formulir Pendaftaran PPDB →
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* TAB 3: CEK STATUS PENDAFTARAN */}
      {activeTab === 'status' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
          
          <div className="glass-panel p-6 rounded-3xl border border-teal-100 space-y-3 shadow-xs">
            <h3 className="font-heading font-bold text-base text-teal-950">
              Cek Status Seleksi PPDB
            </h3>
            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan Nomor Registrasi (e.g. PPDB-2026-0042) atau NISN..."
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-mono bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                Periksa
              </button>
            </form>
          </div>

          {hasSearched && (
            <div>
              {searchResult ? (
                <div className="glass-panel-strong p-6 rounded-3xl border border-teal-200 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-teal-100">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        {searchResult.registrationNumber}
                      </span>
                      <h4 className="font-heading font-bold text-lg text-teal-950">
                        {searchResult.fullName}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Asal: {searchResult.previousSchool} • Peminatan: <strong className="text-teal-900">{searchResult.chosenMajor}</strong>
                      </p>
                    </div>

                    <div>
                      {getStatusBadge(searchResult.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100">
                      <span className="text-slate-500 block text-[11px] font-medium">Jalur Seleksi</span>
                      <span className="font-bold text-teal-950">{searchResult.track}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100">
                      <span className="text-slate-500 block text-[11px] font-medium">NISN</span>
                      <span className="font-mono font-bold text-teal-950">{searchResult.nisn}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100">
                      <span className="text-slate-500 block text-[11px] font-medium">Rata-rata Rapor</span>
                      <span className="font-bold text-teal-950">{searchResult.averageReportScore}</span>
                    </div>
                  </div>

                  {searchResult.notes && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                      <span className="font-bold block">Catatan Panitia PPDB:</span>
                      <span>{searchResult.notes}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-2xl glass-panel text-center text-xs text-slate-500 border border-teal-100">
                  Data pendaftar dengan nomor <strong>"{searchQuery}"</strong> tidak ditemukan. Silakan periksa kembali nomor registrasi Anda.
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
