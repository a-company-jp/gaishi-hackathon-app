resource "google_dns_record_set" "ns" {
  managed_zone = google_dns_managed_zone.default.name
  name         = "i.a.shion.pro."
  project      = google_project.itadakimasu.project_id
  rrdatas = [
    "ns-cloud-a1.googledomains.com.",
    "ns-cloud-a2.googledomains.com.",
    "ns-cloud-a3.googledomains.com.",
    "ns-cloud-a4.googledomains.com."
  ]
  ttl  = 21600
  type = "NS"
}

resource "google_dns_record_set" "soa" {
  managed_zone = google_dns_managed_zone.default.name
  name         = "i.a.shion.pro."
  project      = google_project.itadakimasu.project_id
  rrdatas      = ["ns-cloud-a1.googledomains.com. cloud-dns-hostmaster.google.com. 1 21600 3600 259200 300"]
  ttl          = 21600
  type         = "SOA"
}

resource "google_dns_managed_zone" "default" {
  description   = null
  dns_name      = "i.a.shion.pro."
  force_destroy = false
  labels        = {}
  name          = "custom-stores"
  project       = google_project.itadakimasu.project_id
  visibility    = "public"
  cloud_logging_config {
    enable_logging = false
  }
}

resource "google_dns_record_set" "wildcard_i_a_shion_pro" {
  managed_zone = google_dns_managed_zone.default.name
  name         = "*.i.a.shion.pro."
  project      = google_project.itadakimasu.project_id
  rrdatas      = [data.google_compute_global_address.ip_frontend.address]
  ttl          = 18000
  type         = "A"
}

resource "google_dns_record_set" "acme_challenge_i_a_shion_pro" {
  managed_zone = google_dns_managed_zone.default.name
  name         = "_acme-challenge_kfs2xoh3ykfhojhw.i.a.shion.pro."
  project      = google_project.itadakimasu.project_id
  rrdatas      = ["accefa0b-f34f-4e6e-bb84-b810a1063275.9.authorize.certificatemanager.goog."]
  ttl          = 3600
  type         = "CNAME"
}
