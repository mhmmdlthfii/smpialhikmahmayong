import React, { useState } from 'react';
import {
  BookOpen,
  Newspaper,
  Calendar,
  User,
  Tag,
  Search,
  Eye,
  ArrowRight,
  Sparkles,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface JournalismPageProps {
  navigate: (path: string) => void;
}

export const JournalismPage: React.FC<JournalismPageProps> = ({ navigate }) => {
  const { news } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Specialized Student Journalism & Mading Digital Articles
  const journalismArticles = [
    {
      id: 'jrn-1',
      title: 'Menelusuri Jejak Literasi Santri: Menghidupkan Budaya Membaca dan Menulis di Era Digital',
      author: 'Aisyah Putri Azzahra (Kelas IX-A)',
      role: 'Pemimpin Redaksi Buletin Al Hikmah',
      date: '18 Februari 2026',
      readTime: '4 menit baca',
      category: 'Opini Santri',
      summary: 'Bagaimana santri SMP Islam Al Hikmah Mayong menjaga keseimbangan antara hafalan Al-Qur\'an dan produktivitas literasi digital modern.',
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
      views: 342,
      tags: ['Literasi', 'Opini', 'Karakter']
    },
    {
      id: 'jrn-2',
      title: 'Laporan Khusus: Kreativitas Tim Robotik & Coding SMP Al Hikmah Menuju Kompetisi Provinsi',
      author: 'Fathir Ahmad Rabbani (Kelas VIII-B)',
      role: 'Reporter Jurnalistik Sekolah',
      date: '14 Februari 2026',
      readTime: '5 menit baca',
      category: 'Liputan Khusus',
      summary: 'Liputan mendalam mengenai persiapan pembuatan prototype Smart Green Campus berbasis IoT yang dikembangkan oleh siswa ekstrakurikuler robotik.',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      views: 418,
      tags: ['Informatika', 'Robotik', 'Inovasi']
    },
    {
      id: 'jrn-3',
      title: 'Kisah Inspiratif: Rahasia Ustadz Wahab Membimbing 15 Santri Tuntaskan Hafalan Juz 30',
      author: 'Nabila Zahra Khairunnisa (Kelas IX-B)',
      role: 'Redaktur Wawancara',
      date: '10 Februari 2026',
      readTime: '6 menit baca',
      category: 'Wawancara Tokoh',
      summary: 'Wawancara eksklusif bersama koordinator Tahfidzul Qur\'an mengenai metode Talaqqi dan Muraja\'ah terstruktur yang efektif dan menyenangkan.',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
      views: 620,
      tags: ['Tahfidz', 'Wawancara', 'Inspirasi']
    },
    {
      id: 'jrn-4',
      title: 'Puisi & Kaligrafi Santri: "Cahaya di Sudut Mayong"',
      author: 'Muhammad Rizky Ramadhan (Kelas VII-A)',
      role: 'Kontributor Sastra & Seni',
      date: '05 Februari 2026',
      readTime: '3 menit baca',
      category: 'Karya Sastra',
      summary: 'Kumpulan antologi puisi pendek dan karya kaligrafi santri yang mengangkat keindahan menuntut ilmu di bumi Jepara.',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      views: 289,
      tags: ['Puisi', 'Seni', 'Sastra']
    },
    {
      id: 'jrn-5',
      title: 'Buletin Digital Edisi 12: "Gema Al Hikmah - Generasi Cerdas Beradab"',
      author: 'Tim Redaksi Mading Digital',
      role: 'Edisi Bulanan Resmi',
      date: '01 Februari 2026',
      readTime: 'Edisi PDF Lengkap',
      category: 'E-Buletin',
      summary: 'E-Magazine resmi 24 halaman berisikan rekap prestasi bulanan, komik edukasi santri, resensi buku perpustakaan, dan kuis berhadiah.',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      views: 754,
      tags: ['E-Magazine', 'Buletin', 'Mading']
    }
  ];

  const categories = ['ALL', 'Opini Santri', 'Liputan Khusus', 'Wawancara Tokoh', 'Karya Sastra', 'E-Buletin'];

  const filteredArticles = journalismArticles.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel-strong p-6 sm:p-8 rounded-3xl border border-teal-100/90 shadow-sm relative overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white">
        <div className="liquid-glow w-96 h-96 bg-amber-400/20 -right-10 -top-10" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <Newspaper className="w-4 h-4" />
            <span>Kesiswaan & Kreativitas Santri</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Jurnalistik & Mading Digital Santri
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Wadah apresiasi karya tulis, opini kritis, liputan kegiatan sekolah, wawancara inspiratif, dan buletin digital karya santri SMP Islam Al Hikmah Mayong.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-white/15 text-xs font-semibold">
              Klub Jurnalistik "Gema Al Hikmah"
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/15 text-xs font-semibold">
              Mading Daring 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel p-4 rounded-2xl border border-teal-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-teal-50/80 border border-teal-100 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-800'
              }`}
            >
              {cat === 'ALL' ? 'Semua Karya' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul artikel atau nama penulis..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-teal-200 text-xs text-teal-950 placeholder:text-slate-400 focus:outline-teal-600"
          />
        </div>

      </div>

      {/* Featured Main Story */}
      {filteredArticles.length > 0 && (
        <div className="glass-card rounded-3xl border border-teal-100/90 bg-white overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 group">
          <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[280px] overflow-hidden bg-teal-950">
            <img
              src={filteredArticles[0].imageUrl}
              alt={filteredArticles[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-xl text-xs font-bold text-white bg-amber-500 shadow-md">
                Karya Utama Pilihan Redaksi
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-teal-700 font-bold">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-100">
                  {filteredArticles[0].category}
                </span>
                <span>•</span>
                <span>{filteredArticles[0].date}</span>
                <span>•</span>
                <span>{filteredArticles[0].readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-black text-teal-950 leading-snug group-hover:text-teal-700 transition-colors">
                {filteredArticles[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {filteredArticles[0].summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                  {filteredArticles[0].author[0]}
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-950">{filteredArticles[0].author}</p>
                  <p className="text-[10px] text-slate-500">{filteredArticles[0].role}</p>
                </div>
              </div>

              <button
                onClick={() => alert(`Membaca karya: "${filteredArticles[0].title}"`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 transition-all cursor-pointer shadow-xs"
              >
                <span>Baca Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(1).map((art) => (
          <div
            key={art.id}
            className="glass-card rounded-3xl border border-teal-100/90 bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-teal-400/80 transition-all group"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-teal-900">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-white bg-teal-900/80 backdrop-blur-md border border-white/20">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-heading font-black text-sm text-teal-950 leading-snug group-hover:text-teal-700 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {art.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-left">
                <p className="font-bold text-teal-950 text-[11px] truncate max-w-[150px]">{art.author}</p>
                <p className="text-[10px] text-slate-500">{art.role}</p>
              </div>

              <button
                onClick={() => alert(`Membaca karya: "${art.title}"`)}
                className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-950 transition-colors cursor-pointer"
              >
                <span>Baca</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
