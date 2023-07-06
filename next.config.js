/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
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
