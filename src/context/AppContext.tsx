import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SystemService,
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
import {
  initialSystemServices,
  initialStudents,
  initialTeachers,
  initialClasses,
  initialSubjects,
  initialAcademicYears,
  initialVerificationRecords,
  initialLetters,
  initialGraduationRecords,
  initialTeachingSchedules,
  initialTeachingJournals,
  initialStudentGrades,
  initialDailyAttendance,
  initialParentNotifications,
  initialPointCategories,
  initialPointTransactions,
  initialPPDBApplicants,
  initialPPDBSetting,
  initialNews,
  initialEvents,
  initialActivities,
  initialAchievements,
  initialGallery,
  initialAnnouncements,
  initialNavItems,
  initialHeroSlides,
  initialWebsiteSettings,
  initialAuditLogs
} from '../data/initialData';

interface AppContextType {
  // System Services (Dynamic System Navigator)
  systemServices: SystemService[];
  addSystemService: (service: Omit<SystemService, 'id'>) => void;
  updateSystemService: (id: string, service: Partial<SystemService>) => void;
  deleteSystemService: (id: string) => void;
  reorderSystemServices: (services: SystemService[]) => void;

  // Verification
  verificationRecords: VerificationRecord[];
  verifyDocument: (token: string) => VerificationRecord | null;
  addVerificationRecord: (record: Omit<VerificationRecord, 'id' | 'createdAt'>) => VerificationRecord;
  updateVerificationStatus: (id: string, status: VerificationRecord['status'], reason?: string) => void;
  revokeDocument: (token: string, reason?: string) => void;

  // E-Surat
  letters: Letter[];
  addLetter: (letter: Omit<Letter, 'id' | 'createdAt' | 'updatedAt'>) => Letter;
  updateLetter: (id: string, updates: Partial<Letter>) => void;
  approveLetter: (id: string, userNip: string, userName: string) => void;
  signLetterETTD: (id: string, signerName: string, signerNip: string) => VerificationRecord;

  // E-Kelulusan
  graduationRecords: GraduationRecord[];
  updateGraduationStatus: (id: string, status: GraduationRecord['status'], notes?: string) => void;
  publishGraduation: (id: string) => void;
  batchPublishGraduation: () => void;

  // E-Jurnal
  teachingSchedules: TeachingSchedule[];
  teachingJournals: TeachingJournal[];
  journals: TeachingJournal[];
  addTeachingJournal: (journal: Omit<TeachingJournal, 'id'>) => void;
  studentGrades: StudentGrade[];
  updateStudentGrade: (id: string, updates: Partial<StudentGrade>) => void;

  // E-Presensi
  dailyAttendance: DailyAttendance[];
  attendances: DailyAttendance[];
  parentNotifications: ParentNotification[];
  recordAttendance: (attendance: Omit<DailyAttendance, 'id'>) => void;

  // E-Poin
  pointCategories: PointCategory[];
  pointTransactions: PointTransaction[];
  studentPoints: PointTransaction[];
  addPointTransaction: (trx: Omit<PointTransaction, 'id' | 'createdAt'>) => void;
  addPointCategory: (cat: Omit<PointCategory, 'id'>) => void;
  updatePointCategory: (id: string, cat: Partial<PointCategory>) => void;

  // PPDB
  ppdbApplicants: PPDBApplicant[];
  ppdbSetting: PPDBSetting;
  registerPPDBApplicant: (applicant: Omit<PPDBApplicant, 'id' | 'registrationNumber' | 'status' | 'registeredAt'>) => PPDBApplicant;
  updatePPDBApplicantStatus: (id: string, status: PPDBApplicant['status'], notes?: string) => void;
  updatePPDBSetting: (setting: Partial<PPDBSetting>) => void;

