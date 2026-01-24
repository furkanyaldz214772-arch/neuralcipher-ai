# 📧 Email System Setup Guide

## ✅ COMPLETED

### What Was Done

1. **Email Service Created** (`backend/app/core/email.py`)
   - SMTP email sending
   - HTML email templates
   - Bulk email support
   - Error handling & logging

2. **Email Templates**
   - Welcome email (new user registration)
   - Test completed notification
   - High risk alert
   - Password reset
   - Subscription expiring

3. **Integration**
   - Test results automatically send emails
   - High risk tests send special alerts
   - Background task processing

4. **Configuration**
   - Environment variables added to `.env.example`
   - SMTP settings configurable

---

## 🔧 Configuration

### Step 1: Get SMTP Credentials

#### Option A: Gmail (Recommended for Development)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

#### Option B: SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com
2. Create an API key
3. Use these settings:
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - User: `apikey`
   - Password: Your API key

#### Option C: AWS SES (Enterprise)

1. Set up AWS SES
2. Verify your domain
3. Get SMTP credentials from SES console

### Step 2: Configure Environment Variables

Create or update `backend/.env`:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password-here
FROM_EMAIL=noreply@neuralcipher.ai
FROM_NAME=NeuralCipher.ai

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3001
```

### Step 3: Test Email Service

```bash
cd neuralcipher-ai/backend
python -c "
from app.core.email import email_service, EmailTemplates

# Test email
html = EmailTemplates.welcome_email(
    'Test User',
    'http://localhost:3001/auth/login'
)

result = email_service.send_email(
    'your-test-email@example.com',
    'Test Email from NeuralCipher.ai',
    html
)

print('✅ Email sent!' if result else '❌ Email failed')
"
```

---

## 📨 Email Templates

### 1. Welcome Email
**Trigger**: New user registration
**Content**:
- Welcome message
- Feature highlights
- CTA to start first test

### 2. Test Completed
**Trigger**: Voice test analysis complete
**Content**:
- Risk score and level
- Biomarker summary
- Link to full results
- Disclaimer

### 3. High Risk Alert
**Trigger**: Test shows high risk (>60%)
**Content**:
- Urgent notification
- Risk score
- Recommended actions
- Doctor finder link

### 4. Password Reset
**Trigger**: User requests password reset
**Content**:
- Reset link (expires in 60 min)
- Security notice

### 5. Subscription Expiring
**Trigger**: 7 days before expiration
**Content**:
- Days remaining
- Feature reminder
- Renewal link

---

## 🎨 Email Design

All emails use a consistent design:
- **Colors**: Deep navy background, cyan/blue gradients
- **Typography**: Inter font family
- **Responsive**: Mobile-friendly
- **Branding**: NeuralCipher.ai logo and colors
- **CTA Buttons**: Prominent gradient buttons

---

## 🔄 Email Flow

### Test Results Flow

```
User uploads audio
    ↓
AI processes test (2-3 sec)
    ↓
Results saved to database
    ↓
Email sent in background
    ↓
User receives notification
```

### Email Sending Logic

```python
# In process_test() function:
if risk_level == "high":
    # Send high risk alert
    send_high_risk_alert_email()
else:
    # Send normal results email
    send_test_completed_email()
```

---

## 📊 Email Service Status

Check if email service is enabled:

```python
from app.core.email import email_service

if email_service.enabled:
    print("✅ Email service is enabled")
else:
    print("⚠️  Email service is disabled - configure SMTP")
```

---

## 🚨 Troubleshooting

### Email Not Sending

1. **Check SMTP credentials**
   ```bash
   # Test SMTP connection
   python -c "
   import smtplib
   server = smtplib.SMTP('smtp.gmail.com', 587)
   server.starttls()
   server.login('your-email@gmail.com', 'your-password')
   print('✅ SMTP connection successful')
   "
   ```

2. **Check environment variables**
   ```bash
   cd backend
   python -c "
   import os
   from dotenv import load_dotenv
   load_dotenv()
   print('SMTP_USER:', os.getenv('SMTP_USER'))
   print('SMTP_HOST:', os.getenv('SMTP_HOST'))
   "
   ```

3. **Check logs**
   ```bash
   # Backend logs will show email status
   tail -f backend/logs/app.log
   ```

### Gmail Specific Issues

- **"Less secure app access"**: Use App Password instead
- **"Username and Password not accepted"**: Enable 2FA and generate App Password
- **Rate limiting**: Gmail has sending limits (500/day for free accounts)

### SendGrid Issues

- **API key invalid**: Regenerate in SendGrid dashboard
- **Domain not verified**: Verify sender domain in SendGrid
- **Blocked**: Check SendGrid activity feed for blocks

---

## 🔐 Security Best Practices

1. **Never commit credentials**
   - Use `.env` file (in `.gitignore`)
   - Use environment variables in production

2. **Use App Passwords**
   - Don't use your main email password
   - Generate app-specific passwords

3. **Rate Limiting**
   - Implement sending limits
   - Use queues for bulk emails

4. **Email Validation**
   - Validate email addresses before sending
   - Handle bounces and unsubscribes

---

## 📈 Production Recommendations

### For Production Deployment:

1. **Use Professional Email Service**
   - SendGrid (99% deliverability)
   - AWS SES (cost-effective)
   - Mailgun (developer-friendly)

2. **Set Up Domain**
   - Use custom domain (e.g., noreply@neuralcipher.ai)
   - Configure SPF, DKIM, DMARC records
   - Verify domain with email provider

3. **Implement Queue**
   - Use Celery or RQ for email queue
   - Retry failed emails
   - Track delivery status

4. **Monitor Deliverability**
   - Track open rates
   - Monitor bounce rates
   - Handle unsubscribes

5. **Compliance**
   - Add unsubscribe link
   - Include physical address
   - Follow CAN-SPAM Act / GDPR

---

## 🧪 Testing

### Manual Test

```bash
# Start backend
cd backend
uvicorn app.main:app --reload

# In another terminal, test email
curl -X POST http://localhost:8000/api/v1/tests/send-test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com"}'
```

### Automated Test

```python
# backend/tests/test_email.py
import pytest
from app.core.email import email_service, EmailTemplates

def test_email_service():
    assert email_service is not None

def test_welcome_email_template():
    html = EmailTemplates.welcome_email("Test User", "http://test.com")
    assert "Welcome" in html
    assert "Test User" in html
```

---

## 📝 Next Steps

1. ✅ Email service created
2. ⚠️ **Configure SMTP credentials** (you need to do this)
3. ⚠️ **Test email sending**
4. 📝 Add welcome email to registration
5. 📝 Add password reset email
6. 📝 Add subscription emails
7. 📝 Set up email queue for production

---

**Status**: ✅ IMPLEMENTED (needs configuration)
**Last Updated**: January 20, 2026
**Next**: Configure SMTP credentials and test
