terraform {
  cloud {
    organization = "E-ecommerce"

    workspaces {
      name = "test"
    }
  }
}
provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe.west1"
}
