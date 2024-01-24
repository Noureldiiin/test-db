// JavaScript to handle adding patients and fetching patient list

function addPatient() {
    var patientName = document.getElementById("patientName").value;
    var testType = document.getElementById("testType").value;

    // Send data to PHP script for adding to Redis
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "addPatient.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Refresh patient list after adding
            getPatients();
        }
    };
    xhr.send("patientName=" + patientName + "&testType=" + testType);
}

function getPatients() {
    // Fetch patient list from PHP script
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "getPatients.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the patient list on the webpage
            document.getElementById("patients").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Fetch initial patient list when the page loads
window.onload = getPatients;
