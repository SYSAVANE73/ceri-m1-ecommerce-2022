terraform {
  cloud {
    organization = "deploiement"
  
    workspaces {
      name = "redpanda"
    }
  }
}

variable "CREDENTIALS" {
  default = ""
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe.west1"
  credentials = var.CREDENTIALS
}
