# 🚀 NeuralCipher.ai - Deployment Kılavuzu

## 📋 İçindekiler

1. [Production Hazırlığı](#production-hazırlığı)
2. [Docker Deployment](#docker-deployment)
3. [AWS Deployment](#aws-deployment)
4. [Monitoring & Logging](#monitoring--logging)
5. [Security Checklist](#security-checklist)
6. [Performance Optimization](#performance-optimization)

---

## 🎯 Production Hazırlığı

### Gereksinimler

**Minimum:**
- CPU: 2 cores
- RAM: 4GB
- Disk: 10GB
- Python 3.11+

**Önerilen:**
- CPU: 4 cores
- RAM: 8GB
- Disk: 20GB SSD
- Python 3.11+

### Environment Variables

```bash
# .env.production
DATABASE_URL=postgresql://user:pass@host:5432/neuralcipher_prod
SECRET_KEY=<güçlü-secret-key>
ENVIRONMENT=production
DEBUG=False
ALLOWED_HOSTS=api.neuralcipher.ai
CORS_ORIGINS=https://neuralcipher.ai,https://app.neuralcipher.ai
```

### Güvenlik Ayarları

```python
# Production settings
DEBUG = False
ALLOWED_HOSTS = ['api.neuralcipher.ai']
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## 🐳 Docker Deployment

### 1. Docker Image Oluşturma

```bash
# Backend image
cd backend
docker build -t neuralcipher-backend:v1.0 .

# Tag for registry
docker tag neuralcipher-backend:v1.0 your-registry/neuralcipher-backend:v1.0
docker push your-registry/neuralcipher-backend:v1.0
```

### 2. Docker Compose (Production)

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  backend:
    image: your-registry/neuralcipher-backend:v1.0
    restart: always
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - SECRET_KEY=${SECRET_KEY}
      - ENVIRONMENT=production
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    depends_on:
      - db
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=neuralcipher_prod
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 3. Nginx Configuration

```nginx
# nginx.conf
upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name api.neuralcipher.ai;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.neuralcipher.ai;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    client_max_body_size 10M;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
```

### 4. Deployment

```bash
# Production'a deploy
docker-compose -f docker-compose.prod.yml up -d

# Logları izle
docker-compose -f docker-compose.prod.yml logs -f backend

# Health check
curl https://api.neuralcipher.ai/health
```

---

## ☁️ AWS Deployment

### Architecture

```
Internet
    ↓
Application Load Balancer (ALB)
    ↓
ECS Fargate (Backend Containers)
    ↓
RDS PostgreSQL
    ↓
S3 (Audio Files)
```

### 1. ECS Task Definition

```json
{
  "family": "neuralcipher-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-registry/neuralcipher-backend:v1.0",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "ENVIRONMENT",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:..."
        },
        {
          "name": "SECRET_KEY",
          "valueFrom": "arn:aws:secretsmanager:..."
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/neuralcipher-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:8000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}
```

### 2. Terraform Configuration

```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "neuralcipher" {
  name = "neuralcipher-cluster"
}

# ECS Service
resource "aws_ecs_service" "backend" {
  name            = "neuralcipher-backend"
  cluster         = aws_ecs_cluster.neuralcipher.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.private_subnets
    security_groups = [aws_security_group.backend.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = 8000
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "neuralcipher" {
  identifier        = "neuralcipher-db"
  engine            = "postgres"
  engine_version    = "15.3"
  instance_class    = "db.t3.medium"
  allocated_storage = 20
  storage_encrypted = true
  
  db_name  = "neuralcipher_prod"
  username = var.db_username
  password = var.db_password
  
  backup_retention_period = 7
  multi_az               = true
  
  tags = {
    Environment = "production"
  }
}

# S3 Bucket for Audio Files
resource "aws_s3_bucket" "audio_files" {
  bucket = "neuralcipher-audio-files"
  
  tags = {
    Environment = "production"
  }
}

resource "aws_s3_bucket_versioning" "audio_files" {
  bucket = aws_s3_bucket.audio_files.id
  
  versioning_configuration {
    status = "Enabled"
  }
}
```

### 3. Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Deploying NeuralCipher.ai to AWS..."

# Build and push Docker image
echo "📦 Building Docker image..."
docker build -t neuralcipher-backend:latest ./backend
docker tag neuralcipher-backend:latest $ECR_REGISTRY/neuralcipher-backend:latest
docker push $ECR_REGISTRY/neuralcipher-backend:latest

# Update ECS service
echo "🔄 Updating ECS service..."
aws ecs update-service \
  --cluster neuralcipher-cluster \
  --service neuralcipher-backend \
  --force-new-deployment

# Wait for deployment
echo "⏳ Waiting for deployment..."
aws ecs wait services-stable \
  --cluster neuralcipher-cluster \
  --services neuralcipher-backend

echo "✅ Deployment complete!"
```

---

## 📊 Monitoring & Logging

### 1. CloudWatch Metrics

```python
# backend/app/monitoring/cloudwatch.py
import boto3
from datetime import datetime

cloudwatch = boto3.client('cloudwatch')

def log_metric(metric_name, value, unit='Count'):
    """CloudWatch metrik gönder"""
    cloudwatch.put_metric_data(
        Namespace='NeuralCipher',
        MetricData=[
            {
                'MetricName': metric_name,
                'Value': value,
                'Unit': unit,
                'Timestamp': datetime.utcnow()
            }
        ]
    )

# Kullanım
log_metric('PredictionCount', 1)
log_metric('RiskScoreHigh', 1)
log_metric('ProcessingTime', 150, 'Milliseconds')
```

### 2. Prometheus Metrics

```python
# backend/app/monitoring/prometheus.py
from prometheus_client import Counter, Histogram, Gauge

# Metrics
prediction_counter = Counter('predictions_total', 'Total predictions')
risk_score_histogram = Histogram('risk_score', 'Risk score distribution')
processing_time = Histogram('processing_time_seconds', 'Processing time')
active_users = Gauge('active_users', 'Active users')

# Kullanım
prediction_counter.inc()
risk_score_histogram.observe(0.75)
processing_time.observe(0.150)
```

### 3. Logging Configuration

```python
# backend/app/core/logging_config.py
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    """JSON formatında log"""
    def format(self, record):
        log_data = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': record.levelname,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName
        }
        return json.dumps(log_data)

# Logger setup
logger = logging.getLogger('neuralcipher')
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)
```

---

## 🔒 Security Checklist

### Pre-Deployment

- [ ] Environment variables güvenli mi?
- [ ] Secret keys production'a özel mi?
- [ ] DEBUG=False mi?
- [ ] HTTPS zorunlu mu?
- [ ] CORS ayarları doğru mu?
- [ ] Rate limiting aktif mi?
- [ ] Input validation yapılıyor mu?
- [ ] SQL injection koruması var mı?
- [ ] XSS koruması var mı?
- [ ] CSRF koruması var mı?

### Post-Deployment

- [ ] SSL sertifikası geçerli mi?
- [ ] Firewall kuralları doğru mu?
- [ ] Database şifreli mi?
- [ ] Backup sistemi çalışıyor mu?
- [ ] Monitoring aktif mi?
- [ ] Log rotation yapılıyor mu?
- [ ] Security headers eklenmiş mi?
- [ ] Dependency güncel mi?

### Security Headers

```python
# backend/app/middleware/security.py
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Security headers
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        response.headers['Content-Security-Policy'] = "default-src 'self'"
        
        return response
```

---

## ⚡ Performance Optimization

### 1. Caching

```python
# backend/app/cache/redis_cache.py
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def cache_prediction(file_hash, result, ttl=3600):
    """Tahmin sonucunu cache'le"""
    redis_client.setex(
        f"prediction:{file_hash}",
        ttl,
        json.dumps(result)
    )

def get_cached_prediction(file_hash):
    """Cache'den tahmin al"""
    cached = redis_client.get(f"prediction:{file_hash}")
    if cached:
        return json.loads(cached)
    return None
```

### 2. Database Optimization

```sql
-- Indexes
CREATE INDEX idx_audio_user_id ON audio_recordings(user_id);
CREATE INDEX idx_audio_created_at ON audio_recordings(recorded_at);
CREATE INDEX idx_analysis_audio_id ON analysis_results(audio_id);

-- Partitioning (zaman bazlı)
CREATE TABLE audio_recordings_2026_01 PARTITION OF audio_recordings
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
```

### 3. Load Balancing

```nginx
# nginx load balancing
upstream backend_cluster {
    least_conn;
    server backend1:8000 weight=3;
    server backend2:8000 weight=3;
    server backend3:8000 weight=2;
    
    keepalive 32;
}
```

### 4. Auto-Scaling

```hcl
# AWS Auto Scaling
resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = 10
  min_capacity       = 2
  resource_id        = "service/neuralcipher-cluster/neuralcipher-backend"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "ecs_policy" {
  name               = "cpu-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 70.0
  }
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          pip install -r backend/requirements.txt
          pytest backend/tests/

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: |
          docker build -t neuralcipher-backend:${{ github.sha }} ./backend
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker push $ECR_REGISTRY/neuralcipher-backend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster neuralcipher-cluster --service neuralcipher-backend --force-new-deployment
```

---

## 📞 Support & Troubleshooting

### Common Issues

**1. High Memory Usage**
```bash
# Check memory
docker stats

# Increase memory limit
docker-compose up -d --scale backend=2
```

**2. Slow Response Times**
```bash
# Check logs
docker-compose logs -f backend

# Enable profiling
python -m cProfile -o profile.stats app/main.py
```

**3. Database Connection Issues**
```bash
# Check connection
psql -h localhost -U neuralcipher -d neuralcipher_prod

# Reset connections
docker-compose restart db
```

---

## 📚 Additional Resources

- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [AWS ECS Guide](https://docs.aws.amazon.com/ecs/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Last Updated:** 2026-01-19  
**Version:** 1.0

