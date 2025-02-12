/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Configuration PWA
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  }
};