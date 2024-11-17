resource "google_sql_database_instance" "main-sql" {
  database_version     = "POSTGRES_16"
  deletion_protection  = false
  encryption_key_name  = null
  instance_type        = "CLOUD_SQL_INSTANCE"
  maintenance_version  = "POSTGRES_16_4.R20240910.01_15"
  master_instance_name = null
  name                 = "main-sql"
  project              = google_project.itadakimasu.project_id
  region               = var.region
  root_password        = null # sensitive
  settings {
    activation_policy            = "ALWAYS"
    availability_type            = "ZONAL"
    collation                    = null
    connector_enforcement        = "NOT_REQUIRED"
    deletion_protection_enabled  = false
    disk_autoresize              = true
    disk_autoresize_limit        = 0
    disk_size                    = 10
    disk_type                    = "PD_SSD"
    edition                      = "ENTERPRISE"
    enable_dataplex_integration  = false
    enable_google_ml_integration = false
    pricing_plan                 = "PER_USE"
    tier                         = "db-f1-micro"
    time_zone                    = null
    user_labels                  = {}
    backup_configuration {
      binary_log_enabled             = false
      enabled                        = true
      location                       = "asia"
      point_in_time_recovery_enabled = true
      start_time                     = "12:00"
      transaction_log_retention_days = 7
      backup_retention_settings {
        retained_backups = 7
        retention_unit   = "COUNT"
      }
    }
    insights_config {
      query_insights_enabled  = true
      query_plans_per_minute  = 5
      query_string_length     = 1024
      record_application_tags = false
      record_client_address   = false
    }
    ip_configuration {
      allocated_ip_range                            = null
      enable_private_path_for_google_cloud_services = true
      ipv4_enabled                                  = true
      private_network                               = google_compute_network.default.id
      server_ca_mode                                = "GOOGLE_MANAGED_INTERNAL_CA"
      ssl_mode                                      = "ALLOW_UNENCRYPTED_AND_ENCRYPTED"
    }
    location_preference {
      follow_gae_application = null
      secondary_zone         = null
      zone                   = "asia-northeast1-b"
    }
    maintenance_window {
      day          = 7
      hour         = 0
      update_track = "canary"
    }
  }
}
