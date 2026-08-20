import React from 'react';
import { useApp } from '../../context/AppContext';
import { LiquidGlassServices } from '../common/LiquidGlassServices';
import { HeroSlider } from './HeroSlider';
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
  Compass
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
  const upcomingEvents = events.slice(0, 3);
  const topAchievements = achievements.slice(0, 3);
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
                onClick={() => navigate('/ppdb')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Pendaftaran PPDB 2026/2027</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => navigate('/verify')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-teal-900 bg-white border border-teal-200 hover:border-teal-400 hover:bg-teal-50/60 shadow-sm shadow-teal-900/5 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <span>Verifikasi ETTD</span>
              </button>

              <button
                onClick={() => navigate('/profil')}
                className="flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold text-teal-800 hover:text-teal-950 hover:bg-teal-100/50 transition-colors"
              >
                <span>Profil Sekolah</span>
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

      {/* 4. BERITA TERBARU (Latest News) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-teal-100 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Informasi & Publikasi
              </span>
              <h2 className="text-3xl font-heading font-extrabold text-teal-950 mt-1">
                Berita Terbaru Sekolah
              </h2>
            </div>
            <button
              onClick={() => navigate('/berita')}
              className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/berita/${item.slug}`)}
                className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-teal-950/20 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-teal-50">
                    <img
                      src={item.coverImage || item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-teal-800/90 backdrop-blur-xs text-white shadow-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-teal-800/70 font-medium">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.publishedAt || item.date}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-teal-950 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.summary || item.content}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs font-bold text-teal-700 border-t border-slate-50">
                  <span>Baca Selengkapnya</span>
                  <div className="w-7 h-7 rounded-xl bg-teal-50 group-hover:bg-teal-700 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. AGENDA & KEGIATAN */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-teal-100 bg-[#f7faf9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Upcoming Agenda */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Kalender Kegiatan
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-teal-950 mt-1">
                    Agenda Mendatang
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/agenda')}
                  className="text-xs font-bold text-teal-700 hover:underline"
                >
                  Lihat Agenda →
                </button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="glass-panel p-4 rounded-2xl flex items-start gap-4 hover:border-teal-400/50 transition-all border-teal-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex flex-col items-center justify-center shrink-0 border border-teal-200 font-heading">
                      <Calendar className="w-5 h-5" />
                    </div>

                    <div className="flex-1 space-y-1 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                          {evt.category}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">{evt.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-teal-950">{evt.title}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>{evt.time}</span>
                        <span>•</span>
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prestasi Unggulan */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    Prestasi Sekolah
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-teal-950 mt-1">
                    Capaian Prestasi
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/prestasi')}
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  Lihat Prestasi →
                </button>
              </div>

              <div className="space-y-4">
                {topAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="glass-panel p-4 rounded-2xl flex items-start gap-4 hover:border-amber-400/50 transition-all border-teal-100"
                  >
                    <img
                      src={ach.imageUrl}
                      alt={ach.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-amber-200"
                    />

                    <div className="flex-1 space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>{ach.rank}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">{ach.level}</span>
                      </div>
                      <h4 className="font-bold text-sm text-teal-950">{ach.title}</h4>
                      <p className="text-xs text-slate-600">
                        {ach.studentOrTeam} • <span className="italic">{ach.competitionName}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

