resource "google_compute_backend_service" "frontend-main" {
  affinity_cookie_ttl_sec         = 0
  compression_mode                = null
  connection_draining_timeout_sec = 0
  custom_request_headers          = []
  custom_response_headers         = ["Cache-Control:no-store"]
  description                     = null
  edge_security_policy            = null
  enable_cdn                      = false
  ip_address_selection_policy     = null
  load_balancing_scheme           = "EXTERNAL_MANAGED"
  locality_lb_policy              = "ROUND_ROBIN"
  name                            = "frontend-main"
  port_name                       = "http"
  project                         = google_project.itadakimasu.project_id
  protocol                        = "HTTPS"
  security_policy                 = "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/securityPolicies/default-security-policy-for-backend-service-frontend-main"
  service_lb_policy               = null
  session_affinity                = "NONE"
  timeout_sec                     = 30
  backend {
    balancing_mode               = "UTILIZATION"
    capacity_scaler              = 1
    description                  = null
    group                        = google_compute_region_network_endpoint_group.cloudrun_backend_main_endpoint_group.id
    max_connections              = 0
    max_connections_per_endpoint = 0
    max_connections_per_instance = 0
    max_rate                     = 0
    max_rate_per_endpoint        = 0
    max_rate_per_instance        = 0
    max_utilization              = 0
  }
  log_config {
    enable      = false
    sample_rate = 0
  }
}
