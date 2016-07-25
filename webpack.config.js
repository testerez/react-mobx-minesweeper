'use strict';

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

// clearBeforeBuild: true,
// "devtool": "cheap-module-eval-source-map",

module.exports = {
  entry: [
    "./src/index.tsx"
  ],
  output: {
    path: "dist/",
    filename: "app.js",
    cssFilename: "app.css",
    hash: false,
    publicPath: "/"
  },
  resolve: {
    extensions: [
      "",
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx",
    ]
  },
  devtool: "source-map",
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "react-hot!awesome-typescript-loader" },
      { test: /\.json$/, loader: "json" },
      { test: /\.scss$/, loader: "style-loader!css-loader?modules!postcss-loader!sass?sourceMap" },
      { test: /\.(png|svg)$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
    ],
  },
  postcss: () => [autoprefixer],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mines',
      template: './src/index.html',
    }),
    new WebpackBuildNotifierPlugin({
      title: 'webpack',
      successSound: false,
      suppressSuccess: true,
    }),
  ],
  devServer: {
    noInfo: true,
    quiet: false,
    lazy: false,
    publicPath: "/",
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: "./dist",
    port: 3000,
    https: false,
    hostname: "localhost"
  }
};
