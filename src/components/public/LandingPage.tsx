import React from 'react';
import { useApp } from '../../context/AppContext';
import { LiquidGlassServices } from '../common/LiquidGlassServices';
import { HeroSlider } from './HeroSlider';
import { NewsCarousel } from './NewsCarousel';
import { SystemService } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Calendar,
  Award,
  CheckCircle2,
  ChevronRight,
  School,
  Clock,
  BookOpen,
  HeartHandshake,
  Star,
  Compass,
  Newspaper,
  Trophy,
  Medal
} from 'lucide-react';

interface LandingPageProps {
  navigate: (path: string) => void;
  onOpenExternalModal: (service: SystemService) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  navigate,
  onOpenExternalModal
}) => {
  const {
    websiteSettings,
    news,
    events,
    achievements,
    announcements,
    heroSlides
  } = useApp();

  const featuredNews = news.slice(0, 3);
  const topAchievements = achievements.slice(0, 4);
  const importantAnnouncement = announcements.find((a) => a.isImportant) || announcements[0];

  return (
    <div className="space-y-0 text-slate-800 bg-[#f7faf9]">
      
      {/* 1. HERO SECTION WITH BROCHURE CAPSULE GRAPHICS */}
      <section className="relative flex items-center justify-center pt-12 pb-14 lg:pt-16 lg:pb-18 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-teal-50/70 via-[#f7faf9] to-amber-50/40">
        
        {/* Ambient Warm & Teal Glows */}
        <div className="liquid-glow w-[520px] h-[520px] bg-teal-500/15 -top-20 left-10" />
        <div className="liquid-glow w-[480px] h-[480px] bg-amber-400/20 bottom-0 right-10" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Announcement Pill */}
            {importantAnnouncement && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-teal-200/90 text-xs font-semibold text-teal-900 shadow-sm shadow-teal-900/5 animate-in fade-in slide-in-from-top-4 duration-500">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                </span>
                <span className="font-bold text-teal-700">Pengumuman:</span>
                <span className="truncate max-w-[220px] sm:max-w-md">{importantAnnouncement.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
              </div>
            )}

            {/* Headline */}
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 border border-emerald-300/80 shadow-xs">
                SMP ISLAM ALHIKMAH MAYONG
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-teal-950 leading-[1.12]">
                Membentuk Generasi{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                  Islami, Berkarakter,
                </span>{' '}
                & Berprestasi Unggul.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                {websiteSettings.heroSubheadline}
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => navigate('/profil')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Profil Sekolah</span>
              </button>

              <button
                onClick={() => navigate('/verify')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-teal-900 bg-white border border-teal-200 hover:border-teal-400 hover:bg-teal-50/60 shadow-sm shadow-teal-900/5 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <span>Verifikasi ETTD</span>
              </button>
            </div>

            {/* Quick Information Metrics */}
            <div className="pt-6 sm:pt-7 border-t border-teal-100/80 flex flex-wrap items-center gap-8 sm:gap-12 lg:gap-14">
              <div className="flex flex-col items-center text-center">
                <p className="font-sans font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-[#042822] tracking-tight leading-none">
                  48+
                </p>
                <p className="font-sans font-light italic text-xs sm:text-sm text-slate-500 mt-1.5">
                  tahun mengabdi
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="font-sans font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-[#042822] tracking-tight leading-none">
                  545+
                </p>
                <p className="font-sans font-light italic text-xs sm:text-sm text-slate-500 mt-1.5">
                  siswa aktif
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="font-sans font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-[#042822] tracking-tight leading-none">
                  32+
                </p>
                <p className="font-sans font-light italic text-xs sm:text-sm text-slate-500 mt-1.5">
                  guru dan tendik
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Slider Hero Showcase Inspired by Brochure */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroSlider slides={heroSlides} navigate={navigate} />
          </div>

        </div>
      </section>

      {/* 2. DYNAMIC LIQUID GLASS DIGITAL SERVICES NAVIGATOR */}
      <LiquidGlassServices
        navigate={navigate}
        onOpenExternalModal={onOpenExternalModal}
      />

      {/* 4. BERITA TERBARU (Latest News Carousel & Modal Reader) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-teal-100 bg-white relative overflow-hidden">
        {/* Subtle Liquid Glow Ambient */}
        <div className="liquid-glow w-80 h-80 bg-teal-500/5 -top-10 -right-10" />
        <div className="liquid-glow w-80 h-80 bg-amber-500/5 -bottom-10 -left-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Centered Section Header (Matching Pusat Layanan Digital Terpadu) */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1.5">
              Informasi & Publikasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
              Berita Terbaru Sekolah
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Dapatkan informasi terkini seputar prestasi santri, agenda kegiatan madrasah, inovasi kurikulum, dan rilis warta resmi SMP Islam Al Hikmah Mayong.
            </p>
          </div>

          {/* 6-News Rolling Carousel Component with 3 Visible Cards & Pop-up Reader */}
          <NewsCarousel newsItems={news} navigate={navigate} />

          {/* Centered Action Button: Lihat Semua Berita */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/berita')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-teal-800 to-teal-900 hover:from-teal-700 hover:to-emerald-800 shadow-md shadow-teal-950/10 hover:shadow-xl hover:shadow-teal-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-teal-700/60"
            >
              <Newspaper className="w-4 h-4 text-teal-200 group-hover:scale-110 transition-transform" />
              <span>Lihat Semua Berita & Publikasi</span>
              <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. CAPAIAN PRESTASI SANTRI (Dedicated Modern Cards) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-teal-100 bg-[#f8faf9] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="liquid-glow w-96 h-96 bg-amber-400/10 -top-12 -left-12" />
        <div className="liquid-glow w-96 h-96 bg-teal-500/10 -bottom-12 -right-12" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100/80 text-amber-900 border border-amber-300/70 shadow-2xs mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Kebanggaan & Hall of Fame</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
              Capaian Prestasi Santri
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Apresiasi atas dedikasi, kerja keras, dan keunggulan santri SMP Islam Al Hikmah Mayong dalam menjuarai berbagai kompetisi akademik, keagamaan, dan seni.
            </p>
          </div>

          {/* Simple & Modern Achievement Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAchievements.map((ach) => (
              <div
                key={ach.id}
                onClick={() => navigate('/prestasi')}
                className="group relative bg-white rounded-3xl overflow-hidden border border-teal-100/80 shadow-xs hover:shadow-xl hover:shadow-teal-950/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Student Photo with Rank & Level Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-teal-50/80">
                    <img
                      src={ach.imageUrl}
                      alt={ach.studentOrTeam}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Rank Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white shadow-md flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-200 shrink-0" />
                      <span>{ach.rank}</span>
                    </span>

                    {/* Level Badge */}
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-teal-950/80 text-white backdrop-blur-xs shadow-xs">
                      Tingkat {ach.level}
                    </span>
                  </div>

                  {/* Card Body: Student Name, Class, & Achievement Description */}
                  <div className="p-5 space-y-3">
                    
                    {/* Student Name & Class Pill */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Santri Berprestasi
                        </span>
                        {ach.studentClass && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                            {ach.studentClass}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-extrabold text-base text-teal-950 group-hover:text-teal-700 transition-colors line-clamp-1">
                        {ach.studentOrTeam}
                      </h3>
                    </div>

                    {/* Achievement Details */}
                    <div className="p-3 rounded-2xl bg-[#f7faf9] border border-teal-100/70 space-y-1">
                      <p className="text-xs font-bold text-teal-950 line-clamp-2 leading-snug">
                        {ach.title}
                      </p>
                      <p className="text-[11px] text-slate-500 italic line-clamp-1">
                        {ach.competitionName}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-50 mt-auto">
                  <span className="text-[11px] font-medium text-slate-400">Tahun {ach.year}</span>
                  <span className="font-bold text-teal-700 group-hover:text-teal-800 text-[11px] flex items-center gap-1">
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Centered Section CTA: Lihat Semua Prestasi */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/prestasi')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-amber-400/40"
            >
              <Trophy className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
              <span>Lihat Semua Prestasi Santri & Sekolah</span>
              <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. PPDB & PUBLIC VERIFICATION BANNER CTA (TEAL & GOLDEN ORANGE GRADIENT) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-teal-100 bg-gradient-to-b from-teal-900 via-teal-950 to-emerald-950 text-white relative overflow-hidden">
        
        {/* Subtle glowing capsule backdrops */}
        <div className="liquid-glow w-[450px] h-[450px] bg-amber-500/15 top-0 right-10" />
        <div className="liquid-glow w-[400px] h-[400px] bg-teal-400/15 bottom-0 left-10" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* PPDB CTA Card */}
          <div className="glass-panel-strong p-8 rounded-3xl border border-amber-400/30 bg-white/10 space-y-5 text-left shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">
                Penerimaan Peserta Didik Baru (PPDB) 2026/2027
              </h3>
              <p className="text-xs text-teal-100 leading-relaxed">
                Bergabunglah bersama kami. Dapatkan lingkungan belajar islami yang kondusif, kurikulum digital terkini, bimbingan tahfidz, dan beasiswa prestasi.
              </p>
            </div>
            <button
              onClick={() => navigate('/ppdb')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Informasi & Formulir Pendaftaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Public Verification CTA Card */}
          <div className="glass-panel-strong p-8 rounded-3xl border border-teal-400/30 bg-white/10 space-y-5 text-left shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">
                Verifikasi Dokumen Resmi Publik (ETTD)
              </h3>
              <p className="text-xs text-teal-100 leading-relaxed">
                Pindai barcode atau masukkan token dokumen untuk menguji keabsahan Surat Keterangan Lulus (SKL), Surat Rekomendasi, atau Surat Keterangan Aktif secara real-time.
              </p>
            </div>
            <button
              onClick={() => navigate('/verify')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg shadow-teal-500/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Buka Portal Verifikasi Dokumen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

