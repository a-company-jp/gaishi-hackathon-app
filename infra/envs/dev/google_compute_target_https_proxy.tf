resource "google_compute_target_https_proxy" "lb_frontend_target_proxy" {
  certificate_map                  = null
  description                      = null
  http_keep_alive_timeout_sec      = 0
  name                             = "lb-frontend-target-proxy"
  project                          = google_project.itadakimasu.project_id
  proxy_bind                       = false
  quic_override                    = "NONE"
  server_tls_policy                = null
  ssl_certificates                 = ["https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/sslCertificates/i-a-shion-pro", "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/sslCertificates/store-i-a-shion-pro"]
  ssl_policy                       = null
  tls_early_data                   = "DISABLED"
  url_map                          = "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/urlMaps/lb-frontend"
}
