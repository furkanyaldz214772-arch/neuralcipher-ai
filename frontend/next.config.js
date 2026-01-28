/** @type {import('next').NextConfig} */
// Admin dashboard build fix - force cache clear
const nextConfig = {
  // Vercel deployment - remove static export for dynamic routes
  // output: 'export',
  
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization - disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Compression
  compress: true,
  
  // Performance
  poweredByHeader: false,
  generateEtags: true,
  
  // Bundle analyzer (development only)
  webpack: (config, { dev, isServer }) => {
    // Bundle size optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              if (!module.context) return 'npm.vendor';
              const match = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );
              if (!match) return 'npm.vendor';
              const packageName = match[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
