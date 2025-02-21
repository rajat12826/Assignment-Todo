/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Only add the fallback for the client bundle
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          child_process: false,
        };
      }
      return config;
    },
  };
export default nextConfig;
