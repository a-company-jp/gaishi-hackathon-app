resource "google_redis_instance" "main" {
  alternative_location_id = null
  auth_enabled            = false
  authorized_network      = google_compute_network.default.id
  connect_mode            = "DIRECT_PEERING"
  customer_managed_key    = null
  display_name            = "redis-main"
  labels                  = {}
  location_id             = "asia-northeast1-c"
  maintenance_version     = "20240411_00_00"
  memory_size_gb          = 1
  name                    = "redis-main"
  project                 = "itadakimasu-engulid"
  read_replicas_mode      = "READ_REPLICAS_DISABLED"
  redis_configs           = {}
  redis_version           = "REDIS_7_0"
  region                  = "asia-northeast1"
  replica_count           = 0
  reserved_ip_range       = null
  secondary_ip_range      = null
  tier                    = "BASIC"
  transit_encryption_mode = "DISABLED"
  persistence_config {
    persistence_mode        = "DISABLED"
    rdb_snapshot_period     = null
    rdb_snapshot_start_time = null
  }
}
