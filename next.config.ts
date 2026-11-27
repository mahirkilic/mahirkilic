import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: Hostinger serves the files in `out/` directly,
  // no Node.js server needed.
  output: "export",
  // Emit /page/index.html so Apache serves clean URLs like /awards/.
  trailingSlash: true,
  // The image optimizer needs a server; serve images as-is instead.
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
