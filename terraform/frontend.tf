resource "google_cloud_run_service" "frontend" {
  name     = "redpanda-frontend"
  location = "europe.west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/redpanda/frontend:1.3.2"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

