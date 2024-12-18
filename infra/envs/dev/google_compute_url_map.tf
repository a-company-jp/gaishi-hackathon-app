resource "google_compute_url_map" "lb_frontend" {
  default_service = google_compute_backend_bucket.itadakimasu_frontend.id
  description     = null
  name            = "lb-frontend"
  project         = google_project.itadakimasu.project_id
  host_rule {
    description  = null
    hosts        = ["*.i.a.shion.pro"]
    path_matcher = "path-matcher-2"
  }
  host_rule {
    description  = null
    hosts        = ["docs.i.a.shion.pro"]
    path_matcher = "path-matcher-1"
  }
  path_matcher {
    default_service = google_compute_backend_bucket.itadakimasu_docs.id
    description     = null
    name            = "path-matcher-1"
  }
  path_matcher {
    default_service = google_compute_backend_bucket.itadakimasu_frontend.id
    description     = null
    name            = "path-matcher-2"
    path_rule {
      paths   = ["/api/*"]
      service = google_compute_backend_service.frontend-main.id
    }
  }
}
