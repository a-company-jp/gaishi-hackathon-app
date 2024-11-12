resource "google_cloud_run_v2_service" "frontend" {
  annotations          = {}
  client               = "cloud-console"
  client_version       = null
  custom_audiences     = []
  deletion_protection  = true
  description          = null
  ingress              = "INGRESS_TRAFFIC_ALL"
  invoker_iam_disabled = false
  labels               = {}
  launch_stage         = "GA"
  location             = "asia-northeast1"
  name                 = "frontend-main"
  project              = "itadakimasu-engulid"
  template {
    annotations           = {}
    encryption_key        = null
    execution_environment = null
    labels = {
      github_sha = "test"
    }
    max_instance_request_concurrency = 80
    revision                         = null
    service_account                  = "gh-actions@itadakimasu-engulid.iam.gserviceaccount.com"
    session_affinity                 = false
    timeout                          = "300s"
    containers {
      args        = []
      command     = []
      depends_on  = []
      image       = "asia-northeast1-docker.pkg.dev/itadakimasu-engulid/itadakimasu/frontend:latest"
      name        = "frontend-1"
      working_dir = null
      ports {
        container_port = 3000
        name           = "http1"
      }
      resources {
        cpu_idle = true
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        startup_cpu_boost = true
      }
      startup_probe {
        failure_threshold     = 1
        initial_delay_seconds = 0
        period_seconds        = 240
        timeout_seconds       = 240
        tcp_socket {
          port = 3000
        }
      }
    }
    scaling {
      max_instance_count = 100
      min_instance_count = 0
    }
  }
  traffic {
    percent  = 100
    revision = null
    tag      = null
    type     = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}

resource "google_cloud_run_v2_service" "backend" {
  annotations          = {}
  client               = "cloud-console"
  client_version       = null
  custom_audiences     = []
  deletion_protection  = true
  description          = null
  ingress              = "INGRESS_TRAFFIC_ALL"
  invoker_iam_disabled = false
  labels               = {}
  launch_stage         = "GA"
  location             = "asia-northeast1"
  name                 = "backend-main"
  project              = "itadakimasu-engulid"
  template {
    annotations           = {}
    encryption_key        = null
    execution_environment = null
    labels = {
      github_sha = "3f35450c0aa1a425a896e932b67e1ca5aefa0050"
    }
    max_instance_request_concurrency = 80
    revision                         = null
    service_account                  = "gh-actions@itadakimasu-engulid.iam.gserviceaccount.com"
    session_affinity                 = false
    timeout                          = "300s"
    containers {
      args        = []
      command     = []
      depends_on  = []
      image       = "asia-northeast1-docker.pkg.dev/itadakimasu-engulid/itadakimasu/backend:latest"
      name        = "backend-1"
      working_dir = null
      ports {
        container_port = 8080
        name           = "http1"
      }
      resources {
        cpu_idle = true
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        startup_cpu_boost = true
      }
      startup_probe {
        failure_threshold     = 1
        initial_delay_seconds = 0
        period_seconds        = 240
        timeout_seconds       = 240
        tcp_socket {
          port = 8080
        }
      }
      volume_mounts {
        mount_path = "/secrets"
        name       = "secret"
      }
      volume_mounts {
        mount_path = "/cloudsql"
        name       = "cloudsql"
      }
    }
    scaling {
      max_instance_count = 100
      min_instance_count = 0
    }
    volumes {
      name = "secret"
      secret {
        default_mode = 0
        secret       = "backend-settings-yaml"
        items {
          mode    = 0
          path    = "settings.yaml"
          version = "latest"
        }
      }
    }
    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = ["itadakimasu-engulid:asia-northeast1:main-sql"]
      }
    }
    vpc_access {
      connector = null
      egress    = "PRIVATE_RANGES_ONLY"
      network_interfaces {
        network    = "default"
        subnetwork = "default"
        tags       = []
      }
    }
  }
  traffic {
    percent  = 100
    revision = null
    tag      = null
    type     = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}
