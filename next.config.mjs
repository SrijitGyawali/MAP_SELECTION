/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    config.resolve.alias.canvas = false;
    return config;
  },
  transpilePackages: ["react-leaflet"],
  experimental: {
    // Disable Turbopack for compatibility
  },
};

export default nextConfig;



