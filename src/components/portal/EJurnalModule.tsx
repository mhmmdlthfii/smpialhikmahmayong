import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { TeachingJournal, StudentGrade } from '../../types';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  PlusCircle,
  Search,
  Filter,
  GraduationCap,
  Award,
  Users,
  Save,
  X,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const EJurnalModule: React.FC = () => {
  const { user, activeRole, hasPermission } = useAuth();
  const {
    teachingSchedules,
    teachingJournals,
    addTeachingJournal,
    studentGrades,
    updateStudentGrade,
    classes,
    subjects,
    students
  } = useApp();

  const [activeTab, setActiveTab] = useState<'journals' | 'schedules' | 'grades'>('journals');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Journal Entry Form State
  const [newScheduleId, setNewScheduleId] = useState<string>(teachingSchedules[0]?.id || '');
  const [newClassId, setNewClassId] = useState<string>(classes[0]?.id || '');
  const [newSubjectId, setNewSubjectId] = useState<string>(subjects[0]?.id || '');
  const [newTopic, setNewTopic] = useState<string>('');
  const [newLearningAchievement, setNewLearningAchievement] = useState<string>('');
  const [newActivityDescription, setNewActivityDescription] = useState<string>('');
  const [newAttendedCount, setNewAttendedCount] = useState<number>(32);
  const [newAbsentCount, setNewAbsentCount] = useState<number>(0);
  const [newNotes, setNewNotes] = useState<string>('');

  // Grade Editing State
  const [editingGradeId, setEditingGradeId] = useState<string | null>(null);
  const [editScore, setEditScore] = useState<number>(85);
  const [editNotes, setEditNotes] = useState<string>('');

  const filteredJournals = teachingJournals.filter((j) => {
    const matchClass = selectedClass === 'ALL' || j.className === selectedClass || j.classId === selectedClass;
    const matchSearch =
      searchQuery === '' ||
      j.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSearch;
  });

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const cls = classes.find((c) => c.id === newClassId);
    const sub = subjects.find((s) => s.id === newSubjectId);

    addTeachingJournal({
      scheduleId: newScheduleId || `sch-${Date.now()}`,
      teacherId: user?.id || 'tch-1',
      teacherName: user?.name || 'Budi Santoso, S.Pd',
      classId: newClassId,
      className: cls ? cls.name : 'IX-A',
      subjectId: newSubjectId,
      subjectName: sub ? sub.name : 'Pendidikan Agama Islam & Budi Pekerti',
      date: new Date().toISOString().split('T')[0],
      startTime: '07:30',
      endTime: '09:00',
      topic: newTopic,
      learningAchievement: newLearningAchievement || 'Peserta didik mampu memahami dan menerapkan konsep',
      activityDescription: newActivityDescription || 'Pembahasan materi, diskusi kelompok, dan evaluasi formatif',
      attendedCount: Number(newAttendedCount),
      absentCount: Number(newAbsentCount),
      absentStudentNames: [],
      notes: newNotes,
      status: 'SUBMITTED'
    });

    setNewTopic('');
    setNewLearningAchievement('');
    setNewActivityDescription('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleSaveGrade = (gradeId: string) => {
    updateStudentGrade(gradeId, {
      score: editScore,
      notes: editNotes
    });
    setEditingGradeId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-teal-950">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-teal-950">
              E-Jurnal Mengajar & Nilai Akademik
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Pencatatan agenda mengajar harian, ketercapaian materi (Capaian Pembelajaran), presensi kelas, dan rekapitulasi nilai formatif/sumatif.
          </p>
        </div>

        {/* Tab Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('journals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'journals'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Jurnal Mengajar ({teachingJournals.length})
          </button>

          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'schedules'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Jadwal Pelajaran ({teachingSchedules.length})
          </button>

          <button
            onClick={() => setActiveTab('grades')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'grades'
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xs'
                : 'glass-panel text-slate-600 hover:text-teal-800 border-teal-100'
            }`}
          >
            Nilai & Asesmen ({studentGrades.length})
          </button>

          {(activeRole === 'GURU' || activeRole === 'WALI_KELAS' || activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Isi Jurnal Hari Ini</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: JURNAL MENGAJAR */}
      {activeTab === 'journals' && (
        <div className="space-y-4">
          
          {/* Controls */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border-teal-100 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari materi, mapel, atau nama guru..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-600 font-bold whitespace-nowrap">Filter Kelas:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-white border border-teal-200 text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-xs"
              >
                <option value="ALL">Semua Kelas</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Journals Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJournals.map((journal) => (
              <div
                key={journal.id}
                className="glass-card p-5 rounded-2xl space-y-3 border-teal-100 hover:border-teal-400 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-3 border-b border-teal-50 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                        {journal.className}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {journal.subjectName}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-teal-950 mt-1.5">
                      {journal.topic}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3 text-teal-600" />
                      <span>{journal.date}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-end mt-0.5">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>{journal.startTime} - {journal.endTime}</span>
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-2 text-slate-600">
                  <div>
                    <span className="font-bold text-teal-950">Capaian Pembelajaran: </span>
                    <span>{journal.learningAchievement}</span>
                  </div>
                  {journal.activityDescription && (
                    <div>
                      <span className="font-bold text-teal-950">Kegiatan Belajar: </span>
                      <span>{journal.activityDescription}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-teal-50 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-teal-700 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Hadir: {journal.attendedCount} Siswa</span>
                    </span>
                    {journal.absentCount > 0 && (
                      <span className="text-rose-500 font-semibold text-[11px]">
                        Absen: {journal.absentCount}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium">
                    Guru: <strong className="text-teal-900">{journal.teacherName}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: JADWAL MENGAJAR */}
      {activeTab === 'schedules' && (
        <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
                <tr>
                  <th className="py-3 px-4">Hari & Jam</th>
                  <th className="py-3 px-4">Kelas & Ruang</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4">Guru Pengampu</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50 text-slate-700 bg-white">
                {teachingSchedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-teal-50/40">
                    <td className="py-3 px-4">
                      <span className="font-bold text-teal-950 block">{sch.day}</span>
                      <span className="text-[11px] text-teal-700 font-mono font-bold">
                        {sch.startTime} - {sch.endTime}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-teal-950 block">{sch.className}</span>
                      <span className="text-[10px] text-slate-400">{sch.room || 'Ruang Kelas'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-teal-950 block">{sch.subjectName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">{sch.teacherName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-300">
                        Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: NILAI & ASESMEN */}
      {activeTab === 'grades' && (
        <div className="space-y-4">
          <div className="glass-panel-strong rounded-3xl border border-teal-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-50/70 border-b border-teal-100 text-teal-900 font-bold">
                  <tr>
                    <th className="py-3 px-4">Siswa (NISN / Nama)</th>
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Jenis Asesmen</th>
                    <th className="py-3 px-4">Nilai Akhir</th>
                    <th className="py-3 px-4">Catatan Guru</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50 text-slate-700 bg-white">
                  {studentGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-teal-50/40">
                      <td className="py-3 px-4">
                        <span className="font-bold text-teal-950 block">{grade.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{grade.studentNis}</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-teal-950">{grade.subjectName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          {grade.assessmentType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {editingGradeId === grade.id ? (
                          <input
                            type="number"
                            value={editScore}
                            onChange={(e) => setEditScore(Number(e.target.value))}
                            className="w-16 px-2 py-1 text-xs rounded-lg border border-teal-500 bg-white font-bold"
                          />
                        ) : (
                          <span className={`font-bold font-mono text-sm ${grade.score >= 80 ? 'text-teal-700 font-extrabold' : 'text-amber-600'}`}>
                            {grade.score}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                        {editingGradeId === grade.id ? (
                          <input
                            type="text"
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="w-full px-2 py-1 text-xs rounded-lg border border-teal-500 bg-white"
                            placeholder="Catatan perkembangan..."
                          />
                        ) : (
                          grade.notes || 'Kompetensi tercapai dengan baik'
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {editingGradeId === grade.id ? (
                          <button
                            onClick={() => handleSaveGrade(grade.id)}
                            className="p-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 cursor-pointer shadow-xs"
                            title="Simpan"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingGradeId(grade.id);
                              setEditScore(grade.score);
                              setEditNotes(grade.notes || '');
                            }}
                            className="text-xs text-teal-700 hover:text-teal-800 font-bold cursor-pointer"
                          >
                            Ubah
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Teaching Journal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-lg w-full glass-panel-strong rounded-3xl border border-teal-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-teal-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-700" />
                <span>Input Jurnal Mengajar Harian</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJournal} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-teal-950 mb-1">Pilih Kelas</label>
                  <select
                    value={newClassId}
                    onChange={(e) => setNewClassId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-teal-950 mb-1">Mata Pelajaran</label>
                  <select
                    value={newSubjectId}
                    onChange={(e) => setNewSubjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Materi Pokok / Bahasan *</label>
                <input
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Contoh: Integral Tak Tentu dan Turunan Parsial"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Capaian Pembelajaran (CP / TP)</label>
                <input
                  type="text"
                  value={newLearningAchievement}
                  onChange={(e) => setNewLearningAchievement(e.target.value)}
                  placeholder="Peserta didik mampu menyelesaikan permasalahan optimasi..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-teal-950 mb-1">Jumlah Hadir</label>
                  <input
                    type="number"
                    value={newAttendedCount}
                    onChange={(e) => setNewAttendedCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-teal-950 mb-1">Jumlah Absen (I/S/A)</label>
                  <input
                    type="number"
                    value={newAbsentCount}
                    onChange={(e) => setNewAbsentCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-teal-950 mb-1">Catatan Tambahan / Refleksi</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Catatan keaktifan siswa atau kendala teknis..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-950 shadow-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-teal-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 text-white font-bold cursor-pointer shadow-md shadow-teal-700/20"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
