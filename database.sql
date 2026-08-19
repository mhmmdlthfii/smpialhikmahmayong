-- ==============================================================================
-- SMP ISLAM AL HIKMAH MAYONG - DATABASE SCHEMA (HOSTINGER MYSQL / PHPMYADMIN)
-- Karakter Set: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

-- ------------------------------------------------------------------------------
-- 1. Tabel: website_settings (Pengaturan Identitas & Metadata Sekolah)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `website_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_name` VARCHAR(255) NOT NULL DEFAULT 'SMP Islam Al Hikmah Mayong',
  `npsn` VARCHAR(50) NOT NULL DEFAULT '20318357',
  `akreditasi` VARCHAR(10) NOT NULL DEFAULT 'A',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Mencetak Generasi Qurani yang Unggul, Cerdas Berkarakter, dan Berdaya Saing Global',
  `address` TEXT NOT NULL,
  `phone` VARCHAR(50) NOT NULL DEFAULT '0812-2567-8910',
  `email` VARCHAR(100) NOT NULL DEFAULT 'smpislamalhikmahmayong@gmail.com',
  `website` VARCHAR(255) NOT NULL DEFAULT 'https://smpislamalhikmahmayong.sch.id',
  `principal_name` VARCHAR(255) NOT NULL DEFAULT 'M.Syafi\'i, S.Th.I',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `website_settings` (`school_name`, `npsn`, `akreditasi`, `tagline`, `address`, `phone`, `email`, `website`, `principal_name`)
VALUES (
  'SMP Islam Al Hikmah Mayong',
  '20318357',
  'A',
  'Mencetak Generasi Qurani yang Unggul, Cerdas Berkarakter, dan Berdaya Saing Global',
  'Jl. Raya Mayong - Welahan No. 45, Mayong, Kabupaten Jepara, Jawa Tengah 59465',
  '0812-2567-8910',
  'smpislamalhikmahmayong@gmail.com',
  'https://smpislamalhikmahmayong.sch.id',
  'M.Syafi\'i, S.Th.I'
) ON DUPLICATE KEY UPDATE `school_name` = VALUES(`school_name`);

