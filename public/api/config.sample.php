<?php
// Copy this file to config.php (same folder) on the server and fill in the values.
// config.php is secret: never send it to anyone or put it on GitHub.
return [
    'page_id'       => 'Nimborio',          // the Page's numeric ID is safer; see README
    'page_token'    => 'PASTE_LONG_LIVED_PAGE_TOKEN_HERE',
    'app_secret'    => 'PASTE_APP_SECRET_HERE',
    'graph_version' => 'v26.0',             // update to the current Graph API version
    'cache_seconds' => 900,                 // 15 minutes
];
