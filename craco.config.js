const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

dotenv.config();

const ENV = process.env.DEPLOY_ENV || "uat";
const result = dotenv.config({ path: `./config/.env.${ENV}` });

if (result.error) {
  throw result.error;
}

const env = result.parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next.trim()}`] = JSON.stringify(env[next].trim());
  return prev;
}, {});

module.exports = {
  webpack: {
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new NodePolyfillPlugin({ excludeAliases: ["console"] }),
    ],
    configure: {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          "@assets": path.resolve(__dirname, "src/assets"),
          "@components": path.resolve(__dirname, "src/components"),
          "@hooks": path.resolve(__dirname, "src/hooks"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@redux": path.resolve(__dirname, "src/redux"),
          "@services": path.resolve(__dirname, "src/services"),
          "@utils": path.resolve(__dirname, "src/utils"),
        },
        fallback: {},
      },
    },
  },
};
