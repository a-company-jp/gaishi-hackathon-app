include {
  path = find_in_parent_folders()
}

generate "provider" {
  path      = "_provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = file("../../shared/provider.tf")
}

generate "version" {
  path      = "_version.tf"
  if_exists = "overwrite_terragrunt"
  contents  = file("../../shared/version.tf")
}

generate "variables" {
  path      = "_variables.tf"
  if_exists = "overwrite_terragrunt"
  contents  = file("../../shared/variables.tf")
}

generate "backend" {
  path      = "_backend.tf"
  if_exists = "overwrite_terragrunt"
  contents  = file("../../shared/backend.tf")
}
