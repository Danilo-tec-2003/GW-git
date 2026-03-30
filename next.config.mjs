/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Otimizações para Vercel
  images: {
    unoptimized: false,
  },
}

export default nextConfig
