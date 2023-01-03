terraform {
  cloud {
    organization = "E-ecommerce"
  
    workspaces {
      name = "redpanda"
    }
  }
}

variable "tf_token" {
  default = ""
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe.west1"
  credentials = var.tf_token
}
