
variable "profile" {
  type    = string
  default = "dev"
}

variable "project" {
  type    = string
  default = "network-cloud-002277864"
}

variable "source_image" {
  type    = string
  default = "centos-stream-8"
}

variable "ssh_username" {
  type    = string
  default = "packer"
}

variable "image_name" {
  type    = string
  default = "web-app"
}

variable "image_family" {
  description = "Family name for the custom image on GCP"
  type        = string
  default     = "web-app"
}

variable "zone" {
  description = "regional zone"
  type        = string
  default     = "us-east1-b"
}

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}
source "googlecompute" "custom-image" {
  project_id          = var.project
  source_image_family = var.source_image
  image_name          = var.image_name
  image_family        = var.image_family
  ssh_username        = var.ssh_username
  zone                = var.zone

}

build {
  sources = ["source.googlecompute.custom-image"]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./packer/node.service"
    destination = "/tmp/node.service"
  }
  provisioner "shell" {
    scripts          = ["./packer/installer.sh", "./packer/create-user.sh", "./packer/startserver.sh"]
    valid_exit_codes = [0, 2300218]
  }
}

