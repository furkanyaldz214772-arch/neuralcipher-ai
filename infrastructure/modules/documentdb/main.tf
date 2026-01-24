# DocumentDB (MongoDB) Module

resource "aws_docdb_subnet_group" "main" {
  name       = "${var.environment}-docdb-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "${var.environment}-docdb-subnet-group"
  }
}

resource "aws_security_group" "documentdb" {
  name        = "${var.environment}-documentdb-sg"
  description = "Security group for DocumentDB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-documentdb-sg"
  }
}

resource "aws_docdb_cluster" "main" {
  cluster_identifier      = "${var.environment}-docdb-cluster"
  engine                  = "docdb"
  master_username         = "docdbadmin"
  master_password         = random_password.docdb_password.result
  backup_retention_period = 7
  preferred_backup_window = "03:00-04:00"
  skip_final_snapshot     = false
  final_snapshot_identifier = "${var.environment}-docdb-final-snapshot"
  
  db_subnet_group_name   = aws_docdb_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.documentdb.id]
  
  storage_encrypted = true
  enabled_cloudwatch_logs_exports = ["audit", "profiler"]

  tags = {
    Name = "${var.environment}-documentdb-cluster"
  }
}

resource "aws_docdb_cluster_instance" "main" {
  count              = 2
  identifier         = "${var.environment}-docdb-instance-${count.index + 1}"
  cluster_identifier = aws_docdb_cluster.main.id
  instance_class     = var.instance_class

  tags = {
    Name = "${var.environment}-docdb-instance-${count.index + 1}"
  }
}

resource "random_password" "docdb_password" {
  length  = 32
  special = true
}

resource "aws_secretsmanager_secret" "docdb_password" {
  name = "${var.environment}/documentdb/password"
}

resource "aws_secretsmanager_secret_version" "docdb_password" {
  secret_id     = aws_secretsmanager_secret.docdb_password.id
  secret_string = random_password.docdb_password.result
}
