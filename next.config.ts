/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [], // Remove the incorrect domain format
    unoptimized: true,
    disableStaticImages: true // Completely disable static image optimization
  },
}

export default nextConfig
