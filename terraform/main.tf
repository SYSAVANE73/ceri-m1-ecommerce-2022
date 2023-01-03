terraform {
  cloud {
    hostname = "app.terraform.io"
    organization = "E-ecommerce"
  
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
