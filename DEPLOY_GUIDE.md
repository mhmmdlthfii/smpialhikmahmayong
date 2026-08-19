# 📘 PANDUAN DEPLOY OTOMATIS KE HOSTINGER & INTEGRASI DATABASE

Website **SMP Islam Al Hikmah Mayong** telah siap di-deploy secara otomatis dari **GitHub** ke **Hostinger**, dengan basis data MySQL mandiri agar data sekolah (BOSP, Guru, Siswa, Berkas ETTD, PPDB) **tidak akan pernah hilang atau ter-reset** saat kita mengedit UI/UX bersama AI Studio di masa mendatang.

---

## 📑 DAFTAR ISI
1. [Langkah 1: Setup Database di Hostinger (phpMyAdmin)](#langkah-1-setup-database-di-hostinger-phpmyadmin)
2. [Langkah 2: Konfigurasi Kredensial Database di Hostinger](#langkah-2-konfigurasi-kredensial-database-di-hostinger)
3. [Langkah 3: Push Kode ke GitHub](#langkah-3-push-kode-ke-github)
4. [Langkah 4: Pengaturan GitHub Secrets untuk Auto-Deploy](#langkah-4-pengaturan-github-secrets-untuk-auto-deploy)
5. [Struktur File Penting yang Sudah Dibuat](#struktur-file-penting-yang-sudah-dibuat)

---

## 🗄️ Langkah 1: Setup Database di Hostinger (phpMyAdmin)

1. Buka **hPanel Hostinger** Anda.
2. Masuk ke menu **Databases > MySQL Databases**.
3. Buat database baru:
   - **Database Name**: misal `u123456_smpalhikmah`
   - **Username**: misal `u123456_user`
   - **Password**: Buat password yang kuat (catat password ini).
4. Klik tombol **Enter phpMyAdmin**.
5. Di phpMyAdmin, klik tab **Import** (Impor).
6. Pilih file `database.sql` yang ada di root repository ini, lalu klik **Go / Kirim**.
7. Semua tabel (`teachers`, `bosp_reports`, `surat_ettd`, `website_settings`, `users`, dll) beserta data awal akan langsung terbuat!

---

## 🔑 Langkah 2: Konfigurasi Kredensial Database di Hostinger

Buka file `public/api/config.php` di File Manager Hostinger (atau atur variabel environment):
```php
$db_host = 'localhost';
$db_user = 'u123456_user';        // Sesuaikan dengan Username di Hostinger
$db_pass = 'PasswordAnda123!';    // Sesuaikan dengan Password di Hostinger
$db_name = 'u123456_smpalhikmah'; // Sesuaikan dengan Nama Database di Hostinger
```

---

## 🐙 Langkah 3: Push Kode ke GitHub

Inisialisasi git dan push ke repository GitHub Anda:
```bash
git add .
git commit -m "feat: setup full-stack react vite and hostinger auto deploy"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_ANDA.git
git push -u origin main
```

---

## ⚡ Langkah 4: Pengaturan GitHub Secrets untuk Auto-Deploy

Agar setiap kali Anda melakukan `git push` atau menyimpan perubahan di GitHub, website di Hostinger otomatis ter-update:

1. Di akun GitHub Anda, buka repository web ini.
2. Klik tab **Settings** > **Secrets and variables** > **Actions**.
3. Klik tombol **New repository secret**, tambahkan 3 secret berikut (didapat dari menu **Files > FTP Accounts** di hPanel Hostinger):

| Nama Secret | Deskripsi / Contoh |
|---|---|
| `HOSTINGER_FTP_SERVER` | Alamat IP atau hostname FTP Hostinger (contoh: `ftp.smpislamalhikmahmayong.sch.id` atau `185.xxx.xxx.xxx`) |
| `HOSTINGER_FTP_USERNAME` | Akun Username FTP Hostinger Anda |
| `HOSTINGER_FTP_PASSWORD` | Password FTP Hostinger Anda |

> 💡 **Selesai!** Setiap kali Anda push ke branch `main`, GitHub Actions (`.github/workflows/deploy.yml`) akan:
> - Meng-compile React + Vite menjadi file produksi berkinerja tinggi.
> - Menyertakan `.htaccess` untuk mendukung URL SPA modern.
> - Mengunggah file ke direktori `public_html/` di Hostinger secara otomatis.

---

## 📂 Struktur File Penting yang Sudah Dibuat

1. **`.github/workflows/deploy.yml`**: Skrip otomatisasi build & deploy GitHub ke Hostinger.
2. **`database.sql`**: Skema lengkap database MySQL sekolah siap pakai.
3. **`public/.htaccess`**: Konfigurasi routing URL peramban & kompresi Gzip/Brotli.
4. **`public/api/config.php` & `public/api/index.php`**: REST API bridge bawaan yang menghubungkan UI website dengan database MySQL Hostinger.
