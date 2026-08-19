import React, { useState } from 'react';
import { SystemService } from '../../types';
import { DynamicIcon } from './DynamicIcon';
import {
  X,
  ExternalLink,
  ShieldCheck,
  FileCode2,
  Lock,
  RefreshCw,
  Info,
  CheckCircle,
  Database,
  ArrowRight
} from 'lucide-react';

interface ExternalAppModalProps {
  service: SystemService | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExternalAppModal: React.FC<ExternalAppModalProps> = ({
  service,
  isOpen,
  onClose
}) => {
  const [simulatedQuery, setSimulatedQuery] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);

  if (!isOpen || !service) return null;

  const handleOpenDirectly = () => {
    const target = service.target || (service.openMode === 'NEW_TAB' ? '_blank' : '_self');
    window.open(service.url, target, 'noopener,noreferrer');
  };

  const handleSimulateGAS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedQuery.trim()) return;
    setQueryResult(`[Google Apps Script Response]: Data query "${simulatedQuery}" terhubung dengan Google Sheets Database Backend. Status koneksi: 200 OK.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-strong border border-teal-100 shadow-2xl p-6 overflow-hidden bg-white text-teal-950">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-teal-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-300 shadow-xs">
              <DynamicIcon name={service.icon || service.iconName || 'Globe'} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-teal-950">
                  {service.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  Google Apps Script
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sistem Eksternal Berjalan (No Rewrite Required)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-teal-950 hover:bg-teal-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-slate-700 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-teal-950">Integrasi Sistem Eksternal Sekolah</p>
                <p className="mt-0.5">
                  {service.description} Sistem ini beroperasi pada infrastruktur Google Apps Script mandiri dan dihubungkan secara mulus ke navigasi pusat sekolah.
                </p>
              </div>
            </div>
          </div>

          {/* URL & Security Metadata */}
          <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Target Endpoint GAS:</span>
              <span className="font-mono text-[11px] text-teal-700 font-bold truncate max-w-[280px]">
                {service.url}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Otentikasi:</span>
              <span className="font-medium text-slate-700">
                {service.authRequired ? 'Akun Google Sekolah / SSO' : 'Akses Langsung Aman'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Protokol:</span>
              <span className="flex items-center gap-1 text-teal-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HTTPS Encrypted Applet</span>
              </span>
            </div>
          </div>

          {/* Interactive Live Query Simulation for Demo */}
          <div className="p-4 rounded-2xl border border-teal-100 bg-white">
            <p className="text-xs font-bold text-teal-950 mb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulasi Cek Data Langsung (Live GAS Bridge)</span>
            </p>
            <form onSubmit={handleSimulateGAS} className="flex gap-2">
              <input
                type="text"
                value={simulatedQuery}
                onChange={(e) => setSimulatedQuery(e.target.value)}
                placeholder="Masukkan NISN atau Nama Siswa..."
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Cek
              </button>
            </form>

            {queryResult && (
              <div className="mt-3 p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 animate-in fade-in">
                {queryResult}
              </div>
            )}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-teal-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-teal-50 transition-colors"
          >
            Tutup
          </button>

          <button
            onClick={handleOpenDirectly}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 shadow-md shadow-teal-700/20 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka Aplikasi Google Apps Script di Tab Baru</span>
          </button>
        </div>

      </div>
    </div>
  );
};
