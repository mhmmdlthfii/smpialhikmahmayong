import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Akademik', 'Kesiswaan', 'Ujian', 'Rapat'];

  const filteredEvents = selectedCategory === 'Semua'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>Kalender Kegiatan & Agenda</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
          Agenda & Jadwal Kegiatan Sekolah
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Pantau seluruh rangkaian agenda akademik, olimpiade, asesmen semester, dan perhelatan seni kesiswaan.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

      <div className="max-w-4xl mx-auto space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="glass-card p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-teal-100 hover:border-teal-400/60 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 flex flex-col items-center justify-center shrink-0 shadow-xs">
                <span className="text-xs font-bold uppercase text-teal-600">{evt.date.split(' ')[1] || 'AGS'}</span>
                <span className="text-2xl font-heading font-extrabold text-teal-950">{evt.date.split(' ')[0] || '15'}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 uppercase">
                    {evt.category}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-500">{evt.date}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-teal-950">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600">
                  {evt.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 pt-1 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {evt.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {evt.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="self-end sm:self-center">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
                Terjadwal
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
