import {
  SystemService,
  User,
  Student,
  Teacher,
  ClassRoom,
  Subject,
  AcademicYear,
  VerificationRecord,
  Letter,
  GraduationRecord,
  TeachingSchedule,
  TeachingJournal,
  StudentGrade,
  DailyAttendance,
  ParentNotification,
  PointCategory,
  PointTransaction,
  PPDBApplicant,
  PPDBSetting,
  NewsItem,
  EventItem,
  ActivityItem,
  AchievementItem,
  GalleryItem,
  AnnouncementItem,
  NavItem,
  HeroSlide,
  WebsiteSettings,
  AuditLogEntry
} from '../types';

// ==========================================
// 1. DYNAMIC SYSTEM SERVICES (System Navigator)
// ==========================================
export const initialSystemServices: SystemService[] = [
  {
    id: 'srv-1',
    name: 'E-Surat & ETTD',
    slug: 'e-surat',
    description: 'Tata kelola persuratan digital, disposisi, dan ETTD tanda tangan digital resmi Kepala Sekolah.',
    icon: 'Mail',
    type: 'INTERNAL',
    url: '/portal/e-surat',
    authRequired: true,
    target: '_self',
    sortOrder: 1,
    isActive: true,
    badge: 'Core',
    category: 'administration',
    externalProvider: 'NONE'
  },
  {
    id: 'srv-2',
    name: 'E-Jurnal Mengajar',
    slug: 'e-jurnal',
    description: 'Jurnal pembelajaran guru SMP, presensi mata pelajaran, materi ajar, dan rekap capaian kurikulum.',
    icon: 'BookOpen',
    type: 'INTERNAL',
    url: '/portal/e-jurnal',
    authRequired: true,
    target: '_self',
    sortOrder: 2,
    isActive: true,
    badge: 'Akademik',
    category: 'academic',
    externalProvider: 'NONE'
  },
  {
    id: 'srv-3',
    name: 'E-Presensi Live QR',
    slug: 'e-presensi',
    description: 'Presensi harian siswa & guru dengan QR dinamis anti-titip absen dan notifikasi WhatsApp orang tua.',
    icon: 'UserCheck',
    type: 'INTERNAL',
    url: '/portal/e-presensi',
    authRequired: true,
    target: '_self',
    sortOrder: 3,
    isActive: true,
    badge: 'Live QR',
    category: 'student',
    externalProvider: 'NONE'
  },
  {
    id: 'srv-4',
    name: 'E-Poin Karakter',
    slug: 'e-poin',
    description: 'Sistem pembinaan karakter islami siswa: akumulasi prestasi tahfidz, ibadah, dan catatan kedisiplinan.',
    icon: 'Award',
    type: 'INTERNAL',
    url: '/portal/e-poin',
    authRequired: true,
    target: '_self',
    sortOrder: 4,
    isActive: true,
    badge: 'Karakter',
    category: 'student',
    externalProvider: 'NONE'
  },
  {
    id: 'srv-5',
    name: 'E-Kelulusan & SKL',
    slug: 'e-kelulusan',
    description: 'Pengumuman kelulusan kelas IX dan penerbitan Surat Keterangan Lulus (SKL) ber-QR verifikasi publik.',
    icon: 'GraduationCap',
    type: 'INTERNAL',
    url: '/portal/e-kelulusan',
    authRequired: true,
    target: '_self',
    sortOrder: 5,
    isActive: true,
    badge: 'Kelulusan',
    category: 'academic',
    externalProvider: 'NONE'
  },
  {
    id: 'srv-6',
    name: 'E-Infaq & SPP',
    slug: 'e-spp-infaq',
    description: 'Aplikasi pembukuan infaq bulanan dan administrasi komite sekolah berbasis Google Sheets & Apps Script.',
    icon: 'Coins',
    type: 'EXTERNAL',
    url: 'https://script.google.com/macros/s/AKfycbz_smp_alhikmah_spp_demo/exec',
    authRequired: true,
    target: '_blank',
    openMode: 'MODAL',
    sortOrder: 6,
    isActive: true,
    badge: 'GAS App',
    category: 'finance',
    externalProvider: 'GAS'
  },
  {
    id: 'srv-7',
    name: 'E-Tahfidz Tracker',
    slug: 'e-tahfidz',
    description: 'Sistem monitoring setoran hafalan Al-Qur\'an dan juz amma santri/siswa Al-Hikmah terintegrasi Spreadsheet.',
    icon: 'BookMarked',
    type: 'EXTERNAL',
    url: 'https://script.google.com/macros/s/AKfycbx_smp_alhikmah_tahfidz_demo/exec',
    authRequired: true,
    target: '_blank',
    openMode: 'MODAL',
    sortOrder: 7,
    isActive: true,
    badge: 'Tahfidz GAS',
    category: 'academic',
    externalProvider: 'GAS'
  },
  {
    id: 'srv-8',
    name: 'E-Perpus Mayong',
    slug: 'e-perpus',
    description: 'Katalog buku perpustakaan digital, peminjaman kitab kuning, dan literasi siswa.',
    icon: 'Library',
    type: 'EXTERNAL',
    url: 'https://script.google.com/macros/s/AKfycbw_smp_alhikmah_perpus_demo/exec',
    authRequired: false,
    target: '_blank',
    openMode: 'MODAL',
    sortOrder: 8,
    isActive: true,
    badge: 'Perpustakaan',
    category: 'academic',
    externalProvider: 'GAS'
  }
];

