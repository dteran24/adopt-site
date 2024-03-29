/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.stocksnap.io",
      },
      {
        protocol: "https",
        hostname: "dl5zpyw5k3jeb.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
    ],
  },
};

module.exports = nextConfig;
