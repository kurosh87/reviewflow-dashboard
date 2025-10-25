/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Environment variables exposed to browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'ReviewFlow Dashboard',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },

  // API proxy to WordPress (prevents CORS issues)
  // Note: Disabled for now - API client connects directly to WordPress
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/wp/:path*',
  //       destination: `${process.env.WORDPRESS_URL}/wp-json/reviewflow/v1/:path*`,
  //     },
  //   ];
  // },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    domains: [
      'localhost',
      'supabase.co',
      // Add your WordPress domain here
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