// ==========================================
// 2. MASTER USERS (Auth & Role Management)
// ==========================================
export const initialUsers: User[] = [
  {
    id: 'usr-1',
    username: 'admin',
    name: 'Muhammad Luthfi, S.Pd., Gr',
    email: 'muhLuthfi.23@gmail.com',
    roles: ['SUPER_ADMIN', 'ADMIN'],
    activeRole: 'SUPER_ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '081225678910'
  },
  {
    id: 'usr-2',
    username: 'kepsek',
    name: "M.Syafi'i, S.Th.I",
    email: 'syafii.kepsek@smpislamalhikmahmayong.sch.id',
    nip: '19790412 200501 1 003',
    roles: ['KEPALA_SEKOLAH'],
    activeRole: 'KEPALA_SEKOLAH',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '081326549870'
  },
  {
    id: 'usr-3',
    username: 'tu.admin',
    name: 'Siti Nurhaliza, S.Kom.',
    email: 'tatausaha@smpislamalhikmahmayong.sch.id',
    nip: '19920815 201701 2 006',
    roles: ['TU'],
    activeRole: 'TU',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '085740112233'
  },
  {
    id: 'usr-4',
    username: 'guru.zain',
    name: 'Ahmad Zainuddin, S.Pd.I',
    email: 'zainuddin@smpislamalhikmahmayong.sch.id',
    nip: '19860311 201101 1 012',
    roles: ['GURU', 'WALI_KELAS'],
    activeRole: 'GURU',
    assignedClassId: 'cls-1',
    assignedClassName: 'IX-A',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '085290112244'
  },
  {
    id: 'usr-5',
    username: 'siswa.zidan',
    name: 'Muhammad Zidan Al-Fatih',
    email: 'zidan@smpislamalhikmahmayong.sch.id',
    nisn: '0098123456',
    nis: '232407001',
    assignedClassId: 'cls-1',
    assignedClassName: 'IX-A',
    roles: ['SISWA'],
    activeRole: 'SISWA',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    phone: '088215443322'
  },
  {
    id: 'usr-6',
    username: 'wali.zidan',
    name: 'H. Abdullah Salim',
    email: 'abdullah.salim@gmail.com',
    roles: ['ORANG_TUA'],
    activeRole: 'ORANG_TUA',
    childrenStudentIds: ['std-1'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '081228990011'
  }
];

// ==========================================
// 3. MASTER DATA (Academic, Classes, Subjects)
// ==========================================
export const initialAcademicYears: AcademicYear[] = [
  {
    id: 'ay-2025-2',
    year: '2025/2026',
    semester: 'Genap',
    isActive: true,
    startDate: '2026-01-05',
    endDate: '2026-06-25'
  },
  {
    id: 'ay-2025-1',
    year: '2025/2026',
    semester: 'Ganjil',
    isActive: false,
    startDate: '2025-07-14',
    endDate: '2025-12-20'
  }
];

export const initialClasses: ClassRoom[] = [
  {
    id: 'cls-1',
    name: 'IX-A',
    gradeLevel: 9,
    homeroomTeacherId: 'usr-4',
    homeroomTeacherName: 'Ahmad Zainuddin, S.Pd.I',
    academicYear: '2025/2026',
    totalStudents: 32
  },
  {
    id: 'cls-2',
    name: 'IX-B',
    gradeLevel: 9,
    homeroomTeacherId: 'tch-2',
    homeroomTeacherName: 'Nurul Hidayah, S.Pd.',
    academicYear: '2025/2026',
    totalStudents: 30
  },
  {
    id: 'cls-3',
    name: 'VIII-A',
    gradeLevel: 8,
    homeroomTeacherId: 'tch-3',
    homeroomTeacherName: 'Drs. H. Mulyono, M.Pd.I',
    academicYear: '2025/2026',
    totalStudents: 34
  },
  {
    id: 'cls-4',
    name: 'VIII-B',
    gradeLevel: 8,
    homeroomTeacherId: 'tch-4',
    homeroomTeacherName: 'Fatimatuz Zahra, S.Si.',
    academicYear: '2025/2026',
    totalStudents: 32
  },
  {
    id: 'cls-5',
    name: 'VII-A',
    gradeLevel: 7,
    homeroomTeacherId: 'tch-5',
    homeroomTeacherName: 'Mohammad Rofi\'i, S.Kom.',
    academicYear: '2025/2026',
    totalStudents: 36
  },
  {
    id: 'cls-6',
    name: 'VII-B',
    gradeLevel: 7,
    homeroomTeacherId: 'tch-6',
    homeroomTeacherName: 'Siti Aminah, S.Pd.',
    academicYear: '2025/2026',
    totalStudents: 35
  }
];

export const initialSubjects: Subject[] = [
  { id: 'sbj-1', code: 'PAI-SMP', name: 'Pendidikan Agama Islam & Budi Pekerti', category: 'Wajib', kkm: 78 },
  { id: 'sbj-2', code: 'TFZ-SMP', name: 'Tahfidz Al-Qur\'an & Tajwid', category: 'Muatan Lokal', kkm: 80 },
  { id: 'sbj-3', code: 'BIN-SMP', name: 'Bahasa Indonesia', category: 'Wajib', kkm: 75 },
  { id: 'sbj-4', code: 'MAT-SMP', name: 'Matematika', category: 'Wajib', kkm: 72 },
  { id: 'sbj-5', code: 'IPA-SMP', name: 'Ilmu Pengetahuan Alam (IPA Terpadu)', category: 'Wajib', kkm: 75 },
  { id: 'sbj-6', code: 'IPS-SMP', name: 'Ilmu Pengetahuan Sosial (IPS Terpadu)', category: 'Wajib', kkm: 75 },
  { id: 'sbj-7', code: 'BIG-SMP', name: 'Bahasa Inggris', category: 'Wajib', kkm: 73 },
  { id: 'sbj-8', code: 'INF-SMP', name: 'Informatika & Literasi Digital', category: 'Wajib', kkm: 75 },
  { id: 'sbj-9', code: 'BJW-SMP', name: 'Bahasa Jawa', category: 'Muatan Lokal', kkm: 75 }
];

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    nis: '232407001',
    nisn: '0098123456',
    name: 'Muhammad Zidan Al-Fatih',
    gender: 'L',
    classId: 'cls-1',
    className: 'IX-A',
    birthPlace: 'Jepara',
    birthDate: '2011-04-15',
    religion: 'Islam',
    address: 'Jl. Pancur RT 02/RW 01, Pelemkerep, Mayong, Jepara',
    parentName: 'H. Abdullah Salim',
    parentPhone: '081228990011',
    currentPoints: 45,
    status: 'AKTIF',
    academicYear: '2025/2026'
  },
  {
    id: 'std-2',
    nis: '232407002',
    nisn: '0098123457',
    name: 'Aisyah Putri Azzahra',
    gender: 'P',
    classId: 'cls-1',
    className: 'IX-A',
    birthPlace: 'Jepara',
    birthDate: '2011-02-20',
    religion: 'Islam',
    address: 'Desa Mayong Lor RT 03/RW 02, Mayong, Jepara',
    parentName: 'Ahmad Muzammil',
    parentPhone: '081390887766',
    currentPoints: 60,
    status: 'AKTIF',
    academicYear: '2025/2026'
  },
  {
    id: 'std-3',
    nis: '232407003',
    nisn: '0098123458',
    name: 'Bilal Ahmad Maulana',
    gender: 'L',
    classId: 'cls-1',
    className: 'IX-A',
    birthPlace: 'Kudus',
    birthDate: '2011-11-12',
    religion: 'Islam',
    address: 'Jl. Raya Mayong-Pancur KM 2, Pelemkerep',
    parentName: 'H. Maulana Ishaq',
    parentPhone: '081233445588',
    currentPoints: 30,
    status: 'AKTIF',
    academicYear: '2025/2026'
  },
  {
    id: 'std-4',
    nis: '232407004',
    nisn: '0098123459',
    name: 'Nayla Salma Ramadhani',
    gender: 'P',
    classId: 'cls-1',
    className: 'IX-A',
    birthPlace: 'Jepara',
    birthDate: '2011-08-09',
    religion: 'Islam',
    address: 'Desa Kuanyar RT 01/RW 04, Mayong, Jepara',
    parentName: 'Suryo Ramadhan',
    parentPhone: '085299887744',
    currentPoints: 40,
    status: 'AKTIF',
    academicYear: '2025/2026'
  },
  {
    id: 'std-5',
    nis: '232407005',
    nisn: '0098123460',
    name: 'Faris Farhan Robbani',
    gender: 'L',
    classId: 'cls-1',
    className: 'IX-A',
    birthPlace: 'Jepara',
    birthDate: '2011-05-30',
    religion: 'Islam',
    address: 'Desa Buaran RT 04/RW 01, Mayong, Jepara',
    parentName: 'Farid Hidayat',
    parentPhone: '081901234567',
    currentPoints: -5,
    status: 'AKTIF',
    academicYear: '2025/2026'
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 'usr-4',
    nip: '19860311 201101 1 012',
    name: 'Ahmad Zainuddin, S.Pd.I',
    gender: 'L',
    phone: '085290112244',
    email: 'zainuddin@smpislamalhikmahmayong.sch.id',
    subjects: ['Pendidikan Agama Islam & Budi Pekerti', 'Tahfidz Al-Qur\'an & Tajwid'],
    isHomeroom: true,
    homeroomClassId: 'cls-1',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tch-2',
    nip: '19890520 201401 2 008',
    name: 'Nurul Hidayah, S.Pd.',
    gender: 'P',
    phone: '081228334455',
    email: 'nurul.hidayah@smpislamalhikmahmayong.sch.id',
    subjects: ['Bahasa Indonesia'],
    isHomeroom: true,
    homeroomClassId: 'cls-2'
  },
  {
    id: 'tch-3',
    nip: '19750820 200003 1 004',
    name: 'Drs. H. Mulyono, M.Pd.I',
    gender: 'L',
    phone: '081377881122',
    email: 'mulyono@smpislamalhikmahmayong.sch.id',
    subjects: ['Ilmu Pengetahuan Alam (IPA Terpadu)'],
    isHomeroom: true,
    homeroomClassId: 'cls-3'
  },
  {
    id: 'tch-4',
    nip: '19901215 201601 2 015',
    name: 'Fatimatuz Zahra, S.Si.',
    gender: 'P',
    phone: '085712349900',
    email: 'fatima@smpislamalhikmahmayong.sch.id',
    subjects: ['Matematika'],
    isHomeroom: true,
    homeroomClassId: 'cls-4'
  },
  {
    id: 'tch-5',
    nip: '19910408 201901 1 009',
    name: 'Mohammad Rofi\'i, S.Kom.',
    gender: 'L',
    phone: '087834567890',
    email: 'rofii@smpislamalhikmahmayong.sch.id',
    subjects: ['Informatika & Literasi Digital'],
    isHomeroom: true,
    homeroomClassId: 'cls-5'
  }
];

