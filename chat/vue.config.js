const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const exposeComponent = require("./exposeComponent");
const path = require('path');
const { remotes } = require("../main/src/remotesConfig");

const PORT = process.env.PORT || 3006;

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/index.ts",
    },
  },
  publicPath: "auto",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    host: "0.0.0.0",
    port: PORT,
    historyApiFallback: true
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    resolve: {
      alias: {
        '@components': path.join(__dirname, 'src/components'),
        '@views': path.join(__dirname, 'src/views'),
        '@assets': path.join(__dirname, 'src/assets'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': "jquery"
      }),
      new webpack.container.ModuleFederationPlugin({
        name: "chat",
        filename: "remoteEntry.js",
        exposes: exposeComponent,
        shared: {
          vue: {
            singleton: true,
          },
          axios: {
            singleton: true,
          },
          bootstrap: {
            singleton: true,
          },
          jquery: {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
