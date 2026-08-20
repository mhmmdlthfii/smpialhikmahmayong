import React, { useState } from 'react';
import {
  Users,
  Award,
  Sparkles,
  Shield,
  Heart,
  Target,
  Calendar,
  Clock,
  Compass,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface KesiswaanPageProps {
  initialTab?: 'osis' | 'ekskul';
  navigate: (path: string) => void;
}

export const KesiswaanPage: React.FC<KesiswaanPageProps> = ({ initialTab = 'osis', navigate }) => {
  const [activeTab, setActiveTab] = useState<'osis' | 'ekskul'>(initialTab);
  const [selectedEkskulCategory, setSelectedEkskulCategory] = useState<string>('Semua');

  const ekskulList = [
    {
      id: 'ekskul-1',
      name: 'Pramuka Penggalang (Gudep Al Hikmah)',
      category: 'Wajib & Kepemimpinan',
      schedule: 'Jumat, 14.00 - 16.30 WIB',
      coach: 'Kak Bambang S., S.Pd. & Kak Siti N.',
      location: 'Halaman Utama & Aula',
      description: 'Menumbuhkan jiwa kemandirian, kedisiplinan, kepanduan, dan cinta alam berbasis dasadarma serta nilai-nilai santri.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
      badge: 'Ekskul Wajib'
    },
    {
      id: 'ekskul-2',
      name: 'Tahfidzul Qur\'an & Tartil',
      category: 'Keagamaan & Karakter',
      schedule: 'Setiap Hari (Senin - Sabtu), 06.00 - 06.45 WIB',
      coach: 'Ustadz M. Syafi\'i, S.Th.I & Tim Asatidz',
      location: 'Masjid Kampus Al Hikmah',
      description: 'Bimbingan intensif hafalan Al-Qur\'an juz 30 dan juz pilihan dengan metode talaqqi terstandar sanad dan tartil makharijul huruf.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
      badge: 'Program Unggulan'
    },
    {
      id: 'ekskul-3',
      name: 'Qiro\'ah & Seni Baca Al-Qur\'an',
      category: 'Keagamaan & Karakter',
      schedule: 'Selasa & Kamis, 15.30 - 17.00 WIB',
      coach: 'Ustadz Ahmad Zainuddin, S.Pd.I',
      location: 'Ruang Multimedia / Musholla',
      description: 'Melatih olah vokal, variasi lagu naghom (Bayyati, Shoba, Hijaz, Nahawand, Rast, Sikah, Jiharkah) untuk kompetisi MTQ/MSQ.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      badge: 'Juara MTQ'
    },
    {
      id: 'ekskul-4',
      name: 'Robotik & Coding Literasi Digital',
      category: 'Sains & Teknologi',
      schedule: 'Rabu, 14.30 - 16.30 WIB',
      coach: 'Mohammad Rofi\'i, S.Kom.',
      location: 'Lab Komputer & IoT Lab',
      description: 'Eksplorasi logika algoritma, perakitan micro-controller Arduino dasar, dan kreasi mini robot otomatis untuk ajang lomba teknologi.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
      badge: 'Inovasi Digital'
    },
    {
      id: 'ekskul-5',
      name: 'Hadroh & Seni Musik Rebana Modern',
      category: 'Seni & Budaya',
      schedule: 'Senin & Rabu, 15.30 - 17.00 WIB',
      coach: 'Ustadz Syukron & Kak Nurul',
      location: 'Ruang Kesenian',
      description: 'Mempelajari tabuhan klasik banjari, hadroh kontemporer, dan vokal sholawat untuk mengiringi pengajian serta festival seni religi.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      badge: 'Seni Islami'
    },
    {
      id: 'ekskul-6',
      name: 'Palang Merah Remaja (PMR Madya)',
      category: 'Kemanusiaan & Sosial',
      schedule: 'Sabtu, 08.00 - 10.00 WIB',
      coach: 'Dra. Hj. Romlah & Tim PMI Mayong',
      location: 'Ruang UKS Terpadu',
      description: 'Pelatihan pertolongan pertama pada kecelakaan (PPGD), kesiapsiagaan bencana, donor darah sukarela, dan sanitasi kesehatan remaja.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      badge: 'Kemanusiaan'
    },
    {
      id: 'ekskul-7',
      name: 'Futsal & Badminton Al Hikmah Club',
      category: 'Olahraga & Prestasi',
      schedule: 'Selasa & Sabtu Sore',
      coach: 'Coach Bambang Supriyanto, S.Pd.',
      location: 'Lapangan Olahraga Kampus',
      description: 'Pembinaan fisik, taktik kerja sama tim, dan turnamen olahraga antar sekolah tingkat Kabupaten Jepara.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
      badge: 'Olahraga'
    },
    {
      id: 'ekskul-8',
      name: 'Jurnalistik & Mading Santri Kreatif',
      category: 'Literasi & Media',
      schedule: 'Kamis, 15.00 - 16.30 WIB',
      coach: 'Ustadzah Siti Nurhaliza, S.Pd.',
      location: 'Ruang Redaksi Jurnalistik & Mading',
      description: 'Belajar teknik wawancara, penulisan artikel, fotografi jurnalistik, dan pengelolaan majalah dinding digital sekolah.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
      badge: 'Literasi'
    }
  ];

  const categories = ['Semua', 'Wajib & Kepemimpinan', 'Keagamaan & Karakter', 'Sains & Teknologi', 'Seni & Budaya', 'Olahraga & Prestasi', 'Literasi & Media'];

  const filteredEkskul = selectedEkskulCategory === 'Semua'
    ? ekskulList
    : ekskulList.filter((e) => e.category === selectedEkskulCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100/90 shadow-sm relative overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white">
        <div className="liquid-glow w-96 h-96 bg-amber-400/20 -right-10 -top-10" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <Users className="w-4 h-4" />
            <span>Pusat Aktivitas, Bakat & Kepemimpinan Santri</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Bidang Kesiswaan SMP Islam Al Hikmah
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Wadah pengembangan karakter unggul, kepemimpinan organisasi melalui OSIS, eksplorasi minat bakat melalui beragam ekstrakurikuler, serta pembinaan prestasi santri dan pendidik.
          </p>

          {/* Sub Nav Pills */}
          <div className="pt-4 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('osis')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'osis'
                  ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>OSIS & Kepengurusan</span>
            </button>

            <button
              onClick={() => setActiveTab('ekskul')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'ekskul'
                  ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Ekstrakurikuler</span>
            </button>

            <button
              onClick={() => navigate('/prestasi')}
              className="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 bg-white/15 text-white hover:bg-white/25 border border-white/10 hover:border-amber-300"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Prestasi Siswa & Guru</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: OSIS */}
      {activeTab === 'osis' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Intro Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold">
                Organisasi Siswa Intra Sekolah
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-teal-950">
                Membangun Jiwa Pemimpin Islami yang Amanah, Kreatif, dan Solutif
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                OSIS SMP Islam Al Hikmah Mayong Masa Bakti 2025/2026 merupakan wadah aspirasi dan aktualisasi seluruh santri dalam mengasah kedewasaan bersikap, manajemen kegiatan, kepedulian sosial, serta penegakan budaya madrasah yang disiplin dan berakhlakul karimah.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>Visi OSIS</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mewujudkan santri Al Hikmah yang berakhlak mulia, berprestasi dalam sains & dakwah, serta proaktif dalam menciptakan lingkungan sekolah yang harmonis dan berbudaya literasi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <span>Misi OSIS</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1. Menggiatkan pembiasaan sholat berjamaah & tahfidz.<br />
                    2. Mengembangkan bakat minat melalui festival seni & sains.<br />
                    3. Menjaga ketertiban & kebersihan lingkungan sekolah.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl border border-teal-100 bg-white shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-teal-950">Struktur Inti OSIS 2025/2026</h3>
                    <p className="text-[11px] text-slate-500">Masa Bakti 1 Tahun Pelajaran</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50/60 border border-teal-100">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">Ketua OSIS</span>
                      <strong className="text-teal-950">Muhammad Fatih Al-Farisi</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-200/80 text-teal-900">Kelas VIII-A</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50/60 border border-teal-100">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">Wakil Ketua OSIS</span>
                      <strong className="text-teal-950">Aisyah Zahira Putri</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-200/80 text-teal-900">Kelas VIII-B</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50/60 border border-teal-100">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">Sekretaris Utama</span>
                      <strong className="text-teal-950">Zulfa Nailatul Muna</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-200/80 text-teal-900">Kelas VIII-A</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50/60 border border-teal-100">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">Bendahara Umum</span>
                      <strong className="text-teal-950">Rizky Aditya Pratama</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-200/80 text-teal-900">Kelas VIII-B</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/80 border border-amber-100 text-amber-900">
                    <div>
                      <span className="text-[10px] text-amber-700 font-semibold block">Pembina Kesiswaan & OSIS</span>
                      <strong>Ustadz Ahmad Zainuddin, S.Pd.I</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">Guru PAI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Kerja Unggulan OSIS */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-heading font-black text-teal-950">
              Program Kerja Unggulan OSIS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="glass-card p-5 rounded-2xl bg-white border border-teal-100 space-y-2 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-heading font-bold text-sm text-teal-950">Peringatan Hari Besar Islam (PHBI)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Peringatan Maulid Nabi, Isra Mi'raj, Pesantren Kilat Ramadhan, dan Santunan Anak Yatim di wilayah Mayong Jepara.
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl bg-white border border-teal-100 space-y-2 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-heading font-bold text-sm text-teal-950">Classmeeting & Pekan Olahraga Seni (PORSENI)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kompetisi antarkelas cabang futsal, kaligrafi, tilawah, catur cerdas cermat, dan pidato 3 bahasa setelah asesmen semester.
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl bg-white border border-teal-100 space-y-2 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-heading font-bold text-sm text-teal-950">Gerakan Literasi & Mading Santri Digital</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pengelolaan mading berkala mingguan, publikasi karya puisi, cerpen islami, serta rubrik opini santri di portal jurnalistik.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EKSTRAKURIKULER */}
      {activeTab === 'ekskul' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-black text-teal-950">
                Pilihan Ekstrakurikuler Pengembangan Diri
              </h2>
              <p className="text-xs text-slate-500">
                SMP Islam Al Hikmah Mayong memfasilitasi minat bakat santri di bidang keislaman, sains, olahraga, dan seni budaya.
              </p>
            </div>

            {/* Filter Category */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedEkskulCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedEkskulCategory === cat
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-teal-800 border border-teal-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Ekskul Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEkskul.map((ekskul) => (
              <div
                key={ekskul.id}
                className="glass-card rounded-3xl overflow-hidden border-teal-100 bg-white hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-teal-50">
                    <img
                      src={ekskul.image}
                      alt={ekskul.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-950/80 text-white backdrop-blur-xs">
                      {ekskul.category}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-teal-950 shadow-xs">
                      {ekskul.badge}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-heading font-bold text-base text-teal-950">
                      {ekskul.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ekskul.description}
                    </p>

                    <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span><strong>Jadwal:</strong> {ekskul.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span><strong>Pembina:</strong> {ekskul.coach}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate('/ppdb')}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-teal-900 bg-white border border-teal-200 hover:bg-teal-50 transition-colors"
                  >
                    <span>Daftar / Info Ekskul</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
