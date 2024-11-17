# resource "google_cloud_run_v2_service" "frontend" {
#   annotations          = {}
#   client               = "cloud-console"
#   client_version       = null
#   custom_audiences     = []
#   deletion_protection  = false
#   description          = null
#   ingress              = "INGRESS_TRAFFIC_ALL"
#   invoker_iam_disabled = false
#   labels               = {}
#   launch_stage         = "GA"
#   location             = var.region
#   name                 = "frontend-main"
#   project              = google_project.itadakimasu.project_id
#   template {
#     annotations           = {}
#     encryption_key        = null
#     execution_environment = null
#     labels = {
#       github_sha = "test"
#     }
#     max_instance_request_concurrency = 80
#     revision                         = null
#     service_account                  = "gh-actions@itadakimasu-engulid.iam.gserviceaccount.com"
#     session_affinity                 = false
#     timeout                          = "300s"
#     containers {
#       args        = []
#       command     = []
#       depends_on  = []
#       image       = "${var.region}-docker.pkg.dev/${google_project.itadakimasu.project_id}/${google_artifact_registry_repository.itadakimasu.repository_id}/frontend:latest"
#       name        = "frontend-1"
#       working_dir = null
#       ports {
#         container_port = 3000
#         name           = "http1"
#       }
#       resources {
#         cpu_idle = true
#         limits = {
#           cpu    = "1000m"
#           memory = "512Mi"
#         }
#         startup_cpu_boost = true
#       }
#       startup_probe {
#         failure_threshold     = 1
#         initial_delay_seconds = 0
#         period_seconds        = 240
#         timeout_seconds       = 240
#         tcp_socket {
#           port = 3000
#         }
#       }
#     }
#     scaling {
#       max_instance_count = 100
#       min_instance_count = 0
#     }
#   }
#   traffic {
#     percent  = 100
#     revision = null
#     tag      = null
#     type     = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
#   }
#   lifecycle {
#     ignore_changes = [
#       template[0].labels["github_sha"]
#     ]
#   }
# }

resource "google_cloud_run_v2_service" "backend" {
  annotations          = {}
  client               = "cloud-console"
  client_version       = null
  custom_audiences     = []
  deletion_protection  = false
  description          = null
  ingress              = "INGRESS_TRAFFIC_ALL"
  invoker_iam_disabled = false
  labels               = {}
  launch_stage         = "GA"
  location             = var.region
  name                 = "backend-main"
  project              = google_project.itadakimasu.project_id
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
      image       = "${var.region}-docker.pkg.dev/${google_project.itadakimasu.project_id}/${google_artifact_registry_repository.itadakimasu.repository_id}/backend:latest"
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
        network    = google_compute_network.default.name
        subnetwork = google_compute_subnetwork.default.name
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
  lifecycle {
    ignore_changes = [
      template[0].labels["github_sha"]
    ]
  }
}