// ==========================================
// 4. PUBLIC VERIFICATION RECORDS (ETTD Validated)
// ==========================================
export const initialVerificationRecords: VerificationRecord[] = [
  {
    id: 'ver-1',
    token: 'DOC-2026-SR-9481',
    documentNumber: '421.3/084/SMPI-AHM/II/2026',
    documentType: 'SURAT_REKOMENDASI',
    title: 'Surat Rekomendasi MTQ & Olimpiade Sains SMP Tingkat Kabupaten Jepara',
    recipientName: 'Muhammad Zidan Al-Fatih',
    recipientIdentifier: '0098123456',
    issuerOrg: 'SMP Islam Al Hikmah Mayong - Dinas Dikpora Kab. Jepara',
    issuedDate: '2026-02-10',
    signerName: "M.Syafi'i, S.Th.I",
    signerRole: 'Kepala Sekolah',
    signerNip: '19790412 200501 1 003',
    ettDigitalSignatureHash: 'e9b8f2c3a1d4e7f80123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'VALID',
    contentSummary: 'Rekomendasi resmi perwakilan sekolah dalam ajang Musabaqah Tilawatil Qur\'an (MTQ) dan Olimpiade Sains Jenjang SMP se-Kabupaten Jepara.',
    createdAt: '2026-02-10T08:30:00.000Z'
  },
  {
    id: 'ver-2',
    token: 'DOC-2026-SKL-1029',
    documentNumber: '421.3/SKL-042/SMPI-AHM/V/2026',
    documentType: 'SURAT_KETERANGAN_LULUS',
    title: 'Surat Keterangan Lulus (SKL) Resmi Tahun Ajaran 2025/2026',
    recipientName: 'Aisyah Putri Azzahra',
    recipientIdentifier: '0098123457',
    issuerOrg: 'SMP Islam Al Hikmah Mayong',
    issuedDate: '2026-05-08',
    signerName: "M.Syafi'i, S.Th.I",
    signerRole: 'Kepala Sekolah',
    signerNip: '19790412 200501 1 003',
    ettDigitalSignatureHash: '7a9c3e1b5f2d4809abcdef0123456789abcdef0123456789abcdef0123456789',
    status: 'VALID',
    contentSummary: 'Dinyatakan LULUS dari jenjang pendidikan Sekolah Menengah Pertama (SMP) dengan nilai rata-rata 93.40 dan predikat Sangat Memuaskan.',
    createdAt: '2026-05-08T10:00:00.000Z'
  },
  {
    id: 'ver-3',
    token: 'DOC-2026-SKA-3312',
    documentNumber: '421.3/SKA-112/SMPI-AHM/I/2026',
    documentType: 'SURAT_KETERANGAN_AKTIF',
    title: 'Surat Keterangan Siswa Aktif Belajar',
    recipientName: 'Bilal Ahmad Maulana',
    recipientIdentifier: '0098123458',
    issuerOrg: 'SMP Islam Al Hikmah Mayong',
    issuedDate: '2026-01-18',
    signerName: "M.Syafi'i, S.Th.I",
    signerRole: 'Kepala Sekolah',
    signerNip: '19790412 200501 1 003',
    ettDigitalSignatureHash: '3f8e1d2c7b9a0542abcdef0123456789abcdef0123456789abcdef0123456789',
    status: 'VALID',
    contentSummary: 'Menerangkan bahwa siswa terdaftar aktif pada kelas IX-A semester genap tahun pelajaran 2025/2026 di SMP Islam Al Hikmah Mayong.',
    createdAt: '2026-01-18T09:15:00.000Z'
  },
  {
    id: 'ver-4',
    token: 'DOC-2025-MUT-7712',
    documentNumber: '421.3/MUT-019/SMPI-AHM/XI/2025',
    documentType: 'SURAT_MUTASI',
    title: 'Surat Keterangan Pindah / Mutasi Siswa',
    recipientName: 'Rendra Bagaskara',
    recipientIdentifier: '0087182991',
    issuerOrg: 'SMP Islam Al Hikmah Mayong',
    issuedDate: '2025-11-04',
    signerName: "M.Syafi'i, S.Th.I",
    signerRole: 'Kepala Sekolah',
    signerNip: '19790412 200501 1 003',
    ettDigitalSignatureHash: '8b2d4f6a1e3c5097abcdef0123456789abcdef0123456789abcdef0123456789',
    status: 'REVOKED',
    revocationReason: 'Permohonan mutasi dibatalkan oleh pihak orang tua/wali siswa pada 15 November 2025 dan siswa tetap melanjutkan studi di SMP Islam Al Hikmah Mayong.',
    contentSummary: 'Dokumen pernah diterbitkan oleh sekolah tetapi sudah dicabut dan tidak berlaku lagi.',
    createdAt: '2025-11-04T11:00:00.000Z'
  }
];

