var webpackConfig = require('./webpack.config');

const specPattern = '**/*.spec.@(ts|tsx)';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './src/testSetup.ts',
      specPattern,
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.@(ts|tsx)': ['webpack'],
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      externals: {
        // Those are conditional imports from enzime that
        // are used only for older React versions and generate
        // errors in build.
        // See: https://github.com/airbnb/enzyme/issues/47#issuecomment-162256140
        "react/lib/ExecutionEnvironment": "window",
        "react/lib/ReactContext": "window",
      },
    },
    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },
    client: {
      // Allow to use --grep on `karma start` to filter executed tests list
      args: config.grep && config.grep !== true && ['--grep', config.grep],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
};
