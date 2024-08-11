variable "domain_name" {
  description = "The domain name of the site"
}

variable "website_endpoint" {
}

variable "website_bucket" {
}

variable "default_root_object" {
  description = "The default root object for the website. Usually index.html"
}

variable "custom_error_response_page_path" {
  description = "The path to the custom error response page"
}

variable "cert_arn" {
}