resource "google_compute_network" "default" {
  auto_create_subnetworks                   = true
  delete_default_routes_on_create           = false
  description                               = "Default network for the project"
  enable_ula_internal_ipv6                  = false
  internal_ipv6_range                       = null
  mtu                                       = 0
  name                                      = "default"
  network_firewall_policy_enforcement_order = "AFTER_CLASSIC_FIREWALL"
  project                                   = google_project.itadakimasu.project_id
  routing_mode                              = "REGIONAL"
}

resource "google_compute_subnetwork" "default" {
  description                      = null
  external_ipv6_prefix             = null
  ip_cidr_range                    = "10.146.0.0/20"
  ipv6_access_type                 = null
  name                             = "default"
  network                          = "https://www.googleapis.com/compute/v1/projects/itadakimasu-engulid/global/networks/default"
  private_ip_google_access         = false
  private_ipv6_google_access       = "DISABLE_GOOGLE_ACCESS"
  project                          = "itadakimasu-engulid"
  purpose                          = "PRIVATE"
  region                           = "asia-northeast1"
  reserved_internal_range          = null
  role                             = null
  send_secondary_ip_range_if_empty = null
  stack_type                       = "IPV4_ONLY"
}
