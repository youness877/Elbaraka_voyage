import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Retire l'en-tête "X-Powered-By: Next.js" — n'apporte rien au visiteur,
  // ne sert qu'à révéler la stack technique ; les audits sécurité/perf
  // (Lighthouse, security headers scanners) le signalent systématiquement.
  poweredByHeader: false,
  // Turbopack (and webpack) walk up from this file looking for lockfiles to
  // infer the workspace root. On some machines — especially Windows, or when
  // the project sits under a folder that also contains an unrelated
  // lockfile/package.json further up (e.g. Downloads) — that inference picks
  // the wrong directory and the build fails with "Next.js inferred your
  // workspace root, but it may not be correct." Pinning it explicitly to
  // this project's own directory removes the guesswork entirely.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Next.js already serves hashed build output under /_next/static with a
  // long, immutable cache automatically. Files under /public (the local
  // car photos in /images/cars and brand marks in /images/brands) are NOT
  // content-hashed, so they don't get that same treatment by default on
  // every host — this makes sure repeat visits don't re-download them.
  // These paths only ever change when the underlying image file itself is
  // replaced, so a long max-age is safe.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
