import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsItem } from '../../types';
import {
  Clock,
  Eye,
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  X,
  Share2,
  Calendar
} from 'lucide-react';

interface NewsPageProps {
  initialSlug?: string;
  navigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ initialSlug, navigate }) => {
  const { news } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(() => {
    if (initialSlug) {
      return news.find((n) => n.slug === initialSlug) || null;
    }
    return null;
  });

  const categories = ['Semua', 'Akademik', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Artikel'];

  const filteredNews = news.filter((item) => {
    const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>Kabar & Artikel Sekolah</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
          Warta & Berita Terkini
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Informasi kegiatan akademik, perhelatan sains, prestasi siswa, dan rilis resmi sekolah.
        </p>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul berita atau topik..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                    : 'glass-panel text-slate-700 hover:text-teal-800 border-teal-100 hover:border-teal-300 shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between border-teal-100 hover:border-teal-400/60 shadow-xs hover:shadow-lg transition-all"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-teal-50">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-800 text-white shadow-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-teal-600" />
                      {item.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-teal-600" />
                      {item.views} views
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-teal-950 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Baca Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single News Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl glass-panel-strong border border-teal-200 shadow-2xl overflow-hidden bg-white">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-teal-100 bg-teal-50/80">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 border border-teal-200">
                {selectedNews.category}
              </span>
              <button
                onClick={() => setSelectedNews(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-teal-950 hover:bg-teal-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    {selectedNews.publishedAt}
                  </span>
                  <span>•</span>
                  <span>Penulis: <strong className="text-teal-950">{selectedNews.author}</strong></span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-teal-950">
                  {selectedNews.title}
                </h2>
              </div>

              <div className="rounded-2xl overflow-hidden max-h-80 bg-teal-50 border border-teal-100">
                <img
                  src={selectedNews.coverImage}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {selectedNews.content}
              </div>
            </div>

            <div className="p-4 border-t border-teal-100 flex justify-between items-center bg-teal-50/50 text-xs">
              <span className="text-slate-600 font-medium">Kategori: {selectedNews.category}</span>
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
