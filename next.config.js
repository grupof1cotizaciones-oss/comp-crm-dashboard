/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/crm/:path*',
        destination: `${process.env.COMP_CRM_API_URL || 'https://api.trycrm.ai'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;