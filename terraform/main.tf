terraform {
  cloud {
    organization = "E-ecommerce"

    workspaces {
      name = "test"
    }
  }
}
