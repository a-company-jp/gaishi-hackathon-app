resource "google_certificate_manager_certificate" "wildcard_i_a_shion_pro" {
  description = null
  labels      = {}
  location    = "global"
  name        = "i-a-shion-p"
  project     = google_project.itadakimasu.project_id
  scope       = null
  managed {
    dns_authorizations = ["projects/236289982072/locations/global/dnsAuthorizations/dns-authz-i-a-shion-pro"]
    domains            = ["i.a.shion.pro", "*.i.a.shion.pro"]
    issuance_config    = null
  }
}
