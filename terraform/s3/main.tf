resource "aws_s3_bucket" "static_site" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_ownership_controls" "static_site_ownership_controls" {
  bucket = aws_s3_bucket.static_site.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_public_access_block" "static_site_public_access_block" {
  bucket = aws_s3_bucket.static_site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "static_site_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.static_site_ownership_controls,
    aws_s3_bucket_public_access_block.static_site_public_access_block
  ]

  bucket = aws_s3_bucket.static_site.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "static_site_config" {
  bucket = aws_s3_bucket.static_site.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}


resource "aws_s3_object" "static_site_content" {
  for_each     = var.website_dir_module.files
  depends_on = [aws_s3_bucket_acl.static_site_acl]
  bucket       = aws_s3_bucket.static_site.bucket
  key          = each.key
  source       = each.value.source_path
  content_type = each.value.content_type
  acl          = "public-read"
  etag         = each.value.digests.md5
}