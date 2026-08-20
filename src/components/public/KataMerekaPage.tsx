import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Star,
  Sparkles,
  UserCheck,
  GraduationCap,
  Heart,
  Quote,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  category: 'Wali Santri' | 'Alumni' | 'Tokoh & Ulama' | 'Siswa Aktif';
  yearOrClass: string;
  avatar: string;
  quote: string;
  rating: number;
  highlight: string;
}

export const KataMerekaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const testimonials: TestimonialItem[] = [
    {
      id: 't-1',
      name: 'H. Sutrisno, S.E.',
      role: 'Wali Santri dari Muhammad Fatih (Kelas VIII)',
      category: 'Wali Santri',
      yearOrClass: 'Orang Tua Murid',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      quote: 'Alhamdulillah, semenjak bersekolah di SMP Islam Al Hikmah Mayong, anak saya menjadi sangat mandiri dalam sholat berjamaah dan hafalannya bertambah pesat. Ditambah sistem digital presensi E-Presensi dan transparansi BOSP sekolah membuat kami sebagai wali santri merasa tenang dan sangat percaya.',
      rating: 5,
      highlight: 'Karakter islami kokoh & sistem sekolah transparan'
    },
    {
      id: 't-2',
      name: 'Nabila Nur Azizah, S.Kom.',
      role: 'Alumni Angkatan 2018 • Software Engineer di Jakarta',
      category: 'Alumni',
      yearOrClass: 'Alumni SMP Islam Al Hikmah',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      quote: 'Pondasi adab dan pengenalan literasi komputer pertama kali saya dapatkan dari para ustadz dan ustadzah di Al Hikmah Mayong. Guru-gurunya sangat sabar dan penuh keikhlasan mendidik. Nilai-nilai inilah yang menjadi modal utama saya menempuh jenjang sarjana hingga berkarir di bidang teknologi.',
      rating: 5,
      highlight: 'Pondasi adab dan teknologi yang membekas'
    },
    {
      id: 't-3',
      name: 'K.H. Mustofa Bisri, M.Ag.',
      role: 'Pengasuh Pesantren & Tokoh Masyarakat Mayong Jepara',
      category: 'Tokoh & Ulama',
      yearOrClass: 'Tokoh Masyarakat',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      quote: 'SMP Islam Al Hikmah Mayong telah membuktikan dedikasinya selama 48 tahun mengabdi di tanah Mayong. Menggabungkan kurikulum nasional terpadu dengan keteguhan akidah Ahlussunnah wal Jama\'ah. Lembaga ini adalah kebanggaan warga Jepara.',
      rating: 5,
      highlight: '48 tahun istiqomah mengabdi untuk umat'
    },
    {
      id: 't-4',
      name: 'Hj. Siti Mahmudah, M.Pd.',
      role: 'Wali Santri dari Aisyah Zahira (Kelas VIII)',
      category: 'Wali Santri',
      yearOrClass: 'Orang Tua Murid',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      quote: 'Lingkungan belajar di sini sangat kondusif dan ramah anak. Anak-anak dibiasakan membaca Ratib, Tahfidz Al-Qur\'an pagi, dan ekstrakurikuler yang beragam. Komunikasi guru dan wali murid melalui sistem sekolah sangat cepat dan responsif.',
      rating: 5,
      highlight: 'Lingkungan asri, ramah anak, dan penuh berkah'
    },
    {
      id: 't-5',
      name: 'Ahmad Faizul Muna',
      role: 'Alumni Angkatan 2022 • Santri Juara MTQ Tingkat Jawa Tengah',
      category: 'Alumni',
      yearOrClass: 'Alumni Berprestasi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      quote: 'Di Al Hikmah, bakat seni tilawah qiro\'ah saya benar-benar dibina dari nol oleh Ustadz Ahmad Zainuddin. Fasilitas latihan dan dukungan sekolah sangat maksimal saat saya mewakili Jepara di kejuaraan MTQ tingkat provinsi.',
      rating: 5,
      highlight: 'Bakat santri dibimbing intensif hingga juara'
    },
    {
      id: 't-6',
      name: 'Zulfa Nailatul Muna',
      role: 'Siswa Kelas VIII-A & Pengurus OSIS',
      category: 'Siswa Aktif',
      yearOrClass: 'Santri Aktif',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      quote: 'Belajar di Al Hikmah seru banget! Selain pelajaran umum dan tahfidz, kami juga bisa ikut ekskul robotik, jurnalistik mading, dan futsal. Teman-temannya kompak dan ustadz/ustadzahnya seperti orang tua sendiri di sekolah.',
      rating: 5,
      highlight: 'Suasana belajar menyenangkan & penuh kekeluargaan'
    }
  ];

  const categories = ['Semua', 'Wali Santri', 'Alumni', 'Tokoh & Ulama', 'Siswa Aktif'];

  const filteredTestimonials = selectedCategory === 'Semua'
    ? testimonials
    : testimonials.filter((t) => t.category === selectedCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100/90 shadow-sm relative overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white">
        <div className="liquid-glow w-96 h-96 bg-amber-400/20 -right-10 -top-10" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Apresiasi, Cerita & Pengalaman Nyata</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Kata Mereka tentang SMP Islam Al Hikmah
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Dengarkan langsung penuturan dari orang tua/wali santri, para alumni sukses, tokoh ulama masyarakat Mayong Jepara, dan para santri mengenai perjalanan dan kesan mendalam menuntut ilmu di sini.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-teal-950 shadow-md shadow-amber-400/30 scale-105 ring-2 ring-white/50'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="glass-card p-6 rounded-3xl border-teal-100 bg-white shadow-xs hover:shadow-lg hover:border-teal-300/80 transition-all flex flex-col justify-between relative group"
          >
            <Quote className="w-8 h-8 text-teal-100 group-hover:text-teal-200 transition-colors absolute top-6 right-6" />

            <div className="space-y-4 relative z-10">
              {/* Rating Stars & Tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  {item.category}
                </span>
              </div>

              {/* Highlight Tagline */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs font-bold">
                "{item.highlight}"
              </div>

              {/* Quote Content */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            {/* Profile Footnote */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3 relative z-10">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-teal-200 shadow-xs shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-teal-950 truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Commitment Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 text-center space-y-3">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-teal-950">
          Mari Menjadi Bagian dari Keluarga Besar SMP Islam Al Hikmah Mayong
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Bergabunglah bersama ratusan santri berprestasi lainnya. Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 telah dibuka secara daring dan luring.
        </p>
      </div>

    </div>
  );
};
