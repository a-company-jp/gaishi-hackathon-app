import {
  id = "locations/asia-northeast1/namespaces/itadakimasu-engulid/services/backend-main"
  to = google_cloud_run_service.backend
}

import {
  id = "locations/asia-northeast1/namespaces/itadakimasu-engulid/services/frontend-main"
  to = google_cloud_run_service.frontend
}

import {
  id = "projects/itadakimasu-engulid/locations/asia-northeast1/repositories/itadakimasu"
  to = google_artifact_registry_repository.itadakimasu
}

import {
  id = "projects/itadakimasu-engulid/instances/main-sql"
  to = google_sql_database_instance.main-sql
}

import {
  id = "projects/itadakimasu-engulid/locations/asia-northeast1/instances/redis-main"
  to = google_redis_instance.main
}

import {
  id = "projects/itadakimasu-engulid/global/networks/default"
  to = google_compute_network.default
}


