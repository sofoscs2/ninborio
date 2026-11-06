<?php
/**
 * Latest posts of the Nimborio Facebook Page as JSON, for the "Νέα" section.
 * The Page token stays here on the server; the browser only sees the posts.
 * Results are cached for 15 minutes so Facebook is called rarely.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
header('X-Content-Type-Options: nosniff');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    http_response_code(503);
    echo json_encode(['error' => 'not_configured']);
    exit;
}
$cfg = require $configFile;

$cacheFile = __DIR__ . '/cache/facebook.json';
$ttl = (int)($cfg['cache_seconds'] ?? 900);

if (is_file($cacheFile) && time() - filemtime($cacheFile) < $ttl) {
    readfile($cacheFile);
    exit;
}

$query = [
    'fields'       => 'id,message,full_picture,permalink_url,created_time,status_type,'
                    . 'attachments{media_type,media,url,title,subattachments.limit(10){media,media_type}}',
    'limit'        => 13,
    'access_token' => $cfg['page_token'],
];
$secret = (string)($cfg['app_secret'] ?? '');
if ($secret !== '' && strpos($secret, 'PASTE_') !== 0) {
    // Proves the call comes from our app, so a leaked token alone is less useful.
    $query['appsecret_proof'] = hash_hmac('sha256', (string)$cfg['page_token'], $secret);
}
$url = sprintf(
    'https://graph.facebook.com/%s/%s/posts?%s',
    $cfg['graph_version'] ?? 'v26.0',
    rawurlencode((string)$cfg['page_id']),
    http_build_query($query)
);

$raw = fetch_url($url);
$data = $raw ? json_decode($raw, true) : null;

if (!is_array($data) || !isset($data['data'])) {
    // Facebook unavailable or token problem: serve the last good copy if we have one.
    if (is_file($cacheFile)) { readfile($cacheFile); exit; }
    error_log('nimborio facebook.php: ' . (is_array($data) ? ($data['error']['message'] ?? 'bad response') : 'no response'));
    http_response_code(502);
    echo json_encode(['error' => 'facebook_unavailable']);
    exit;
}

$posts = [];
foreach ($data['data'] as $p) {
    $text = trim((string)($p['message'] ?? ''));
    $att = $p['attachments']['data'][0] ?? [];

    // All photos of the post (albums have "subattachments"), largest version Facebook gives.
    $images = [];
    foreach (($att['subattachments']['data'] ?? [$att]) as $a) {
        $src = $a['media']['image']['src'] ?? null;
        if ($src) $images[] = $src;
    }
    if (!$images && !empty($p['full_picture'])) $images[] = $p['full_picture'];

    $mediaType = strtolower((string)($att['media_type'] ?? ''));
    $type = match (true) {
        str_contains($mediaType, 'video')  => 'video',
        $mediaType === 'event'             => 'event',
        count($images) > 1                 => 'album',
        count($images) === 1               => 'photo',
        default                            => 'text',
    };

    if ($text === '' && !$images) continue;
    $posts[] = [
        'id'     => preg_replace('/\D+/', '-', (string)($p['id'] ?? '')),
        'text'   => $text,
        'images' => array_slice($images, 0, 10),
        'type'   => $type,
        'url'    => $p['permalink_url'] ?? null,
        'date'   => $p['created_time'] ?? null,
    ];
}

$json = json_encode(['posts' => $posts, 'updated' => date('c')], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if (!is_dir(dirname($cacheFile))) @mkdir(dirname($cacheFile), 0755, true);
@file_put_contents($cacheFile, $json, LOCK_EX);
echo $json;

function fetch_url(string $url): ?string
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_CONNECTTIMEOUT => 5]);
        $out = curl_exec($ch);
        curl_close($ch);
        return $out === false ? null : $out;
    }
    $ctx = stream_context_create(['http' => ['timeout' => 8, 'ignore_errors' => true]]);
    $out = @file_get_contents($url, false, $ctx);
    return $out === false ? null : $out;
}
