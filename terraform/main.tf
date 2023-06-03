terraform {
  cloud {
    organization = "uceumice"
    workspaces {
      name = "uceumice"
    }
  }
  
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">=0.13"
    }
  }
}
