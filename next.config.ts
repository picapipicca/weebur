const nextConfig = {
  webpack(config: any) {
    //SVGR 적용
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            icon: true,
            svgo: true,
            prettier: false,
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
