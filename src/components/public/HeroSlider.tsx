import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  slides: HeroSlide[];
  navigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides, navigate }) => {
  const activeSlides = slides.filter((s) => s.isActive !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displaySlides = activeSlides.length > 0 ? activeSlides : [
    {
      id: 'default-1',
      title: 'SMP Islam Al Hikmah Mayong',
      subtitle: 'Mewujudkan santri dan siswa berdaya saing global, berkepribadian luhur, dan cerdas teknologi.',
      badgeText: 'PPDB 2026/2027 • Jalur Prestasi & Reguler',
      badgeColor: 'from-amber-500 to-orange-500',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      ctaText: 'Daftar PPDB',
      ctaLink: '/ppdb',
      isActive: true,
      order: 1
    }
  ];

  // Auto-play interval
  useEffect(() => {
    if (isPaused || displaySlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, displaySlides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
  };

  const currentSlide = displaySlides[currentIndex] || displaySlides[0];

  return (
    <div 
      className="relative w-full max-w-[440px] aspect-[4/5] flex items-center justify-center group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Golden Orange Gradient Capsule (Left Background Shape) */}
      <div className="absolute left-2 top-8 w-44 h-72 sm:w-52 sm:h-84 rounded-[2.5rem] bg-gradient-to-b from-amber-300 via-amber-400 to-orange-500 shadow-xl shadow-amber-500/20 transform -rotate-3 transition-transform group-hover:rotate-0 duration-500" />

      {/* Background Teal Gradient Capsule (Right Top Background Shape) */}
      <div className="absolute right-2 top-0 w-52 h-80 sm:w-60 sm:h-96 rounded-[3rem] bg-gradient-to-b from-teal-700 via-teal-600 to-emerald-600 shadow-2xl shadow-teal-700/25 transform rotate-2 transition-transform group-hover:rotate-0 duration-500" />

      {/* Main Student Card Container */}
      <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/90 shadow-2xl flex flex-col justify-end p-6 bg-slate-900/40">
        
        {/* Slides Images with Transition */}
        {displaySlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/40 to-black/20" />
          </div>
        ))}

        {/* Navigation Arrows */}
        {displaySlides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Slide sebelumnya"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-teal-950 flex items-center justify-center backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Slide selanjutnya"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-teal-950 flex items-center justify-center backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Active Slide Content */}
        <div className="relative z-10 space-y-2 text-white text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
          {currentSlide.badgeText && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-gradient-to-r ${currentSlide.badgeColor || 'from-amber-500 to-orange-500'} text-white uppercase tracking-wider shadow-xs`}>
                {currentSlide.badgeText}
              </span>
            </div>
          )}

          <h3 className="text-xl font-heading font-extrabold text-white leading-snug drop-shadow-sm">
            {currentSlide.title}
          </h3>

          {currentSlide.subtitle && (
            <p className="text-xs text-teal-100/90 line-clamp-2 leading-relaxed">
              {currentSlide.subtitle}
            </p>
          )}

          {currentSlide.ctaText && currentSlide.ctaLink && (
            <div className="pt-1">
              <button
                onClick={() => navigate(currentSlide.ctaLink!)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer group/cta"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Dots Indicator */}
          {displaySlides.length > 1 && (
            <div className="pt-2 flex items-center gap-1.5">
              {displaySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Ke slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-amber-400'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
