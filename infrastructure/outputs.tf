# Outputs

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = module.ecs.cluster_name
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = module.rds.endpoint
  sensitive   = true
}

output "documentdb_endpoint" {
  description = "DocumentDB endpoint"
  value       = module.documentdb.endpoint
  sensitive   = true
}

output "redis_endpoint" {
  description = "Redis endpoint"
  value       = module.elasticache.endpoint
  sensitive   = true
}

output "s3_audio_bucket" {
  description = "S3 audio bucket name"
  value       = module.s3.audio_bucket_id
}

output "cloudfront_domain" {
  description = "CloudFront domain"
  value       = module.cloudfront.domain_name
}
