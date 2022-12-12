resource "google_cloud_run_service" "default" {
  name     = "redpanda-frontend"
  location = "europe.west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/redpanda/frontend"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
