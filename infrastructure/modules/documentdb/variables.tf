variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for DocumentDB"
  type        = list(string)
}

variable "instance_class" {
  description = "DocumentDB instance class"
  type        = string
}
