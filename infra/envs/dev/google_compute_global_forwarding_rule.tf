resource "google_compute_global_forwarding_rule" "lb_frontend" {
  description           = null
  ip_address            = data.google_compute_global_address.ip_frontend.id
  ip_protocol           = "TCP"
  labels                = {}
  load_balancing_scheme = "EXTERNAL_MANAGED"
  name                  = "lb-frontend-forwarding-rule"
  network               = null
  no_automate_dns_zone  = null
  port_range            = "443-443"
  project               = google_project.itadakimasu.project_id
  source_ip_ranges      = []
  subnetwork            = null
  target                = "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/targetHttpsProxies/lb-frontend-target-proxy"
}
