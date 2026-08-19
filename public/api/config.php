<?php
/**
 * SMP ISLAM AL HIKMAH MAYONG - DATABASE CONFIGURATION (HOSTINGER)
 * Ubah kredensial di bawah ini sesuai informasi database di hPanel Hostinger Anda.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Konfigurasi Database Hostinger (Bisa diatur langsung di file ini atau lewat .env)
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_user = getenv('DB_USER') ?: 'u123456_smpalhikmah'; // Ganti dengan Username Database Hostinger
$db_pass = getenv('DB_PASS') ?: 'PasswordKuatDatabase123!'; // Ganti dengan Password Database Hostinger
$db_name = getenv('DB_NAME') ?: 'u123456_smpalhikmah'; // Ganti dengan Nama Database Hostinger

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    // Mode fallback jika database belum dikonfigurasi di Hostinger
    $pdo = null;
}
