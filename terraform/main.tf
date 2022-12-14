<<<<<<< HEAD
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
=======
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
  region = "europe.west1"
}
>>>>>>> 12a0be982fbc6a04c8214f2be073571e795739fd
