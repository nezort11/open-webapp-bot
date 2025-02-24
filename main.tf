# https://registry.terraform.io/providers/yandex-cloud/yandex/latest/docs
terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
      version = "0.138.0"
    }
  }
}

provider "yandex" {
  token     = var.yc_token
  cloud_id  = var.yc_cloud_id
  folder_id = var.yc_folder_id
  zone      = var.yc_zone  # "ru-central1-a"
}

resource "yandex_function" "open-webapp-bot-function" {
  name       = "open-webapp-bot-function"
  user_hash  = filebase64sha256("open-webapp-bot.zip")
  runtime    = "nodejs18"
  entrypoint = "build/index.handler"
  service_account_id = var.service_account_id

  memory = 128
  execution_timeout = 60 # 5m
  concurrency = 5

  content {
    zip_filename = "open-webapp-bot.zip"
  }

# Error: Zip archive content size 43654324 exceeds the maximum size 3670016, use object storage to upload the content
#   package {
#     # Upload to bucket to avoid function installing dependencies restrictions
#     # https://yandex.cloud/en/docs/functions/concepts/limits#functions-other-restrictions
#     bucket_name = yandex_storage_bucket.open-webapp-bot-code.id
#     object_name = "function.zip"
#   }
}

resource "yandex_api_gateway" "open-webapp-bot-function-gateway" {
  name        = "open-webapp-bot-function-gateway"
  description = "API Gateway for open-webapp-bot function"
  execution_timeout = "60" # sync with function execution timeout

  spec = <<EOF
openapi: 3.0.0
info:
  title: "open-webapp-bot function gateway"
  version: "1.0.0"
paths:
  /webhook:
    post:
      x-yc-apigateway-integration:
        type: cloud_functions
        function_id: "${yandex_function.open-webapp-bot-function.id}"
        tag: "$latest"
        payload_format_version: "1.0"
        service_account_id: "${var.service_account_id}"
      responses:
        "200":
          description: "ok"
EOF
}
