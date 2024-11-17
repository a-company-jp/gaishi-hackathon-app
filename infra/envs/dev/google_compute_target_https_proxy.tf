resource "google_compute_target_https_proxy" "lb_frontend_target_proxy" {
  description                 = null
  http_keep_alive_timeout_sec = 0
  name                        = "lb-frontend-target-proxy"
  project                     = google_project.itadakimasu.project_id
  proxy_bind                  = false
  quic_override               = "NONE"
  server_tls_policy           = null
  certificate_map             = "//certificatemanager.googleapis.com/${google_certificate_manager_certificate_map.frontend.id}"
  ssl_certificates = [
    "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/sslCertificates/i-a-shion-pro",
    "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/sslCertificates/store-i-a-shion-pro"
  ]
  ssl_policy     = null
  tls_early_data = "DISABLED"
  url_map        = google_compute_url_map.lb_frontend.id
}
