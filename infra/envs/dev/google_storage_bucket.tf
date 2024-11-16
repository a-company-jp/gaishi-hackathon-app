resource "google_compute_backend_bucket" "itadakimasu_frontend" {
  bucket_name             = "itadakimasu-frontend"
  compression_mode        = null
  custom_response_headers = []
  description             = null
  edge_security_policy    = null
  enable_cdn              = false
  name                    = "itadakimasu-frontend"
  project                 = "itadakimasu-engulid"
}

resource "google_compute_backend_bucket" "itadakimasu_docs" {
  bucket_name             = "itadakimasu-docs"
  compression_mode        = null
  custom_response_headers = []
  description             = null
  edge_security_policy    = null
  enable_cdn              = false
  name                    = "itadakimasu-docs"
  project                 = "itadakimasu-engulid"
}