// ==========================================
// 5. E-SURAT
// ==========================================
export const initialLetters: Letter[] = [
  {
    id: 'let-1',
    category: 'KELUAR',
    type: 'SURAT_REKOMENDASI',
    letterNumber: '421.3/084/SMPI-AHM/II/2026',
    title: 'Rekomendasi Peserta MTQ & Sains SMP Tingkat Kabupaten Jepara',
    regarding: 'Rekomendasi Peserta Lomba Tingkat Kabupaten Jepara',
    sender: 'SMP Islam Al Hikmah Mayong',
    recipient: 'Ketua Panitia MTQ & Olimpiade Sains Dinas Dikpora Jepara',
    date: '2026-02-10',
    status: 'SIGNED',
    verificationToken: 'DOC-2026-SR-9481',
    signedBy: "M.Syafi'i, S.Th.I",
    signedAt: '2026-02-10 09:30 WIB',
    signerNip: '19790412 200501 1 003',
    createdById: 'usr-3',
    createdByName: 'Siti Nurhaliza, S.Kom. (TU)',
    createdAt: '2026-02-09T10:00:00.000Z',
    updatedAt: '2026-02-10T09:30:00.000Z',
    contentHtml: `<p>Yang bertanda tangan di bawah ini Kepala SMP Islam Al Hikmah Mayong dengan ini memberikan rekomendasi kepada:</p>
<p><strong>Nama:</strong> Muhammad Zidan Al-Fatih<br/><strong>NISN:</strong> 0098123456<br/><strong>Kelas:</strong> IX-A</p>
<p>Untuk mengikuti seleksi Musabaqah Tilawatil Qur'an (MTQ) dan Olimpiade Sains Jenjang SMP Tingkat Kabupaten Jepara Tahun 2026. Demikian surat rekomendasi ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>`
  },
  {
    id: 'let-2',
    category: 'MASUK',
    type: 'SURAT_UNDANGAN',
    letterNumber: '005/DIKPORA-JPR/II/2026',
    title: 'Undangan Koordinasi Asesmen Nasional Jenjang SMP 2026',
    regarding: 'Rapat Koordinasi Persiapan ANBK Jenjang SMP se-Kabupaten Jepara',
    sender: 'Dinas Pendidikan Pemuda dan Olahraga Kabupaten Jepara',
    recipient: 'Kepala SMP Islam Al Hikmah Mayong',
    date: '2026-02-14',
    status: 'APPROVED',
    dispositionNotes: 'Mohon Waka Kurikulum dan Tim Proktor hadir mewakili sekolah pada hari Kamis.',
    dispositionTargetRole: 'GURU',
    createdById: 'usr-3',
    createdByName: 'Siti Nurhaliza, S.Kom. (TU)',
    createdAt: '2026-02-14T08:00:00.000Z',
    updatedAt: '2026-02-14T11:20:00.000Z'
  },
  {
    id: 'let-3',
    category: 'KELUAR',
    type: 'SURAT_KETERANGAN_AKTIF',
    letterNumber: '421.3/SKA-112/SMPI-AHM/I/2026',
    title: 'Surat Keterangan Aktif Belajar Siswa',
    regarding: 'Permohonan Beasiswa Santri & Prestasi',
    sender: 'SMP Islam Al Hikmah Mayong',
    recipient: 'Orang Tua / Wali Siswa',
    date: '2026-01-18',
    status: 'SIGNED',
    verificationToken: 'DOC-2026-SKA-3312',
    signedBy: "M.Syafi'i, S.Th.I",
    signedAt: '2026-01-18 10:15 WIB',
    signerNip: '19790412 200501 1 003',
    createdById: 'usr-3',
    createdByName: 'Siti Nurhaliza, S.Kom. (TU)',
    createdAt: '2026-01-18T08:30:00.000Z',
    updatedAt: '2026-01-18T10:15:00.000Z',
    contentHtml: `<p>Menerangkan dengan sebenarnya bahwa:</p>
<p><strong>Nama:</strong> Bilal Ahmad Maulana<br/><strong>NISN:</strong> 0098123458<br/><strong>Kelas:</strong> IX-A</p>
<p>Adalah benar siswa terdaftar aktif pada SMP Islam Al Hikmah Mayong pada Tahun Pelajaran 2025/2026 Semester Genap.</p>`
  },
  {
    id: 'let-4',
    category: 'KELUAR',
    type: 'SURAT_UNDANGAN',
    letterNumber: '421.3/UND-031/SMPI-AHM/II/2026',
    title: 'Undangan Rapat Pleno Komite & Wali Santri/Siswa Kelas IX',
    regarding: 'Sosialisasi Persiapan Ujian Sekolah dan Wisuda Tahfidz 2026',
    sender: 'SMP Islam Al Hikmah Mayong',
    recipient: 'Seluruh Orang Tua / Wali Siswa Kelas IX',
    date: '2026-02-22',
    status: 'REVIEW',
    createdById: 'usr-3',
    createdByName: 'Siti Nurhaliza, S.Kom. (TU)',
    createdAt: '2026-02-16T09:00:00.000Z',
    updatedAt: '2026-02-16T09:00:00.000Z',
    contentHtml: `<p>Mengharap kehadiran Bapak/Ibu Orang Tua/Wali Siswa Kelas IX pada pertemuan sosialisasi persiapan Asesmen Akhir Jenjang SMP dan Wisuda Tahfidz Al-Qur'an.</p>`
  }
];

