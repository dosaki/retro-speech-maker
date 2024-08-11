provider "aws" {
  profile = var.profile == "pipeline" ? "" : var.profile
  region  = var.region
}

module "template_files" {
  source   = "hashicorp/dir/template"
  base_dir = "${var.content_path}/"
}

module "s3" {
  source = "./s3"

  domain_name          = var.domain_name
  website_content_path = var.content_path
  website_dir_module   = module.template_files
}

module "cloudfront" {
  source = "./cloudfront"

  cert_arn                        = var.cert_arn
  custom_error_response_page_path = module.s3.error_document
  default_root_object             = module.s3.index_document
  domain_name                     = var.domain_name
  website_endpoint                = module.s3.website_endpoint
  website_bucket                  = module.s3.website_bucket_regional_domain_name
}

module "route53" {
  source = "./route53"

  domain_name                 = var.domain_name
  domain_hosted_zone_id       = var.hosted_zone_id
  distribution_domain_name    = module.cloudfront.distribution_domain_name
  distribution_hosted_zone_id = module.cloudfront.distribution_zone_id
}
