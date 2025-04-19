// next.config.js
const withSvgr = require("next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
    ],
  },
});

module.exports = nextConfig;