// ==========================================
// 6. E-KELULUSAN (Jenjang SMP)
// ==========================================
export const initialGraduationRecords: GraduationRecord[] = [
  {
    id: 'grad-1',
    studentId: 'std-1',
    studentName: 'Muhammad Zidan Al-Fatih',
    nis: '232407001',
    nisn: '0098123456',
    className: 'IX-A',
    averageScore: 92.4,
    attendancePercentage: 98.5,
    pointsAccumulated: 45,
    prerequisitesMet: true,
    status: 'LULUS',
    sklDocumentNumber: '421.3/SKL-041/SMPI-AHM/V/2026',
    verificationToken: 'DOC-2026-SKL-041P',
    decisionDate: '2026-05-08',
    published: true,
    notes: 'Lulus dengan predikat Sangat Memuaskan (Juara 2 Umum).'
  },
  {
    id: 'grad-2',
    studentId: 'std-2',
    studentName: 'Aisyah Putri Azzahra',
    nis: '232407002',
    nisn: '0098123457',
    className: 'IX-A',
    averageScore: 94.8,
    attendancePercentage: 99.2,
    pointsAccumulated: 60,
    prerequisitesMet: true,
    status: 'LULUS',
    sklDocumentNumber: '421.3/SKL-042/SMPI-AHM/V/2026',
    verificationToken: 'DOC-2026-SKL-1029',
    decisionDate: '2026-05-08',
    published: true,
    notes: 'Lulus dengan predikat Pujian / Mumtaz (Peringkat 1 Umum Sekolah).'
  },
  {
    id: 'grad-3',
    studentId: 'std-3',
    studentName: 'Bilal Ahmad Maulana',
    nis: '232407003',
    nisn: '0098123458',
    className: 'IX-A',
    averageScore: 88.5,
    attendancePercentage: 95.0,
    pointsAccumulated: 30,
    prerequisitesMet: true,
    status: 'LULUS',
    sklDocumentNumber: '421.3/SKL-043/SMPI-AHM/V/2026',
    verificationToken: 'DOC-2026-SKL-043W',
    decisionDate: '2026-05-08',
    published: true,
    notes: 'Lulus dengan predikat Memuaskan.'
  },
  {
    id: 'grad-4',
    studentId: 'std-4',
    studentName: 'Nayla Salma Ramadhani',
    nis: '232407004',
    nisn: '0098123459',
    className: 'IX-A',
    averageScore: 89.2,
    attendancePercentage: 96.8,
    pointsAccumulated: 40,
    prerequisitesMet: true,
    status: 'LULUS',
    sklDocumentNumber: '421.3/SKL-044/SMPI-AHM/V/2026',
    verificationToken: 'DOC-2026-SKL-044D',
    decisionDate: '2026-05-08',
    published: true
  },
  {
    id: 'grad-5',
    studentId: 'std-5',
    studentName: 'Faris Farhan Robbani',
    nis: '232407005',
    nisn: '0098123460',
    className: 'IX-A',
    averageScore: 84.1,
    attendancePercentage: 91.0,
    pointsAccumulated: -5,
    prerequisitesMet: true,
    status: 'LULUS',
    sklDocumentNumber: '421.3/SKL-045/SMPI-AHM/V/2026',
    verificationToken: 'DOC-2026-SKL-045F',
    decisionDate: '2026-05-08',
    published: true
  }
];

// ==========================================
// 7. E-JURNAL & PENILAIAN
// ==========================================
export const initialTeachingSchedules: TeachingSchedule[] = [
  {
    id: 'sch-1',
    teacherId: 'usr-4',
    teacherName: 'Ahmad Zainuddin, S.Pd.I',
    subjectId: 'sbj-1',
    subjectName: 'Pendidikan Agama Islam & Budi Pekerti',
    classId: 'cls-1',
    className: 'IX-A',
    dayOfWeek: 'Senin',
    timeSlot: '07:30 - 09:00 WIB',
    room: 'Ruang Kelas IX-A'
  },
  {
    id: 'sch-2',
    teacherId: 'usr-4',
    teacherName: 'Ahmad Zainuddin, S.Pd.I',
    subjectId: 'sbj-2',
    subjectName: 'Tahfidz Al-Qur\'an & Tajwid',
    classId: 'cls-1',
    className: 'IX-A',
    dayOfWeek: 'Selasa',
    timeSlot: '07:30 - 09:00 WIB',
    room: 'Masjid Al-Hikmah'
  },
  {
    id: 'sch-3',
    teacherId: 'tch-3',
    teacherName: 'Drs. H. Mulyono, M.Pd.I',
    subjectId: 'sbj-5',
    subjectName: 'Ilmu Pengetahuan Alam (IPA Terpadu)',
    classId: 'cls-1',
    className: 'IX-A',
    dayOfWeek: 'Rabu',
    timeSlot: '08:00 - 09:30 WIB',
    room: 'Lab IPA Terpadu'
  }
];

export const initialTeachingJournals: TeachingJournal[] = [
  {
    id: 'jrn-1',
    scheduleId: 'sch-1',
    teacherId: 'usr-4',
    teacherName: 'Ahmad Zainuddin, S.Pd.I',
    subjectName: 'Pendidikan Agama Islam & Budi Pekerti',
    className: 'IX-A',
    date: '2026-02-16',
    period: 'Pertemuan Ke-6',
    topic: 'Kaidah Tajwid dan Makna Q.S. Az-Zumar ayat 53 tentang Optimisme & Tawakal',
    learningObjectives: 'Siswa mampu membaca dengan tartil, menghafal, dan memahami kandungan ayat tentang optimisme serta rahmat Allah SWT.',
    method: 'Talaqqi, Diskusi & Pembiasaan Reflektif',
    notes: 'Seluruh santri/siswa menyimak dengan khidmat dan mampu mendemonstrasikan bacaan tartil.',
    status: 'SELESAI',
    attendanceSummary: { hadir: 31, sakit: 1, izin: 0, alpa: 0 }
  },
  {
    id: 'jrn-2',
    scheduleId: 'sch-2',
    teacherId: 'usr-4',
    teacherName: 'Ahmad Zainuddin, S.Pd.I',
    subjectName: 'Tahfidz Al-Qur\'an & Tajwid',
    className: 'IX-A',
    date: '2026-02-10',
    period: 'Pertemuan Ke-5',
    topic: 'Muroja\'ah Surat An-Naba\' s.d. An-Nazi\'at (Juz 30)',
    learningObjectives: 'Memastikan kelancaran hafalan juz 30 dengan makharijul huruf yang fasih.',
    method: 'Simakan Berpasangan & Setoran Mandiri',
    notes: 'Sebagian besar siswa telah tuntas setoran hafalan Juz 30 target semester genap.',
    status: 'SELESAI',
    attendanceSummary: { hadir: 32, sakit: 0, izin: 0, alpa: 0 }
  }
];

export const initialStudentGrades: StudentGrade[] = [
  {
    id: 'grd-1',
    studentId: 'std-1',
    studentName: 'Muhammad Zidan Al-Fatih',
    nis: '232407001',
    className: 'IX-A',
    subjectName: 'Pendidikan Agama Islam & Budi Pekerti',
    academicYear: '2025/2026',
    semester: 'Genap',
    tugas: 92,
    uh: 90,
    uts: 95,
    uas: 94,
    praktik: 96,
    finalScore: 93.3,
    letterGrade: 'A',
    isPassed: true
  },
  {
    id: 'grd-2',
    studentId: 'std-2',
    studentName: 'Aisyah Putri Azzahra',
    nis: '232407002',
    className: 'IX-A',
    subjectName: 'Pendidikan Agama Islam & Budi Pekerti',
    academicYear: '2025/2026',
    semester: 'Genap',
    tugas: 95,
    uh: 96,
    uts: 96,
    uas: 97,
    praktik: 98,
    finalScore: 96.3,
    letterGrade: 'A',
    isPassed: true
  }
];

