terraform {
  cloud {
    organization = "deploiement"

    workspaces {
      name = "redpanda"
    }
  }
}
