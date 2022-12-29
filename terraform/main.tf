terraform {
  cloud {
    hostname     = "app.terraform.io"  
    organization = "E-ecommerce"
  
    workspaces {
      name = "redpanda"
    }
  }
}
