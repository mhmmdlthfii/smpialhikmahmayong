import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Medal,
  Calendar,
  Sparkles,
  Users,
  Search,
  Filter,
  Award
} from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { achievements } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Sains', 'Teknologi', 'Olahraga', 'Seni & Budaya', 'Guru'];

  const filteredAchievements = selectedCategory === 'Semua'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-xs">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Hall of Fame & Prestasi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
          Prestasi Siswa & Pendidik
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Kebanggaan dan dedikasi civitas akademika dalam menjuarai kompetisi tingkat regional, nasional, hingga internasional.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 scale-[1.02]'
                  : 'glass-panel text-slate-700 hover:text-teal-800 border-teal-100 hover:border-teal-300 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach) => (
          <div
            key={ach.id}
            className="glass-card rounded-3xl overflow-hidden border-teal-100 hover:border-teal-400/60 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-teal-50 overflow-hidden">
                <img
                  src={ach.imageUrl}
                  alt={ach.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                  {ach.rank}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-950/80 text-white backdrop-blur-xs">
                  Tingkat {ach.level}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">{ach.category}</span>
                  <span className="font-mono font-medium">Tahun {ach.year}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-teal-950">
                  {ach.title}
                </h3>

                <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-500 font-medium">Santri / Pemenang:</p>
                    {ach.studentClass && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800">
                        {ach.studentClass}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-teal-950">{ach.studentOrTeam}</p>
                  <p className="text-[11px] text-teal-800 italic">{ach.competitionName}</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 text-xs text-slate-600 border-t border-teal-50 flex items-center justify-between">
              <span>Penyelenggara:</span>
              <strong className="text-teal-950">{ach.organizer}</strong>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
