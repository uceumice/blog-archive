module "simple-login-ueuie" {
  source  = "uceumice/simple-login/cloudflare"
  version = "0.0.2"
  # ----
  for_each = toset([
    "@",
  ])
  # ----
  domain  = each.key
  zone_id = cloudflare_zone.ueuie.id
}

module "simple-login-swetae" {
  source  = "uceumice/simple-login/cloudflare"
  version = "0.0.2"
  # ----
  for_each = toset([
    "@",
  ])
  # ----
  domain  = each.key
  zone_id = cloudflare_zone.swetae.id
}

module "simple-login-uceumice" {
  source  = "uceumice/simple-login/cloudflare"
  version = "0.0.2"
  # ----
  for_each = toset([
    "@"
  ])
  # ----
  domain  = each.key
  zone_id = cloudflare_zone.uceumice.id
}

module "simple-login-alextocar" {
  source  = "uceumice/simple-login/cloudflare"
  version = "0.0.2"
  # ----
  for_each = toset([
    "@",
  ])
  # ----
  domain  = each.key
  zone_id = cloudflare_zone.alextocar.id
}