/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/webhook/messenger',
        destination: '/api/webhook-messenger'
      },
      {
        source: '/webhook/twilio',
        destination: '/api/webhook-twilio'
      },
      {
        source: '/calendar/sync',
        destination: '/api/calendar-sync'
      }
    ];
  }
};
export default nextConfig;
