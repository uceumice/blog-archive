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

resource "cloudflare_record" "sendgrid" {
  zone_id = cloudflare_zone.ueuie.id
  # ----
  count = length(var.cloudflare_sendgrid_ueuie_setup)
  # ----
  type  = "CNAME"
  name  = var.cloudflare_sendgrid_ueuie_setup[count.index].name
  value = var.cloudflare_sendgrid_ueuie_setup[count.index].value
}

resource "cloudflare_record" "github-pages" {
  zone_id = cloudflare_zone.ueuie.id
  # ----
  type  = "CNAME"
  name  = "blog"
  value = "uceumice.github.io"
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
