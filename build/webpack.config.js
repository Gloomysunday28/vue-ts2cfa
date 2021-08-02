const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './core/index.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ]
}