/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['https://greenacres.vercel.app/'], // Add any image domains you're using
    unoptimized: true
  },
}

export default nextConfig
