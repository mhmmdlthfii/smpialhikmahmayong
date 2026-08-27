// ==========================================
// SCHOOL DIGITAL PLATFORM - TYPES DEFINITION
// ==========================================

export type SystemType = 'INTERNAL' | 'EXTERNAL';
export type LinkTarget = '_self' | '_blank';

export interface SystemService {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon identifier
  iconName?: string;
  type: SystemType;
  url: string;
  authRequired: boolean;
  target: LinkTarget;
  openMode?: 'NEW_TAB' | 'MODAL' | 'IFRAME';
  targetAudience?: string;
  colorGradient?: string;
  displayOrder?: number;
  sortOrder: number;
  isActive: boolean;
  badge?: string;
  category?: 'academic' | 'administration' | 'finance' | 'student' | 'public' | string;
  externalProvider?: 'GAS' | 'CUSTOM' | 'NONE';
}

// ------------------------------------------
// Core Authentication & RBAC
// ------------------------------------------

export type RoleType =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'KEPALA_SEKOLAH'
  | 'TU'
  | 'GURU'
  | 'WALI_KELAS'
  | 'SISWA'
  | 'ORANG_TUA';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl?: string;
  avatar?: string;
  roles: RoleType[];
  activeRole: RoleType;
  phone?: string;
  nip?: string;
  nisn?: string;
  nis?: string;
  assignedClassId?: string;
  assignedClassName?: string;
  childrenStudentIds?: string[]; // For ORANG_TUA
}

export type Permission =
  | 'student.view'
  | 'student.create'
  | 'student.edit'
  | 'student.delete'
  | 'teacher.view'
  | 'teacher.manage'
  | 'journal.view'
  | 'journal.create'
  | 'journal.edit'
  | 'attendance.view'
  | 'attendance.create'
  | 'attendance.manage'
  | 'grade.view'
  | 'grade.create'
  | 'grade.edit'
  | 'point.view'
  | 'point.create'
  | 'point.edit'
  | 'letter.view'
  | 'letter.create'
  | 'letter.approve'
  | 'letter.sign'
  | 'graduation.view'
  | 'graduation.manage'
  | 'graduation.publish'
  | 'cms.view'
  | 'cms.create'
  | 'cms.edit'
  | 'cms.publish'
  | 'system.manage'
  | 'audit.view';

// ------------------------------------------
// Master Data
// ------------------------------------------

export interface AcademicYear {
  id: string;
  year: string; // e.g. "2025/2026"
  semester: 'Ganjil' | 'Genap';
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g. "IX-A"
  gradeLevel: 7 | 8 | 9 | 10 | 11 | 12 | number;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  academicYear: string;
  totalStudents: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: 'Wajib' | 'Peminatan' | 'Muatan Lokal';
  kkm: number; // Kriteria Ketuntasan Minimal
}

export interface Student {
  id: string;
  nis: string;
  nisn: string;
  name: string;
  gender: 'L' | 'P';
  classId: string;
  className: string;
  birthPlace: string;
  birthDate: string;
  religion: string;
  address: string;
  parentName: string;
  parentPhone: string;
  avatarUrl?: string;
  currentPoints: number;
  status: 'AKTIF' | 'LULUS' | 'MUTASI' | 'KELUAR';
  academicYear: string;
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  gender: 'L' | 'P';
  phone: string;
  email: string;
  subjects: string[]; // Subject names or IDs
  isHomeroom: boolean;
  homeroomClassId?: string;
  avatarUrl?: string;
}

// ------------------------------------------
// Public Verification & Documents
// ------------------------------------------

export type DocumentType =
  | 'SURAT_KETERANGAN_AKTIF'
  | 'SURAT_KETERANGAN_LULUS'
  | 'SURAT_REKOMENDASI'
  | 'SURAT_UNDANGAN'
  | 'SURAT_TUGAS'
  | 'SERTIFIKAT_PRESTASI'
  | 'SURAT_MUTASI';

export type VerificationStatus = 'VALID' | 'REVOKED' | 'EXPIRED' | 'NOT_FOUND';

