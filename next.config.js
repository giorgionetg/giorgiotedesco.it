const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withSass], [withImages]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));

    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });

    return config;
  },
  trailingSlash: true,
  webpack5: false,
  i18n: {
    locales: ["en", "it", "pt"],
    defaultLocale: "en",
    localeDetection: true,
  },
  env: {},
});
