resource "google_secret_manager_secret" "backend-settings-yaml" {
  annotations         = {}
  expire_time         = null
  labels              = {}
  project             = "itadakimasu-engulid"
  secret_id           = "backend-settings-yaml"
  ttl                 = null
  version_aliases     = {}
  version_destroy_ttl = null
  replication {
    auto {
    }
  }
}
