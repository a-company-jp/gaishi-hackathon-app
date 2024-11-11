remote_state {
  backend = "gcs"
  generate = {
    path      = "_backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    project = "itadakimasu-engulid"
    bucket = "itadakimasu-infra"
    prefix = "${path_relative_to_include()}/terraform.tfstate"
    location = "asia-northeast1"
  }
}
