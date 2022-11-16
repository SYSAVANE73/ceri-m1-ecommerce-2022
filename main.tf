terraform {
  cloud {
    organization   = "E-commerce"
    workspace {
      name = ""
    }
  }
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region = ""
}
