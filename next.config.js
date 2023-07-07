/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false,
    outputFileTracingIgnores: ['**chrome-aws-lambda**'],
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
