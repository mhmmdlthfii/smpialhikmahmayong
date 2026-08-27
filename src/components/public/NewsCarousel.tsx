import React, { useState, useEffect, useRef } from 'react';
import { NewsItem } from '../../types';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  ArrowRight,
  X,
  Share2,
  Check,
  Eye,
  Calendar,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface NewsCarouselProps {
  newsItems: NewsItem[];
  navigate: (path: string) => void;
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ newsItems, navigate }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Take up to 6 latest news items
  const displayItems = newsItems.slice(0, 6);
  const totalItems = displayItems.length;

  // Responsive visible count:
  // Desktop: 3 items visible -> max startIndex = totalItems - 3
  // If totalItems <= 3, maxStartIndex = 0
  const visibleCardsDesktop = 3;
  const maxStartIndex = Math.max(0, totalItems - visibleCardsDesktop);

  // Auto scroll effect every 5.5 seconds (if more than 3 items and not paused)
  useEffect(() => {
    if (isPaused || totalItems <= 3) return;

    autoPlayRef.current = setInterval(() => {
      setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, maxStartIndex, totalItems]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxStartIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxStartIndex ? prev + 1 : 0));
  };

  const handleOpenDetail = (item: NewsItem) => {
    setSelectedNews(item);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
    setIsCopied(false);
  };

  const handleShare = () => {
    if (selectedNews) {
      const url = `${window.location.origin}/berita/${selectedNews.slug}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedNews) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNews]);

  if (totalItems === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Outer Container with Prev/Next Controls */}
      <div className="relative group">
        
        {/* Navigation Buttons for Desktop & Tablet */}
        {totalItems > 3 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Berita Sebelumnya"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-teal-900 shadow-xl shadow-teal-950/15 border border-teal-100 flex items-center justify-center hover:bg-teal-700 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Berita Selanjutnya"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-teal-900 shadow-xl shadow-teal-950/15 border border-teal-100 flex items-center justify-center hover:bg-teal-700 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Carousel Viewport */}
        <div className="overflow-hidden px-1 py-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${startIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%)`
            }}
          >
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
              >
                <div
                  onClick={() => handleOpenDetail(item)}
                  className="group/card h-full bg-white rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between border border-teal-100/70 shadow-xs hover:shadow-xl hover:shadow-teal-950/15 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Cover Image & Category Badge */}
                    <div className="relative h-52 overflow-hidden bg-teal-50">
                      <img
                        src={item.coverImage || item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-teal-800/90 backdrop-blur-md text-white shadow-md">
                        {item.category}
                      </span>

                      {item.isFeatured && (
                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-400/95 text-amber-950 shadow-md">
                          Utama
                        </span>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-teal-800/80 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{item.publishedAt || item.date || 'Terbaru'}</span>
                        </div>
                        {item.author && (
                          <div className="flex items-center gap-1 text-slate-500 truncate">
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{item.author}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-base text-teal-950 group-hover/card:text-teal-700 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.summary || item.content}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-6 pb-5 pt-3 flex items-center justify-between text-xs font-bold text-teal-700 border-t border-slate-50 mt-auto">
                    <span className="group-hover/card:text-teal-800 transition-colors">Baca Selengkapnya</span>
                    <div className="w-7 h-7 rounded-xl bg-teal-50 group-hover/card:bg-teal-700 group-hover/card:text-white flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {totalItems > 3 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: maxStartIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === idx
                    ? 'w-8 bg-teal-700 shadow-xs'
                    : 'w-2.5 bg-teal-200 hover:bg-teal-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* POPUP MODAL: FULL NEWS READER */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-teal-950/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl shadow-teal-950/30 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-teal-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-800">
                  {selectedNews.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  {selectedNews.publishedAt || selectedNews.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                  title="Bagikan Tautan Berita"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Tutup (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Cover Image in Modal */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 max-h-80 shadow-inner">
                <img
                  src={selectedNews.coverImage || selectedNews.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover max-h-80"
                />
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-teal-950 leading-snug">
                  {selectedNews.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-teal-600" />
                    <span>Penulis: {selectedNews.author || 'Tim Humas Al-Hikmah'}</span>
                  </div>
                  {selectedNews.views && (
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-teal-600" />
                      <span>{selectedNews.views.toLocaleString('id-ID')} Kali Dilihat</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content Paragraphs */}
              <div className="prose prose-teal max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                {selectedNews.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:px-8 sm:py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
              <span className="text-xs text-slate-500">
                {isCopied ? '✓ Tautan berita berhasil disalin!' : 'SMP Islam Al Hikmah Mayong • Warta Resmi'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleCloseModal();
                    navigate(`/berita/${selectedNews.slug}`);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-teal-800 bg-white border border-teal-200 hover:bg-teal-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Buka Halaman Lengkap</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-800 hover:bg-teal-700 transition-colors shadow-xs cursor-pointer"
                >
                  Selesai Membaca
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
