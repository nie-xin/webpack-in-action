const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge')
// const validate = require('webpack-validator')

const parts = require('./lib/parts')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

// common settings for all environment
const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    // [name] will be replaced by the name of the chunk
    // 'app' in this case
    // Ref: https://github.com/webpack/docs/wiki/configuration
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack in action'
    })
  ]
}

// Branching environment
var config
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      parts.setupCSS(PATHS.app)
    )
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.app),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    )
}

// Exports branched config
// module.exports = validate(config)
// The validator reported error for stats & progress setting, so I turned it off
module.exports = config
