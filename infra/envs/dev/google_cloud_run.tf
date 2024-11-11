resource "google_cloud_run_service" "backend" {
  autogenerate_revision_name = false
  location                   = "asia-northeast1"
  name                       = "backend-main"
  project                    = "itadakimasu-engulid"
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "itadakimasu-engulid"
  }
  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "100"
        "run.googleapis.com/client-name"        = "cloud-console"
        "run.googleapis.com/cloudsql-instances" = "itadakimasu-engulid:asia-northeast1:main-sql"
        "run.googleapis.com/network-interfaces" = "[{\"network\":\"default\",\"subnetwork\":\"default\"}]"
        "run.googleapis.com/startup-cpu-boost"  = "true"
        "run.googleapis.com/vpc-access-egress"  = "private-ranges-only"
      }
      name      = null
      namespace = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "gh-actions@itadakimasu-engulid.iam.gserviceaccount.com"
      timeout_seconds       = 300
      containers {
        args    = []
        command = []
        image   = "asia-northeast1-docker.pkg.dev/itadakimasu-engulid/itadakimasu/backend:latest"
        name    = "backend-1"
        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
          requests = {}
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
      }
      volumes {
        name = "secret"
        secret {
          default_mode = 0
          secret_name  = "backend-settings-yaml"
          items {
            key  = "latest"
            mode = 0
            path = "settings.yaml"
          }
        }
      }
    }
  }
  traffic {
    latest_revision = true
    percent         = 100
    revision_name   = null
    tag             = null
  }
}

resource "google_cloud_run_service" "frontend" {
  autogenerate_revision_name = false
  location                   = "asia-northeast1"
  name                       = "frontend-main"
  project                    = "itadakimasu-engulid"
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "itadakimasu-engulid"
  }
  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"     = "100"
        "run.googleapis.com/client-name"       = "cloud-console"
        "run.googleapis.com/startup-cpu-boost" = "true"
      }
      name      = null
      namespace = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "gh-actions@itadakimasu-engulid.iam.gserviceaccount.com"
      timeout_seconds       = 300
      containers {
        args    = []
        command = []
        image   = "asia-northeast1-docker.pkg.dev/itadakimasu-engulid/itadakimasu/frontend:latest"
        name    = "frontend-1"
        ports {
          container_port = 3000
          name           = "http1"
          protocol       = null
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
          requests = {}
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
    }
  }
  traffic {
    latest_revision = true
    percent         = 100
    revision_name   = null
    tag             = null
  }
}

