import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';
import { Image, Calendar, Tag, Sparkles, X } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['Semua', 'Kegiatan', 'Fasilitas', 'Prestasi', 'Seni & Budaya'];

  const filteredGallery = selectedCategory === 'Semua'
    ? gallery
    : gallery.filter((g) => g.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
          <Image className="w-4 h-4 text-teal-600" />
          <span>Dokumentasi Visual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-teal-950 tracking-tight">
          Galeri Foto Kegiatan & Fasilitas
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Momen berharga, suasana pembelajaran interaktif, dan sarana prasarana modern di lingkungan sekolah.
        </p>

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

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group glass-card rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] border-teal-100 hover:border-teal-400/60 shadow-xs hover:shadow-lg transition-all"
          >
            <div className="relative h-60 bg-teal-50 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-teal-100/90 line-clamp-2 mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-4xl w-full glass-panel-strong rounded-3xl overflow-hidden border border-teal-200 shadow-2xl bg-white">
            <div className="flex items-center justify-between p-4 border-b border-teal-100 bg-teal-50/80">
              <span className="text-xs font-bold text-teal-900">{activePhoto.category} • {activePhoto.date}</span>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-teal-950 hover:bg-teal-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] bg-teal-950/90 flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 bg-white text-teal-950 space-y-1 border-t border-teal-100">
              <h3 className="font-heading font-bold text-base text-teal-950">{activePhoto.title}</h3>
              <p className="text-xs text-slate-600">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
