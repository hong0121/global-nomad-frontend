import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      new URL(
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/**'
      ),
    ],
  },
};

export default nextConfig;
