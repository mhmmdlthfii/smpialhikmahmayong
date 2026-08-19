import React from 'react';

interface StickyCapsuleFooterProps {
  version?: string;
}

export const StickyCapsuleFooter: React.FC<StickyCapsuleFooterProps> = ({ version = 'v2026' }) => {
  return (
    <aside 
      aria-label="Copyright and developer attribution"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto transition-transform duration-300 hover:scale-[1.03] print:hidden"
    >
      <div className="px-5 py-2 rounded-full bg-white/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 shadow-lg shadow-teal-950/5 flex items-center justify-center gap-1.5 text-xs text-slate-800 tracking-wide select-none">
        <span className="font-medium text-slate-700">copyright by</span>
        <span className="font-bold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
          Muhammad Luthfi
        </span>
        {version && (
          <span className="text-[11px] font-mono text-red-500 font-bold">
            {version}
          </span>
        )}
      </div>
    </aside>
  );
};
