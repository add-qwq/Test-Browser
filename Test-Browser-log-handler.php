<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['userAgent'], $data['timestamp'], $data['unsupportedReasons'])) {
    http_response_code(400);
    exit;
}

$logEntry = "===== " . date('Y-m-d H:i:s') . " =====\n" .
            "设备类型: " . $data['deviceType'] . "\n" .
            "浏览器标识: " . $data['userAgent'] . "\n" .
            "访问URL: " . $data['url'] . "\n" .
            "不支持的功能:\n" .
            "- " . implode("\n- ", $data['unsupportedReasons']) . "\n" .
            "=======================================\n\n";

$logFile = '/Test-Browser/Test-Browser.log';
file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

http_response_code(200);
?>