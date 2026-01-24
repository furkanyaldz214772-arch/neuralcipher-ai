output "endpoint" {
  description = "DocumentDB cluster endpoint"
  value       = aws_docdb_cluster.main.endpoint
}

output "reader_endpoint" {
  description = "DocumentDB cluster reader endpoint"
  value       = aws_docdb_cluster.main.reader_endpoint
}

output "password_secret_arn" {
  description = "ARN of the secret containing the DocumentDB password"
  value       = aws_secretsmanager_secret.docdb_password.arn
}