export interface VerificationRecord {
  id: string;
  token: string; // Cryptographic random string e.g. "DOC-2026-X8K9M2L1P"
  documentNumber: string;
  documentType: DocumentType;
  title: string;
  recipientName: string;
  recipientIdentifier?: string; // NISN/NIP/NIK
  issuerOrg: string;
  issuedDate: string;
  expiredDate?: string;
  signerName: string;
  signerRole: string;
  signerNip: string;
  ettDigitalSignatureHash: string;
  status: VerificationStatus;
  revocationReason?: string;
  contentSummary?: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

// ------------------------------------------
// E-Surat Module
// ------------------------------------------

export type LetterCategory = 'MASUK' | 'KELUAR';
export type LetterStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SIGNED' | 'REJECTED' | 'ARCHIVED';

export interface Letter {
  id: string;
  category: LetterCategory;
  type: DocumentType;
  letterNumber: string;
  title: string;
  regarding: string;
  sender: string;
  recipient: string;
  recipientIdentifier?: string;
  date: string;
  status: LetterStatus;
  contentHtml?: string;
  attachments?: { name: string; url: string; size: string }[];
  verificationToken?: string;
  ettDigitalSignatureHash?: string;
  signedBy?: string;
  signedAt?: string;
  signerNip?: string;
  dispositionNotes?: string;
  dispositionTargetRole?: string;
  createdById: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------
// E-Kelulusan Module
// ------------------------------------------

export type GraduationStatus = 'LULUS' | 'TIDAK_LULUS' | 'DITUNDA';

export interface GraduationRecord {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  nisn: string;
  className: string;
  averageScore: number;
  attendancePercentage: number;
  pointsAccumulated: number;
  prerequisitesMet: boolean;
  status: GraduationStatus;
  sklDocumentNumber: string;
  sklNumber?: string;
  verificationToken: string;
  decisionDate: string;
  graduationDate?: string;
  published: boolean;
  isPublished?: boolean;
  notes?: string;
}

// ------------------------------------------
// E-Jurnal Module
// ------------------------------------------

export interface TeachingSchedule {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  dayOfWeek: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  day?: string;
  timeSlot: string; // e.g. "07:30 - 09:00"
  startTime?: string;
  endTime?: string;
  room: string;
}

export interface TeachingJournal {
  id: string;
  scheduleId: string;
  teacherId: string;
  teacherName: string;
  classId?: string;
  subjectId?: string;
  subjectName: string;
  className: string;
  date: string;
  period?: string;
  startTime?: string;
  endTime?: string;
  topic: string;
  learningObjectives?: string;
  learningAchievement?: string;
  activityDescription?: string;
  method?: string;
  notes: string;
  attendedCount?: number;
  absentCount?: number;
  absentStudentNames?: string[];
  status: 'SELESAI' | 'TERTUNDA' | 'GANTI' | 'SUBMITTED';
  attendanceSummary?: {
    hadir: number;
    sakit: number;
    izin: number;
    alpa: number;
  };
  attendanceDetails?: {
    studentId: string;
    studentName: string;
    status: 'HADIR' | 'SAKIT' | 'IZIN' | 'ALPA';
    notes?: string;
  }[];
}

export interface GradeWeightConfig {
  tugas: number; // e.g. 20%
  uh: number; // e.g. 20%
  uts: number; // e.g. 25%
  uas: number; // e.g. 25%
  praktik: number; // e.g. 10%
}

export interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  studentNis?: string;
  className: string;
  subjectName: string;
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  tugas: number;
  uh: number;
  uts: number;
  uas: number;
  praktik: number;
  finalScore: number;
  score?: number;
  assessmentType?: string;
  notes?: string;
  letterGrade: 'A' | 'B' | 'C' | 'D';
  isPassed: boolean;
}

// ------------------------------------------
// E-Presensi Module
// ------------------------------------------

export type AttendanceType = 'SISWA' | 'GURU_PEGAWAI';
export type DailyAttendanceStatus = 'HADIR' | 'HADIR_TEPAT' | 'TERLAMBAT' | 'IZIN' | 'SAKIT' | 'ALPA';

export interface DailyAttendance {
  id: string;
  userType?: AttendanceType;
  studentId?: string;
  studentName?: string;
  personId?: string;
  personName?: string;
  nisn?: string;
  identifier?: string; // NISN or NIP
  className?: string;
  classId?: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: DailyAttendanceStatus;
  lateMinutes?: number;
  distanceMeters?: number;
  locationLatitude?: number;
  locationLongitude?: number;
  photoProofUrl?: string;
  parentNotified?: boolean;
  method: 'QR_SCAN' | 'QR_CODE' | 'MANUAL_TU' | 'GEOFENCE';
  notes?: string;
}

export interface ParentNotification {
  id: string;
  studentId: string;
  studentName: string;
  parentPhone: string;
  message: string;
  timestamp?: string;
  sentAt?: string;
  channel?: 'WHATSAPP' | 'SMS' | 'PORTAL';
  status: 'DELIVERED' | 'SENT' | 'FAILED' | string;
}

// ------------------------------------------
// E-Poin Module
// ------------------------------------------

export type PointType = 'PRESTASI' | 'PELANGGARAN';

export interface PointCategory {
  id: string;
  code: string;
  name: string;
  type: PointType;
  points: number; // positive for prestasi, negative for pelanggaran
  description: string;
  level?: 'Sekolah' | 'Kecamatan' | 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Ringan' | 'Sedang' | 'Berat';
  isActive: boolean;
}

export interface PointTransaction {
  id: string;
  studentId: string;
  studentName: string;
  nisn?: string;
  classId?: string;
  className: string;
  categoryId: string;
  categoryName: string;
  type: PointType;
  points: number;
  reason?: string;
  description?: string;
  actionTaken?: string;
  evidenceUrl?: string;
  recordedById?: string;
  recordedByName?: string;
  reportedById?: string;
  reportedByName?: string;
  reportedAt?: string;
  isParentNotified?: boolean;
  date?: string;
  createdAt: string;
}

// ------------------------------------------
// PPDB Module
// ------------------------------------------

export type PPDBTrack = 'ZONASI' | 'PRESTASI' | 'AFIRMASI' | 'MUTASI';
export type PPDBStatus = 'SUBMITTED' | 'VERIFIED' | 'ACCEPTED' | 'REJECTED';

export interface PPDBApplicant {
  id: string;
  registrationNumber: string; // e.g. "PPDB-2026-0042"
  track: PPDBTrack;
  fullName: string;
  nisn: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: 'L' | 'P';
  previousSchool: string;
  averageReportScore: number;
  address: string;
  parentName: string;
  parentPhone: string;
  chosenMajor: 'MIPA' | 'IPS' | 'BAHASA';
  status: PPDBStatus;
  notes?: string;
  registeredAt: string;
}

export interface PPDBSetting {
  isOpen: boolean;
  academicYear: string;
  startDate: string;
  endDate: string;
  quotaMIPA: number;
  quotaIPS: number;
  quotaBahasa: number;
  announcementDate: string;
  contactPerson: string;
}

// ------------------------------------------
// CMS Modules
// ------------------------------------------

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: 'Akademik' | 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Artikel' | string;
  summary?: string;
  content: string;
  coverImage?: string;
  imageUrl?: string;
  author: string;
  publishedAt?: string;
  date?: string;
  views?: number;
  isFeatured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Akademik' | 'Ujian' | 'Libur' | 'Ekstrakurikuler' | 'Rapat';
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
}

