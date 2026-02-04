/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 👈 Tells Next.js to generate static HTML
  images: {
    unoptimized: true, // 👈 Required for Next.js Image to work on GitHub Pages
  },
};

export default nextConfig;