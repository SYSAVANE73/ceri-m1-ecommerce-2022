data "google_secret_manager_secret" "address" {
    secret_id = "mysql_address"
}

data "google_secret_manager_secret" "database" {
    secret_id = "mysql-database-redpanda"
}

data "google_secret_manager_secret" "password" {
    secret_id = "mysql-password-redpanda"
}

data "user" {
    secret_id = "redpanda"
}

resource "google_cloud_run_service" "backend" {
  name     = "redpanda-backend"
  location = "europe.west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/redpanda/backend:1.3.2"
      }

      env{
        name = "DATABASE_ADDRESS"
        value_from {
            secret_key_ref {
                name = data.google_secret_manager_secret.address.secret_id
                key = "lates"
            }
        }
      }

      env{
        name = "DATABASE_USERNAME"
        value_from {
            secret_key_ref {
                name = data.user
                key = "lates"
            }
        }
      }

      env{
        name = "DATABASE_NAME"
        value_from {
            secret_key_ref {
                name = data.google_secret_manager_secret.database.secret_id
                key = "lates"
            }
        }
      }

      env{
        name = "DATABASE_PASSWORD"
        value_from {
            secret_key_ref {
                name = data.google_secret_manager_secret.password.secret_id
                key = "lates"
            }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
