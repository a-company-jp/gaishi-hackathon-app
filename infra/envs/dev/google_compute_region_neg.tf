resource "google_compute_region_network_endpoint_group" "cloudrun_backend_main_endpoint_group" {
  description           = null
  name                  = "cloudrun-backend-main-endpoint-group"
  network               = null
  network_endpoint_type = "SERVERLESS"
  project               = google_project.itadakimasu.project_id
  psc_target_service    = null
  region                = var.region
  subnetwork            = null
  cloud_run {
    service  = "backend-main"
    tag      = null
    url_mask = null
  }
}
