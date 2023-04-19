const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const { dependencies } = require('./package.json');
const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3005;
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  entry: './src/index',
  mode: isDevelopment ? 'development' : process.env.NODE_ENV,
  devServer: {
    client: {
      overlay: false
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    host: '0.0.0.0',
    port: PORT,
    hot: true,
    compress: !isDevelopment,
    historyApiFallback: true,
  },
  watchOptions: {
    poll: isDevelopment
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      process: "process/browser"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          }
        ],
        include: /\.module\.(sa|sc|c)ss$/
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          }
        ],
        exclude: /\.module\.(sa|sc|c)ss$/
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /jquery.+\.js$/,
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: [
                {
                  globalName: "jquery-nice-select",
                  override: true
                },
                {
                  globalName: "slicknav",
                  override: true
                }
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': "jquery"
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'shared',
      exposes: {
        'Button': './src/components/Button',
        'HeroBanner': './src/components/HeroBanner',
        'Icon': './src/components/Icon',
        'Select': './src/components/Select',
        'SnackMessage': './src/components/SnackMessage',
      },
      filename: 'remoteEntry.js',
      shared: {
        ...dependencies,
        react: {
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          requiredVersion: dependencies['react-dom'],
        },
        jquery: {
          requiredVersion: dependencies['jquery']
        },
        'jquery-ui': {
          requiredVersion: dependencies['jquery-ui-bundle']
        },
        bootstrap: {
          requiredVersion: dependencies['bootstrap']
        },
        'font-awesome': {
          requiredVersion: dependencies['font-awesome']
        },
        axios: {
          requiredVersion: dependencies['axios']
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    })
  ].filter(Boolean)
};
