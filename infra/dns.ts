import { primary, zones } from "./zones";

const site = `https://www.${primary}`;

// Shared by every zone. Rocket Loader would defer the inline scripts that run
// before first paint; Email Obfuscation rewrites the site's mailto links.
const settings = {
  rocket_loader: "off",
  email_obfuscation: "off",
  always_use_https: "on",
  automatic_https_rewrites: "on",
  brotli: "on",
} as const;

for (const [name, { dnssec = true, records }] of Object.entries(zones)) {
  // Zones are the one thing that can't be recreated safely: protect them.
  const { id: zoneId } = new cloudflare.Zone(
    name,
    { account: { id: sst.cloudflare.DEFAULT_ACCOUNT_ID }, name, type: "full" },
    { protect: true },
  );
  if (dnssec) new cloudflare.ZoneDnssec(`${name}-dnssec`, { zoneId, status: "active" });

  // The site's proxied origins (Pages, traceway's nginx, which redirects to
  // HTTPS) need "full": "flexible" would loop. The other zones only redirect.
  const ssl = name === primary ? "full" : "flexible";
  for (const [settingId, value] of Object.entries({ ...settings, ssl })) {
    new cloudflare.ZoneSetting(`${name}-${settingId}`, { zoneId, settingId, value });
  }

  // Name records by host and type, numbering repeats (MX, TXT) in the order listed.
  const seen = new Map<string, number>();
  for (const { host, ttl = 1, ...record } of records) {
    const key = `${name}-${host}-${record.type}`;
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    new cloudflare.DnsRecord(n === 1 ? key : `${key}-${n}`, {
      zoneId,
      name: host === "@" ? name : `${host}.${name}`,
      ttl,
      ...record,
    });
  }

  // Redirects (replacing the old Page Rules) for the named hosts only, so a
  // real subdomain added later isn't swallowed.
  const hosts = name === primary ? [name] : [name, `www.${name}`];
  new cloudflare.Ruleset(`${name}-redirects`, {
    zoneId,
    name: "default",
    kind: "zone",
    phase: "http_request_dynamic_redirect",
    rules: [
      {
        description: `Redirect to ${site}`,
        expression: hosts.map((host) => `(http.host eq "${host}")`).join(" or "),
        action: "redirect",
        actionParameters: {
          fromValue: {
            statusCode: 302,
            targetUrl: { expression: `concat("${site}", http.request.uri.path)` },
            preserveQueryString: true,
          },
        },
      },
    ],
  });
}
