# 🚀 NeuralCipher.ai - Production Setup Guide

**Tarih**: 20 Ocak 2026  
**Durum**: BAŞLANGIÇ

---

## 📋 ÖN GEREKSINIMLER

### 1. AWS Hesabı
```bash
# AWS CLI kurulumu
# Windows (PowerShell)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Konfigürasyon
aws configure
# AWS Access Key ID: [YOUR_KEY]
# AWS Secret Access Key: [YOUR_SECRET]
# Default region: us-east-1
# Default output format: json
```

### 2. Terraform
```bash
# Windows (Chocolatey)
choco install terraform

# Doğrulama
terraform --version
```

### 3. Docker
```bash
# Docker Desktop indir ve kur
# https://www.docker.com/products/docker-desktop

# Doğrulama
docker --version
docker-compose --version
```

### 4. GitHub
```bash
# Git kurulumu
choco install git

# Repository clone
git clone https://github.com/your-org/neuralcipher-ai.git
cd neuralcipher-ai
```

---

## 🏗️ ADIM 1: AWS INFRASTRUCTURE KURULUMU

### 1.1. Terraform State Bucket Oluştur
```bash
# S3 bucket oluştur (Terraform state için)
aws s3 mb s3://neuralcipher-terraform-state --region us-east-1

# Versioning aktif et
aws s3api put-bucket-versioning \
  --bucket neuralcipher-terraform-state \
  --versioning-configuration Status=Enabled

# Encryption aktif et
aws s3api put-bucket-encryption \
  --bucket neuralcipher-terraform-state \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

### 1.2. Terraform Initialize
```bash
cd infrastructure

# Initialize
terraform init

# Validate
terraform validate

# Plan
terraform plan -out=tfplan

# Apply (DİKKAT: Bu AWS kaynaklarını oluşturur ve ücret alınır!)
terraform apply tfplan
```

**Tahmini Maliyet**: ~$500-$1000/ay

**Oluşturulan Kaynaklar**:
- VPC (3 AZ)
- ECS Cluster
- RDS PostgreSQL (db.t3.medium)
- DocumentDB (db.t3.medium)
- ElastiCache Redis (cache.t3.medium)
- S3 Buckets
- CloudFront CDN
- NAT Gateways (3x)

---

## 🔐 ADIM 2: SECRETS YÖNETIMI

### 2.1. AWS Secrets Manager
```bash
# Database password
aws secretsmanager create-secret \
  --name neuralcipher/production/database \
  --secret-string '{"password":"YOUR_STRONG_PASSWORD"}'

# JWT secret
aws secretsmanager create-secret \
  --name neuralcipher/production/jwt \
  --secret-string '{"secret":"YOUR_JWT_SECRET"}'

# Encryption key
aws secretsmanager create-secret \
  --name neuralcipher/production/encryption \
  --secret-string '{"key":"YOUR_ENCRYPTION_KEY"}'

# Stripe API key
aws secretsmanager create-secret \
  --name neuralcipher/production/stripe \
  --secret-string '{"secret_key":"YOUR_STRIPE_KEY"}'
```

### 2.2. GitHub Secrets
```
Repository Settings → Secrets and variables → Actions

Eklenecek Secrets:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- SLACK_WEBHOOK (opsiyonel)
```

---

## 🗄️ ADIM 3: VERITABANI KURULUMU

### 3.1. PostgreSQL Schema
```bash
# RDS endpoint al
export RDS_ENDPOINT=$(terraform output -raw rds_endpoint)

# Database oluştur
psql -h $RDS_ENDPOINT -U postgres -c "CREATE DATABASE neuralcipher;"

# Schema migrate
cd ../backend
alembic upgrade head
```

### 3.2. MongoDB Collections
```bash
# DocumentDB endpoint al
export DOCDB_ENDPOINT=$(terraform output -raw documentdb_endpoint)

# Collections oluştur
mongosh --host $DOCDB_ENDPOINT --ssl --sslCAFile rds-combined-ca-bundle.pem

use neuralcipher
db.createCollection("test_results")
db.createCollection("audit_logs")
db.createCollection("biomarkers")
```

---

## 🐳 ADIM 4: DOCKER BUILD & DEPLOY

### 4.1. Backend Docker Image
```bash
cd backend

# Build
docker build -f Dockerfile.production -t neuralcipher-backend:latest .

# Test locally
docker run -p 8000:8000 \
  -e DATABASE_URL=$DATABASE_URL \
  -e MONGODB_URL=$MONGODB_URL \
  neuralcipher-backend:latest

# Push to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin $ECR_REGISTRY

docker tag neuralcipher-backend:latest $ECR_REGISTRY/neuralcipher-backend:latest
docker push $ECR_REGISTRY/neuralcipher-backend:latest
```

### 4.2. ECS Service Deploy
```bash
# ECS task definition oluştur
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json

# Service oluştur
aws ecs create-service \
  --cluster neuralcipher-prod \
  --service-name backend \
  --task-definition neuralcipher-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx]}"
```

---

## 📊 ADIM 5: MONITORING KURULUMU

### 5.1. CloudWatch Alarms
```bash
# CPU Alarm
aws cloudwatch put-metric-alarm \
  --alarm-name neuralcipher-high-cpu \
  --alarm-description "CPU utilization > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold

# Error Rate Alarm
aws cloudwatch put-metric-alarm \
  --alarm-name neuralcipher-high-errors \
  --alarm-description "Error rate > 1%" \
  --metric-name Errors \
  --namespace NeuralCipher \
  --statistic Sum \
  --period 60 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

### 5.2. Grafana Dashboard
```bash
# Grafana kurulumu (ECS)
# Dashboard import: dashboards/grafana-dashboard.json
```

---

## ✅ ADIM 6: DOĞRULAMA

### 6.1. Health Check
```bash
# Backend health
curl https://api.neuralcipher.ai/health

# Expected response:
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected",
  "redis": "connected"
}
```

### 6.2. Test API
```bash
# Test endpoint
curl -X POST https://api.neuralcipher.ai/api/v1/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

---

## 🚨 SORUN GİDERME

### Terraform Hataları
```bash
# State refresh
terraform refresh

# State list
terraform state list

# Destroy (DİKKAT!)
terraform destroy
```

### ECS Service Hataları
```bash
# Service logs
aws logs tail /ecs/neuralcipher-backend --follow

# Task durumu
aws ecs describe-tasks \
  --cluster neuralcipher-prod \
  --tasks $(aws ecs list-tasks --cluster neuralcipher-prod --query 'taskArns[0]' --output text)
```

### Database Bağlantı Hataları
```bash
# Security group kontrol
aws ec2 describe-security-groups --group-ids sg-xxx

# RDS durumu
aws rds describe-db-instances --db-instance-identifier neuralcipher-prod
```

---

## 📞 DESTEK

**Slack**: #neuralcipher-devops  
**Email**: devops@neuralcipher.ai  
**On-Call**: PagerDuty

---

## 📚 SONRAKI ADIMLAR

1. ✅ Infrastructure kuruldu
2. ⏳ Backend deploy
3. ⏳ Frontend deploy
4. ⏳ Monitoring setup
5. ⏳ Security audit
6. ⏳ Load testing

---

**Hazırlayan**: Kiro AI  
**Tarih**: 20 Ocak 2026  
**Versiyon**: 1.0
