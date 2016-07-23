var getConfig = require('hjs-webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

var config = getConfig({
  in: 'src/index.tsx',
  out: 'dist',
  clearBeforeBuild: true,
});


// Typescript config adjustments to enable HMR
// Might be unnecessary in the future.
// See: https://github.com/HenrikJoreteg/hjs-webpack/issues/227

var tsLoaderConfig = config.module.loaders.find(loaderConfig =>
  loaderConfig.loaders && loaderConfig.loaders[0] === 'awesome-typescript-loader'
);
tsLoaderConfig.loaders = [
  'react-hot',
  'awesome-typescript-loader'
];
config.resolve.extensions = config.resolve.extensions.concat(['.ts', '.tsx']);



config.plugins.push(new WebpackBuildNotifierPlugin({
  title: 'webpack',
  successSound: false,
  suppressSuccess: true,
}));


//console.log(JSON.stringify(config, null, 2));
module.exports = config;
