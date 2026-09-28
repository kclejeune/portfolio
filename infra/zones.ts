/**
 * The site's zones and every DNS record in them that DNS can edit. Records
 * other products own are read-only here and left to them:
 * - kclj.io: assets (R2 custom domain); cache, app.cache, diffs, ntfy
 *   (other Workers' custom domains)
 * - the other zones: cf2024-1._domainkey (Email Routing's DKIM key)
 */

/** The site's own zone; the others redirect to its www host. */
export const primary = "kclj.io";

export interface DnsRecord {
  /** Relative to the zone; "@" is the apex. */
  host: string;
  type: "A" | "AAAA" | "CNAME" | "MX" | "TXT";
  content: string;
  priority?: number;
  proxied?: boolean;
  /** Seconds; 1 (the default) is automatic. */
  ttl?: number;
  comment?: string;
}

export interface Zone {
  /** DNSSEC (default on). Turning it on needs a DS record at the registrar. */
  dnssec?: boolean;
  records: DnsRecord[];
}

export const zones: { [name: string]: Zone } = {
  "kclj.io": {
    records: [
      {
        host: "@",
        type: "CNAME",
        content: "kclj.pages.dev",
        proxied: true,
      },
      {
        host: "@",
        type: "MX",
        content: "in1-smtp.messagingengine.com",
        priority: 10,
      },
      {
        host: "@",
        type: "MX",
        content: "in2-smtp.messagingengine.com",
        priority: 20,
      },
      {
        host: "@",
        type: "TXT",
        content: '"google-site-verification=Mqv13UhGf5WEZ_LMiAn4p_OTe43XySnTDMxFkEApB7U"',
        ttl: 3600,
      },
      {
        host: "@",
        type: "TXT",
        content: '"keybase-site-verification=fF5XX_ZJwDAojwina42g7Zc71IR6_vDhSZztkranxKI"',
      },
      {
        host: "@",
        type: "TXT",
        content: '"openai-domain-verification=dv-MJsJwT9arWfzwmJs68NdaSgO"',
      },
      {
        host: "@",
        type: "TXT",
        content: '"v=spf1 include:spf.messagingengine.com ?all"',
      },
      {
        host: "_dmarc",
        type: "TXT",
        content:
          '"v=DMARC1; p=none; rua=mailto:8ab86a795e174c2d9834e8eb0ecc8a5b@dmarc-reports.cloudflare.net"',
      },
      {
        host: "auth",
        type: "CNAME",
        content: "gateway.kclj.io",
      },
      {
        host: "gateway",
        type: "A",
        content: "5.161.248.157",
      },
      {
        host: "gateway",
        type: "AAAA",
        content: "2a01:4ff:f0:4c93::1",
      },
      {
        host: "mads",
        type: "CNAME",
        content: "mads-3zf.pages.dev",
        proxied: true,
      },
      {
        host: "netbird",
        type: "CNAME",
        content: "gateway.kclj.io",
      },
      {
        host: "traceway",
        type: "CNAME",
        content: "gateway.kclj.io",
        proxied: true,
      },
      {
        host: "www",
        type: "CNAME",
        content: "kclj.pages.dev",
        proxied: true,
      },
      {
        host: "fm1._domainkey",
        type: "CNAME",
        content: "fm1.kclj.io.dkim.fmhosted.com",
      },
      {
        host: "fm2._domainkey",
        type: "CNAME",
        content: "fm2.kclj.io.dkim.fmhosted.com",
      },
      {
        host: "fm3._domainkey",
        type: "CNAME",
        content: "fm3.kclj.io.dkim.fmhosted.com",
      },
    ],
  },
  "kennanlejeune.com": {
    records: [
      {
        host: "@",
        type: "CNAME",
        content: "portfolio-kte.pages.dev",
        proxied: true,
      },
      {
        host: "@",
        type: "MX",
        content: "amir.mx.cloudflare.net",
        priority: 36,
      },
      {
        host: "@",
        type: "MX",
        content: "isaac.mx.cloudflare.net",
        priority: 8,
      },
      {
        host: "@",
        type: "MX",
        content: "linda.mx.cloudflare.net",
        priority: 85,
      },
      {
        host: "@",
        type: "TXT",
        content: "google-site-verification=18VZMtbYAtUpq8KJjJL0YQq4ADNlrJIsx4S6VL0aqsw",
        ttl: 3600,
      },
      {
        host: "@",
        type: "TXT",
        content: "keybase-site-verification=jGapzb8uL8tkrFxg8-PoyOej2YgDNnk-RY4Fgz5pIyM",
      },
      {
        host: "@",
        type: "TXT",
        content: "v=spf1 include:_spf.mx.cloudflare.net ~all",
      },
      {
        host: "www",
        type: "CNAME",
        content: "portfolio-kte.pages.dev",
        proxied: true,
      },
    ],
  },
  "kclejeune.com": {
    records: [
      {
        host: "@",
        type: "CNAME",
        content: "kclj.pages.dev",
        proxied: true,
      },
      {
        host: "@",
        type: "MX",
        content: "route1.mx.cloudflare.net",
        priority: 71,
      },
      {
        host: "@",
        type: "MX",
        content: "route2.mx.cloudflare.net",
        priority: 95,
      },
      {
        host: "@",
        type: "MX",
        content: "route3.mx.cloudflare.net",
        priority: 42,
      },
      {
        host: "@",
        type: "TXT",
        content: "v=spf1 include:_spf.mx.cloudflare.net ~all",
      },
      {
        host: "www",
        type: "CNAME",
        content: "kclj.pages.dev",
        proxied: true,
      },
    ],
  },
  "kennan.me": {
    records: [
      {
        host: "@",
        type: "CNAME",
        content: "kclj.pages.dev",
        proxied: true,
      },
      {
        host: "@",
        type: "MX",
        content: "route1.mx.cloudflare.net",
        priority: 35,
      },
      {
        host: "@",
        type: "MX",
        content: "route2.mx.cloudflare.net",
        priority: 24,
      },
      {
        host: "@",
        type: "MX",
        content: "route3.mx.cloudflare.net",
        priority: 33,
      },
      {
        host: "@",
        type: "TXT",
        content: "v=spf1 include:_spf.mx.cloudflare.net ~all",
      },
      {
        host: "www",
        type: "CNAME",
        content: "kclj.pages.dev",
        proxied: true,
      },
    ],
  },
  "kclejeune.dev": {
    dnssec: false,
    // New: the zone was empty. 100:: is a placeholder address; the records only
    // need to be proxied so the redirect answers before any origin would.
    records: [
      { host: "@", type: "AAAA", content: "100::", proxied: true },
      { host: "www", type: "AAAA", content: "100::", proxied: true },
    ],
  },
};
