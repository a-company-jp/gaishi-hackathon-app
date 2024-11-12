resource "google_project" "itadakimasu" {
  auto_create_network = true
  billing_account     = "0161DA-AF3F3A-A60D1B"
  deletion_policy     = "PREVENT"
  folder_id           = null
  labels              = {}
  name                = "itadakimasu-engulid"
  org_id              = jsonencode(574798021622)
  project_id          = "itadakimasu-engulid"
  tags                = null
}