// ==========================================
// 8. E-PRESENSI HARIAN
// ==========================================
export const initialDailyAttendance: DailyAttendance[] = [
  {
    id: 'att-1',
    userType: 'SISWA',
    personId: 'std-1',
    personName: 'Muhammad Zidan Al-Fatih',
    identifier: '0098123456',
    className: 'IX-A',
    date: '2026-02-17',
    checkInTime: '06:45 WIB',
    checkOutTime: '15:00 WIB',
    status: 'HADIR_TEPAT',
    method: 'QR_SCAN'
  },
  {
    id: 'att-2',
    userType: 'SISWA',
    personId: 'std-2',
    personName: 'Aisyah Putri Azzahra',
    identifier: '0098123457',
    className: 'IX-A',
    date: '2026-02-17',
    checkInTime: '06:40 WIB',
    checkOutTime: '15:05 WIB',
    status: 'HADIR_TEPAT',
    method: 'QR_SCAN'
  },
  {
    id: 'att-3',
    userType: 'SISWA',
    personId: 'std-5',
    personName: 'Faris Farhan Robbani',
    identifier: '0098123460',
    className: 'IX-A',
    date: '2026-02-17',
    checkInTime: '07:15 WIB',
    status: 'TERLAMBAT',
    lateMinutes: 15,
    method: 'QR_SCAN',
    notes: 'Terlambat akibat kendala hujan di perjalanan'
  },
  {
    id: 'att-4',
    userType: 'GURU_PEGAWAI',
    personId: 'usr-4',
    personName: 'Ahmad Zainuddin, S.Pd.I',
    identifier: '19860311 201101 1 012',
    date: '2026-02-17',
    checkInTime: '06:30 WIB',
    checkOutTime: '15:30 WIB',
    status: 'HADIR_TEPAT',
    method: 'QR_SCAN'
  }
];

export const initialParentNotifications: ParentNotification[] = [
  {
    id: 'notif-1',
    studentId: 'std-1',
    studentName: 'Muhammad Zidan Al-Fatih',
    parentPhone: '081228990011',
    message: 'Ananda Muhammad Zidan Al-Fatih telah melakukan presensi masuk di gerbang SMP Islam Al Hikmah Mayong pada pukul 06.45 WIB (Tepat Waktu).',
    timestamp: '2026-02-17 06:45 WIB',
    channel: 'WHATSAPP',
    status: 'DELIVERED'
  }
];

// ==========================================
// 9. E-POIN KARAKTER
// ==========================================
export const initialPointCategories: PointCategory[] = [
  { id: 'cat-p1', code: 'PRE-01', name: 'Khatam Tahfidz 3 Juz / Lebih', type: 'PRESTASI', points: 60, description: 'Menuntaskan setoran hafalan Al-Qur\'an mutqin', level: 'Sekolah', isActive: true },
  { id: 'cat-p2', code: 'PRE-02', name: 'Juara 1-3 MTQ / Sains Tingkat Kabupaten', type: 'PRESTASI', points: 40, description: 'Prestasi kompetisi tingkat kabupaten resmi', level: 'Kabupaten', isActive: true },
  { id: 'cat-p3', code: 'PRE-03', name: 'Juara 1-3 Tingkat Provinsi / Nasional', type: 'PRESTASI', points: 75, description: 'Prestasi tingkat provinsi atau nasional', level: 'Provinsi', isActive: true },
  { id: 'cat-p4', code: 'PRE-04', name: 'Pengurus Inti OSIS / Dewan Penggalang Pramuka', type: 'PRESTASI', points: 20, description: 'Dedikasi kepengurusan organisasi', level: 'Sekolah', isActive: true },
  
  { id: 'cat-v1', code: 'PEL-01', name: 'Terlambat Datang ke Sekolah', type: 'PELANGGARAN', points: -5, description: 'Tiba setelah bel masuk pukul 07.00 WIB', level: 'Ringan', isActive: true },
  { id: 'cat-v2', code: 'PEL-02', name: 'Tidak Membawa Al-Qur\'an / Perlengkapan Shalat', type: 'PELANGGARAN', points: -5, description: 'Kelalaian perlengkapan ibadah harian', level: 'Ringan', isActive: true },
  { id: 'cat-v3', code: 'PEL-03', name: 'Meninggalkan Kelas / Shalat Berjamaah Tanpa Izin', type: 'PELANGGARAN', points: -15, description: 'Tidak mengikuti kegiatan ibadah atau KBM', level: 'Sedang', isActive: true }
];

export const initialPointTransactions: PointTransaction[] = [
  {
    id: 'trx-1',
    studentId: 'std-1',
    studentName: 'Muhammad Zidan Al-Fatih',
    className: 'IX-A',
    categoryId: 'cat-p2',
    categoryName: 'Juara 1-3 MTQ Tingkat Kabupaten',
    type: 'PRESTASI',
    points: 40,
    reason: 'Meraih Juara 1 Lomba Tilawatil Qur\'an Jenjang SMP Tingkat Kabupaten Jepara.',
    evidenceUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=300&auto=format&fit=crop&q=80',
    recordedById: 'usr-4',
    recordedByName: 'Ahmad Zainuddin, S.Pd.I',
    date: '2026-02-12',
    createdAt: '2026-02-12T10:30:00.000Z'
  },
  {
    id: 'trx-2',
    studentId: 'std-2',
    studentName: 'Aisyah Putri Azzahra',
    className: 'IX-A',
    categoryId: 'cat-p1',
    categoryName: 'Khatam Tahfidz 3 Juz',
    type: 'PRESTASI',
    points: 60,
    reason: 'Tuntas Tasmi\' Hafalan Al-Qur\'an Juz 28, 29, dan 30 dengan predikat Jayyid Jiddan.',
    recordedById: 'usr-4',
    recordedByName: 'Ahmad Zainuddin, S.Pd.I',
    date: '2026-01-25',
    createdAt: '2026-01-25T11:00:00.000Z'
  }
];

// ==========================================
// 10. PPDB (Penerimaan Peserta Didik Baru SMP)
// ==========================================
export const initialPPDBSetting: PPDBSetting = {
  isOpen: true,
  academicYear: '2026/2027',
  startDate: '2026-04-15',
  endDate: '2026-06-30',
  quotaMIPA: 120, // Kuota Kelas Reguler / Unggulan
  quotaIPS: 60,   // Kuota Kelas Tahfidz
  quotaBahasa: 30, // Kuota Afirmasi/Mitra
  announcementDate: '2026-07-06',
  contactPerson: 'Sekretariat PPDB: 0812-2567-8910 (WhatsApp Center)'
};

export const initialPPDBApplicants: PPDBApplicant[] = [
  {
    id: 'ppdb-1',
    registrationNumber: 'PPDB-2026-0012',
    track: 'PRESTASI',
    fullName: 'Fathir Ahmad Rabbani',
    nisn: '0123456789',
    nik: '3320081405120001',
    birthPlace: 'Jepara',
    birthDate: '2013-05-14',
    gender: 'L',
    previousSchool: 'SD Negeri 1 Pelemkerep Mayong',
    averageReportScore: 91.5,
    address: 'Jl. Pancur Gang 2, Pelemkerep, Mayong, Jepara',
    parentName: 'H. Rabbani Shodiq',
    parentPhone: '081234567890',
    chosenMajor: 'MIPA',
    status: 'ACCEPTED',
    notes: 'Lolos seleksi berkas rapor dan tes baca tulis Al-Qur\'an.',
    registeredAt: '2026-05-18 09:24 WIB'
  },
  {
    id: 'ppdb-2',
    registrationNumber: 'PPDB-2026-0045',
    track: 'ZONASI',
    fullName: 'Zahra Nur Salsabila',
    nisn: '0123456790',
    nik: '3320086008130003',
    birthPlace: 'Jepara',
    birthDate: '2013-08-20',
    gender: 'P',
    previousSchool: 'MI Sultan Hadlirin Mayong',
    averageReportScore: 89.2,
    address: 'Jl. Pancur Gang 1, Pelemkerep (Jarak 150 meter)',
    parentName: 'M. Salsabila',
    parentPhone: '081377884422',
    chosenMajor: 'MIPA',
    status: 'VERIFIED',
    notes: 'Zonasi radius terdekat telah diverifikasi panitia.',
    registeredAt: '2026-05-20 14:15 WIB'
  }
];