-- ------------------------------------------------------------------------------
-- 2. Tabel: users (Pengguna Portal SSO & CMS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` ENUM('SUPER_ADMIN', 'ADMIN', 'KEPALA_SEKOLAH', 'TU', 'GURU', 'WALI_KELAS', 'SISWA', 'ORANG_TUA') NOT NULL DEFAULT 'GURU',
  `roles_json` JSON DEFAULT NULL,
  `avatar_url` TEXT DEFAULT NULL,
  `nip_nisn` VARCHAR(50) DEFAULT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `email`, `password_hash`, `name`, `role`, `roles_json`, `avatar_url`, `nip_nisn`, `phone`)
VALUES
('usr-admin-1', 'admin@smpislamalhikmahmayong.sch.id', '$2y$10$e.w2z/3g9l8k6j7h8g9f0e1d2c3b4a5', 'M. Luthfi, S.Pd., Gr', 'SUPER_ADMIN', '["SUPER_ADMIN", "ADMIN", "TU"]', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', '19950823 202201 1 002', '0812-2567-8910'),
('usr-kepsek-1', 'kepsek@smpislamalhikmahmayong.sch.id', '$2y$10$e.w2z/3g9l8k6j7h8g9f0e1d2c3b4a5', 'M.Syafi\'i, S.Th.I', 'KEPALA_SEKOLAH', '["KEPALA_SEKOLAH"]', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '19790412 200501 1 003', '0812-2567-8910'),
('usr-guru-1', 'guru@smpislamalhikmahmayong.sch.id', '$2y$10$e.w2z/3g9l8k6j7h8g9f0e1d2c3b4a5', 'Ahmad Zainuddin, S.Pd.I', 'GURU', '["GURU", "WALI_KELAS"]', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '19820510 200801 1 012', '081234567890')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ------------------------------------------------------------------------------
-- 3. Tabel: teachers (Dewan Guru & Tenaga Kependidikan)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `nip` VARCHAR(50) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `category` ENUM('KEPALA', 'GURU', 'TAHFIDZ', 'STAFF') NOT NULL DEFAULT 'GURU',
  `education` VARCHAR(255) NOT NULL,
  `subjects_json` JSON NOT NULL,
  `photo_url` TEXT NOT NULL,
  `experience` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `badge` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `teachers` (`id`, `name`, `nip`, `role`, `category`, `education`, `subjects_json`, `photo_url`, `experience`, `email`, `phone`, `badge`)
VALUES
('tch-principal', 'M.Syafi\'i, S.Th.I', '19790412 200501 1 003', 'Kepala Sekolah & Pembina Tahfidz', 'KEPALA', 'S1 Tafsir Hadits - UIN Walisongo', '["Pendidikan Karakter Islami", "Tahfidz Juz 30"]', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', '20 Tahun Pengabdian', 'syafii@smpislamalhikmahmayong.sch.id', '0812-2567-8910', 'Kepala Sekolah'),
('tch-1', 'Ahmad Zainuddin, S.Pd.I', '19820510 200801 1 012', 'Waka Kurikulum & Guru PAI', 'GURU', 'S1 PAI - UNISNU Jepara', '["PAI & Budi Pekerti", "Fiqih"]', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '16 Tahun Pengabdian', 'zainuddin@smpislamalhikmahmayong.sch.id', '081234567890', 'Waka Kurikulum'),
('tch-2', 'Siti Nurhaliza, S.Pd.', '19880314 201101 2 008', 'Waka Kesiswaan & Guru Bahasa Indonesia', 'GURU', 'S1 Pendidikan Bahasa Indonesia - UNNES', '["Bahasa Indonesia", "Jurnalistik Santri"]', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', '12 Tahun Pengabdian', 'siti@smpislamalhikmahmayong.sch.id', '081399887766', 'Waka Kesiswaan')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ------------------------------------------------------------------------------
-- 4. Tabel: bosp_reports & bosp_expenses (Laporan Transparansi Dana BOSP)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bosp_reports` (
  `id` VARCHAR(50) PRIMARY KEY,
  `fiscal_year` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `stage` VARCHAR(100) NOT NULL,
  `total_budget` BIGINT NOT NULL,
  `total_realized` BIGINT NOT NULL,
  `regular_amount` BIGINT NOT NULL,
  `performance_amount` BIGINT NOT NULL,
  `pdf_url` TEXT NOT NULL,
  `verification_code` VARCHAR(100) NOT NULL,
  `status` ENUM('AKTIF', 'RENCANA', 'PROYEKSI') NOT NULL DEFAULT 'AKTIF',
  `last_updated` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `bosp_expenses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `report_id` VARCHAR(50) NOT NULL,
  `component_name` VARCHAR(255) NOT NULL,
  `budgeted_amount` BIGINT NOT NULL,
  `realized_amount` BIGINT NOT NULL,
  `percentage` INT NOT NULL,
  FOREIGN KEY (`report_id`) REFERENCES `bosp_reports`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bosp_reports` (`id`, `fiscal_year`, `title`, `stage`, `total_budget`, `total_realized`, `regular_amount`, `performance_amount`, `pdf_url`, `verification_code`, `status`, `last_updated`)
VALUES
('bosp-2026', 2026, 'Laporan Realisasi Dana BOSP Tahun Anggaran 2026', 'Tahap I & II (Tahun Berjalan)', 485600000, 398450000, 425600000, 60000000, 'https://smpislamalhikmahmayong.sch.id/docs/bosp/LPJ_BOSP_2026.pdf', 'BOSP-2026-AHM-BSRE', 'AKTIF', '15 Februari 2026'),
('bosp-2027', 2027, 'Rencana Kegiatan dan Anggaran Sekolah (RKAS) BOSP 2027', 'Rencana Anggaran Tahunan (Draft RKAS)', 512000000, 0, 442000000, 70000000, 'https://smpislamalhikmahmayong.sch.id/docs/bosp/DRAFT_RKAS_BOSP_2027.pdf', 'RKAS-2027-DRAFT-AHM', 'RENCANA', '10 Januari 2026'),
('bosp-2028', 2028, 'Proyeksi Rencana Jangka Menengah BOSP 2028', 'Proyeksi Pagu Indikatif', 538000000, 0, 460000000, 78000000, 'https://smpislamalhikmahmayong.sch.id/docs/bosp/PROYEKSI_BOSP_2028.pdf', 'PROYEKSI-2028-AHM', 'PROYEKSI', '05 Januari 2026')
ON DUPLICATE KEY UPDATE `total_budget` = VALUES(`total_budget`);

-- ------------------------------------------------------------------------------
-- 5. Tabel: surat_ettd (Surat & Dokumen Ber-Tanda Tangan Elektronik)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `surat_ettd` (
  `id` VARCHAR(50) PRIMARY KEY,
  `nomor_surat` VARCHAR(150) NOT NULL UNIQUE,
  `perihal` VARCHAR(255) NOT NULL,
  `jenis_surat` VARCHAR(100) NOT NULL,
  `penerima` VARCHAR(255) NOT NULL,
  `pengirim` VARCHAR(255) NOT NULL DEFAULT 'SMP Islam Al Hikmah Mayong',
  `penandatangan` VARCHAR(255) NOT NULL DEFAULT 'M.Syafi\'i, S.Th.I',
  `tanggal_surat` DATE NOT NULL,
  `verification_token` VARCHAR(100) NOT NULL UNIQUE,
  `hash_sha256` VARCHAR(64) NOT NULL,
  `status_tte` ENUM('TERVERIFIKASI_BSRE', 'VALID_SEKOLAH', 'DIPROSES', 'KEDALUWARSA') NOT NULL DEFAULT 'TERVERIFIKASI_BSRE',
  `file_url` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `surat_ettd` (`id`, `nomor_surat`, `perihal`, `jenis_surat`, `penerima`, `penandatangan`, `tanggal_surat`, `verification_token`, `hash_sha256`, `status_tte`, `file_url`)
VALUES
('srt-001', '421.3/089/SMP.AHM/II/2026', 'Surat Keterangan Aktif Belajar Santri', 'Surat Keterangan', 'Ahmad Farhan Kamil', 'M.Syafi\'i, S.Th.I', '2026-02-15', 'TTE-2026-AHM-089', 'a3f89e1b7c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f', 'TERVERIFIKASI_BSRE', 'https://smpislamalhikmahmayong.sch.id/docs/ettd/SK_089_2026.pdf')
ON DUPLICATE KEY UPDATE `nomor_surat` = VALUES(`nomor_surat`);

-- ------------------------------------------------------------------------------
-- 6. Tabel: student_journalism (Karya Jurnalistik & Mading Digital Santri)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `student_journalism` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `author_name` VARCHAR(255) NOT NULL,
  `author_class` VARCHAR(50) NOT NULL,
  `author_role` VARCHAR(150) NOT NULL,
  `date_published` VARCHAR(100) NOT NULL,
  `summary` TEXT NOT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `image_url` TEXT NOT NULL,
  `read_time` VARCHAR(50) NOT NULL,
  `tags_json` JSON NOT NULL,
  `views` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Tabel: ppdb_registrations (Pendaftaran Calon Santri Baru)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ppdb_registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration_no` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(255) NOT NULL,
  `nisn` VARCHAR(30) NOT NULL,
  `gender` ENUM('L', 'P') NOT NULL,
  `birth_place` VARCHAR(100) NOT NULL,
  `birth_date` DATE NOT NULL,
  `parent_name` VARCHAR(255) NOT NULL,
  `parent_phone` VARCHAR(50) NOT NULL,
  `previous_school` VARCHAR(255) NOT NULL,
  `pathway` ENUM('REGULER', 'TAHFIDZ', 'PRESTASI', 'AFIRMASI') NOT NULL DEFAULT 'REGULER',
  `status` ENUM('PENDING', 'VERIFIKASI', 'LULUS', 'CADANGAN', 'DITOLAK') NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
