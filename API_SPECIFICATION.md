# 🔌 NeuralCipher.ai - API Specification
## Unified API for Web, Mobile & AI Integration

**Version:** 1.0.0  
**Date:** January 21, 2026  
**Base URL:** `https://api.neuralcipher.ai/v1`  
**Protocol:** HTTPS  
**Format:** JSON

---

## 📋 TABLE OF CONTENTS

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Voice Tests](#voice-tests)
4. [AI Analysis](#ai-analysis)
5. [Doctor Management](#doctor-management)
6. [Admin Management](#admin-management)
7. [Messaging](#messaging)
8. [Subscriptions](#subscriptions)
9. [Error Handling](#error-handling)

---

## 🔐 AUTHENTICATION

### POST /auth/register
Register new user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!@#",
  "role": "patient|doctor|admin",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "patient",
    "is_verified": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /auth/login
User login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!@#"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "patient",
    "is_verified": true,
    "is_2fa_enabled": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /auth/refresh
Refresh access token

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👤 USER MANAGEMENT

### GET /profile
Get current user profile

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "patient",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1980-01-15",
  "gender": "male",
  "phone": "+90 555 123 4567",
  "address": "Istanbul, Turkey",
  "is_verified": true,
  "is_2fa_enabled": false,
  "created_at": "2026-01-01T00:00:00Z"
}
```

---

### PUT /profile
Update user profile

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1980-01-15",
  "gender": "male",
  "phone": "+90 555 123 4567",
  "address": "Istanbul, Turkey"
}
```

**Response:** `200 OK`
```json
{
  "message": "Profile updated successfully",
  "profile": { ... }
}
```

---

## 🎤 VOICE TESTS

### POST /tests/upload
Upload voice recording for analysis

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request:**
```
FormData:
  - audio_file: File (WAV, MP3, M4A)
  - test_type: "sustained_vowel" | "rapid_syllable" | "reading" | "spontaneous"
  - test_level: "quick" | "standard" | "comprehensive" | "clinical"
  - duration: 30 (seconds)
```

**Response:** `201 Created`
```json
{
  "test_id": "test_123456",
  "status": "processing",
  "estimated_time": 45,
  "message": "Voice recording uploaded successfully"
}
```

---

### GET /tests/{test_id}
Get test results

**Response:** `200 OK`
```json
{
  "test_id": "test_123456",
  "user_id": 1,
  "test_date": "2026-01-21T14:30:00Z",
  "test_type": "sustained_vowel",
  "test_level": "standard",
  "status": "completed",
  "results": {
    "parkinson_risk": 12.5,
    "alzheimer_risk": 5.2,
    "confidence_score": 94.3,
    "risk_level": "low",
    "biomarkers": {
      "f0_mean": 154.2,
      "jitter_local": 0.0062,
      "shimmer_local": 0.0312,
      "hnr": 21.5,
      ...
    },
    "recommendations": [
      "Continue regular testing (monthly)",
      "Maintain healthy lifestyle",
      "Consult doctor if symptoms appear"
    ]
  },
  "audio_url": "https://storage.neuralcipher.ai/tests/test_123456.wav"
}
```

---

### GET /tests
Get user's test history

**Query Parameters:**
- `limit`: 10 (default)
- `offset`: 0 (default)
- `sort`: "date_desc" | "date_asc" | "risk_desc"
- `filter`: "all" | "high_risk" | "normal"

**Response:** `200 OK`
```json
{
  "total": 45,
  "tests": [
    {
      "test_id": "test_123456",
      "test_date": "2026-01-21T14:30:00Z",
      "parkinson_risk": 12.5,
      "alzheimer_risk": 5.2,
      "risk_level": "low",
      "status": "completed"
    },
    ...
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}
```

---

## 🤖 AI ANALYSIS

### POST /ai/analyze
Real-time voice analysis

**Request:**
```json
{
  "audio_data": "base64_encoded_audio",
  "sample_rate": 44100,
  "duration": 30,
  "test_type": "sustained_vowel"
}
```

**Response:** `200 OK`
```json
{
  "analysis_id": "analysis_789",
  "parkinson_probability": 0.125,
  "alzheimer_probability": 0.052,
  "confidence": 0.943,
  "features": {
    "f0_mean": 154.2,
    "jitter": 0.0062,
    "shimmer": 0.0312,
    "hnr": 21.5
  },
  "processing_time": 2.3
}
```

---

### POST /ai/batch-analyze
Batch analysis for multiple recordings

**Request:**
```json
{
  "recordings": [
    {
      "recording_id": "rec_001",
      "audio_url": "https://..."
    },
    {
      "recording_id": "rec_002",
      "audio_url": "https://..."
    }
  ]
}
```

**Response:** `202 Accepted`
```json
{
  "batch_id": "batch_456",
  "status": "processing",
  "total_recordings": 2,
  "estimated_time": 90
}
```

---

## 👨‍⚕️ DOCTOR MANAGEMENT

### GET /doctor/patients
Get doctor's patient list

**Query Parameters:**
- `status`: "all" | "active" | "inactive"
- `risk_level`: "all" | "high" | "medium" | "low"
- `sort`: "risk_desc" | "name_asc" | "date_desc"

**Response:** `200 OK`
```json
{
  "total": 45,
  "patients": [
    {
      "patient_id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "latest_test_date": "2026-01-21",
      "parkinson_risk": 12.5,
      "alzheimer_risk": 5.2,
      "test_count": 15,
      "status": "active",
      "risk_level": "low"
    },
    ...
  ]
}
```

---

### GET /doctor/patients/{patient_id}
Get patient details

**Response:** `200 OK`
```json
{
  "patient": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 45,
    "gender": "male"
  },
  "latest_test": {
    "test_date": "2026-01-21",
    "parkinson_risk": 12.5,
    "alzheimer_risk": 5.2
  },
  "test_history": [
    {
      "test_date": "2026-01-21",
      "parkinson_risk": 12.5,
      "alzheimer_risk": 5.2
    },
    ...
  ],
  "trend": {
    "parkinson": "stable",
    "alzheimer": "improving"
  }
}
```

---

### POST /doctor/patients/{patient_id}/notes
Add doctor's notes

**Request:**
```json
{
  "note": "Patient showing improvement. Continue current treatment.",
  "note_type": "clinical" | "observation" | "recommendation"
}
```

**Response:** `201 Created`
```json
{
  "note_id": 456,
  "message": "Note added successfully"
}
```

---

## 👑 ADMIN MANAGEMENT

### GET /admin/users
Get all users

**Query Parameters:**
- `role`: "all" | "patient" | "doctor" | "admin"
- `status`: "all" | "active" | "inactive"
- `limit`: 50
- `offset`: 0

**Response:** `200 OK`
```json
{
  "total": 1250,
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "role": "patient",
      "is_active": true,
      "is_verified": true,
      "created_at": "2026-01-01",
      "last_login": "2026-01-21"
    },
    ...
  ]
}
```

---

### GET /admin/stats
Get system statistics

**Response:** `200 OK`
```json
{
  "users": {
    "total": 1250,
    "patients": 1000,
    "doctors": 200,
    "admins": 50,
    "active_today": 450
  },
  "tests": {
    "total": 15000,
    "today": 120,
    "this_month": 3500,
    "avg_per_user": 12
  },
  "subscriptions": {
    "total": 800,
    "active": 750,
    "revenue_monthly": 125000
  }
}
```

---

## 💬 MESSAGING

### GET /messages/conversations
Get user's conversations

**Response:** `200 OK`
```json
{
  "conversations": [
    {
      "conversation_id": 789,
      "participant": {
        "id": 456,
        "name": "Dr. Smith",
        "role": "doctor"
      },
      "last_message": {
        "text": "Your test results look good",
        "timestamp": "2026-01-21T15:30:00Z",
        "is_read": false
      },
      "unread_count": 2
    },
    ...
  ]
}
```

---

### POST /messages/send
Send message

**Request:**
```json
{
  "recipient_id": 456,
  "message": "Hello doctor, I have a question about my results",
  "message_type": "text" | "voice" | "file"
}
```

**Response:** `201 Created`
```json
{
  "message_id": 1234,
  "conversation_id": 789,
  "timestamp": "2026-01-21T15:35:00Z"
}
```

---

## 💳 SUBSCRIPTIONS

### GET /subscriptions/plans
Get available subscription plans

**Response:** `200 OK`
```json
{
  "plans": [
    {
      "plan_id": "free",
      "name": "Free",
      "price": 0,
      "currency": "USD",
      "interval": "month",
      "features": [
        "5 tests per month",
        "Basic analysis",
        "Email support"
      ]
    },
    {
      "plan_id": "premium",
      "name": "Premium",
      "price": 29.99,
      "currency": "USD",
      "interval": "month",
      "features": [
        "Unlimited tests",
        "Advanced AI analysis",
        "Priority support",
        "Doctor consultation"
      ]
    }
  ]
}
```

---

### POST /subscriptions/subscribe
Subscribe to plan

**Request:**
```json
{
  "plan_id": "premium",
  "payment_method": "stripe_token_xyz"
}
```

**Response:** `201 Created`
```json
{
  "subscription_id": "sub_123",
  "status": "active",
  "current_period_start": "2026-01-21",
  "current_period_end": "2026-02-21"
}
```

---

## ⚠️ ERROR HANDLING

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## 📱 MOBILE-SPECIFIC ENDPOINTS

### POST /mobile/sync
Sync offline data

**Request:**
```json
{
  "device_id": "device_abc123",
  "last_sync": "2026-01-20T10:00:00Z",
  "offline_tests": [
    {
      "local_id": "offline_001",
      "audio_data": "base64...",
      "recorded_at": "2026-01-21T08:00:00Z"
    }
  ]
}
```

**Response:** `200 OK`
```json
{
  "synced_tests": 3,
  "server_updates": [
    {
      "test_id": "test_789",
      "status": "completed",
      "results": { ... }
    }
  ]
}
```

---

## 🔒 SECURITY

### Rate Limiting
- **Authentication:** 5 requests/minute
- **API Calls:** 100 requests/minute
- **File Uploads:** 10 requests/minute

### Authentication
- **Type:** JWT (JSON Web Token)
- **Header:** `Authorization: Bearer {token}`
- **Expiry:** 24 hours (access token), 30 days (refresh token)

### HTTPS Only
All API calls must use HTTPS protocol.

---

## 📊 WEBHOOKS

### POST /webhooks/register
Register webhook endpoint

**Request:**
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["test.completed", "message.received"],
  "secret": "webhook_secret_key"
}
```

### Webhook Events
- `test.completed` - Test analysis completed
- `test.high_risk` - High risk detected
- `message.received` - New message received
- `subscription.updated` - Subscription status changed

---

**API Specification Complete!**

For implementation examples and SDKs, see:
- Web SDK: `/docs/web-sdk`
- Mobile SDK: `/docs/mobile-sdk`
- Python SDK: `/docs/python-sdk`