// ==========================================
// 11. CMS: CONTENT & WEBSITE SETTINGS
// ==========================================
export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Santri SMP Islam Al Hikmah Mayong Raih Juara 1 MTQ Tingkat Kabupaten Jepara',
    slug: 'santri-raih-juara-mtq-jepara-2026',
    category: 'Prestasi',
    summary: 'Prestasi membanggakan kembali ditorehkan oleh santri SMP Islam Al Hikmah Mayong dalam ajang Musabaqah Tilawatil Qur\'an tingkat Kabupaten Jepara.',
    content: `Prestasi membanggakan kembali diraih oleh peserta didik SMP Islam Al Hikmah Mayong dalam perhelatan Musabaqah Tilawatil Qur'an (MTQ) Pelajar Tingkat Kabupaten Jepara Tahun 2026.

Kepala Sekolah, M.Syafi'i, S.Th.I, menyampaikan rasa syukur dan apresiasi yang setinggi-tingginya kepada para santri dan ustadz pembimbing yang telah berikhtiar dengan tekun.

"Pencapaian ini mencerminkan komitmen SMP Islam Al Hikmah Mayong dalam mencetak generasi Qur'ani yang berakhlak mulia, percaya diri, dan berprestasi di kancah daerah maupun nasional," ungkap beliau.`,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    author: 'Tim Humas Al-Hikmah',
    publishedAt: '2026-02-14',
    views: 1250,
    isFeatured: true
  },
  {
    id: 'news-2',
    title: 'Peluncuran Ekosistem Digital Terpadu SMP Islam Al Hikmah Mayong',
    slug: 'peluncuran-ekosistem-digital-smp-islam-al-hikmah',
    category: 'Akademik',
    summary: 'Sekolah resmi meluncurkan portal digital terpadu untuk E-Surat ETTD, E-Jurnal, Presensi Live QR, E-Poin Karakter, dan Verifikasi Ijazah/Dokumen.',
    content: `Sebagai langkah strategis dalam meningkatkan transparansi dan modernisasi layanan pendidikan di Mayong, Jepara, SMP Islam Al Hikmah Mayong hari ini meresmikan platform digital terpadu.

Platform ini mengintegrasikan administrasi persuratan tanda tangan elektronik resmi (ETTD), absensi harian dengan dynamic QR code, jurnal mengajar guru secara real-time, pencatatan poin karakter santri, serta fitur Verifikasi Dokumen Publik online yang memudahkan masyarakat memvalidasi keabsahan dokumen sekolah.`,
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    author: 'Muhammad Luthfi, S.Pd., Gr',
    publishedAt: '2026-02-10',
    views: 1890,
    isFeatured: true
  },
  {
    id: 'news-3',
    title: 'Peringatan Isra Mi\'raj & Khotmil Qur\'an Akbar di Masjid Al-Hikmah',
    slug: 'isra-miraj-khotmil-quran-2026',
    category: 'Kegiatan',
    summary: 'Rangkaian dzikir bersama, khotmil qur\'an, dan tausiyah kebangsaan memperkuat ukhuwah islamiyah seluruh civitas akademika.',
    content: `Dalam rangka memperingati Isra Mi'raj Nabi Muhammad SAW, SMP Islam Al Hikmah Mayong menyelenggarakan Khotmil Qur'an Akbar dan pengajian umum yang dihadiri oleh dewan pengasuh yayasan, komite sekolah, dan seluruh wali santri.`,
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    author: 'Kesiswaan & Keagamaan',
    publishedAt: '2026-01-28',
    views: 780,
    isFeatured: false
  }
];

export const initialEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap 2025/2026',
    date: '2026-03-02 s.d. 2026-03-07',
    time: '07:30 - 12:00 WIB',
    location: 'Ruang Kelas & Lab Komputer SMP',
    description: 'Pelaksanaan ujian tengah semester terpadu menggunakan sistem Computer Based Test.',
    category: 'Ujian'
  },
  {
    id: 'evt-2',
    title: 'Haflah Akhirussanah & Wisuda Tahfidz Al-Qur\'an Angkatan 2026',
    date: '2026-05-24',
    time: '08:00 - 13:00 WIB',
    location: 'Halaman Utama SMP Islam Al Hikmah Mayong',
    description: 'Prosesi pelepasan wisudawan kelas IX dan wisuda tahfidz juz amma serta juz pilihan.',
    category: 'Ekstrakurikuler'
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Program Pembiasaan Shalat Dhuha & Tahfidz Pagi',
    category: 'Karakter & Keagamaan',
    date: 'Setiap Hari Efektif (06.45 - 07.15 WIB)',
    description: 'Kegiatan rutin harian sebelum KBM untuk memupuk kedisiplinan ibadah dan kelancaran hafalan Al-Qur\'an.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'act-2',
    title: 'Pramuka Penggalang & Hadroh Seni Rebana Al-Hikmah',
    category: 'Ekstrakurikuler',
    date: 'Setiap Jumat Siang & Sabtu Sore',
    description: 'Pengembangan bakat kepemimpinan pramuka serta seni islami rebana dan shalawat.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80'
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Juara 1 MTQ Pelajar Tingkat Kabupaten Jepara',
    studentOrTeam: 'Muhammad Zidan Al-Fatih',
    competitionName: 'Musabaqah Tilawatil Qur\'an Dikpora Jepara 2026',
    level: 'Kabupaten/Kota',
    rank: 'Juara 1',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-2',
    title: 'Khatam Tasmi\' Tahfidz 3 Juz Mutqin',
    studentOrTeam: 'Aisyah Putri Azzahra',
    competitionName: 'Munaqasyah Tahfidz Yayasan Al-Hikmah',
    level: 'Kecamatan',
    rank: 'Medali Emas',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gedung dan Halaman Kampus SMP Islam Al Hikmah Mayong',
    category: 'Fasilitas',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    date: '2026-01-10'
  },
  {
    id: 'gal-2',
    title: 'Laboratorium Komputer & Pusat Ujian CBT',
    category: 'Fasilitas',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    date: '2026-01-15'
  },
  {
    id: 'gal-3',
    title: 'Masjid dan Sarana Ibadah Shalat Berjamaah',
    category: 'Kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    date: '2026-02-05'
  },
  {
    id: 'gal-4',
    title: 'Perpustakaan & Ruang Baca Santri',
    category: 'Fasilitas',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    date: '2026-01-20'
  }
];

