resource "aws_route53_record" "url" {
  zone_id = var.domain_hosted_zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = var.distribution_domain_name
    zone_id                = var.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}