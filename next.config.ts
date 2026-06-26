import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    'sanity',
    '@sanity/vision',
    '@sanity/image-url',
    'next-sanity',
    'styled-components',
  ],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
