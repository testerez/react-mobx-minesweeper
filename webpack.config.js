var getConfig = require('hjs-webpack')


var conf = getConfig({
  in: 'src/index.tsx',
  out: 'dist',
  clearBeforeBuild: true
});

// TODO: see why I had to do this
conf.resolve.extensions.push('.tsx');

module.exports = conf;
