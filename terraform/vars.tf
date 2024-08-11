variable "region" {
  default = "eu-west-1"
}

variable "profile" {
  default = "production"
}

variable "domain_name" {
  description = "The domain name for the website - this will be used to create a public bucket with the exact same name"
  default = "retro-speech.dosaki.net"
}

variable "content_path" {
  description = "The path to the built website content (should have index.html inside)"
  default = "../app"
}

variable "hosted_zone_id" {
  default = ""
}

variable "cert_arn" {
  default = "ARN for the certificate ARN - See AWS Certificate Manager"
}
