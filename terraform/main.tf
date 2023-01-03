terraform {
  cloud {
    organization = "E-ecommerce"
  
    workspaces {
      name = "redpanda"
    }
  }
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe.west1"
}