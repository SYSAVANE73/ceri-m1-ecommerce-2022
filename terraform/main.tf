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
  region  = "europe-west1"
}

data "google_secret_manager_secret" "host" {
  secret_id = "mysql-address"
}

data "google_secret_manager_secret" "database" {
  secret_id = "mysql-database-redpanda"
}

data "google_secret_manager_secret" "password" {
  secret_id = "mysql-password-redpanda"
}

resource "google_cloud_run_service" "backend" {
  name     = "redpanda-backend"
  location = "europe-west1"

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "1"
        "run.googleapis.com/cloudsql-instances" = "ceri-m1-ecommerce-2022:europe-west1:mysql-primary"
      }
    }
    spec {
      service_account_name = "terraform-redpanda@ceri-m1-ecommerce-2022.iam.gserviceaccount.com"
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/redpanda/backend:1.3.2"
        env {
          name = "DATABASE_ADDRESS"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.host.secret_id
              key = "latest"
            }
          }
        }
        env {
          name = "DATABASE_USERNAME"
          value = "redpanda"
        }
        env {
          name = "DATABASE_NAME"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.database.secret_id
              key = "latest"
            }
          }
        }
        env {
          name = "DATABASE_PASSWORD"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.password.secret_id
              key = "latest"
            }
          }
        }
        /*
        ports {
          container_port = 8082
        }
        */
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service" "frontend" {
  name     = "redpanda-frontend"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/redpanda/frontend:1.3.3"
        /*
        env {
          name = "BACK_URL"
          value = google_cloud_run_service.backend.status[0].url
        }
        */
        ports {
          container_port = 8081
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

output "back_url" {
  value = google_cloud_run_service.backend.status[0].url
}

output "front_url" {
  value = google_cloud_run_service.frontend.status[0].url
}

resource "google_cloud_run_service_iam_member" "invokers-backend" {
  location = google_cloud_run_service.backend.location
  service = google_cloud_run_service.backend.name
  role    = "roles/run.invoker"
  member  = "allUsers"
}

resource "google_cloud_run_service_iam_member" "invokers-frontend" {
  location = google_cloud_run_service.frontend.location
  service = google_cloud_run_service.frontend.name
  role    = "roles/run.invoker"
  member  = "allUsers"
}

/*
resource "google_cloud_run_service_iam_member" "invokers" {
  location = google_cloud_run_service.back_end.location
  service = google_cloud_run_service.backend.name
  role    = "roles/run.invoker"
  member  = "allUsers"
}
*/
