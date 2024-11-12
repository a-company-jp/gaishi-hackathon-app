terraform {
  backend "gcs" {
    bucket = "itadakimasu-infra"
    prefix = "envs/dev/terraform.tfstate"
  }
}
