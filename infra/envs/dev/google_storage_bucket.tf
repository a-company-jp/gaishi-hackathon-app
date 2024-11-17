resource "google_storage_bucket" "itadakimasu_docs" {
  default_event_based_hold    = false
  enable_object_retention     = false
  force_destroy               = false
  labels                      = {}
  location                    = "ASIA-NORTHEAST1"
  name                        = "itadakimasu-docs"
  project                     = "itadakimasu-engulid"
  public_access_prevention    = "inherited"
  requester_pays              = false
  rpo                         = null
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  hierarchical_namespace {
    enabled = false
  }
  soft_delete_policy {
    retention_duration_seconds = 604800
  }
  website {
    main_page_suffix = "index.html"
    not_found_page   = "/404.index"
  }
}

resource "google_storage_bucket" "itadakimasu_frontend" {
  default_event_based_hold    = false
  enable_object_retention     = false
  force_destroy               = false
  labels                      = {}
  location                    = "ASIA-NORTHEAST1"
  name                        = "itadakimasu-frontend"
  project                     = "itadakimasu-engulid"
  public_access_prevention    = "inherited"
  requester_pays              = false
  rpo                         = null
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  hierarchical_namespace {
    enabled = false
  }
  lifecycle_rule {
    action {
      storage_class = null
      type          = "Delete"
    }
    condition {
      age                                     = 0
      created_before                          = null
      custom_time_before                      = null
      days_since_custom_time                  = 0
      days_since_noncurrent_time              = 0
      matches_prefix                          = []
      matches_storage_class                   = []
      matches_suffix                          = []
      noncurrent_time_before                  = null
      num_newer_versions                      = 1
      send_age_if_zero                        = false
      send_days_since_custom_time_if_zero     = false
      send_days_since_noncurrent_time_if_zero = false
      send_num_newer_versions_if_zero         = false
      with_state                              = "ARCHIVED"
    }
  }
  lifecycle_rule {
    action {
      storage_class = null
      type          = "Delete"
    }
    condition {
      age                                     = 0
      created_before                          = null
      custom_time_before                      = null
      days_since_custom_time                  = 0
      days_since_noncurrent_time              = 1
      matches_prefix                          = []
      matches_storage_class                   = []
      matches_suffix                          = []
      noncurrent_time_before                  = null
      num_newer_versions                      = 0
      send_age_if_zero                        = false
      send_days_since_custom_time_if_zero     = false
      send_days_since_noncurrent_time_if_zero = false
      send_num_newer_versions_if_zero         = false
      with_state                              = "ANY"
    }
  }
  soft_delete_policy {
    retention_duration_seconds = 604800
  }
  versioning {
    enabled = true
  }
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}