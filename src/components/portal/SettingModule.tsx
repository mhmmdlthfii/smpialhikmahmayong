import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { User, RoleType, Teacher, Student, ClassRoom } from '../../types';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Key,
  Edit2,
  Trash2,
  Search,
  Filter,
  PlusCircle,
  GraduationCap,
  Layers,
  School,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Eye,
  X,
  Save,
  RefreshCw,
  Sparkles,
  Check,
  ArrowUpDown,
  Lock,
  UserCheck,
  Shield,
  Sliders,
  Settings as SettingsIcon,
  HelpCircle,
  ChevronRight,
  Download,
  UploadCloud
} from 'lucide-react';

export const SettingModule: React.FC = () => {
  const { user, activeRole, users, addUser, updateUser, deleteUser } = useAuth();
  const {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    classes,
    addClass,
    updateClass,
    deleteClass,
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    subjects,
    academicYears
  } = useApp();

  // Active subtab: 'accounts' | 'teachers' | 'classes' | 'students'
  const [activeTab, setActiveTab] = useState<'accounts' | 'teachers' | 'classes' | 'students'>('accounts');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync subtab from secondary sidebar
  useEffect(() => {
    const handleSubTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ module: string; tab: string }>;
      if (customEvent.detail?.module === 'setting' && customEvent.detail?.tab) {
        const tab = customEvent.detail.tab;
        if (['accounts', 'teachers', 'classes', 'students'].includes(tab)) {
          setActiveTab(tab as any);
        }
      }
    };
    window.addEventListener('portal-subtab-change', handleSubTabEvent);
    return () => window.removeEventListener('portal-subtab-change', handleSubTabEvent);
  }, []);

  // =========================================================================
  // 1. MANAGE ACCOUNT STATE & MODALS
  // =========================================================================
  const [accountSearch, setAccountSearch] = useState<string>('');
  const [accountRoleFilter, setAccountRoleFilter] = useState<string>('ALL');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State for User Account
  const [accountFormData, setAccountFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    nip: '',
    nisn: '',
    nis: '',
    roles: ['GURU'] as RoleType[],
    activeRole: 'GURU' as RoleType,
    assignedClassName: '',
    avatarUrl: ''
  });

  const availableRolesList: { role: RoleType; label: string; desc: string; color: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Hak akses penuh ke seluruh modul & konfigurasi sistem', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { role: 'ADMIN', label: 'Admin CMS', desc: 'Pengelolaan konten website, media drive & master data', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { role: 'KEPALA_SEKOLAH', label: 'Kepala Sekolah', desc: 'Approval & ETTD Digital surat, supervisi KBM & kelulusan', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { role: 'TU', label: 'Tata Usaha', desc: 'Arsip persuratan dinas masuk/keluar & administrasi data', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { role: 'GURU', label: 'Guru Mapel', desc: 'Pengisian jurnal KBM harian, nilai siswa & presensi', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { role: 'WALI_KELAS', label: 'Wali Kelas', desc: 'Monitoring rekap absensi, input catatan & kelulusan rombel', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { role: 'SISWA', label: 'Siswa / Santri', desc: 'Cek presensi, nilai rapor, SKL kelulusan & poin santri', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { role: 'ORANG_TUA', label: 'Orang Tua / Wali', desc: 'Melihat notifikasi kehadiran anak & rekap perkembangan santri', color: 'bg-sky-100 text-sky-800 border-sky-200' }
  ];

  const handleOpenAddAccount = () => {
    setEditingUser(null);
    setAccountFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      nip: '',
      nisn: '',
      nis: '',
      roles: ['GURU'],
      activeRole: 'GURU',
      assignedClassName: '',
      avatarUrl: ''
    });
    setIsAccountModalOpen(true);
  };

  const handleOpenEditAccount = (u: User) => {
    setEditingUser(u);
    setAccountFormData({
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone || '',
      nip: u.nip || '',
      nisn: u.nisn || '',
      nis: u.nis || '',
      roles: u.roles || ['GURU'],
      activeRole: u.activeRole || u.roles[0] || 'GURU',
      assignedClassName: u.assignedClassName || '',
      avatarUrl: u.avatarUrl || u.avatar || ''
    });
    setIsAccountModalOpen(true);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountFormData.name.trim() || !accountFormData.username.trim() || !accountFormData.email.trim()) {
      alert('Mohon lengkapi Nama, Username, dan Email!');
      return;
    }
    if (accountFormData.roles.length === 0) {
      alert('Pilih minimal satu Hak Akses / Role!');
      return;
    }

    const primaryRole = accountFormData.roles.includes(accountFormData.activeRole)
      ? accountFormData.activeRole
      : accountFormData.roles[0];

    if (editingUser) {
      updateUser(editingUser.id, {
        name: accountFormData.name.trim(),
        username: accountFormData.username.trim().toLowerCase(),
        email: accountFormData.email.trim().toLowerCase(),
        phone: accountFormData.phone.trim(),
        nip: accountFormData.nip.trim() || undefined,
        nisn: accountFormData.nisn.trim() || undefined,
        nis: accountFormData.nis.trim() || undefined,
        roles: accountFormData.roles,
        activeRole: primaryRole,
        assignedClassName: accountFormData.assignedClassName || undefined,
        avatarUrl: accountFormData.avatarUrl || undefined
      });
      showToast(`Akun ${accountFormData.name} berhasil diperbarui!`);
    } else {
      addUser({
        name: accountFormData.name.trim(),
        username: accountFormData.username.trim().toLowerCase(),
        email: accountFormData.email.trim().toLowerCase(),
        phone: accountFormData.phone.trim(),
        nip: accountFormData.nip.trim() || undefined,
        nisn: accountFormData.nisn.trim() || undefined,
        nis: accountFormData.nis.trim() || undefined,
        roles: accountFormData.roles,
        activeRole: primaryRole,
        assignedClassName: accountFormData.assignedClassName || undefined,
        avatarUrl: accountFormData.avatarUrl || undefined
      });
      showToast(`Akun baru ${accountFormData.name} berhasil dibuat!`);
    }
    setIsAccountModalOpen(false);
  };

  const handleDeleteAccount = (u: User) => {
    if (u.id === user?.id) {
      alert('Anda tidak dapat menghapus akun yang sedang Anda gunakan saat ini.');
      return;
    }
    if (window.confirm(`Apakah Anda yakin ingin menghapus akun ${u.name} (@${u.username})?`)) {
      deleteUser(u.id);
      showToast(`Akun ${u.name} telah dihapus.`);
    }
  };

  const toggleRoleSelection = (role: RoleType) => {
    setAccountFormData((prev) => {
      const exists = prev.roles.includes(role);
      let updatedRoles = exists ? prev.roles.filter((r) => r !== role) : [...prev.roles, role];
      if (updatedRoles.length === 0) updatedRoles = [role];
      const updatedActive = updatedRoles.includes(prev.activeRole) ? prev.activeRole : updatedRoles[0];
      return { ...prev, roles: updatedRoles, activeRole: updatedActive };
    });
  };

  const filteredUsers = users.filter((u) => {
    const matchQuery =
      u.name.toLowerCase().includes(accountSearch.toLowerCase()) ||
      u.username.toLowerCase().includes(accountSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(accountSearch.toLowerCase()) ||
      (u.nip && u.nip.includes(accountSearch)) ||
      (u.nisn && u.nisn.includes(accountSearch));
    const matchRole = accountRoleFilter === 'ALL' || u.roles.includes(accountRoleFilter as RoleType);
    return matchQuery && matchRole;
  });

  // =========================================================================
  // 2. DATA GURU STATE & MODALS
  // =========================================================================
  const [teacherSearch, setTeacherSearch] = useState<string>('');
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [teacherFormData, setTeacherFormData] = useState({
    name: '',
    nip: '',
    gender: 'L' as 'L' | 'P',
    phone: '',
    email: '',
    subjectsStr: '',
    isHomeroom: false,
    homeroomClassId: '',
    avatarUrl: ''
  });

  const handleOpenAddTeacher = () => {
    setEditingTeacher(null);
    setTeacherFormData({
      name: '',
      nip: '',
      gender: 'L',
      phone: '',
      email: '',
      subjectsStr: '',
      isHomeroom: false,
      homeroomClassId: '',
      avatarUrl: ''
    });
    setIsTeacherModalOpen(true);
  };

  const handleOpenEditTeacher = (t: Teacher) => {
    setEditingTeacher(t);
    setTeacherFormData({
      name: t.name,
      nip: t.nip,
      gender: t.gender,
      phone: t.phone,
      email: t.email,
      subjectsStr: t.subjects ? t.subjects.join(', ') : '',
      isHomeroom: t.isHomeroom,
      homeroomClassId: t.homeroomClassId || '',
      avatarUrl: t.avatarUrl || ''
    });
    setIsTeacherModalOpen(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherFormData.name.trim() || !teacherFormData.nip.trim()) {
      alert('Nama Guru dan NIP wajib diisi!');
      return;
    }

    const subArr = teacherFormData.subjectsStr
      ? teacherFormData.subjectsStr.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Pendidikan Agama Islam'];

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, {
        name: teacherFormData.name.trim(),
        nip: teacherFormData.nip.trim(),
        gender: teacherFormData.gender,
        phone: teacherFormData.phone.trim(),
        email: teacherFormData.email.trim(),
        subjects: subArr,
        isHomeroom: teacherFormData.isHomeroom,
        homeroomClassId: teacherFormData.isHomeroom ? teacherFormData.homeroomClassId : undefined,
        avatarUrl: teacherFormData.avatarUrl || undefined
      });
      showToast(`Data guru ${teacherFormData.name} berhasil diperbarui!`);
    } else {
      addTeacher({
        name: teacherFormData.name.trim(),
        nip: teacherFormData.nip.trim(),
        gender: teacherFormData.gender,
        phone: teacherFormData.phone.trim(),
        email: teacherFormData.email.trim(),
        subjects: subArr,
        isHomeroom: teacherFormData.isHomeroom,
        homeroomClassId: teacherFormData.isHomeroom ? teacherFormData.homeroomClassId : undefined,
        avatarUrl: teacherFormData.avatarUrl || undefined
      });
      showToast(`Guru baru ${teacherFormData.name} berhasil ditambahkan!`);
    }
    setIsTeacherModalOpen(false);
  };

  const handleDeleteTeacher = (t: Teacher) => {
    if (window.confirm(`Hapus data guru ${t.name} (NIP: ${t.nip})?`)) {
      deleteTeacher(t.id);
      showToast(`Data guru ${t.name} telah dihapus.`);
    }
  };

  const filteredTeachers = teachers.filter((t) => {
    const q = teacherSearch.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.nip.includes(q) ||
      t.email.toLowerCase().includes(q) ||
      (t.subjects && t.subjects.some((s) => s.toLowerCase().includes(q)))
    );
  });

  // =========================================================================
  // 3. DATA KELAS STATE & MODALS
  // =========================================================================
  const [classSearch, setClassSearch] = useState<string>('');
  const [isClassModalOpen, setIsClassModalOpen] = useState<boolean>(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);

  const [classFormData, setClassFormData] = useState({
    name: '',
    gradeLevel: 7,
    homeroomTeacherId: '',
    academicYear: '2025/2026',
    totalStudents: 32
  });

  const handleOpenAddClass = () => {
    setEditingClass(null);
    setClassFormData({
      name: '',
      gradeLevel: 7,
      homeroomTeacherId: teachers[0]?.id || '',
      academicYear: '2025/2026',
      totalStudents: 32
    });
    setIsClassModalOpen(true);
  };

  const handleOpenEditClass = (c: ClassRoom) => {
    setEditingClass(c);
    setClassFormData({
      name: c.name,
      gradeLevel: c.gradeLevel,
      homeroomTeacherId: c.homeroomTeacherId,
      academicYear: c.academicYear,
      totalStudents: c.totalStudents
    });
    setIsClassModalOpen(true);
  };

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classFormData.name.trim()) {
      alert('Nama kelas wajib diisi!');
      return;
    }

    const selectedTeacher = teachers.find((t) => t.id === classFormData.homeroomTeacherId);
    const teacherName = selectedTeacher ? selectedTeacher.name : 'Belum Ditetapkan';

    if (editingClass) {
      updateClass(editingClass.id, {
        name: classFormData.name.trim().toUpperCase(),
        gradeLevel: Number(classFormData.gradeLevel),
        homeroomTeacherId: classFormData.homeroomTeacherId,
        homeroomTeacherName: teacherName,
        academicYear: classFormData.academicYear,
        totalStudents: Number(classFormData.totalStudents) || 0
      });
      showToast(`Kelas ${classFormData.name} berhasil diperbarui!`);
    } else {
      addClass({
        name: classFormData.name.trim().toUpperCase(),
        gradeLevel: Number(classFormData.gradeLevel),
        homeroomTeacherId: classFormData.homeroomTeacherId,
        homeroomTeacherName: teacherName,
        academicYear: classFormData.academicYear,
        totalStudents: Number(classFormData.totalStudents) || 0
      });
      showToast(`Kelas baru ${classFormData.name} berhasil ditambahkan!`);
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (c: ClassRoom) => {
    if (window.confirm(`Hapus kelas rombel ${c.name}?`)) {
      deleteClass(c.id);
      showToast(`Kelas ${c.name} telah dihapus.`);
    }
  };

  const filteredClasses = classes.filter((c) => {
    const q = classSearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.homeroomTeacherName.toLowerCase().includes(q);
  });

  // =========================================================================
  // 4. DATA SISWA STATE & MODALS
  // =========================================================================
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [studentClassFilter, setStudentClassFilter] = useState<string>('ALL');
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>('ALL');
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [studentFormData, setStudentFormData] = useState({
    name: '',
    nis: '',
    nisn: '',
    gender: 'L' as 'L' | 'P',
    classId: '',
    birthPlace: 'Jepara',
    birthDate: '2011-01-01',
    religion: 'Islam',
    address: '',
    parentName: '',
    parentPhone: '',
    currentPoints: 0,
    status: 'AKTIF' as 'AKTIF' | 'LULUS' | 'MUTASI' | 'KELUAR',
    academicYear: '2025/2026'
  });

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setStudentFormData({
      name: '',
      nis: '',
      nisn: '',
      gender: 'L',
      classId: classes[0]?.id || 'cls-1',
      birthPlace: 'Jepara',
      birthDate: '2011-01-01',
      religion: 'Islam',
      address: '',
      parentName: '',
      parentPhone: '',
      currentPoints: 20,
      status: 'AKTIF',
      academicYear: '2025/2026'
    });
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (s: Student) => {
    setEditingStudent(s);
    setStudentFormData({
      name: s.name,
      nis: s.nis,
      nisn: s.nisn,
      gender: s.gender,
      classId: s.classId,
      birthPlace: s.birthPlace || 'Jepara',
      birthDate: s.birthDate || '2011-01-01',
      religion: s.religion || 'Islam',
      address: s.address || '',
      parentName: s.parentName || '',
      parentPhone: s.parentPhone || '',
      currentPoints: s.currentPoints || 0,
      status: s.status || 'AKTIF',
      academicYear: s.academicYear || '2025/2026'
    });
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFormData.name.trim() || !studentFormData.nisn.trim()) {
      alert('Nama Siswa dan NISN wajib diisi!');
      return;
    }

    const selectedCls = classes.find((c) => c.id === studentFormData.classId);
    const className = selectedCls ? selectedCls.name : 'IX-A';

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        name: studentFormData.name.trim(),
        nis: studentFormData.nis.trim(),
        nisn: studentFormData.nisn.trim(),
        gender: studentFormData.gender,
        classId: studentFormData.classId,
        className,
        birthPlace: studentFormData.birthPlace.trim(),
        birthDate: studentFormData.birthDate,
        religion: studentFormData.religion,
        address: studentFormData.address.trim(),
        parentName: studentFormData.parentName.trim(),
        parentPhone: studentFormData.parentPhone.trim(),
        currentPoints: Number(studentFormData.currentPoints) || 0,
        status: studentFormData.status,
        academicYear: studentFormData.academicYear
      });
      showToast(`Data santri ${studentFormData.name} berhasil diperbarui!`);
    } else {
      addStudent({
        name: studentFormData.name.trim(),
        nis: studentFormData.nis.trim(),
        nisn: studentFormData.nisn.trim(),
        gender: studentFormData.gender,
        classId: studentFormData.classId,
        className,
        birthPlace: studentFormData.birthPlace.trim(),
        birthDate: studentFormData.birthDate,
        religion: studentFormData.religion,
        address: studentFormData.address.trim(),
        parentName: studentFormData.parentName.trim(),
        parentPhone: studentFormData.parentPhone.trim(),
        currentPoints: Number(studentFormData.currentPoints) || 0,
        status: studentFormData.status,
        academicYear: studentFormData.academicYear
      });
      showToast(`Santri baru ${studentFormData.name} berhasil ditambahkan!`);
    }
    setIsStudentModalOpen(false);
  };

  const handleDeleteStudent = (s: Student) => {
    if (window.confirm(`Hapus data santri ${s.name} (NISN: ${s.nisn})?`)) {
      deleteStudent(s.id);
      showToast(`Data santri ${s.name} telah dihapus.`);
    }
  };

  const filteredStudents = students.filter((s) => {
    const q = studentSearch.toLowerCase();
    const matchQ =
      s.name.toLowerCase().includes(q) ||
      s.nisn.includes(q) ||
      s.nis.includes(q) ||
      (s.address && s.address.toLowerCase().includes(q)) ||
      (s.parentName && s.parentName.toLowerCase().includes(q));
    const matchClass = studentClassFilter === 'ALL' || s.classId === studentClassFilter || s.className === studentClassFilter;
    const matchStatus = studentStatusFilter === 'ALL' || s.status === studentStatusFilter;
    return matchQ && matchClass && matchStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-4 py-3 bg-teal-950 text-white text-xs font-semibold rounded-2xl shadow-2xl border border-teal-500/40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner & Title */}
      <div className="bg-gradient-to-r from-[#0d3b36] via-[#164e47] to-[#1d5c54] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-950/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-xs font-bold mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Pusat Konfigurasi & Master Data</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              Setting & Master Data Terpadu
            </h1>
            <p className="text-teal-100/80 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Kelola seluruh basis data institusi terpusat: manajemen akun & hak akses multi-role, direktori dewan guru & PTK, rombongan belajar kelas, dan biodata santri/siswa.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-mono text-xs font-semibold border border-white/10">
              {users.length} Akun Terdaftar
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold border border-emerald-400/20">
              {students.length} Santri
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold border border-amber-400/20">
              {teachers.length} Guru
            </span>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-white/10">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'accounts'
                ? 'bg-white text-teal-950 shadow-md shadow-black/10 scale-105'
                : 'bg-white/10 text-teal-100 hover:bg-white/20 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Manage Account ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'teachers'
                ? 'bg-white text-teal-950 shadow-md shadow-black/10 scale-105'
                : 'bg-white/10 text-teal-100 hover:bg-white/20 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Data Guru ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('classes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'classes'
                ? 'bg-white text-teal-950 shadow-md shadow-black/10 scale-105'
                : 'bg-white/10 text-teal-100 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Data Kelas ({classes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-white text-teal-950 shadow-md shadow-black/10 scale-105'
                : 'bg-white/10 text-teal-100 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>Data Siswa ({students.length})</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: MANAGE ACCOUNT                                                 */}
      {/* ===================================================================== */}
      {activeTab === 'accounts' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Role Filter, Add Account Button */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-1 flex-col sm:flex-row items-center gap-2.5 w-full">
              
              {/* Search Box */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama akun, username, email, NIP..."
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Role Filter Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
                <select
                  value={accountRoleFilter}
                  onChange={(e) => setAccountRoleFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                >
                  <option value="ALL">Semua Peran (Role)</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ADMIN">Admin CMS</option>
                  <option value="KEPALA_SEKOLAH">Kepala Sekolah</option>
                  <option value="TU">Tata Usaha (TU)</option>
                  <option value="GURU">Guru Mapel</option>
                  <option value="WALI_KELAS">Wali Kelas</option>
                  <option value="SISWA">Siswa / Santri</option>
                  <option value="ORANG_TUA">Orang Tua / Wali</option>
                </select>
              </div>
            </div>

            {/* Add Account Button */}
            <button
              onClick={handleOpenAddAccount}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-teal-900/20 transition-all cursor-pointer shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Akun Baru</span>
            </button>
          </div>

          {/* Account Table List */}
          <div className="bg-white rounded-2xl border border-teal-100 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-[#f8faf9] border-b border-teal-100 text-teal-950 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Pengguna & Akun</th>
                    <th className="px-4 py-3.5">Username & Email</th>
                    <th className="px-4 py-3.5">Hak Akses (Roles)</th>
                    <th className="px-4 py-3.5">Kontak / Pengenal</th>
                    <th className="px-4 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => {
                    const isSelf = user?.id === u.id;
                    return (
                      <tr key={u.id} className="hover:bg-teal-50/40 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                u.avatarUrl ||
                                u.avatar ||
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                              }
                              alt={u.name}
                              className="w-9 h-9 rounded-full object-cover border border-teal-200 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="font-extrabold text-teal-950 text-xs">{u.name}</p>
                                {isSelf && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-teal-100 text-teal-800">
                                    Saya
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 font-mono">ID: {u.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-mono font-bold text-slate-800 text-[11px]">@{u.username}</p>
                          <p className="text-slate-500 text-[11px] truncate max-w-[180px]">{u.email}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {u.roles.map((r) => {
                              const matchRole = availableRolesList.find((ar) => ar.role === r);
                              return (
                                <span
                                  key={r}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                    matchRole?.color || 'bg-slate-100 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  {matchRole?.label || r}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="space-y-0.5 text-[11px]">
                            {u.phone && <p className="text-slate-600 font-mono">📞 {u.phone}</p>}
                            {u.nip && <p className="text-slate-600 font-mono">NIP: {u.nip}</p>}
                            {u.nisn && <p className="text-slate-600 font-mono">NISN: {u.nisn}</p>}
                            {u.assignedClassName && (
                              <p className="text-teal-700 font-bold">Rombel: {u.assignedClassName}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditAccount(u)}
                              className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-50 border border-teal-200 transition-colors cursor-pointer"
                              title="Edit Akun & Hak Akses"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(u)}
                              disabled={isSelf}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isSelf
                                  ? 'text-slate-300 border-slate-100 cursor-not-allowed'
                                  : 'text-rose-600 hover:bg-rose-50 border-rose-200 cursor-pointer'
                              }`}
                              title="Hapus Akun"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <p className="font-bold text-slate-600">Tidak ada data akun yang sesuai filter.</p>
                        <p className="text-xs mt-0.5">Silakan sesuaikan kata kunci pencarian atau peran.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: DATA GURU & PEGAWAI                                            */}
      {/* ===================================================================== */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search & Add Teacher */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari dewan guru, NIP, mapel diampu..."
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <button
              onClick={handleOpenAddTeacher}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-teal-900/20 transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Guru Baru</span>
            </button>
          </div>

          {/* Teacher Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-teal-100/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-md hover:border-teal-300 transition-all group"
              >
                <div>
                  {/* Top Header Card */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={
                        t.avatarUrl ||
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={t.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-teal-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-extrabold text-xs text-teal-950 truncate group-hover:text-teal-700 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">NIP: {t.nip}</p>
                      <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {t.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                        {t.isHomeroom && (
                          <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Wali Kelas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subjects & Contact Details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-[11px]">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Mata Pelajaran Diampu:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {t.subjects && t.subjects.length > 0 ? (
                          t.subjects.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]"
                            >
                              {sub}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic">Belum ada mapel</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-1 text-slate-600 space-y-0.5">
                      <p className="truncate flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{t.email || '-'}</span>
                      </p>
                      <p className="truncate flex items-center gap-1.5 font-mono">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{t.phone || '-'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleOpenEditTeacher(t)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-teal-700 bg-teal-50 hover:bg-teal-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Guru</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(t)}
                    className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-100 transition-colors cursor-pointer"
                    title="Hapus Data Guru"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: DATA KELAS / ROMBEL                                            */}
      {/* ===================================================================== */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search & Add Class */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama rombel kelas, wali kelas..."
                value={classSearch}
                onChange={(e) => setClassSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <button
              onClick={handleOpenAddClass}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-teal-900/20 transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Kelas Baru</span>
            </button>
          </div>

          {/* Class Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((cls) => {
              const studentsInClass = students.filter((s) => s.classId === cls.id || s.className === cls.name);
              return (
                <div
                  key={cls.id}
                  className="bg-white rounded-2xl border border-teal-100 shadow-2xs p-5 flex flex-col justify-between hover:shadow-md hover:border-teal-300 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black font-heading text-sm">
                          {cls.name}
                        </div>
                        <div>
                          <h3 className="font-heading font-extrabold text-sm text-teal-950">
                            Kelas {cls.name}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-semibold">Tingkat {cls.gradeLevel} (SMP)</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        TA {cls.academicYear}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold text-[11px]">Wali Kelas:</span>
                        <span className="font-bold text-teal-950 text-right truncate max-w-[170px]">
                          {cls.homeroomTeacherName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold text-[11px]">Jumlah Siswa:</span>
                        <span className="font-mono font-bold text-slate-700">
                          {studentsInClass.length} Santri (Kapasitas: {cls.totalStudents})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEditClass(cls)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-teal-700 bg-teal-50 hover:bg-teal-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Rombel</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClass(cls)}
                      className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-100 transition-colors cursor-pointer"
                      title="Hapus Kelas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: DATA SISWA & SANTRI                                            */}
      {/* ===================================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Class Filter, Status Filter, Add Student */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-1 flex-col sm:flex-row items-center gap-2.5 w-full">
              <div className="relative w-full sm:max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari santri, NISN, NIS, wali..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Class Filter */}
              <select
                value={studentClassFilter}
                onChange={(e) => setStudentClassFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
              >
                <option value="ALL">Semua Kelas ({students.length})</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    Kelas {c.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={studentStatusFilter}
                onChange={(e) => setStudentStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
              >
                <option value="ALL">Semua Status</option>
                <option value="AKTIF">Status: AKTIF</option>
                <option value="LULUS">Status: LULUS</option>
                <option value="MUTASI">Status: MUTASI</option>
                <option value="KELUAR">Status: KELUAR</option>
              </select>
            </div>

            <button
              onClick={handleOpenAddStudent}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-teal-900/20 transition-all cursor-pointer shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Santri Baru</span>
            </button>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-2xl border border-teal-100 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-[#f8faf9] border-b border-teal-100 text-teal-950 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Santri / Peserta Didik</th>
                    <th className="px-4 py-3.5">NIS & NISN</th>
                    <th className="px-4 py-3.5">Kelas / Rombel</th>
                    <th className="px-4 py-3.5">Orang Tua & Alamat</th>
                    <th className="px-4 py-3.5">Poin Karakter</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-teal-50/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs shrink-0">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-extrabold text-teal-950 text-xs">{s.name}</p>
                            <p className="text-[11px] text-slate-400">
                              {s.gender === 'L' ? 'Laki-laki' : 'Perempuan'} • {s.birthPlace}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px]">
                        <p className="font-bold text-slate-800">NISN: {s.nisn}</p>
                        <p className="text-slate-500">NIS: {s.nis}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-100 text-teal-900">
                          {s.className}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[11px]">
                        <p className="font-bold text-slate-800">{s.parentName || '-'}</p>
                        <p className="text-slate-500 truncate max-w-[200px]">{s.address || '-'}</p>
                        {s.parentPhone && <p className="text-teal-700 font-mono">📞 {s.parentPhone}</p>}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-extrabold font-mono ${
                            s.currentPoints >= 50
                              ? 'bg-emerald-100 text-emerald-800'
                              : s.currentPoints >= 0
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {s.currentPoints > 0 ? `+${s.currentPoints}` : s.currentPoints} Poin
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            s.status === 'AKTIF'
                              ? 'bg-emerald-100 text-emerald-800'
                              : s.status === 'LULUS'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditStudent(s)}
                            className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-50 border border-teal-200 transition-colors cursor-pointer"
                            title="Edit Data Santri"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(s)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                            title="Hapus Data Santri"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <p className="font-bold text-slate-600">Tidak ada santri yang cocok.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: TAMBAH / EDIT AKUN PENGGUNA & HAK AKSES                      */}
      {/* ===================================================================== */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-teal-100 shadow-2xl w-full max-w-2xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-[#164e47] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-extrabold text-sm">
                  {editingUser ? 'Edit Akun & Hak Akses Pengguna' : 'Tambah Akun Pengguna Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAccount} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={accountFormData.name}
                    onChange={(e) => setAccountFormData({ ...accountFormData, name: e.target.value })}
                    placeholder="Contoh: Ahmad Zainuddin, S.Pd.I"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Username Login *</label>
                  <input
                    type="text"
                    required
                    value={accountFormData.username}
                    onChange={(e) => setAccountFormData({ ...accountFormData, username: e.target.value })}
                    placeholder="Contoh: guru.zain"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Resmi Sekolah *</label>
                  <input
                    type="email"
                    required
                    value={accountFormData.email}
                    onChange={(e) => setAccountFormData({ ...accountFormData, email: e.target.value })}
                    placeholder="nama@smpislamalhikmahmayong.sch.id"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nomor WhatsApp / HP</label>
                  <input
                    type="text"
                    value={accountFormData.phone}
                    onChange={(e) => setAccountFormData({ ...accountFormData, phone: e.target.value })}
                    placeholder="081234567890"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">NIP Guru (Opsional)</label>
                  <input
                    type="text"
                    value={accountFormData.nip}
                    onChange={(e) => setAccountFormData({ ...accountFormData, nip: e.target.value })}
                    placeholder="19860311 201101 1 012"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">NISN Siswa (Jika Siswa/Ortu)</label>
                  <input
                    type="text"
                    value={accountFormData.nisn}
                    onChange={(e) => setAccountFormData({ ...accountFormData, nisn: e.target.value })}
                    placeholder="0098123456"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Multi-Role Access Selector */}
              <div className="pt-2">
                <label className="block text-slate-700 font-bold mb-1.5">
                  Pilih Hak Akses & Peran (Multi-Role Allowed):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 max-h-48 overflow-y-auto">
                  {availableRolesList.map((item) => {
                    const isChecked = accountFormData.roles.includes(item.role);
                    return (
                      <div
                        key={item.role}
                        onClick={() => toggleRoleSelection(item.role)}
                        className={`flex items-start gap-2.5 p-2 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-950'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-xs">{item.label}</p>
                          <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Role Selector */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Peran Utama Saat Login Pertama:</label>
                <select
                  value={accountFormData.activeRole}
                  onChange={(e) => setAccountFormData({ ...accountFormData, activeRole: e.target.value as RoleType })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                >
                  {accountFormData.roles.map((r) => {
                    const match = availableRolesList.find((ar) => ar.role === r);
                    return (
                      <option key={r} value={r}>
                        {match?.label || r}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAccountModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm shadow-teal-900/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Akun Pengguna</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: TAMBAH / EDIT DATA GURU                                      */}
      {/* ===================================================================== */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-teal-100 shadow-2xl w-full max-w-xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-[#164e47] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-extrabold text-sm">
                  {editingTeacher ? 'Edit Data Dewan Guru' : 'Tambah Guru Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsTeacherModalOpen(false)}
                className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={teacherFormData.name}
                  onChange={(e) => setTeacherFormData({ ...teacherFormData, name: e.target.value })}
                  placeholder="Contoh: Fatimatuz Zahra, S.Si."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">NIP / NUPTK *</label>
                  <input
                    type="text"
                    required
                    value={teacherFormData.nip}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, nip: e.target.value })}
                    placeholder="19890520 201401 2 008"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Jenis Kelamin</label>
                  <select
                    value={teacherFormData.gender}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, gender: e.target.value as 'L' | 'P' })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">No. WhatsApp / HP</label>
                  <input
                    type="text"
                    value={teacherFormData.phone}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, phone: e.target.value })}
                    placeholder="081228334455"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={teacherFormData.email}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, email: e.target.value })}
                    placeholder="guru@smpislamalhikmahmayong.sch.id"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Mata Pelajaran yang Diampu (Pisahkan Koma)</label>
                <input
                  type="text"
                  value={teacherFormData.subjectsStr}
                  onChange={(e) => setTeacherFormData({ ...teacherFormData, subjectsStr: e.target.value })}
                  placeholder="Contoh: Matematika, Informatika"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Homeroom Assignment */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={teacherFormData.isHomeroom}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, isHomeroom: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span>Ditugaskan Sebagai Wali Kelas</span>
                </label>

                {teacherFormData.isHomeroom && (
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Pilih Kelas yang Diampu:</label>
                    <select
                      value={teacherFormData.homeroomClassId}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, homeroomClassId: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                    >
                      <option value="">-- Pilih Rombel --</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          Kelas {c.name} (Tingkat {c.gradeLevel})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTeacherModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm shadow-teal-900/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data Guru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: TAMBAH / EDIT DATA KELAS                                     */}
      {/* ===================================================================== */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-teal-100 shadow-2xl w-full max-w-md overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-[#164e47] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-extrabold text-sm">
                  {editingClass ? 'Edit Rombongan Belajar Kelas' : 'Tambah Kelas Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsClassModalOpen(false)}
                className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Rombel Kelas *</label>
                <input
                  type="text"
                  required
                  value={classFormData.name}
                  onChange={(e) => setClassFormData({ ...classFormData, name: e.target.value })}
                  placeholder="Contoh: IX-A, VII-B"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tingkat / Grade</label>
                  <select
                    value={classFormData.gradeLevel}
                    onChange={(e) => setClassFormData({ ...classFormData, gradeLevel: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  >
                    <option value={7}>Kelas 7 (VII)</option>
                    <option value={8}>Kelas 8 (VIII)</option>
                    <option value={9}>Kelas 9 (IX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kapasitas Kuota</label>
                  <input
                    type="number"
                    value={classFormData.totalStudents}
                    onChange={(e) => setClassFormData({ ...classFormData, totalStudents: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Wali Kelas Pengampu</label>
                <select
                  value={classFormData.homeroomTeacherId}
                  onChange={(e) => setClassFormData({ ...classFormData, homeroomTeacherId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                >
                  <option value="">-- Pilih Guru Pengampu --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (NIP: {t.nip})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Tahun Ajaran</label>
                <input
                  type="text"
                  value={classFormData.academicYear}
                  onChange={(e) => setClassFormData({ ...classFormData, academicYear: e.target.value })}
                  placeholder="2025/2026"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm shadow-teal-900/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Kelas</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: TAMBAH / EDIT DATA SISWA                                     */}
      {/* ===================================================================== */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-teal-100 shadow-2xl w-full max-w-2xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-[#164e47] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-extrabold text-sm">
                  {editingStudent ? 'Edit Biodata Santri / Siswa' : 'Tambah Santri Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsStudentModalOpen(false)}
                className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Santri *</label>
                  <input
                    type="text"
                    required
                    value={studentFormData.name}
                    onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
                    placeholder="Contoh: Muhammad Zidan Al-Fatih"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">NISN *</label>
                  <input
                    type="text"
                    required
                    value={studentFormData.nisn}
                    onChange={(e) => setStudentFormData({ ...studentFormData, nisn: e.target.value })}
                    placeholder="0098123456"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nomor Induk Siswa (NIS)</label>
                  <input
                    type="text"
                    value={studentFormData.nis}
                    onChange={(e) => setStudentFormData({ ...studentFormData, nis: e.target.value })}
                    placeholder="232407001"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Jenis Kelamin</label>
                  <select
                    value={studentFormData.gender}
                    onChange={(e) => setStudentFormData({ ...studentFormData, gender: e.target.value as 'L' | 'P' })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Rombel Kelas</label>
                  <select
                    value={studentFormData.classId}
                    onChange={(e) => setStudentFormData({ ...studentFormData, classId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        Kelas {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status Keaktifan</label>
                  <select
                    value={studentFormData.status}
                    onChange={(e) =>
                      setStudentFormData({
                        ...studentFormData,
                        status: e.target.value as 'AKTIF' | 'LULUS' | 'MUTASI' | 'KELUAR'
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="AKTIF">AKTIF</option>
                    <option value="LULUS">LULUS</option>
                    <option value="MUTASI">MUTASI</option>
                    <option value="KELUAR">KELUAR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={studentFormData.birthPlace}
                    onChange={(e) => setStudentFormData({ ...studentFormData, birthPlace: e.target.value })}
                    placeholder="Jepara"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={studentFormData.birthDate}
                    onChange={(e) => setStudentFormData({ ...studentFormData, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    value={studentFormData.parentName}
                    onChange={(e) => setStudentFormData({ ...studentFormData, parentName: e.target.value })}
                    placeholder="H. Abdullah Salim"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">No. WhatsApp Orang Tua</label>
                  <input
                    type="text"
                    value={studentFormData.parentPhone}
                    onChange={(e) => setStudentFormData({ ...studentFormData, parentPhone: e.target.value })}
                    placeholder="081228990011"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alamat Tempat Tinggal</label>
                <textarea
                  rows={2}
                  value={studentFormData.address}
                  onChange={(e) => setStudentFormData({ ...studentFormData, address: e.target.value })}
                  placeholder="Jl. Pancur RT 02/RW 01, Pelemkerep, Mayong, Jepara"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm shadow-teal-900/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data Santri</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
