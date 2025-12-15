/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) config.devtool = false;
    return config;
  },
};

export default nextConfig;
