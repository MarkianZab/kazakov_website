import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["resend", "@react-email/render", "prettier"],
};

export default nextConfig;
