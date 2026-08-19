<?php
/**
 * SMP ISLAM AL HIKMAH MAYONG - MAIN REST API ROUTER (HOSTINGER)
 */

require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_GET['endpoint'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

// Helper function JSON response
function sendJson($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

if (!$pdo) {
    sendJson([
        'status' => 'offline_mode',
        'message' => 'Database Hostinger belum tersambung. Aplikasi beroperasi dengan fallback data lokal.',
        'timestamp' => date('Y-m-d H:i:s')
    ], 200);
}

try {
    switch ($action) {
        // 1. Ambil Pengaturan Website Sekolah
        case 'settings':
            $stmt = $pdo->query("SELECT * FROM website_settings LIMIT 1");
            $settings = $stmt->fetch();
            sendJson(['status' => 'success', 'data' => $settings ?: []]);
            break;

        // 2. Ambil Data Dewan Guru & Pendidik
        case 'teachers':
            $stmt = $pdo->query("SELECT * FROM teachers WHERE is_active = 1 ORDER BY id ASC");
            $teachers = $stmt->fetchAll();
            foreach ($teachers as &$t) {
                $t['subjects'] = json_decode($t['subjects_json'] ?? '[]', true);
                unset($t['subjects_json']);
            }
            sendJson(['status' => 'success', 'data' => $teachers]);
            break;

        // 3. Ambil Laporan Transparansi BOSP
        case 'bosp':
            $tahun = (int)($_GET['tahun'] ?? 2026);
            $stmt = $pdo->prepare("SELECT * FROM bosp_reports WHERE fiscal_year = :year LIMIT 1");
            $stmt->execute(['year' => $tahun]);
            $report = $stmt->fetch();

            if ($report) {
                $stmtExp = $pdo->prepare("SELECT component_name, budgeted_amount, realized_amount, percentage FROM bosp_expenses WHERE report_id = :id");
                $stmtExp->execute(['id' => $report['id']]);
                $report['expenses'] = $stmtExp->fetchAll();
            }

            sendJson(['status' => 'success', 'data' => $report ?: null]);
            break;

        // 4. Verifikasi Surat ETTD
        case 'verify':
            $token = trim($_GET['token'] ?? '');
            if (empty($token)) {
                sendJson(['status' => 'error', 'message' => 'Token verifikasi wajib disertakan'], 400);
            }

            $stmt = $pdo->prepare("SELECT * FROM surat_ettd WHERE verification_token = :token OR nomor_surat = :token LIMIT 1");
            $stmt->execute(['token' => $token]);
            $doc = $stmt->fetch();

            if ($doc) {
                sendJson(['status' => 'success', 'isValid' => true, 'data' => $doc]);
            } else {
                sendJson(['status' => 'not_found', 'isValid' => false, 'message' => 'Dokumen tidak ditemukan dalam basis data arsip resmi'], 404);
            }
            break;

        // 5. Submit Pendaftaran Siswa Baru (PPDB)
        case 'ppdb_submit':
            if ($method !== 'POST') {
                sendJson(['status' => 'error', 'message' => 'Method POST diperlukan'], 405);
            }

            $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
            $regNo = 'PPDB-' . date('Y') . '-' . rand(1000, 9999);

            $stmt = $pdo->prepare("INSERT INTO ppdb_registrations (registration_no, full_name, nisn, gender, birth_place, birth_date, parent_name, parent_phone, previous_school, pathway, status) VALUES (:reg_no, :name, :nisn, :gender, :b_place, :b_date, :p_name, :p_phone, :prev_sch, :pathway, 'PENDING')");
            
            $stmt->execute([
                'reg_no' => $regNo,
                'name' => $input['fullName'] ?? 'Calon Santri',
                'nisn' => $input['nisn'] ?? '',
                'gender' => $input['gender'] ?? 'L',
                'b_place' => $input['birthPlace'] ?? 'Jepara',
                'b_date' => $input['birthDate'] ?? date('Y-m-d'),
                'p_name' => $input['parentName'] ?? '',
                'p_phone' => $input['parentPhone'] ?? '',
                'prev_sch' => $input['previousSchool'] ?? 'SD/MI',
                'pathway' => $input['pathway'] ?? 'REGULER'
            ]);

            sendJson([
                'status' => 'success',
                'message' => 'Pendaftaran PPDB berhasil disimpan di database Hostinger!',
                'registrationNo' => $regNo
            ], 201);
            break;

        default:
            sendJson([
                'status' => 'online',
                'service' => 'SMP Islam Al Hikmah Mayong API Service',
                'version' => '2.0.0',
                'available_endpoints' => ['settings', 'teachers', 'bosp', 'verify', 'ppdb_submit']
            ]);
            break;
    }
} catch (Exception $e) {
    sendJson([
        'status' => 'error',
        'message' => $e->getMessage()
    ], 500);
}
