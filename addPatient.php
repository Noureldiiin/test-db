<?php
$redis = new Redis();
$redis->connect('redis-18276.c304.europe-west1-2.gce.cloud.redislabs.com', 18276);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientName = $_POST["patientName"];
    $testType = $_POST["testType"];

    // Add patient to Redis
    $redis->hmset("patient:$patientName", "name", $patientName, "testType", $testType);
}
?>
