variable "cloudflare_ueuie_zone_id" {
  sensitive = true
  type      = string
}

variable "cloudflare_swetae_zone_id" {
  sensitive = true
  type      = string
}

variable "cloudflare_uceumice_zone_id" {
  sensitive = true
  type      = string
}

variable "cloudflare_alextocar_zone_id" {
  sensitive = true
  type      = string
}

variable "cloudflare_sendgrid_ueuie_setup" {
  type      = list(object({ name = string, value = string }))
  sensitive = true
}
