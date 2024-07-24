/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */

  async rewrites() {
    return [
      {
        source: '/api/:path*', // Capture any API requests
        destination: 'https://banking.com/api/v1/:path*', // Forward to backend URL
      },
    ];
  },
};

export default nextConfig;