  // Master Data
  students: Student[];
  teachers: Teacher[];
  classes: ClassRoom[];
  subjects: Subject[];
  academicYears: AcademicYear[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;

  // CMS
  news: NewsItem[];
  events: EventItem[];
  activities: ActivityItem[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  announcements: AnnouncementItem[];
  navItems: NavItem[];
  heroSlides: HeroSlide[];
  websiteSettings: WebsiteSettings;
  addNews: (item: Omit<NewsItem, 'id' | 'views'>) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  addEvent: (item: Omit<EventItem, 'id'>) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  reorderHeroSlides: (slides: HeroSlide[]) => void;
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;
  updateNavItems: (items: NavItem[]) => void;

  // Audit Log
  auditLogs: AuditLogEntry[];
  logAudit: (log: Omit<AuditLogEntry, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DATA_VERSION = 'v3_smp_islam_al_hikmah_mayong_navbar_glass';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check version and migrate stale storage
  if (typeof window !== 'undefined') {
    const currentVer = localStorage.getItem('school_app_data_version');
    if (currentVer !== DATA_VERSION) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('school_app_') || key.startsWith('school_platform_')) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem('school_app_data_version', DATA_VERSION);
    }
  }

  // Helper for persistent state
  const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
      try {
        const saved = localStorage.getItem(`school_app_${key}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof initialValue === 'object' && initialValue !== null && !Array.isArray(initialValue)) {
            return { ...initialValue, ...parsed };
          }
          return parsed;
        }
        return initialValue;
      } catch {
        return initialValue;
      }
    });

    useEffect(() => {
      try {
        localStorage.setItem(`school_app_${key}`, JSON.stringify(state));
      } catch (err) {
        console.error(`Failed to save ${key} to localStorage:`, err);
      }
    }, [key, state]);

    return [state, setState];
  };

  // State Declarations
  const [systemServices, setSystemServices] = usePersistentState<SystemService[]>('system_services', initialSystemServices);
  const [students, setStudents] = usePersistentState<Student[]>('students', initialStudents);
  const [teachers, setTeachers] = usePersistentState<Teacher[]>('teachers', initialTeachers);
  const [classes, setClasses] = usePersistentState<ClassRoom[]>('classes', initialClasses);
  const [subjects, setSubjects] = usePersistentState<Subject[]>('subjects', initialSubjects);
  const [academicYears, setAcademicYears] = usePersistentState<AcademicYear[]>('academic_years', initialAcademicYears);
  const [verificationRecords, setVerificationRecords] = usePersistentState<VerificationRecord[]>('verification_records', initialVerificationRecords);
  const [letters, setLetters] = usePersistentState<Letter[]>('letters', initialLetters);
  const [graduationRecords, setGraduationRecords] = usePersistentState<GraduationRecord[]>('graduation_records', initialGraduationRecords);
  const [teachingSchedules, setTeachingSchedules] = usePersistentState<TeachingSchedule[]>('teaching_schedules', initialTeachingSchedules);
  const [teachingJournals, setTeachingJournals] = usePersistentState<TeachingJournal[]>('teaching_journals', initialTeachingJournals);
  const [studentGrades, setStudentGrades] = usePersistentState<StudentGrade[]>('student_grades', initialStudentGrades);
  const [dailyAttendance, setDailyAttendance] = usePersistentState<DailyAttendance[]>('daily_attendance', initialDailyAttendance);
  const [parentNotifications, setParentNotifications] = usePersistentState<ParentNotification[]>('parent_notifications', initialParentNotifications);
  const [pointCategories, setPointCategories] = usePersistentState<PointCategory[]>('point_categories', initialPointCategories);
  const [pointTransactions, setPointTransactions] = usePersistentState<PointTransaction[]>('point_transactions', initialPointTransactions);
  const [ppdbApplicants, setPpdbApplicants] = usePersistentState<PPDBApplicant[]>('ppdb_applicants', initialPPDBApplicants);
  const [ppdbSetting, setPpdbSetting] = usePersistentState<PPDBSetting>('ppdb_setting', initialPPDBSetting);
  const [news, setNews] = usePersistentState<NewsItem[]>('news', initialNews);
  const [events, setEvents] = usePersistentState<EventItem[]>('events', initialEvents);
  const [activities, setActivities] = usePersistentState<ActivityItem[]>('activities', initialActivities);
  const [achievements, setAchievements] = usePersistentState<AchievementItem[]>('achievements', initialAchievements);
  const [gallery, setGallery] = usePersistentState<GalleryItem[]>('gallery', initialGallery);
  const [announcements, setAnnouncements] = usePersistentState<AnnouncementItem[]>('announcements', initialAnnouncements);
  const [navItems, setNavItems] = usePersistentState<NavItem[]>('nav_items', initialNavItems);
  const [heroSlides, setHeroSlides] = usePersistentState<HeroSlide[]>('hero_slides', initialHeroSlides);
  const [websiteSettings, setWebsiteSettings] = usePersistentState<WebsiteSettings>('website_settings', initialWebsiteSettings);
  const [auditLogs, setAuditLogs] = usePersistentState<AuditLogEntry[]>('audit_logs', initialAuditLogs);

  // Helper to generate crypto-secure token string
  const generateSecureToken = (prefix = 'DOC'): string => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const currentYear = new Date().getFullYear();
    return `${prefix}-${currentYear}-${result}`;
  };

  // Helper for audit logging
  const logAudit = (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB`;
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...entry,
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 200 + 10),
      userAgent: navigator.userAgent.slice(0, 50),
      timestamp: formattedDate
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // 1. Dynamic System Services
  const addSystemService = (serviceData: Omit<SystemService, 'id'>) => {
    const newService: SystemService = {
      id: `srv-${Date.now()}`,
      ...serviceData
    };
    setSystemServices((prev) => [...prev, newService]);
    logAudit({
      userId: 'usr-current',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'CREATE',
      module: 'CMS',
      recordId: newService.id,
      description: `Menambahkan layanan sistem baru: ${newService.name} (${newService.type})`,
      newValue: JSON.stringify({ name: newService.name, url: newService.url })
    });
  };

  const updateSystemService = (id: string, updates: Partial<SystemService>) => {
    setSystemServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    logAudit({
      userId: 'usr-current',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'UPDATE',
      module: 'CMS',
      recordId: id,
      description: `Memperbarui konfigurasi layanan sistem: ${id}`,
      newValue: JSON.stringify(updates)
    });
  };

  const deleteSystemService = (id: string) => {
    const target = systemServices.find((s) => s.id === id);
    setSystemServices((prev) => prev.filter((s) => s.id !== id));
    logAudit({
      userId: 'usr-current',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'DELETE',
      module: 'CMS',
      recordId: id,
      description: `Menghapus layanan sistem: ${target?.name || id}`
    });
  };

  const reorderSystemServices = (newOrderList: SystemService[]) => {
    setSystemServices(newOrderList);
  };

  // 2. Public Verification & Documents
  const verifyDocument = (token: string): VerificationRecord | null => {
    if (!token) return null;
    const cleanToken = token.trim().toUpperCase();
    const found = verificationRecords.find(
      (r) => r.token.toUpperCase() === cleanToken || r.documentNumber.toUpperCase() === cleanToken
    );
    return found || null;
  };

  const addVerificationRecord = (recordData: Omit<VerificationRecord, 'id' | 'createdAt'>): VerificationRecord => {
    const newRecord: VerificationRecord = {
      id: `ver-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...recordData
    };
    setVerificationRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateVerificationStatus = (id: string, status: VerificationRecord['status'], reason?: string) => {
    setVerificationRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status, revocationReason: reason || r.revocationReason }
          : r
      )
    );
    logAudit({
      userId: 'usr-current',
      userName: 'Kepala Sekolah',
      userRole: 'KEPALA_SEKOLAH',
      action: status === 'REVOKED' ? 'REVOKE' : 'UPDATE',
      module: 'E-Surat',
      recordId: id,
      description: `Mengubah status verifikasi dokumen ${id} menjadi ${status}. Alasan: ${reason || '-'}`
    });
  };

  const revokeDocument = (tokenOrDocNumber: string, reason?: string) => {
    const found = verificationRecords.find(
      (r) => r.token.toUpperCase() === tokenOrDocNumber.toUpperCase() || r.documentNumber.toUpperCase() === tokenOrDocNumber.toUpperCase()
    );
    if (found) {
      updateVerificationStatus(found.id, 'REVOKED', reason);
    }
  };

  // 3. E-Surat Workflow
  const addLetter = (letterData: Omit<Letter, 'id' | 'createdAt' | 'updatedAt'>): Letter => {
    const now = new Date().toISOString();
    const newLetter: Letter = {
      id: `let-${Date.now()}`,
      ...letterData,
      createdAt: now,
      updatedAt: now
    };
    setLetters((prev) => [newLetter, ...prev]);
    logAudit({
      userId: letterData.createdById,
      userName: letterData.createdByName,
      userRole: 'TU',
      action: 'CREATE',
      module: 'E-Surat',
      recordId: newLetter.id,
      description: `Membuat draft surat ${letterData.category}: ${letterData.title} (No: ${letterData.letterNumber})`
    });
    return newLetter;
  };

  const updateLetter = (id: string, updates: Partial<Letter>) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l))
    );
  };

  const approveLetter = (id: string, userNip: string, userName: string) => {
    setLetters((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: 'APPROVED', updatedAt: new Date().toISOString() } : l
      )
    );
    logAudit({
      userId: 'usr-kepsek',
      userName,
      userRole: 'KEPALA_SEKOLAH',
      action: 'APPROVE',
      module: 'E-Surat',
      recordId: id,
      description: `Menyetujui permohonan penerbitan surat: ${id}`
    });
  };

  const signLetterETTD = (id: string, signerName: string, signerNip: string): VerificationRecord => {
    const letter = letters.find((l) => l.id === id);
    if (!letter) throw new Error('Letter not found');

    const token = generateSecureToken('DOC');
    const hash = 'ett_' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const nowStr = `${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    // Create verification record
    const verRecord = addVerificationRecord({
      token,
      documentNumber: letter.letterNumber,
      documentType: letter.type,
      title: letter.title,
      recipientName: letter.recipient,
      issuerOrg: websiteSettings.schoolName,
      issuedDate: new Date().toISOString().split('T')[0],
      signerName,
      signerRole: 'Kepala Sekolah',
      signerNip,
      ettDigitalSignatureHash: hash,
      status: 'VALID',
      contentSummary: letter.regarding
    });

    // Update letter status
    updateLetter(id, {
      status: 'SIGNED',
      verificationToken: token,
      signedBy: signerName,
      signedAt: nowStr,
      signerNip
    });

    logAudit({
      userId: 'usr-kepsek',
      userName: signerName,
      userRole: 'KEPALA_SEKOLAH',
      action: 'SIGN',
      module: 'E-Surat',
      recordId: token,
      description: `Menerbitkan ETTD & Tanda Tangan Digital untuk surat ${letter.letterNumber} dengan token ${token}`,
      newValue: `Hash: ${hash}`
    });

    return verRecord;
  };

  // 4. E-Kelulusan
  const updateGraduationStatus = (id: string, status: GraduationRecord['status'], notes?: string) => {
    setGraduationRecords((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status, notes: notes || g.notes } : g))
    );
    logAudit({
      userId: 'usr-admin',
      userName: 'Kepala Sekolah / Panitia',
      userRole: 'KEPALA_SEKOLAH',
      action: 'UPDATE',
      module: 'E-Kelulusan',
      recordId: id,
      description: `Memperbarui status kelulusan siswa ${id} menjadi ${status}`
    });
  };

  const publishGraduation = (id: string) => {
    setGraduationRecords((prev) =>
      prev.map((g) => (g.id === id ? { ...g, published: true } : g))
    );
  };

  const batchPublishGraduation = () => {
    setGraduationRecords((prev) => prev.map((g) => ({ ...g, published: true })));
    logAudit({
      userId: 'usr-kepsek',
      userName: websiteSettings.headmasterName,
      userRole: 'KEPALA_SEKOLAH',
      action: 'PUBLISH',
      module: 'E-Kelulusan',
      recordId: 'all-graduates',
      description: 'Mempublikasikan pengumuman kelulusan resmi siswa tingkat akhir secara serentak.'
    });
  };

  // 5. E-Jurnal
  const addTeachingJournal = (journalData: Omit<TeachingJournal, 'id'>) => {
    const newJournal: TeachingJournal = {
      id: `jrn-${Date.now()}`,
      ...journalData
    };
    setTeachingJournals((prev) => [newJournal, ...prev]);
    logAudit({
      userId: journalData.teacherId,
      userName: journalData.teacherName,
      userRole: 'GURU',
      action: 'CREATE',
      module: 'E-Jurnal',
      recordId: newJournal.id,
      description: `Mengisi jurnal mengajar mapel ${journalData.subjectName} kelas ${journalData.className} materi: ${journalData.topic}`
    });
  };

  const updateStudentGrade = (id: string, updates: Partial<StudentGrade>) => {
    setStudentGrades((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const merged = { ...g, ...updates };
          // Calculate weighted final score
          const finalScore = parseFloat(
            (
              (merged.tugas * 0.2) +
              (merged.uh * 0.2) +
              (merged.uts * 0.25) +
              (merged.uas * 0.25) +
              (merged.praktik * 0.1)
            ).toFixed(1)
          );
          let letterGrade: 'A' | 'B' | 'C' | 'D' = 'D';
          if (finalScore >= 90) letterGrade = 'A';
          else if (finalScore >= 80) letterGrade = 'B';
          else if (finalScore >= 70) letterGrade = 'C';

          return {
            ...merged,
            finalScore,
            letterGrade,
            isPassed: finalScore >= 75
          };
        }
        return g;
      })
    );
  };

