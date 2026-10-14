import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Apply strict security headers including X-Frame-Options to all routes except uploads
        source: "/((?!uploads/).*)",
        headers: securityHeaders,
      },
      {
        // Allow uploads (like PDF documents) to be embedded in iframes/objects without X-Frame-Options blocking Chrome PDF viewer
        source: "/uploads/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/document", destination: "/satitmcuReg", permanent: true },
      { source: "/facility", destination: "/download", permanent: true },
    ];
  },
};

export default nextConfig;
