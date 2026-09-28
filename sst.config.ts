// SST's generated types can only be referenced this way.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// Cloudflare zones, DNS, redirects, and zone settings (see infra/). The site
// itself still deploys with wrangler (wrangler.jsonc).
export default $config({
  app() {
    return {
      name: "portfolio",
      // State lives in an R2 bucket in the Cloudflare account.
      home: "cloudflare",
      // Removing a resource from the config never deletes it in Cloudflare.
      removal: "retain",
      providers: {
        cloudflare: { package: "@pulumi/cloudflare", version: "6.21.0" },
      },
    };
  },
  async run() {
    await import("./infra/dns");
  },
});