export const initialAnnouncements: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
    date: '2026-02-15',
    content: 'Penerimaan santri/siswa baru SMP Islam Al Hikmah Mayong telah dibuka secara daring dan luring. Formulir pendaftaran dapat diakses pada menu PPDB.',
    isImportant: true,
    targetAudience: 'Calon Siswa'
  },
  {
    id: 'ann-2',
    title: 'Pemberlakuan Sistem E-Presensi Live Barcode',
    date: '2026-02-01',
    content: 'Seluruh santri/siswa diwajibkan melakukan scan QR presensi kedatangan di gerbang utama sebelum pukul 06.45 WIB.',
    isImportant: true,
    targetAudience: 'Semua'
  }
];

export const initialNavItems: NavItem[] = [
  { id: 'nav-1', label: 'Beranda', href: '/', order: 1, isVisible: true },
  { id: 'nav-2', label: 'Profil', href: '/profil', order: 2, isVisible: true },
  { id: 'nav-3', label: 'Berita', href: '/berita', order: 3, isVisible: true },
  { id: 'nav-4', label: 'Agenda', href: '/agenda', order: 4, isVisible: true },
  { id: 'nav-5', label: 'Prestasi', href: '/prestasi', order: 5, isVisible: true },
  { id: 'nav-6', label: 'Galeri', href: '/galeri', order: 6, isVisible: true }
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'SMP Islam Al Hikmah Mayong',
    subtitle: 'Mewujudkan santri dan siswa berdaya saing global, berkepribadian luhur, dan cerdas teknologi.',
    badgeText: 'PPDB 2026/2027 • Jalur Prestasi & Reguler',
    badgeColor: 'from-amber-500 to-orange-500',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Daftar PPDB',
    ctaLink: '/ppdb',
    isActive: true,
    order: 1
  },
  {
    id: 'slide-2',
    title: 'Pembelajaran Sains & Digital',
    subtitle: 'Laboratorium komputer modern dan pembelajaran interaktif berbasis teknologi islami.',
    badgeText: 'Fasilitas & Inovasi',
    badgeColor: 'from-teal-600 to-emerald-600',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Lihat Fasilitas',
    ctaLink: '/profil',
    isActive: true,
    order: 2
  },
  {
    id: 'slide-3',
    title: 'Program Tahfidz & Akhlak Mulia',
    subtitle: 'Bimbingan intensif hafalan Al-Qur\'an dan pembiasaan adab islami sehari-hari.',
    badgeText: 'Unggulan Keislaman',
    badgeColor: 'from-emerald-600 to-teal-700',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Pelajari Kurikulum',
    ctaLink: '/profil',
    isActive: true,
    order: 3
  },
  {
    id: 'slide-4',
    title: 'Prestasi Akademik & Kejuaraan',
    subtitle: 'Mendukung bakat dan potensi siswa hingga meraih juara di tingkat kabupaten dan nasional.',
    badgeText: 'Generasi Juara',
    badgeColor: 'from-amber-500 to-rose-500',
    imageUrl: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Galeri Prestasi',
    ctaLink: '/prestasi',
    isActive: true,
    order: 4
  }
];

export const initialWebsiteSettings: WebsiteSettings = {
  schoolName: 'SMP Islam Al Hikmah Mayong',
  tagline: 'Mewujudkan Generasi Islami, Berakhlak Mulia, Cerdas, dan Berwawasan Global',
  npsn: '20318492',
  akreditasi: 'A (Unggul)',
  address: 'Jalan Pancur, Gang 1, Pelemkerep, Mayong, Jepara, POS 59465',
  phone: '(0291) 751234 / 0812-2567-8910',
  email: 'info@smpislamalhikmahmayong.sch.id',
  website: 'https://smpislamalhikmahmayong.sch.id',
  socialInstagram: '@smpislamalhikmahmayong',
  socialYoutube: 'SMP Islam Al Hikmah Mayong Official',
  socialFacebook: 'SMP Islam Al Hikmah Mayong',
  headmasterName: "M.Syafi'i, S.Th.I",
  headmasterNip: '19790412 200501 1 003',
  schoolLogoUrl: '',
  statsTotalStudents: 480,
  statsTotalStaff: 38,
  statsPrograms: 12,
  statsYearsEstablished: 20,
  heroHeadline: 'Membentuk Generasi Qur\'ani, Berakhlakul Karimah, & Berprestasi Unggul',
  heroSubheadline: 'Ekosistem digital terpadu SMP Islam Al Hikmah Mayong untuk tata kelola pendidikan islami modern, transparan, dan berkarakter.'
};

// ==========================================
// 12. AUDIT LOG INITIAL SEEDS
// ==========================================
export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-1',
    userId: 'usr-2',
    userName: "M.Syafi'i, S.Th.I",
    userRole: 'KEPALA_SEKOLAH',
    action: 'SIGN',
    module: 'E-Surat',
    recordId: 'DOC-2026-SR-9481',
    description: 'Menandatangani secara digital (ETTD) Surat Rekomendasi MTQ & Sains No: 421.3/084/SMPI-AHM/II/2026',
    oldValue: 'Status: REVIEW',
    newValue: 'Status: SIGNED (Hash: e9b8f2c3a1d4...)',
    ipAddress: '192.168.1.10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timestamp: '2026-02-10 09:30:15 WIB'
  },
  {
    id: 'aud-2',
    userId: 'usr-4',
    userName: 'Ahmad Zainuddin, S.Pd.I',
    userRole: 'GURU',
    action: 'CREATE',
    module: 'E-Jurnal',
    recordId: 'jrn-1',
    description: 'Mengisi Jurnal Mengajar PAI Kelas IX-A (Materi: Kaidah Tajwid & Makna Q.S. Az-Zumar ayat 53)',
    ipAddress: '192.168.1.44',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timestamp: '2026-02-16 09:10:02 WIB'
  },
  {
    id: 'aud-3',
    userId: 'usr-4',
    userName: 'Ahmad Zainuddin, S.Pd.I',
    userRole: 'GURU',
    action: 'CREATE',
    module: 'E-Poin',
    recordId: 'trx-1',
    description: 'Menambahkan +40 Poin Prestasi Siswa (Muhammad Zidan Al-Fatih - Juara 1 MTQ Kabupaten Jepara)',
    oldValue: 'Poin Sebelumnya: 5',
    newValue: 'Poin Baru: 45',
    ipAddress: '192.168.1.44',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timestamp: '2026-02-12 10:30:45 WIB'
  },
  {
    id: 'aud-4',
    userId: 'usr-1',
    userName: 'Muhammad Luthfi, S.Pd., Gr',
    userRole: 'SUPER_ADMIN',
    action: 'UPDATE',
    module: 'CMS',
    recordId: 'srv-6',
    description: 'Memperbarui Master Data Sekolah: SMP Islam Al Hikmah Mayong, Jepara',
    oldValue: 'Default Demo Data',
    newValue: 'SMP Islam Al Hikmah Mayong Master Data Synced',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2026-02-18 10:00:00 WIB'
  }
];
