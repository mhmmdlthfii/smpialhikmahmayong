import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  School,
  Award,
  Target,
  Eye,
  Users,
  Building,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Sparkles,
  FlaskConical,
  Laptop,
  Library,
  Trophy,
  Heart
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { websiteSettings, gallery } = useApp();

  const facilities = [
    { title: 'Laboratorium Bioteknologi & Sains Digital', desc: 'Dilengkapi mikroskop digital, spektrofotometer, dan instrumen kultur jaringan.', icon: FlaskConical },
    { title: 'Auditorium Graha Digital (Kapasitas 800 Orang)', desc: 'Pusat pentas seni, seminar nasional, dan wisuda terpadu berpendingin udara.', icon: Building },
    { title: 'Pusat Riset Komputer & Multimedia CBT', desc: '180 unit workstation modern untuk ujian daring, AI coding club, dan desain grafis.', icon: Laptop },
    { title: 'Perpustakaan Digital & Ruang Kolaborasi Kreatif', desc: 'Ribuan e-book, repositori karya ilmiah siswa, dan ruang diskusi akustik nyaman.', icon: Library },
    { title: 'Gelanggang Olahraga & Lapangan Futsal / Basket', desc: 'Fasilitas olahraga outdoor & indoor berstandar nasional.', icon: Trophy },
    { title: 'Masjid Sekolah & Islamic Center', desc: 'Pusat pembinaan karakter religius dan kegiatan ibadah harian.', icon: Heart }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Profile Hero */}
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
          <School className="w-4 h-4 text-teal-600" />
          <span>Profil Satuan Pendidikan</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-teal-950 tracking-tight">
          {websiteSettings.schoolName}
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Mewujudkan institusi pendidikan unggulan berbasis riset, sains teknologi modern, dan keteladanan budi pekerti luhur.
        </p>
      </div>

      {/* Akreditasi & Identitas Card */}
      <div className="max-w-5xl mx-auto glass-panel-strong p-8 rounded-3xl border border-teal-100 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 shadow-xs">
            <span className="text-xs text-slate-500 font-bold block">Status Akreditasi</span>
            <span className="text-2xl font-heading font-extrabold text-teal-700 mt-1 block">
              {websiteSettings.akreditasi}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 shadow-xs">
            <span className="text-xs text-slate-500 font-bold block">NPSN Resmi</span>
            <span className="text-2xl font-heading font-extrabold text-amber-700 mt-1 block font-mono">
              {websiteSettings.npsn}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 shadow-xs">
            <span className="text-xs text-slate-500 font-bold block">Kepala Sekolah</span>
            <span className="text-sm font-heading font-bold text-emerald-800 mt-1 block">
              {websiteSettings.headmasterName}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/70 shadow-xs">
            <span className="text-xs text-slate-500 font-bold block">Tahun Berdiri</span>
            <span className="text-2xl font-heading font-extrabold text-orange-600 mt-1 block">
              2001 (25 Tahun)
            </span>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Visi */}
        <div className="glass-card p-8 rounded-3xl space-y-4 border-teal-100 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-xs">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-teal-950">
            Visi Sekolah
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            "Terwujudnya insan pembelajar yang berakhlak mulia, unggul dalam penguasaan sains dan teknologi digital, berwawasan lingkungan, serta mampu bersaing pada level global."
          </p>
        </div>

        {/* Misi */}
        <div className="glass-card p-8 rounded-3xl space-y-4 border-teal-100 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-teal-950">
            Misi Sekolah
          </h2>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Menyelenggarakan proses pembelajaran berbasis riset (Science, Technology, Engineering, Arts, Mathematics).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Mengintegrasikan tata kelola digital terpadu untuk transparansi administrasi dan pembelajaran bermutu.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Membina kepribadian siswa yang berintegritas, mandiri, dan menjunjung tinggi nilai-nilai kearifan lokal.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Sarana & Prasarana */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            <Building className="w-3.5 h-3.5 text-teal-600" />
            <span>Infrastruktur Modern</span>
          </div>
          <h2 className="text-3xl font-heading font-bold text-teal-950">
            Fasilitas & Sarana Prasarana
          </h2>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Didukung sarana penunjang pembelajaran modern untuk memberikan pengalaman studi optimal bagi seluruh civitas akademika.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const IconComp = fac.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl space-y-3 border-teal-100 hover:border-teal-300 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-teal-950">{fac.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
