var path = require('path')
var webpack = require('webpack')

module.exports = {
  cache: true,
  debug: true,
  devtool: 'source-map',
  entry: './presentation/main.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: [/node_modules/], loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    root: path.resolve('./presentation')
  }
}