  // 6. E-Presensi & Parent Notifications
  const recordAttendance = (attData: Omit<DailyAttendance, 'id'>) => {
    const newAtt: DailyAttendance = {
      id: `att-${Date.now()}`,
      ...attData
    };
    setDailyAttendance((prev) => [newAtt, ...prev]);

    // If student, dispatch simulated parent notification
    if (attData.userType === 'SISWA') {
      const student = students.find((s) => s.id === attData.personId || s.nisn === attData.identifier);
      if (student) {
        const statusText = attData.status === 'HADIR_TEPAT'
          ? 'Tepat Waktu'
          : attData.status === 'TERLAMBAT'
          ? `Terlambat (${attData.lateMinutes || 0} menit)`
          : attData.status;

        const notifMsg = `Pemberitahuan Sekolah: Ananda ${student.name} telah melakukan presensi di gerbang utama pada pukul ${attData.checkInTime || '06:50 WIB'} (${statusText}).`;
        const newNotif: ParentNotification = {
          id: `notif-${Date.now()}`,
          studentId: student.id,
          studentName: student.name,
          parentPhone: student.parentPhone,
          message: notifMsg,
          timestamp: `${attData.date} ${attData.checkInTime || '06:50 WIB'}`,
          channel: 'WHATSAPP',
          status: 'DELIVERED'
        };
        setParentNotifications((prev) => [newNotif, ...prev]);
      }
    }
  };

