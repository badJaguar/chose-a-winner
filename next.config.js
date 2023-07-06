/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false,
    outputFileTracingIgnores: ['**canvas**'],
},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["scontent-waw1-1.cdninstagram.com"],
  },
}
