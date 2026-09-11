<?php
/**
 * سكريبت جلب مباريات اليوم أوتوماتيكياً مع نظام كاش لمنع الحظر
 * يعمل تلقائياً يومياً بدون أي تدخل يدوي
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. توليد تاريخ اليوم ديناميكياً بصيغة YYYY-MM-DD بتوقيت مكة المكرمة
date_default_timezone_set('Asia/Riyadh');
$todayDate = date('Y-m-d');

// إمكانية تمرير تاريخ مخصص عبر الرابط ?date=2026-09-11 أو ?date=yesterday أو ?date=tomorrow
$dateParam = isset($_GET['date']) ? trim($_GET['date']) : '';

if ($dateParam === 'yesterday') {
    $targetDate = date('Y-m-d', strtotime('-1 day'));
} elseif ($dateParam === 'tomorrow') {
    $targetDate = date('Y-m-d', strtotime('+1 day'));
} elseif (!empty($dateParam)) {
    $cleanDate = preg_replace('/[^0-9-]/', '', $dateParam);
    $targetDate = preg_match('/^\d{4}-\d{2}-\d{2}$/', $cleanDate) ? $cleanDate : $todayDate;
} else {
    $targetDate = $todayDate;
}

// 2. إعداد مسار ملف الكاش المؤقت (لمنع حظر عنوان الـ IP الخاص بسيرفرك)
$cacheDir = sys_get_temp_dir() . "/kora_cache";
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0777, true);
}
$cacheFile = $cacheDir . "/matches_" . $targetDate . ".json";
$cacheTTL = ($targetDate === $todayDate) ? 30 : 600; // 30 ثانية لليوم، 10 دقائق للأيام السابقة واللاحقة

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTTL)) {
    header('X-Cache: HIT');
    echo file_get_contents($cacheFile);
    exit;
}

// 3. إنشاء رابط الـ API مع التاريخ الديناميكي
$apiUrl = "https://api-ar.ysscores.com/api/matches/matches_date_get/" . $targetDate . "/%5B%5D/%5B%5D/%5B%5D/D/180";

// 4. إرسال الطلب عبر cURL مع ترويسات متصفح حقيقي لتجنب حظر Cloudflare
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept: application/json, text/plain, */*',
    'Referer: https://ysscores.com/',
    'Origin: https://ysscores.com'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// 5. التحقق من النتيجة وتخزينها في الكاش
if ($httpCode === 200 && !empty($response)) {
    $decoded = json_decode($response, true);
    if ($decoded !== null && isset($decoded['data'])) {
        @file_put_contents($cacheFile, $response);
        header('X-Cache: MISS');
        echo $response;
        exit;
    }
}

// في حال تعذر الاتصال يتم إرجاع آخر كاش متوفر حتى لو انتهت صلاحيته
if (file_exists($cacheFile)) {
    header('X-Cache: STALE');
    echo file_get_contents($cacheFile);
} else {
    http_response_code(502);
    echo json_encode([
        "status" => false,
        "message" => "فشل جلب البيانات من المصدر",
        "error" => $curlError
    ], JSON_UNESCAPED_UNICODE);
}
?>