  // 7. E-Poin
  const addPointTransaction = (trxData: Omit<PointTransaction, 'id' | 'createdAt'>) => {
    const newTrx: PointTransaction = {
      id: `trx-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...trxData
    };
    setPointTransactions((prev) => [newTrx, ...prev]);

    // Update student's cumulative points
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === trxData.studentId) {
          const updatedPoints = (s.currentPoints || 0) + trxData.points;
          return { ...s, currentPoints: updatedPoints };
        }
        return s;
      })
    );

    logAudit({
      userId: trxData.recordedById,
      userName: trxData.recordedByName,
      userRole: 'GURU',
      action: 'CREATE',
      module: 'E-Poin',
      recordId: newTrx.id,
      description: `Mencatat transaksi poin ${trxData.type} (${trxData.points > 0 ? '+' : ''}${trxData.points}) untuk siswa ${trxData.studentName}: ${trxData.reason}`
    });
  };

  const addPointCategory = (catData: Omit<PointCategory, 'id'>) => {
    const newCat: PointCategory = {
      id: `cat-${Date.now()}`,
      ...catData
    };
    setPointCategories((prev) => [...prev, newCat]);
  };

  const updatePointCategory = (id: string, updates: Partial<PointCategory>) => {
    setPointCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  // 8. PPDB
  const registerPPDBApplicant = (applicantData: Omit<PPDBApplicant, 'id' | 'registrationNumber' | 'status' | 'registeredAt'>): PPDBApplicant => {
    const count = ppdbApplicants.length + 1;
    const regNum = `PPDB-2026-${count.toString().padStart(4, '0')}`;
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const newApplicant: PPDBApplicant = {
      id: `ppdb-${Date.now()}`,
      registrationNumber: regNum,
      status: 'SUBMITTED',
      registeredAt: dateStr,
      ...applicantData
    };

    setPpdbApplicants((prev) => [newApplicant, ...prev]);
    return newApplicant;
  };

  const updatePPDBApplicantStatus = (id: string, status: PPDBApplicant['status'], notes?: string) => {
    setPpdbApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, notes: notes || a.notes } : a))
    );
    logAudit({
      userId: 'usr-admin',
      userName: 'Panitia PPDB',
      userRole: 'ADMIN',
      action: 'UPDATE',
      module: 'PPDB',
      recordId: id,
      description: `Memperbarui status pendaftar PPDB ${id} menjadi ${status}`
    });
  };

  const updatePPDBSetting = (updates: Partial<PPDBSetting>) => {
    setPpdbSetting((prev) => ({ ...prev, ...updates }));
  };

  // 9. Master Data
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      ...studentData
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  // 10. CMS News & Settings
  const addNews = (itemData: Omit<NewsItem, 'id' | 'views'>) => {
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      views: 1,
      ...itemData
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const updateNews = (id: string, updates: Partial<NewsItem>) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvt: EventItem = {
      id: `evt-${Date.now()}`,
      ...eventData
    };
    setEvents((prev) => [...prev, newEvt]);
  };

  const updateWebsiteSettings = (updates: Partial<WebsiteSettings>) => {
    setWebsiteSettings((prev) => ({ ...prev, ...updates }));
    logAudit({
      userId: 'usr-admin',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'UPDATE',
      module: 'CMS',
      recordId: 'website_settings',
      description: 'Memperbarui informasi identitas website dan kontak sekolah'
    });
  };

  const updateNavItems = (items: NavItem[]) => {
    setNavItems(items);
  };

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      ...slideData
    };
    setHeroSlides((prev) => [...prev, newSlide]);
    logAudit({
      userId: 'usr-admin',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'CREATE',
      module: 'CMS',
      recordId: newSlide.id,
      description: `Menambahkan Slide Banner Hero baru: "${newSlide.title}"`
    });
  };

  const updateHeroSlide = (id: string, updates: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    logAudit({
      userId: 'usr-admin',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'UPDATE',
      module: 'CMS',
      recordId: id,
      description: `Memperbarui Slide Banner Hero ID: ${id}`
    });
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
    logAudit({
      userId: 'usr-admin',
      userName: 'Administrator',
      userRole: 'ADMIN',
      action: 'DELETE',
      module: 'CMS',
      recordId: id,
      description: `Menghapus Slide Banner Hero ID: ${id}`
    });
  };

  const reorderHeroSlides = (slides: HeroSlide[]) => {
    const ordered = slides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setHeroSlides(ordered);
  };

  return (
    <AppContext.Provider
      value={{
        systemServices,
        addSystemService,
        updateSystemService,
        deleteSystemService,
        reorderSystemServices,

        verificationRecords,
        verifyDocument,
        addVerificationRecord,
        updateVerificationStatus,
        revokeDocument,

        letters,
        addLetter,
        updateLetter,
        approveLetter,
        signLetterETTD,

        graduationRecords,
        updateGraduationStatus,
        publishGraduation,
        batchPublishGraduation,

        teachingSchedules,
        teachingJournals,
        journals: teachingJournals,
        addTeachingJournal,
        studentGrades,
        updateStudentGrade,

        dailyAttendance,
        attendances: dailyAttendance,
        parentNotifications,
        recordAttendance,

        pointCategories,
        pointTransactions,
        studentPoints: pointTransactions,
        addPointTransaction,
        addPointCategory,
        updatePointCategory,

        ppdbApplicants,
        ppdbSetting,
        registerPPDBApplicant,
        updatePPDBApplicantStatus,
        updatePPDBSetting,

        students,
        teachers,
        classes,
        subjects,
        academicYears,
        addStudent,
        updateStudent,

        news,
        events,
        activities,
        achievements,
        gallery,
        announcements,
        navItems,
        heroSlides,
        websiteSettings,
        addNews,
        updateNews,
        deleteNews,
        addEvent,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        reorderHeroSlides,
        updateWebsiteSettings,
        updateNavItems,

        auditLogs,
        logAudit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
