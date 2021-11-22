terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "kclejeune"
    workspaces { name = "portfolio" }
  }
}

provider "cloudflare" {}

locals {
  deploy_target = "portfolio-kte.pages.dev"
  canonical     = "kclj.io"
  domains       = ["kclj.io", "kennanlejeune.com", "kclejeune.com"]
}

resource "cloudflare_zone" "zones" {
  for_each = toset(local.domains)
  zone     = each.key
  plan     = "free"
}

resource "cloudflare_record" "kennanlejeune-keybase" {
  name    = "@"
  zone_id = cloudflare_zone.zones["kennanlejeune.com"].id
  type    = "TXT"
  value   = "keybase-site-verification=jGapzb8uL8tkrFxg8-PoyOej2YgDNnk-RY4Fgz5pIyM"
  proxied = false
}

resource "cloudflare_record" "kclj-io-keybase" {
  name    = "@"
  zone_id = cloudflare_zone.zones["kclj.io"].id
  type    = "TXT"
  value   = "keybase-site-verification=fF5XX_ZJwDAojwina42g7Zc71IR6_vDhSZztkranxKI"
  proxied = false
}

resource "cloudflare_record" "root_record" {
  for_each = toset(local.domains)
  name     = "@"
  zone_id  = cloudflare_zone.zones[each.key].id
  type     = "CNAME"
  value    = local.deploy_target
  proxied  = true
}

resource "cloudflare_record" "www_record" {
  for_each = toset(local.domains)
  zone_id  = cloudflare_zone.zones[each.key].id
  name     = "www"
  type     = "CNAME"
  value    = local.deploy_target
  proxied  = true
}

resource "cloudflare_page_rule" "redirect_root" {
  priority = 1
  for_each = setsubtract(local.domains, [local.canonical])
  target   = "https://${each.key}/*"
  zone_id  = cloudflare_zone.zones[each.key].id

  actions {
    forwarding_url {
      url         = "https://${local.canonical}/$1"
      status_code = 302
    }
  }
}

resource "cloudflare_page_rule" "redirect_www" {
  priority = 1
  for_each = toset(local.domains)
  target   = "https://www.${each.key}/*"
  zone_id  = cloudflare_zone.zones[each.key].id
  actions {
    forwarding_url {
      url         = "https://${local.canonical}/$1"
      status_code = 302
    }
  }
}

resource "cloudflare_zone_settings_override" "settings" {
  for_each = toset(local.domains)
  zone_id  = cloudflare_zone.zones[each.key].id
  settings {
    ssl           = "flexible"
    rocket_loader = "on"
    minify {
      html = "on"
      css  = "on"
      js   = "on"
    }
    always_use_https         = "on"
    automatic_https_rewrites = "on"
    email_obfuscation        = "on"
  }
}
