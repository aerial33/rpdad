import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        hostname: 'www.rpdad.fr',
        protocol: 'https',
      },
      {
        hostname: 'rpdad.vercel.app',
        protocol: 'https',
      },
      {
        hostname: 'sandbox-tailwind-template.netlify.app',
        protocol: 'https',
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'picsum.photos',
        protocol: 'https',
      },
      {
        hostname: 'images.pexels.com',
        protocol: 'https',
      },
      {
        hostname: '*.youtube.com',
        protocol: 'https',
      },
      {
        hostname: '*.r2.cloudflarestorage.com',
        protocol: 'https',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/c15t/:path*',
        destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
      },
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
