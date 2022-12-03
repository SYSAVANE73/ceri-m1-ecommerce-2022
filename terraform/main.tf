terraform {
  cloud {
    organization = "E-ecommerce"

    workspaces {
      #name = "redpanda"
      name = "test"
    }
  }
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region = "europe.west1"
}
