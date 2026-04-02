import { existsSync } from "fs";
import path from "path";
import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import createNextIntlPlugin from "next-intl/plugin";

// If `next dev` runs from a parent folder, default env loading may miss `website/.env.local`
// (API routes then see no RESEND_* / CONTACT_* and return 503). Prefer `./website/.env.local`,
// then fall back to cwd.
const envCandidates = [path.join(process.cwd(), "website"), process.cwd()];
// Second argument must be `true` in development or @next/env skips `.env.local`
// (see next/dist/server/config.js: loadEnvConfig(dir, phase === PHASE_DEVELOPMENT_SERVER)).
const isDev = process.env.NODE_ENV !== "production";

let envLoaded = false;
for (const dir of envCandidates) {
  if (existsSync(path.join(dir, ".env.local"))) {
    loadEnvConfig(dir, isDev);
    envLoaded = true;
    break;
  }
}
if (!envLoaded) {
  for (const dir of envCandidates) {
    if (existsSync(path.join(dir, ".env"))) {
      loadEnvConfig(dir, isDev);
      break;
    }
  }
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/favicon.ico", destination: "/favicon.svg", permanent: false }];
  },
};

export default withNextIntl(nextConfig);
