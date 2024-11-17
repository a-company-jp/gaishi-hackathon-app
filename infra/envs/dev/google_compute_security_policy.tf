resource "google_compute_security_policy" "load-balancer-default-policy" {
  description = "Default security policy for: frontend-main"
  name        = "default-security-policy-for-backend-service-frontend-main"
  project     = google_project.itadakimasu.project_id
  type        = "CLOUD_ARMOR"
  rule {
    action      = "allow"
    description = null
    preview     = false
    priority    = 2147483647
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
  }
  rule {
    action      = "throttle"
    description = "Default rate limiting rule"
    preview     = false
    priority    = 2147483646
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      ban_duration_sec    = 0
      conform_action      = "allow"
      enforce_on_key      = "IP"
      enforce_on_key_name = null
      exceed_action       = "deny(403)"
      rate_limit_threshold {
        count        = 500
        interval_sec = 60
      }
    }
  }
}
