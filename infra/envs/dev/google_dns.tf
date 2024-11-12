resource "google_dns_record_set" "ns" {
  managed_zone = "custom-stores"
  name         = "i.a.shion.pro."
  project      = "itadakimasu-engulid"
  rrdatas      = ["ns-cloud-a1.googledomains.com.", "ns-cloud-a2.googledomains.com.", "ns-cloud-a3.googledomains.com.", "ns-cloud-a4.googledomains.com."]
  ttl          = 21600
  type         = "NS"
}

resource "google_dns_record_set" "soa" {
  managed_zone = "custom-stores"
  name         = "i.a.shion.pro."
  project      = "itadakimasu-engulid"
  rrdatas      = ["ns-cloud-a1.googledomains.com. cloud-dns-hostmaster.google.com. 1 21600 3600 259200 300"]
  ttl          = 21600
  type         = "SOA"
}

resource "google_dns_record_set" "wildcard_cname_2_store" {
  managed_zone = "custom-stores"
  name         = "*.i.a.shion.pro."
  project      = "itadakimasu-engulid"
  ttl          = 3600
  type         = "CNAME"
  routing_policy {
    wrr {
      rrdatas = ["store.i.a.shion.pro."]
      weight  = 1000
    }
  }
}

resource "google_dns_managed_zone" "default" {
  description   = null
  dns_name      = "i.a.shion.pro."
  force_destroy = false
  labels        = {}
  name          = "custom-stores"
  project       = "itadakimasu-engulid"
  visibility    = "public"
  cloud_logging_config {
    enable_logging = false
  }
}

resource "google_dns_record_set" "store_cname" {
  managed_zone = "custom-stores"
  name         = "store.i.a.shion.pro."
  project      = "itadakimasu-engulid"
  rrdatas      = ["ghs.googlehosted.com."]
  ttl          = 18000
  type         = "CNAME"
}
