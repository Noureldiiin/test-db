<?php
$redis = new Redis();
$redis->connect('redis-18276.c304.europe-west1-2.gce.cloud.redislabs.com', 18276);

// Get all patient keys from Redis
$patientKeys = $redis->keys("patient:*");

// Output patient details as an HTML list
foreach ($patientKeys as $key) {
    $patientData = $redis->hgetall($key);
    echo "<li>{$patientData['name']} - {$patientData['testType']}</li>";
}
?>
