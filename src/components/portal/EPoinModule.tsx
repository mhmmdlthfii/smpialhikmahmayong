import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { PointTransaction, PointCategory } from '../../types';
import {
  Award,
  AlertTriangle,
  ShieldAlert,
  PlusCircle,
  Search,
  Filter,
  TrendingUp,
  UserX,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  X,
  Trophy,
  HeartHandshake
} from 'lucide-react';

export const EPoinModule: React.FC = () => {
  const { user, activeRole, hasPermission } = useAuth();
  const {
    pointCategories,
    pointTransactions,
    addPointTransaction,
    students,
    classes
  } = useApp();

  const [activeTab, setActiveTab] = useState<'transactions' | 'leaderboard' | 'categories'>('transactions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'PRESTASI' | 'PELANGGARAN'>('ALL');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Synchronize tab with Secondary Sidebar events
  React.useEffect(() => {
    const handleSubTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ module: string; tab: string }>;
      if (customEvent.detail?.module === 'e-poin' && customEvent.detail?.tab) {
        const tab = customEvent.detail.tab;
        if (['transactions', 'leaderboard', 'categories'].includes(tab)) {
          setActiveTab(tab as any);
        }
      }
    };
    window.addEventListener('portal-subtab-change', handleSubTabEvent);
    return () => window.removeEventListener('portal-subtab-change', handleSubTabEvent);
  }, []);

  // Form State
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(pointCategories[0]?.id || '');
  const [description, setDescription] = useState<string>('');
  const [actionTaken, setActionTaken] = useState<string>('');

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s) => s.id === selectedStudentId);
    const cat = pointCategories.find((c) => c.id === selectedCategoryId);
    if (!st || !cat) return;

    addPointTransaction({
      studentId: st.id,
      studentName: st.name,
      nisn: st.nisn,
      classId: st.classId,
      className: st.className,
      categoryId: cat.id,
      categoryName: cat.name,
      type: cat.type,
      points: cat.points,
      description: description || cat.description,
      actionTaken: actionTaken || (cat.type === 'PELANGGARAN' ? 'Pembinaan Wali Kelas & Pencatatan BK' : 'Apresiasi dan Penghargaan Piagam'),
      reportedById: user?.id || 'usr-guru',
      reportedByName: user?.name || 'Guru BK / Wali Kelas',
      reportedAt: new Date().toISOString().split('T')[0],
      isParentNotified: true
    });

    setDescription('');
    setActionTaken('');
    setShowAddModal(false);
  };

  const filteredTransactions = pointTransactions.filter((trx) => {
    const matchType = filterType === 'ALL' || trx.type === filterType;
    const matchSearch =
      searchQuery === '' ||
      trx.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.className.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Calculate Student Accumulated Points
  const studentPointSummaries = students.map((st) => {
    const trxs = pointTransactions.filter((t) => t.studentId === st.id);
    const totalPositive = trxs.filter((t) => t.type === 'PRESTASI').reduce((sum, t) => sum + t.points, 0);
    const totalNegative = trxs.filter((t) => t.type === 'PELANGGARAN').reduce((sum, t) => sum + t.points, 0);
    const netPoints = 100 + totalPositive - totalNegative;
    return {
      student: st,
      totalPositive,
      totalNegative,
      netPoints,
      historyCount: trxs.length
    };
  });

  const topAchievers = [...studentPointSummaries].sort((a, b) => b.totalPositive - a.totalPositive).slice(0, 5);
  const counselingNeeded = [...studentPointSummaries].filter((s) => s.totalNegative >= 20).sort((a, b) => b.totalNegative - a.totalNegative);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-teal-950">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-teal-950">
              E-Poin Karakter & Kedisiplinan Siswa
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Pencatatan poin prestasi & pelanggaran tata tertib, bimbingan konseling (BK), serta pemantauan rekam jejak pembinaan karakter terpadu.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Log Poin ({pointTransactions.length})
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Rekap & Konseling BK
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Katalog Tata Tertib ({pointCategories.length})
          </button>

          {(activeRole === 'GURU' || activeRole === 'WALI_KELAS' || activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Catat Poin Siswa</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border-l-4 border-teal-600 border-teal-100 space-y-1 shadow-xs">
          <span className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-teal-600" />
            <span>Total Poin Prestasi Tercatat</span>
          </span>
          <p className="text-2xl font-heading font-extrabold text-teal-700">
            +{pointTransactions.filter((t) => t.type === 'PRESTASI').reduce((sum, t) => sum + t.points, 0)} Poin
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-rose-500 border-rose-100 space-y-1 shadow-xs">
          <span className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Total Poin Pelanggaran</span>
          </span>
          <p className="text-2xl font-heading font-extrabold text-rose-600">
            -{pointTransactions.filter((t) => t.type === 'PELANGGARAN').reduce((sum, t) => sum + t.points, 0)} Poin
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-amber-500 border-amber-100 space-y-1 shadow-xs">
          <span className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Siswa Dalam Pembinaan BK</span>
          </span>
          <p className="text-2xl font-heading font-extrabold text-amber-600">
            {counselingNeeded.length} Siswa
          </p>
        </div>
      </div>

      {/* TAB 1: TRANSAKSI POIN */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          
          <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border-teal-100 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari siswa, kelas, atau nama pelanggaran..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterType === 'ALL' ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType('PRESTASI')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterType === 'PRESTASI' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}`}
              >
                Prestasi (+)
              </button>
              <button
                onClick={() => setFilterType('PELANGGARAN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterType === 'PELANGGARAN' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
              >
                Pelanggaran (-)
              </button>
            </div>
          </div>

          <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
                  <tr>
                    <th className="py-3 px-4">Tanggal & Pelapor</th>
                    <th className="py-3 px-4">Nama Siswa & Kelas</th>
                    <th className="py-3 px-4">Kategori & Poin</th>
                    <th className="py-3 px-4">Keterangan / Kejadian</th>
                    <th className="py-3 px-4">Tindakan / Pembinaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50 text-slate-700 bg-white">
                  {filteredTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-teal-50/40">
                      <td className="py-3 px-4">
                        <span className="font-bold text-teal-950 block">{trx.reportedAt}</span>
                        <span className="text-[10px] text-slate-400">Oleh: {trx.reportedByName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-teal-950 block">{trx.studentName}</span>
                        <span className="text-[10px] text-teal-700 font-mono font-bold">{trx.className}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-teal-950 block">{trx.categoryName}</span>
                        <span className={`inline-flex items-center font-bold text-xs ${trx.type === 'PRESTASI' ? 'text-teal-700' : 'text-rose-600'}`}>
                          {trx.type === 'PRESTASI' ? `+${trx.points} Poin (Prestasi)` : `-${trx.points} Poin (Pelanggaran)`}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs text-slate-600">
                        {trx.description}
                      </td>
                      <td className="py-3 px-4">
                        <span className="p-1.5 rounded-lg bg-teal-50/70 border border-teal-100 text-[11px] block text-slate-700">
                          {trx.actionTaken || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LEADERBOARD & KONSELING BK */}
      {activeTab === 'leaderboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Top Achievers */}
          <div className="glass-panel p-6 rounded-3xl border border-teal-200 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-base text-teal-950 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Top Siswa Teladan & Berprestasi</span>
            </h3>
            <div className="space-y-3">
              {topAchievers.map((item, idx) => (
                <div key={item.student.id} className="p-3.5 rounded-2xl glass-card border-teal-100 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs border border-amber-200">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-xs text-teal-950">{item.student.name}</p>
                      <p className="text-[10px] text-slate-500">{item.student.className} • NISN: {item.student.nisn}</p>
                    </div>
                  </div>
                  <span className="font-bold text-teal-700 font-mono text-sm">
                    +{item.totalPositive} Poin
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Counseling Needed */}
          <div className="glass-panel p-6 rounded-3xl border border-rose-200 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-base text-teal-950 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Monitoring Pembinaan BK & Wali Kelas</span>
            </h3>
            <div className="space-y-3">
              {counselingNeeded.length === 0 ? (
                <p className="text-xs text-slate-500 p-4 text-center">Tidak ada siswa yang melebihi batas poin pembinaan.</p>
              ) : (
                counselingNeeded.map((item) => (
                  <div key={item.student.id} className="p-3.5 rounded-2xl glass-card border-l-4 border-rose-500 border-rose-100 flex items-center justify-between gap-3 shadow-xs">
                    <div>
                      <p className="font-bold text-xs text-teal-950">{item.student.name}</p>
                      <p className="text-[10px] text-slate-500">{item.student.className} • Peringatan SP 1</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-rose-600 font-mono text-sm">
                        -{item.totalNegative} Poin
                      </span>
                      <span className="text-[10px] text-rose-600 block font-bold">Panggilan Orang Tua</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: KATALOG TATA TERTIB */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pointCategories.map((cat) => (
            <div key={cat.id} className="glass-card p-5 rounded-2xl space-y-2 border-teal-100 shadow-xs">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cat.type === 'PRESTASI' ? 'bg-teal-100 text-teal-800 border border-teal-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>
                  {cat.type}
                </span>
                <span className={`font-bold font-mono text-sm ${cat.type === 'PRESTASI' ? 'text-teal-700' : 'text-rose-600'}`}>
                  {cat.type === 'PRESTASI' ? `+${cat.points}` : `-${cat.points}`} Poin
                </span>
              </div>
              <h4 className="font-bold text-xs text-teal-950">{cat.name}</h4>
              <p className="text-[11px] text-slate-600">{cat.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Point */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-lg w-full glass-panel-strong rounded-3xl border border-teal-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-teal-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Pencatatan Poin Karakter Siswa</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-teal-950 mb-1">Pilih Siswa *</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>{st.name} - {st.className}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Katalog Tata Tertib / Prestasi *</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                >
                  {pointCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.type === 'PRESTASI' ? '+' : '-'}{c.points}] {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Deskripsi Kejadian / Bukti</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail kejadian, tempat, atau nama lomba yang dijuarai..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Tindakan / Bimbingan yang Diberikan</label>
                <input
                  type="text"
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="Contoh: Konseling BK & Pembinaan Wali Kelas"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-teal-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-bold shadow-md shadow-amber-500/20"
                >
                  Simpan Transaksi Poin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
