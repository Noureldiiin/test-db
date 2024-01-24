function addPatient() {
    const form = document.getElementById('addPatientForm');
    const formData = new FormData(form);

    fetch('/add_patient', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        form.reset();
    })
    .catch(error => console.error('Error:', error));
}

function viewPatient(patientId) {
    fetch(`/view_patient/${patientId}`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('viewPatientDiv').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}
