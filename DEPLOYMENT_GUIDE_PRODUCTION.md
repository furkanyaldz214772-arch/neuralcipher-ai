# Production Deployment Guide

## Overview

Complete guide for deploying NeuralCipher.ai to production on AWS.

---

## Prerequisites

### Required Tools
- AWS CLI configured
- Docker & Docker Compose
- Terraform
- kubectl (for ECS)
- Git

### AWS Resources
- AWS Account with admin access
- Domain name (neuralcipher.ai)
- SSL certificate (ACM)
- S3 bucket for Terraform state

---

## Step 1: Infrastructure Setup

### 1.1 Configure AWS Credentials

```bash
aws configure
# Enter AWS Access Key ID
# Enter AWS Secret Access Key
# Enter Default region: us-east-1
```

### 1.2 Deploy Infrastructure with Terraform

```bash
cd infrastructure

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -out=tfplan

# Apply infrastructure
terraform apply tfplan
```

**Resources Created**:
- VPC with public/private subnets
- ECS cluster
- RDS PostgreSQL
- DocumentDB (MongoDB)
- ElastiCache (Redis)
- S3 buckets
- CloudFront distribution
- Load balancer
- Security groups

### 1.3 Verify Infrastructure

```bash
# Check ECS cluster
aws ecs list-clusters

# Check RDS instance
aws rds describe-db-instances

# Check ElastiCache
aws elasticache describe-cache-clusters
```

---

## Step 2: Database Setup

### 2.1 Connect to RDS

```bash
# Get RDS endpoint
export DB_HOST=$(terraform output -raw rds_endpoint)

# Connect
psql -h $DB_HOST -U neuralcipher -d neuralcipher
```

### 2.2 Run Migrations

```bash
cd backend

# Set database URL
export DATABASE_URL="postgresql://user:pass@$DB_HOST:5432/neuralcipher"

# Run migrations
alembic upgrade head

# Verify
alembic current
```

### 2.3 Create Initial Admin User

```bash
python scripts/create_admin.py \
  --email admin@neuralcipher.ai \
  --password <secure-password>
```

---

## Step 3: Application Deployment

### 3.1 Build Docker Images

```bash
# Backend
cd backend
docker build -t neuralcipher-backend:latest .
docker tag neuralcipher-backend:latest <ECR_REPO>/backend:latest
docker push <ECR_REPO>/backend:latest

# Frontend
cd ../frontend
docker build -t neuralcipher-frontend:latest .
docker tag neuralcipher-frontend:latest <ECR_REPO>/frontend:latest
docker push <ECR_REPO>/frontend:latest
```

### 3.2 Deploy to ECS

```bash
# Update ECS service
aws ecs update-service \
  --cluster neuralcipher-cluster \
  --service backend-service \
  --force-new-deployment

aws ecs update-service \
  --cluster neuralcipher-cluster \
  --service frontend-service \
  --force-new-deployment
```

### 3.3 Verify Deployment

```bash
# Check service status
aws ecs describe-services \
  --cluster neuralcipher-cluster \
  --services backend-service frontend-service

# Check task health
aws ecs list-tasks --cluster neuralcipher-cluster
```

---

## Step 4: DNS & SSL Configuration

### 4.1 Configure Route 53

```bash
# Create hosted zone (if not exists)
aws route53 create-hosted-zone \
  --name neuralcipher.ai \
  --caller-reference $(date +%s)

# Get load balancer DNS
export LB_DNS=$(terraform output -raw load_balancer_dns)

# Create A record
aws route53 change-resource-record-sets \
  --hosted-zone-id <ZONE_ID> \
  --change-batch file://dns-record.json
```

**dns-record.json**:
```json
{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "neuralcipher.ai",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "<LB_ZONE_ID>",
        "DNSName": "<LB_DNS>",
        "EvaluateTargetHealth": true
      }
    }
  }]
}
```

### 4.2 SSL Certificate

```bash
# Request certificate
aws acm request-certificate \
  --domain-name neuralcipher.ai \
  --subject-alternative-names www.neuralcipher.ai \
  --validation-method DNS

# Verify certificate
aws acm describe-certificate \
  --certificate-arn <CERT_ARN>
```

---

## Step 5: Monitoring Setup

### 5.1 Deploy Prometheus & Grafana

```bash
# Using Docker Compose
docker-compose -f docker-compose.monitoring.yml up -d

# Or using Helm (Kubernetes)
helm install prometheus prometheus-community/kube-prometheus-stack
```

### 5.2 Configure Dashboards

1. Access Grafana: https://grafana.neuralcipher.ai
2. Login with admin credentials
3. Import dashboards from `monitoring/grafana/dashboards/`

### 5.3 Configure Alerts

```bash
# Update Alertmanager config
kubectl apply -f monitoring/alertmanager-config.yml

# Verify alerts
curl http://prometheus:9090/api/v1/alerts
```

---

## Step 6: Security Configuration

### 6.1 Enable WAF

```bash
# Create WAF web ACL
aws wafv2 create-web-acl \
  --name neuralcipher-waf \
  --scope REGIONAL \
  --default-action Allow={} \
  --rules file://waf-rules.json

# Associate with load balancer
aws wafv2 associate-web-acl \
  --web-acl-arn <WAF_ARN> \
  --resource-arn <LB_ARN>
```

