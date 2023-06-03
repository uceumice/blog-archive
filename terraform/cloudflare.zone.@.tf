resource "cloudflare_zone" "ueuie" {
  account_id = var.cloudflare_account_id
  zone       = "ueuie.dev"
}

resource "cloudflare_zone" "swetae" {
  account_id = var.cloudflare_account_id
  zone       = "swetae.com"
}

resource "cloudflare_zone" "uceumice" {
  account_id = var.cloudflare_account_id
  zone       = "uceumice.com"
}

resource "cloudflare_zone" "alextocar" {
  account_id = var.cloudflare_account_id
  zone       = "alextocar.me"
}
