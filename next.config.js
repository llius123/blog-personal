// next.config.js
const withImages = require("next-images");
module.exports = withImages();
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};