export type LetterType = DocumentType;
export type UserRole = RoleType;

export interface AchievementItem {
  id: string;
  title: string;
  studentOrTeam: string;
  studentClass?: string;
  competitionName: string;
  category?: string;
  organizer?: string;
  level: 'Kecamatan' | 'Kabupaten/Kota' | 'Provinsi' | 'Nasional' | 'Internasional' | string;
  rank: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Harapan 1' | 'Medali Emas' | 'Medali Perak' | 'Medali Perunggu' | string;
  year: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  category: 'Kegiatan' | 'Fasilitas' | 'Prestasi' | 'Upacara';
  imageUrl: string;
  date: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  content: string;
  isImportant: boolean;
  targetAudience: 'Semua' | 'Siswa' | 'Guru' | 'Orang Tua' | 'Calon Siswa';
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  target?: LinkTarget;
  isExternal?: boolean;
  order: number;
  isVisible: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeColor?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order: number;
}

export interface WebsiteSettings {
  schoolName: string;
  tagline: string;
  npsn: string;
  akreditasi: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialInstagram: string;
  socialYoutube: string;
  socialFacebook: string;
  headmasterName: string;
  headmasterNip: string;
  headmasterSignatureUrl?: string;
  schoolLogoUrl: string;
  headerBannerUrl?: string; // Photo banner header berukuran 1343x342 px
  headerBannerAlt?: string;
  headerDisplayMode?: 'photo_banner' | 'logo_text'; // Mode tampilan logo di header
  statsTotalStudents: number;
  statsTotalStaff: number;
  statsPrograms: number;
  statsYearsEstablished: number;
  heroHeadline: string;
  heroSubheadline: string;
}

// ------------------------------------------
// Media Library & Asset Storage (Drive Situs)
// ------------------------------------------

export type MediaCategory =
  | 'banner'
  | 'logo'
  | 'berita'
  | 'galeri'
  | 'prestasi'
  | 'guru'
  | 'dokumen'
  | 'umum';

export interface MediaAsset {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  dimensions?: string;
  mimeType: string;
  category: MediaCategory;
  url: string; // Base64 data URL or permanent URL
  uploadedAt: string;
  uploadedBy?: string;
  altText?: string;
  tags?: string[];
}

// ------------------------------------------
// Audit Log
// ------------------------------------------

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'SIGN' | 'APPROVE' | 'REJECT' | 'REVOKE' | 'PUBLISH' | 'VERIFY';
  module: 'E-Surat' | 'E-Jurnal' | 'E-Presensi' | 'E-Poin' | 'E-Kelulusan' | 'CMS' | 'MasterData' | 'Auth' | 'PPDB';
  recordId: string;
  description: string;
  details?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}
