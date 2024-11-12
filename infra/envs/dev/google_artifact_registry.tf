resource "google_artifact_registry_repository" "itadakimasu" {
  cleanup_policy_dry_run = true
  description            = null
  format                 = "DOCKER"
  kms_key_name           = null
  labels                 = {}
  location               = var.region
  mode                   = "STANDARD_REPOSITORY"
  project                = google_project.itadakimasu.project_id
  repository_id          = "itadakimasu"
  cleanup_policies {
    action = "DELETE"
    id     = "delete older than 1 day"
    condition {
      newer_than            = null
      older_than            = "86400s"
      package_name_prefixes = []
      tag_prefixes          = []
      tag_state             = "ANY"
      version_name_prefixes = []
    }
  }
  cleanup_policies {
    action = "KEEP"
    id     = "keep-10"
    most_recent_versions {
      keep_count            = 10
      package_name_prefixes = []
    }
  }
  docker_config {
    immutable_tags = false
  }
}