### 6.2 Configure Security Groups

```bash
# Update security group rules
aws ec2 authorize-security-group-ingress \
  --group-id <SG_ID> \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0
```

### 6.3 Enable CloudTrail

```bash
# Create trail
aws cloudtrail create-trail \
  --name neuralcipher-trail \
  --s3-bucket-name neuralcipher-logs

# Start logging
aws cloudtrail start-logging \
  --name neuralcipher-trail
```

---

## Step 7: Backup & Recovery

### 7.1 Configure RDS Backups

```bash
# Enable automated backups
aws rds modify-db-instance \
  --db-instance-identifier neuralcipher-db \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00"
```

### 7.2 S3 Backup

```bash
# Enable versioning
aws s3api put-bucket-versioning \
  --bucket neuralcipher-backups \
  --versioning-configuration Status=Enabled

# Configure lifecycle policy
aws s3api put-bucket-lifecycle-configuration \
  --bucket neuralcipher-backups \
  --lifecycle-configuration file://lifecycle.json
```

### 7.3 Test Recovery

```bash
# Create snapshot
aws rds create-db-snapshot \
  --db-instance-identifier neuralcipher-db \
  --db-snapshot-identifier test-snapshot

# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier neuralcipher-db-restored \
  --db-snapshot-identifier test-snapshot
```

---

## Step 8: Performance Optimization

### 8.1 Enable CloudFront CDN

```bash
# Create distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id <DIST_ID> \
  --paths "/*"
```

### 8.2 Configure Auto Scaling

```bash
# Create scaling policy
aws application-autoscaling put-scaling-policy \
  --service-namespace ecs \
  --scalable-dimension ecs:service:DesiredCount \
  --resource-id service/neuralcipher-cluster/backend-service \
  --policy-name cpu-scaling \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration file://scaling-policy.json
```

### 8.3 Optimize Database

```bash
# Run optimization script
python backend/scripts/optimize_db.py

# Verify indexes
psql -h $DB_HOST -U neuralcipher -d neuralcipher \
  -c "SELECT * FROM pg_indexes WHERE schemaname = 'public';"
```

---

## Step 9: Testing

### 9.1 Health Checks

```bash
# Backend health
curl https://api.neuralcipher.ai/health

# Frontend health
curl https://neuralcipher.ai

# Database health
psql -h $DB_HOST -U neuralcipher -d neuralcipher -c "SELECT 1;"
```

### 9.2 Load Testing

```bash
# Run k6 load test
k6 run --vus 100 --duration 5m backend/tests/performance/load_test.js

# Monitor metrics
curl http://prometheus:9090/api/v1/query?query=http_requests_total
```

### 9.3 Security Scan

```bash
# Run OWASP ZAP scan
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://neuralcipher.ai

# Run Trivy scan
trivy image neuralcipher-backend:latest
```

---

## Step 10: Go Live

### 10.1 Pre-Launch Checklist

- [ ] All services healthy
- [ ] SSL certificate valid
- [ ] DNS configured
- [ ] Monitoring active
- [ ] Backups configured
- [ ] Security scan passed
- [ ] Load test passed
- [ ] Documentation complete

### 10.2 Launch

```bash
# Switch DNS to production
aws route53 change-resource-record-sets \
  --hosted-zone-id <ZONE_ID> \
  --change-batch file://production-dns.json

# Monitor launch
watch -n 5 'curl -s https://neuralcipher.ai/health | jq'
```

### 10.3 Post-Launch

1. Monitor error rates
2. Check performance metrics
3. Verify user registrations
4. Test critical flows
5. Monitor costs

---

## Rollback Procedure

### If Issues Occur

```bash
# Rollback ECS service
aws ecs update-service \
  --cluster neuralcipher-cluster \
  --service backend-service \
  --task-definition backend:PREVIOUS_VERSION

# Rollback database
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier neuralcipher-db \
  --target-db-instance-identifier neuralcipher-db-rollback \
  --restore-time 2026-01-20T10:00:00Z

# Switch DNS back
aws route53 change-resource-record-sets \
  --hosted-zone-id <ZONE_ID> \
  --change-batch file://rollback-dns.json
```

---

## Maintenance

### Daily
- Check error logs
- Monitor performance metrics
- Review security alerts

### Weekly
- Review backup status
- Check disk space
- Update dependencies

### Monthly
- Security audit
- Performance review
- Cost optimization
- Disaster recovery test

---

## Troubleshooting

### Common Issues

**Service won't start**:
```bash
# Check logs
aws logs tail /ecs/backend --follow

# Check task definition
aws ecs describe-task-definition --task-definition backend
```

**Database connection error**:
```bash
# Check security group
aws ec2 describe-security-groups --group-ids <SG_ID>

# Test connection
telnet $DB_HOST 5432
```

**High latency**:
```bash
# Check CloudFront cache hit rate
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name CacheHitRate \
  --dimensions Name=DistributionId,Value=<DIST_ID> \
  --start-time 2026-01-20T00:00:00Z \
  --end-time 2026-01-20T23:59:59Z \
  --period 3600 \
  --statistics Average
```

---

## Support

**Emergency Contact**: ops@neuralcipher.ai  
**Slack Channel**: #neuralcipher-ops  
**On-Call**: PagerDuty

---

**Last Updated**: 20 Ocak 2026  
**Version**: 1.0
