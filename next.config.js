const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.[jt]sx?$/] },
      use: ['@svgr/webpack'],
    });
    return config;
  },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
};

module.exports = nextConfig;
