/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn.stocksnap.io',
      },
          
        ],
      },
}

module.exports = nextConfig
