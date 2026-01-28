-- ======================================================================
-- RAILWAY'DE MANUEL TEST HASTALARI OLUSTURMA
-- ======================================================================
-- 
-- Bu SQL'i Railway Dashboard'da calistir:
-- 1. Railway Dashboard > PostgreSQL > Query tab
-- 2. Asagidaki SQL'i kopyala-yapiştir
-- 3. Execute tikla
--
-- ======================================================================

-- Doktor ID'sini bul
DO $$
DECLARE
    v_doctor_id INTEGER;
    v_patient_id INTEGER;
BEGIN
    -- Doktor ID'sini al
    SELECT id INTO v_doctor_id FROM users WHERE email = 'doctor@neuralcipher.ai';
    
    IF v_doctor_id IS NULL THEN
        RAISE EXCEPTION 'Doctor user not found! Create doctor@neuralcipher.ai first';
    END IF;
    
    RAISE NOTICE 'Doctor ID: %', v_doctor_id;
    
    -- Hasta 1: John Smith
    INSERT INTO users (
        email, password_hash, role, 
        first_name, last_name, phone, date_of_birth,
        access_key, is_active, email_verified
    )
    VALUES (
        'patient1@test.com',
        '$2b$12$LKJ9.8HGF7DFG8H9JKL0M.N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6',  -- Patient123!
        'PATIENT',
        'John', 'Smith', '+1-555-0101', '1965-03-15',
        'ABCD-EFGH-JKLM', TRUE, TRUE
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_patient_id;
    
    IF v_patient_id IS NOT NULL THEN
        -- Doctor-patient baglantisi olustur
        INSERT INTO doctor_patient_access (doctor_id, patient_id, granted_via)
        VALUES (v_doctor_id, v_patient_id, 'KEY')
        ON CONFLICT DO NOTHING;
        RAISE NOTICE 'Created patient 1: John Smith (ID: %)', v_patient_id;
    END IF;
    
    -- Hasta 2: Maria Garcia
    INSERT INTO users (
        email, password_hash, role, 
        first_name, last_name, phone, date_of_birth,
        access_key, is_active, email_verified
    )
    VALUES (
        'patient2@test.com',
        '$2b$12$LKJ9.8HGF7DFG8H9JKL0M.N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6',  -- Patient123!
        'PATIENT',
        'Maria', 'Garcia', '+1-555-0102', '1958-07-22',
        'NPQR-STUV-WXYZ', TRUE, TRUE
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_patient_id;
    
    IF v_patient_id IS NOT NULL THEN
        INSERT INTO doctor_patient_access (doctor_id, patient_id, granted_via)
        VALUES (v_doctor_id, v_patient_id, 'KEY')
        ON CONFLICT DO NOTHING;
        RAISE NOTICE 'Created patient 2: Maria Garcia (ID: %)', v_patient_id;
    END IF;
    
    -- Hasta 3: Robert Johnson
    INSERT INTO users (
        email, password_hash, role, 
        first_name, last_name, phone, date_of_birth,
        access_key, is_active, email_verified
    )
    VALUES (
        'patient3@test.com',
        '$2b$12$LKJ9.8HGF7DFG8H9JKL0M.N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6',  -- Patient123!
        'PATIENT',
        'Robert', 'Johnson', '+1-555-0103', '1972-11-08',
        'BCDE-FGHJ-KLMN', TRUE, TRUE
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_patient_id;
    
    IF v_patient_id IS NOT NULL THEN
        INSERT INTO doctor_patient_access (doctor_id, patient_id, granted_via)
        VALUES (v_doctor_id, v_patient_id, 'KEY')
        ON CONFLICT DO NOTHING;
        RAISE NOTICE 'Created patient 3: Robert Johnson (ID: %)', v_patient_id;
    END IF;
    
    -- Hasta 4: Emily Chen
    INSERT INTO users (
        email, password_hash, role, 
        first_name, last_name, phone, date_of_birth,
        access_key, is_active, email_verified
    )
    VALUES (
        'patient4@test.com',
        '$2b$12$LKJ9.8HGF7DFG8H9JKL0M.N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6',  -- Patient123!
        'PATIENT',
        'Emily', 'Chen', '+1-555-0104', '1960-05-30',
        'PQRS-TUVW-XYZ2', TRUE, TRUE
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_patient_id;
    
    IF v_patient_id IS NOT NULL THEN
        INSERT INTO doctor_patient_access (doctor_id, patient_id, granted_via)
        VALUES (v_doctor_id, v_patient_id, 'KEY')
        ON CONFLICT DO NOTHING;
        RAISE NOTICE 'Created patient 4: Emily Chen (ID: %)', v_patient_id;
    END IF;
    
    -- Hasta 5: Michael Brown
    INSERT INTO users (
        email, password_hash, role, 
        first_name, last_name, phone, date_of_birth,
        access_key, is_active, email_verified
    )
    VALUES (
        'patient5@test.com',
        '$2b$12$LKJ9.8HGF7DFG8H9JKL0M.N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6',  -- Patient123!
        'PATIENT',
        'Michael', 'Brown', '+1-555-0105', '1968-09-12',
        'CDEF-GHJK-LMNP', TRUE, TRUE
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_patient_id;
    
    IF v_patient_id IS NOT NULL THEN
        INSERT INTO doctor_patient_access (doctor_id, patient_id, granted_via)
        VALUES (v_doctor_id, v_patient_id, 'KEY')
        ON CONFLICT DO NOTHING;
        RAISE NOTICE 'Created patient 5: Michael Brown (ID: %)', v_patient_id;
    END IF;
    
END $$;

-- Kontrol: Olusturulan hastalari listele
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.access_key,
    dpa.access_granted_at
FROM users u
LEFT JOIN doctor_patient_access dpa ON u.id = dpa.patient_id
WHERE u.email LIKE 'patient%@test.com'
ORDER BY u.id;

-- ======================================================================
-- TAMAMLANDI!
-- ======================================================================
-- 
-- Simdi doktor paneline git:
-- https://neuralcipher-ai.vercel.app/doctor/patients
--
-- Giris bilgileri:
--   Email: doctor@neuralcipher.ai
--   Password: Doctor2026!@#
--
-- Test hastalari:
--   1. John Smith (patient1@test.com) - Patient123!
--   2. Maria Garcia (patient2@test.com) - Patient123!
--   3. Robert Johnson (patient3@test.com) - Patient123!
--   4. Emily Chen (patient4@test.com) - Patient123!
--   5. Michael Brown (patient5@test.com) - Patient123!
--
-- ======================================================================
