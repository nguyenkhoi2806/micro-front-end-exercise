const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const path = require("path");
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const exposeComponent = require("./exposeComponent");

const PORT = process.env.PORT || 3003;
module.exports = defineConfig({
  publicPath: "auto",
  transpileDependencies: true,
  pages: {
    index: {
      entry: "./src/index.ts",
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    host: "0.0.0.0",
    port: PORT,
    historyApiFallback: true,
  },

  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config.resolve.extensions.add(".vue").add(".js");
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));

    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader");

    config.plugin("ProvidePlugin").use(webpack.ProvidePlugin, [
      {
        process: "process/browser",
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      },
    ]);
    config.plugin("ModuleFederationPlugin").use(ModuleFederationPlugin, [
      {
        name: "checkout",
        exposes: exposeComponent,
        filename: "remoteEntry.js",
        shared: {
          "@fortawesome/vue-fontawesome": {
            singleton: true,
          },
          vue: {
            singleton: true,
            eager: false,
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
      },
    ]);
  },
});
