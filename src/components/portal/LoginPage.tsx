import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { StickyCapsuleFooter } from '../common/StickyCapsuleFooter';
import {
  Lock,
  User,
  School,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface LoginPageProps {
  navigate: (path: string) => void;
  redirectPath?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  navigate,
  redirectPath = '/portal'
}) => {
  const { login, quickLoginAsRole } = useAuth();
  const { websiteSettings } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate(redirectPath || '/portal');
      } else {
        setErrorMsg('Username / email atau kata sandi tidak valid. Silakan gunakan akses instan demo di bawah.');
      }
    }, 350);
  };

  const handleDemoLogin = (role: UserRole) => {
    quickLoginAsRole(role);
    navigate(redirectPath || '/portal');
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-center items-center p-4 relative overflow-hidden bg-gradient-to-b from-[#f8faf9] via-[#f2faf7] to-[#e8f6f2] select-none"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      
      {/* Background Yellow & Green/Teal Ambient Glowing Orbs */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-[550px] h-[550px] rounded-full bg-amber-400/25 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-[520px] h-[520px] rounded-full bg-emerald-400/25 blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[420px] h-[420px] rounded-full bg-yellow-300/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-300/10 blur-[150px] pointer-events-none" />

      {/* Floating Top Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-700 hover:text-teal-800 hover:bg-white/90 text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      {/* Centered Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-9 shadow-2xl shadow-teal-950/10 border border-white/80 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Card Header & School Identity */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-700/25 border border-white/40">
            <School className="w-7 h-7 text-white" />
          </div>
          
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Portal SSO Sekolah
            </h1>
            <p className="text-xs font-bold text-teal-700 tracking-wide mt-0.5">
              {websiteSettings.schoolName}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug px-2">
              {websiteSettings.address}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-tight">{errorMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Username / Akun Login
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan username admin / wali"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Kata Sandi / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl text-xs bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action Button with Theme Gradient */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-lg shadow-teal-700/25 hover:shadow-teal-700/35 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            {isLoading ? (
              <span>Memverifikasi Akun SSO...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Pills */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-teal-800/80 text-center">
            Akses Instan Demo (Pilih Peran):
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('ADMIN')}
              className="p-2 rounded-xl bg-slate-50/80 hover:bg-teal-50/80 hover:border-teal-300 text-slate-800 text-left border border-slate-200/80 shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="block font-bold text-[11px] text-teal-900 group-hover:text-teal-700">Administrator</span>
                <Sparkles className="w-3 h-3 text-amber-500 opacity-80" />
              </div>
              <span className="text-[10px] text-slate-500 block -mt-0.5">Semua Modul & CMS</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('KEPALA_SEKOLAH')}
              className="p-2 rounded-xl bg-slate-50/80 hover:bg-amber-50/80 hover:border-amber-300 text-slate-800 text-left border border-slate-200/80 shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="block font-bold text-[11px] text-amber-700">Kepala Sekolah</span>
                <ShieldCheck className="w-3 h-3 text-amber-600 opacity-80" />
              </div>
              <span className="text-[10px] text-slate-500 block -mt-0.5">Approval ETTD</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('GURU')}
              className="p-2 rounded-xl bg-slate-50/80 hover:bg-emerald-50/80 hover:border-emerald-300 text-slate-800 text-left border border-slate-200/80 shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="block font-bold text-[11px] text-emerald-800 group-hover:text-emerald-700">Guru / Wali</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600 opacity-80" />
              </div>
              <span className="text-[10px] text-slate-500 block -mt-0.5">Jurnal & Presensi</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('SISWA')}
              className="p-2 rounded-xl bg-slate-50/80 hover:bg-orange-50/80 hover:border-orange-300 text-slate-800 text-left border border-slate-200/80 shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="block font-bold text-[11px] text-orange-700">Siswa</span>
                <User className="w-3 h-3 text-orange-500 opacity-80" />
              </div>
              <span className="text-[10px] text-slate-500 block -mt-0.5">SKL & Poin Disiplin</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Capsule Footer */}
      <StickyCapsuleFooter />

    </div>
  );
};
