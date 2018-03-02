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
    publicPath: ""
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
      { test: /\.tsx?$/, loader: "react-hot!ts" },
      { test: /\.json$/, loader: "json" },
      { test: /\.scss$/, loaders: [
        'style?sourceMap',
        'css?sourceMap&modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
        'postcss',
        'sass?sourceMap',
      ]},
      { test: /\.(png|svg|otf|ttf)$/, loader: "url?limit=100000" },
      { test: /\.jpg$/, loader: "file" },
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
