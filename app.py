from flask import Flask, render_template, request, jsonify
import redis

app = Flask(__name__)
r = redis.Redis(
    host='redis-18276.c304.europe-west1-2.gce.cloud.redislabs.com',
    port=18276,
    password='123456'
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_patient', methods=['POST'])
def add_patient():
    patient_id = request.form['patient_id']
    name = request.form['name']
    age = request.form['age']
    diagnosis = request.form['diagnosis']

    patient_details = {
        'name': name,
        'age': age,
        'diagnosis': diagnosis
    }
    r.hmset(f'patient:{patient_id}', patient_details)

    return jsonify({'message': f'Patient {patient_id} added successfully'})

@app.route('/view_patient/<patient_id>')
def view_patient(patient_id):
    patient_details = r.hgetall(f'patient:{patient_id}')
    if patient_details:
        return render_template('view_patient.html', patient_id=patient_id, patient_details=patient_details)
    else:
        return jsonify({'error': f'Patient with ID {patient_id} not found'})

if __name__ == '__main__':
    app.run(debug=True)
