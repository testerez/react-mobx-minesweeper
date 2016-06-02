var getConfig = require('hjs-webpack')


module.exports = getConfig({
  in: 'src/index.tsx',
  out: 'dist',
  clearBeforeBuild: true
})