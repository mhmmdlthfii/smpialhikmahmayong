import React, { useState } from 'react';
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  Award,
  Mail,
  Phone,
  School,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeachersPageProps {
  navigate?: (path: string) => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({ navigate }) => {
  const { websiteSettings, teachers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'ALL' | 'KEPALA' | 'GURU' | 'TAHFIDZ' | 'STAFF'>('ALL');

  // Comprehensive Educator & Staff Data for SMP Islam Al Hikmah Mayong
  const allEducators = [
    {
      id: 'tch-principal',
      name: "M.Syafi'i, S.Th.I",
      nip: '19790412 200501 1 003',
      role: 'Kepala Sekolah & Pembina Tahfidz',
      category: 'KEPALA',
      education: 'S1 Tafsir Hadits - UIN Walisongo Semarang',
      subjects: ['Pendidikan Karakter Islami', 'Tahfidz Al-Qur\'an Juz 30'],
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      experience: '20 Tahun Pengabdian',
      email: 'syafii@smpislamalhikmahmayong.sch.id',
      phone: '0812-2567-8910',
      badge: 'Kepala Sekolah'
    },
    {
      id: 'tch-1',
      name: 'Ahmad Zainuddin, S.Pd.I',
      nip: '19820510 200801 1 012',
      role: 'Waka Kurikulum & Guru PAI',
      category: 'GURU',
      education: 'S1 Pendidikan Agama Islam - UNISNU Jepara',
      subjects: ['Pendidikan Agama Islam & Budi Pekerti', 'Fiqih Ibadah'],
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      experience: '16 Tahun Pengabdian',
      email: 'zainuddin@smpislamalhikmahmayong.sch.id',
      phone: '081234567890',
      badge: 'Waka Kurikulum'
    },
    {
      id: 'tch-2',
      name: 'Siti Nurhaliza, S.Pd.',
      nip: '19880314 201101 2 008',
      role: 'Waka Kesiswaan & Guru Bahasa Indonesia',
      category: 'GURU',
      education: 'S1 Pendidikan Bahasa & Sastra Indonesia - UNNES',
      subjects: ['Bahasa Indonesia', 'Jurnalistik Santri'],
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      experience: '12 Tahun Pengabdian',
      email: 'siti@smpislamalhikmahmayong.sch.id',
      phone: '081399887766',
      badge: 'Waka Kesiswaan'
    },
    {
      id: 'tch-3',
      name: 'Drs. H. Mulyono, M.Pd.I',
      nip: '19750820 200003 1 004',
      role: 'Guru IPA Terpadu & Pembina Sains Club',
      category: 'GURU',
      education: 'S2 Pendidikan Islam - Pascasarjana IAIN Kudus',
      subjects: ['Ilmu Pengetahuan Alam (IPA Fisika/Biologi)'],
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      experience: '22 Tahun Pengabdian',
      email: 'mulyono@smpislamalhikmahmayong.sch.id',
      phone: '081377881122',
      badge: 'Guru IPA'
    },
    {
      id: 'tch-4',
      name: 'Fatimatuz Zahra, S.Si.',
      nip: '19901215 201601 2 015',
      role: 'Guru Matematika & Pembina Olimpiade',
      category: 'GURU',
      education: 'S1 Matematika MIPA - Universitas Diponegoro',
      subjects: ['Matematika', 'Klub Olimpiade MIPA'],
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      experience: '9 Tahun Pengabdian',
      email: 'fatima@smpislamalhikmahmayong.sch.id',
      phone: '085712349900',
      badge: 'Guru Matematika'
    },
    {
      id: 'tch-5',
      name: 'Mohammad Rofi\'i, S.Kom.',
      nip: '19910408 201901 1 009',
      role: 'Guru Informatika & Koordinator IT Madrasah',
      category: 'GURU',
      education: 'S1 Teknik Informatika - UDINUS Semarang',
      subjects: ['Informatika', 'Literasi Digital & Robotik'],
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      experience: '7 Tahun Pengabdian',
      email: 'rofii@smpislamalhikmahmayong.sch.id',
      phone: '087834567890',
      badge: 'Guru IT / Lab'
    },
    {
      id: 'tch-6',
      name: 'Ustadz H. Abdul Wahab, Lc.',
      nip: '19850612 201401 1 007',
      role: 'Koordinator Tahfidzul Qur\'an & Bahasa Arab',
      category: 'TAHFIDZ',
      education: 'S1 Syari\'ah Islamiyah - Al-Azhar University Cairo',
      subjects: ['Bahasa Arab Komunikatif', 'Tahfidz Al-Qur\'an & Qiro\'ah'],
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      experience: '11 Tahun Pengabdian',
      email: 'wahab@smpislamalhikmahmayong.sch.id',
      phone: '081298765432',
      badge: 'Pembina Tahfidz'
    },
    {
      id: 'tch-7',
      name: 'Dra. Hj. Romlah, M.Si.',
      nip: '19760910 200301 2 006',
      role: 'Guru Bimbingan Konseling (BK)',
      category: 'GURU',
      education: 'S2 Psikologi Pendidikan - UNNES',
      subjects: ['Bimbingan & Konseling', 'Pendidikan Karakter Remaja'],
      photoUrl: 'https://images.unsplash.com/photo-1580894732470-3f41249b6b77?w=400&auto=format&fit=crop&q=80',
      experience: '19 Tahun Pengabdian',
      email: 'romlah@smpislamalhikmahmayong.sch.id',
      phone: '081322334455',
      badge: 'Guru BK'
    },
    {
      id: 'tch-8',
      name: 'Bambang Supriyanto, S.Pd.',
      nip: '19890218 201501 1 010',
      role: 'Guru PJOK & Pembina Olahraga Santri',
      category: 'GURU',
      education: 'S1 Pendidikan Jasmani Kesehatan & Rekreasi - PJKR',
      subjects: ['Pendidikan Jasmani Olahraga & Kesehatan'],
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      experience: '10 Tahun Pengabdian',
      email: 'bambang@smpislamalhikmahmayong.sch.id',
      phone: '085211223344',
      badge: 'Guru PJOK'
    },
    {
      id: 'tch-9',
      name: 'Muhammad Luthfi, S.Pd., Gr',
      nip: '19950823 202201 1 002',
      role: 'Kepala Tata Usaha & Pengelola Sistem Informasi',
      category: 'STAFF',
      education: 'S1 Pendidikan Komputer & Akuntansi - UNNES',
      subjects: ['Administrasi Surat ETTD', 'Pengelolaan Dapodik & BOSP'],
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
      experience: '5 Tahun Pengabdian',
      email: 'muhLuthfi.23@gmail.com',
      phone: '0812-2567-8910',
      badge: 'Kepala Tata Usaha'
    }
  ];

  const filteredTeachers = allEducators.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedRole === 'ALL' || t.category === selectedRole;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100/90 shadow-sm relative overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white">
        <div className="liquid-glow w-96 h-96 bg-amber-400/20 -right-10 -top-10" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <Users className="w-4 h-4" />
            <span>Pendidik & Tenaga Kependidikan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Dewan Pengajar & Tenaga Kependidikan
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Mengenal lebih dekat para asatidz, dewan guru bersertifikasi pendidik, dan tenaga kependidikan profesional yang berdedikasi mendidik putra-putri di SMP Islam Al Hikmah Mayong.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-teal-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Pendidik Lulusan S1 & S2</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Bersertifikat Pendidik Profesional</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-300" />
              <span>Pengasuh Tahfidz Bersanad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-teal-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-teal-50/80 border border-teal-100 text-xs font-bold">
          {[
            { key: 'ALL', label: 'Semua Tenaga Pendidik' },
            { key: 'KEPALA', label: 'Pimpinan' },
            { key: 'GURU', label: 'Guru Mata Pelajaran' },
            { key: 'TAHFIDZ', label: 'Pengasuh Tahfidz' },
            { key: 'STAFF', label: 'Tata Usaha & IT' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedRole(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedRole === tab.key
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama guru atau mata pelajaran..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-teal-200 text-xs text-teal-950 placeholder:text-slate-400 focus:outline-teal-600"
          />
        </div>

      </div>

      {/* Teachers Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((tch) => (
          <div
            key={tch.id}
            className="glass-card rounded-3xl border border-teal-100/90 bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-teal-400/80 transition-all group"
          >
            <div>
              {/* Photo & Header Badge */}
              <div className="relative h-48 bg-gradient-to-b from-teal-800 to-teal-950 overflow-hidden">
                <img
                  src={tch.photoUrl}
                  alt={tch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/30 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-white bg-teal-900/80 backdrop-blur-md border border-white/20 shadow-xs">
                    {tch.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading font-black text-base text-white leading-tight">
                    {tch.name}
                  </h3>
                  <p className="text-[11px] font-medium text-amber-300 mt-0.5">
                    {tch.role}
                  </p>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    NIP / NUPTK:
                  </span>
                  <span className="font-mono font-semibold text-teal-950">
                    {tch.nip}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Pendidikan Terakhir:
                  </span>
                  <span className="font-medium text-slate-700">
                    {tch.education}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Mata Pelajaran & Amanah:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tch.subjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-100"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Contact & Action */}
            <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-emerald-700">
                {tch.experience}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${tch.email}`}
                  title={tch.email}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-teal-700 flex items-center justify-center hover:bg-teal-50 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://wa.me/${tch.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Hubungi WhatsApp Guru"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
