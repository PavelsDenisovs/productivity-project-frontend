const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.[jt]sx?$/] },
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
