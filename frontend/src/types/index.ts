/**
 * TypeScript Type Definitions
 */

export interface User {
  id: string
  email: string
  role: 'patient' | 'doctor' | 'caregiver' | 'admin' | 'researcher'
  is_active: boolean
  is_verified: boolean
  is_2fa_enabled: boolean
  created_at: string
}

export interface VoiceTest {
  id: string
  patient_id: string
  test_level: 'quick' | 'standard' | 'comprehensive' | 'clinical'
  test_date: string
  audio_file_url: string
  risk_score: number
  confidence: number
  status: 'completed' | 'processing' | 'failed'
  created_at: string
}

export interface Biomarkers {
  fundamental_frequency: {
    mean_f0: number
    f0_std_dev: number
    f0_range: number
  }
  jitter: {
    local_jitter: number
    absolute_jitter: number
    rap: number
  }
  shimmer: {
    local_shimmer: number
    absolute_shimmer: number
    apq: number
  }
  hnr: {
    harmonics_to_noise: number
    noise_to_harmonics: number
  }
  voice_quality: {
    avqi: number
    dsi: number
    cpp: number
  }
  speech_rate: number
  articulation_rate: number
}

export interface TestResult {
  test_id: string
  patient_id: string
  test_date: string
  risk_score: number
  risk_category: 'normal' | 'warning' | 'risk' | 'high_risk'
  confidence: number
  biomarkers: Biomarkers
  interpretation: {
    status: string
    findings: string[]
    recommendations: string[]
  }
}

export interface PatientProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  phone: string
  address: string
  medical_history: Record<string, any>
  medications: Record<string, any>
}

export interface DoctorProfile {
  id: string
  user_id: string
  title: string
  specialty: string
  license_number: string
  hospital: string
  bio: string
}
