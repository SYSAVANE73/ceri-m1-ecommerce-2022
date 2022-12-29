terraform {
  cloud {
    hostname     = "app.terraform.io"  
    organization = "E-ecommerce"
  
    workspaces {
      name = "redpanda"
    }
  }
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe.west1"
  credentials = var.tf_token
}

variable "tf_token" {
  default = ""
}
