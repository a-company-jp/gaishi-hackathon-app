import {
  id = "projects/${google_project.itadakimasu.project_id}/locations/asia-northeast1/services/backend-main"
  to = google_cloud_run_v2_service.backend
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/locations/asia-northeast1/services/frontend-main"
  to = google_cloud_run_v2_service.frontend
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/locations/asia-northeast1/repositories/itadakimasu"
  to = google_artifact_registry_repository.itadakimasu
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/instances/main-sql"
  to = google_sql_database_instance.main-sql
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/locations/asia-northeast1/instances/redis-main"
  to = google_redis_instance.main
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/global/networks/default"
  to = google_compute_network.default
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/managedZones/custom-stores"
  to = google_dns_managed_zone.default
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/managedZones/custom-stores/rrsets/*.i.a.shion.pro./CNAME"
  to = google_dns_record_set.wildcard_cname_2_store
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/managedZones/custom-stores/rrsets/i.a.shion.pro./NS"
  to = google_dns_record_set.ns
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/managedZones/custom-stores/rrsets/i.a.shion.pro./SOA"
  to = google_dns_record_set.soa
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/managedZones/custom-stores/rrsets/store.i.a.shion.pro./CNAME"
  to = google_dns_record_set.store_cname
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/secrets/backend-settings-yaml"
  to = google_secret_manager_secret.backend-settings-yaml
}

import {
  id = "itadakimasu-engulid"
  to = google_project.itadakimasu
}

import {
  id = "projects/${google_project.itadakimasu.project_id}/regions/asia-northeast1/subnetworks/default"
  to = google_compute_subnetwork.default
}
