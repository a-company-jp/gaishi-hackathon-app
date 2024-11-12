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

import {
  id = "projects/itadakimasu-engulid/managedZones/custom-stores"
  to = google_dns_managed_zone.default
}

import {
  id = "projects/itadakimasu-engulid/managedZones/custom-stores/rrsets/*.i.a.shion.pro./CNAME"
  to = google_dns_record_set.wildcard_cname_2_store
}

import {
  id = "projects/itadakimasu-engulid/managedZones/custom-stores/rrsets/i.a.shion.pro./NS"
  to = google_dns_record_set.ns
}

import {
  id = "projects/itadakimasu-engulid/managedZones/custom-stores/rrsets/i.a.shion.pro./SOA"
  to = google_dns_record_set.soa
}

import {
  id = "projects/itadakimasu-engulid/managedZones/custom-stores/rrsets/store.i.a.shion.pro./CNAME"
  to = google_dns_record_set.store_cname
}

import {
  id = "projects/itadakimasu-engulid/secrets/backend-settings-yaml"
  to = google_secret_manager_secret.backend-settings-yaml
}
