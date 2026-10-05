/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build run beside a live `next dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },


};

module.exports = nextConfig;