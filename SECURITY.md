# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in NeuralCipher.ai, please report it to us privately:

- **Email**: security@neuralcipher.ai
- **Response Time**: We aim to respond within 48 hours
- **Disclosure**: Please allow us 90 days to address the issue before public disclosure

## Security Measures

### 1. Authentication & Authorization

- **JWT Tokens**: Short-lived access tokens (30 minutes) with refresh token rotation
- **Password Requirements**: Minimum 12 characters with complexity requirements
- **2FA Support**: TOTP-based two-factor authentication available
- **Role-Based Access Control (RBAC)**: 5 distinct roles with granular permissions
- **Rate Limiting**: Brute force protection on authentication endpoints

### 2. Data Protection

- **Encryption in Transit**: All data transmitted over HTTPS/TLS 1.3
- **Encryption at Rest**: Database and file storage encryption
- **HIPAA Compliance**: Healthcare data handling standards
- **Data Minimization**: Only collect necessary information
- **Right to Deletion**: Users can request complete data deletion

### 3. API Security

- **CORS**: Strict origin validation (no wildcards in production)
- **CSRF Protection**: Token-based CSRF prevention for state-changing operations
- **Input Validation**: All inputs sanitized and validated
- **SQL Injection Prevention**: Parameterized queries via SQLAlchemy ORM
- **XSS Prevention**: HTML escaping and Content Security Policy headers
- **Rate Limiting**: Per-endpoint rate limits to prevent abuse

### 4. Infrastructure Security

- **Environment Variables**: Sensitive data stored in environment variables
- **No Hardcoded Secrets**: All secrets must be provided via environment
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options, CSP
- **Audit Logging**: All security-relevant events logged
- **Regular Updates**: Dependencies updated regularly for security patches

### 5. File Upload Security

- **File Type Validation**: Only allowed audio formats accepted
- **File Size Limits**: Maximum 10MB per upload
- **Virus Scanning**: All uploads scanned for malware
- **Separate Storage**: Files stored in isolated S3 buckets
- **Signed URLs**: Time-limited access to uploaded files

## Security Checklist for Deployment

### Before Production Deployment

- [ ] Change all default secrets (JWT_SECRET, CSRF_SECRET, etc.)
- [ ] Set CORS_ORIGINS to specific allowed domains (no wildcards)
- [ ] Enable HTTPS/TLS with valid certificates
- [ ] Configure firewall rules (only necessary ports open)
- [ ] Set up database backups and encryption
- [ ] Enable audit logging
- [ ] Configure Sentry or error tracking
- [ ] Set up monitoring and alerting
- [ ] Review and test all security headers
- [ ] Perform security audit/penetration testing
- [ ] Set up WAF (Web Application Firewall) if available
- [ ] Configure rate limiting appropriately
- [ ] Enable 2FA for admin accounts
- [ ] Review and minimize IAM permissions
- [ ] Set up DDoS protection
- [ ] Configure session timeouts
- [ ] Enable database query logging
- [ ] Set up intrusion detection
- [ ] Document incident response procedures

### Environment Variables (Required)

```bash
# CRITICAL - Must be set in production
JWT_SECRET=<strong-random-secret-min-32-chars>
CSRF_SECRET=<strong-random-secret-min-32-chars>
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
DATABASE_URL=<production-database-url>
```

### Security Headers

The following security headers are automatically set:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Permissions-Policy: microphone=(self)
```

## Rate Limits

Default rate limits (can be configured):

- **Login**: 10 requests per minute per IP
- **Register**: 5 requests per hour per IP
- **Password Reset**: 3 requests per hour per IP
- **File Upload**: 20 requests per hour per user
- **API Calls**: 100 requests per minute per user

## Compliance

### HIPAA Compliance

- Business Associate Agreement (BAA) available
- Encrypted data storage and transmission
- Audit logging of all PHI access
- Access controls and authentication
- Data backup and disaster recovery
- Incident response procedures

### GDPR Compliance

- Data processing agreements available
- Right to access personal data
- Right to rectification
- Right to erasure ("right to be forgotten")
- Data portability
- Privacy by design and default
- Data breach notification procedures

## Security Best Practices for Users

1. **Use Strong Passwords**: Minimum 12 characters with mixed case, numbers, and symbols
2. **Enable 2FA**: Add an extra layer of security to your account
3. **Keep Software Updated**: Use the latest version of the app
4. **Secure Your Devices**: Use device encryption and screen locks
5. **Be Cautious with Emails**: Watch for phishing attempts
6. **Review Account Activity**: Regularly check your account for suspicious activity
7. **Use Secure Networks**: Avoid public Wi-Fi for sensitive operations
8. **Log Out When Done**: Especially on shared devices

## Security Updates

We regularly update our security measures. Check this document for the latest information.

**Last Updated**: January 20, 2026

## Contact

For security concerns or questions:
- **Email**: security@neuralcipher.ai
- **Bug Bounty**: Coming soon

## Acknowledgments

We thank the security researchers who have responsibly disclosed vulnerabilities to us.
