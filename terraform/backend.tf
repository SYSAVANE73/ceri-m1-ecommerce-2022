data "google-secret_manager_secret" "adress" {
  secret_id = "mysql_adress" 
}
resource "google_cloud_run_service" "default" {
  name     = "cloudrun-srv"
  location = "us-central1"

  template {
    spec {
      service_account_name = ""
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
        env {
          name = ""
          value_from {
            secret_key_ref {
              name = "google-secret_manager_secret.adress.secret_id"
              key = "lates"
            }
          }
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "1000"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.instance.connection_name
        "run.googleapis.com/client-name"        = "terraform"
      }
    }
  }
  autogenerate_revision_name = true
}

resource "google_sql_database_instance" "instance" {
  name             = "cloudrun-sql"
  region           = "us-east1"
  database_version = "MYSQL_5_7"
  settings {
    tier = "db-f1-micro"
  }

  deletion_protection  = "true"
}
