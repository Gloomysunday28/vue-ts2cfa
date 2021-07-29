const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: './core/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ]
}