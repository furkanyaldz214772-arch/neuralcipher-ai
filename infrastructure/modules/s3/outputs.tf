output "audio_bucket_id" {
  description = "Audio bucket ID"
  value       = aws_s3_bucket.audio.id
}

output "audio_bucket_arn" {
  description = "Audio bucket ARN"
  value       = aws_s3_bucket.audio.arn
}

output "static_bucket_id" {
  description = "Static bucket ID"
  value       = aws_s3_bucket.static.id
}

output "static_bucket_arn" {
  description = "Static bucket ARN"
  value       = aws_s3_bucket.static.arn
}

output "backups_bucket_id" {
  description = "Backups bucket ID"
  value       = aws_s3_bucket.backups.id
}
