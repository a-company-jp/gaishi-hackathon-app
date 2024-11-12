resource "google_certificate_manager_certificate_map" "frontend" {
  name        = "i-a-shion-p"
  description = "certificate map for i-a-shion-p"
  labels = {
    "terraform" : true,
    "acc-test" : true,
  }
}

resource "google_certificate_manager_certificate_map_entry" "i_a_shion_p" {
  name        = "cert-map-entry"
  description = "My acceptance test certificate map entry"
  map         = google_certificate_manager_certificate_map.frontend.name
  labels = {
    "terraform" : true,
    "acc-test" : true,
  }
  certificates = [google_certificate_manager_certificate.wildcard_i_a_shion_pro.id]
  matcher      = "PRIMARY"
}
