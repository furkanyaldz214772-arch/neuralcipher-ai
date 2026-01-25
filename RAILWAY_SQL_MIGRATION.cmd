@echo off
echo ========================================
echo Railway Database Migration
echo ========================================
echo.

echo Step 1: Login to Railway
railway login
echo.

echo Step 2: Link to your project
railway link
echo.

echo Step 3: Connect to PostgreSQL
echo Running SQL migration...
echo.

railway run psql -c "CREATE TABLE IF NOT EXISTS doctor_patients (id SERIAL PRIMARY KEY, doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE, UNIQUE(doctor_id, patient_id)); CREATE INDEX IF NOT EXISTS ix_doctor_patients_doctor_id ON doctor_patients(doctor_id); CREATE INDEX IF NOT EXISTS ix_doctor_patients_patient_id ON doctor_patients(patient_id);"

echo.
echo ========================================
echo Migration Complete!
echo ========================================
echo.
echo Test at: https://neuralcipher.ai
echo.
pause
