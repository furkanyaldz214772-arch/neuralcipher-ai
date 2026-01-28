"""
Add test patients to Railway database and link them to doctor
"""
import psycopg2
from passlib.context import CryptContext
import random
import string
import os
from datetime import datetime, timedelta

# Railway PostgreSQL connection - get from environment or use fallback
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ DATABASE_URL environment variable not set!")
    print()
    print("Please set DATABASE_URL from Railway dashboard:")
    print("1. Go to https://railway.app/project/your-project")
    print("2. Click on PostgreSQL service")
    print("3. Go to 'Connect' tab")
    print("4. Copy 'Postgres Connection URL'")
    print("5. Run: set DATABASE_URL=<your-url>")
    print()
    exit(1)

# Password hasher
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Characters for access key (excluding ambiguous: 0, O, I, 1)
KEY_CHARS = ''.join(c for c in string.ascii_uppercase + string.digits if c not in '01IO')


def generate_access_key():
    """Generate unique access key in format XXXX-XXXX-XXXX"""
    key_chars = ''.join(random.choice(KEY_CHARS) for _ in range(12))
    return f"{key_chars[0:4]}-{key_chars[4:8]}-{key_chars[8:12]}"


def create_test_patients():
    """Create test patients and link them to doctor"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        
        # Find doctor user
        cur.execute("SELECT id FROM users WHERE email = %s", ("doctor@neuralcipher.ai",))
        doctor = cur.fetchone()
        
        if not doctor:
            print("❌ Doctor user not found! Please create doctor@neuralcipher.ai first")
            return
        
        doctor_id = doctor[0]
        print(f"✅ Found doctor (ID: {doctor_id})")
        print()
        
        # Test patients data
        test_patients = [
            {
                "email": "patient1@test.com",
                "password": "Patient123!",
                "first_name": "John",
                "last_name": "Smith",
                "phone": "+1-555-0101",
                "date_of_birth": "1965-03-15"
            },
            {
                "email": "patient2@test.com",
                "password": "Patient123!",
                "first_name": "Maria",
                "last_name": "Garcia",
                "phone": "+1-555-0102",
                "date_of_birth": "1958-07-22"
            },
            {
                "email": "patient3@test.com",
                "password": "Patient123!",
                "first_name": "Robert",
                "last_name": "Johnson",
                "phone": "+1-555-0103",
                "date_of_birth": "1972-11-08"
            },
            {
                "email": "patient4@test.com",
                "password": "Patient123!",
                "first_name": "Emily",
                "last_name": "Chen",
                "phone": "+1-555-0104",
                "date_of_birth": "1960-05-30"
            },
            {
                "email": "patient5@test.com",
                "password": "Patient123!",
                "first_name": "Michael",
                "last_name": "Brown",
                "phone": "+1-555-0105",
                "date_of_birth": "1968-09-12"
            }
        ]
        
        created_patients = []
        
        for patient_data in test_patients:
            # Check if patient already exists
            cur.execute("SELECT id FROM users WHERE email = %s", (patient_data["email"],))
            existing = cur.fetchone()
            
            if existing:
                patient_id = existing[0]
                print(f"⚠️  Patient already exists: {patient_data['email']} (ID: {patient_id})")
            else:
                # Hash password
                hashed_password = pwd_context.hash(patient_data["password"])
                
                # Generate access key
                access_key = generate_access_key()
                
                # Create patient user
                cur.execute("""
                    INSERT INTO users (
                        email, password_hash, role, 
                        first_name, last_name, phone, date_of_birth,
                        access_key, is_active, email_verified
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    patient_data["email"],
                    hashed_password,
                    "PATIENT",
                    patient_data["first_name"],
                    patient_data["last_name"],
                    patient_data["phone"],
                    patient_data["date_of_birth"],
                    access_key,
                    True,
                    True
                ))
                
                patient_id = cur.fetchone()[0]
                print(f"✅ Created patient: {patient_data['first_name']} {patient_data['last_name']}")
                print(f"   Email: {patient_data['email']}")
                print(f"   Password: {patient_data['password']}")
                print(f"   Access Key: {access_key}")
            
            # Check if doctor-patient relationship exists
            cur.execute("""
                SELECT id FROM doctor_patient_access 
                WHERE doctor_id = %s AND patient_id = %s
            """, (doctor_id, patient_id))
            
            existing_access = cur.fetchone()
            
            if not existing_access:
                # Create doctor-patient access
                cur.execute("""
                    INSERT INTO doctor_patient_access (
                        doctor_id, patient_id, granted_via
                    )
                    VALUES (%s, %s, %s)
                """, (doctor_id, patient_id, "KEY"))
                
                print(f"   ✅ Linked to doctor")
            else:
                print(f"   ⚠️  Already linked to doctor")
            
            created_patients.append({
                "id": patient_id,
                "email": patient_data["email"],
                "name": f"{patient_data['first_name']} {patient_data['last_name']}"
            })
            print()
        
        conn.commit()
        
        print("=" * 70)
        print("✅ TEST PATIENTS CREATED AND LINKED TO DOCTOR")
        print("=" * 70)
        print()
        print("Doctor Login:")
        print("  Email: doctor@neuralcipher.ai")
        print("  Password: Doctor2026!@#")
        print()
        print("Test Patients:")
        for i, patient in enumerate(created_patients, 1):
            print(f"  {i}. {patient['name']} ({patient['email']})")
        print()
        print("All patients password: Patient123!")
        print()
        print("View patients at: https://neuralcipher-ai.vercel.app/doctor/patients")
        print("=" * 70)
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    print("=" * 70)
    print("CREATING TEST PATIENTS FOR DOCTOR PANEL")
    print("=" * 70)
    print()
    create_test_patients()
