output "website_endpoint" {
  value = aws_s3_bucket_website_configuration.static_site_config.website_endpoint
}

output "website_hosted_zone_id" {
  value = aws_s3_bucket.static_site.hosted_zone_id
}

output "website_bucket" {
  value = aws_s3_bucket.static_site.bucket
}

output "website_bucket_regional_domain_name" {
  value = aws_s3_bucket.static_site.bucket_regional_domain_name
}

output "index_document" {
  value = aws_s3_bucket_website_configuration.static_site_config.index_document[0].suffix
}

output "error_document" {
  value = aws_s3_bucket_website_configuration.static_site_config.error_document[0].key
}
