const webpack = require('webpack')

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API to client routing
      historyApiFallback: true,
      // Enable HMR
      hot: true,
      inline: true,
      progress: true,
      // Display only errors
      stats: 'errors-only',
      // Parse host & port from env options
      host: options.host,
      port: options.port
    },
    plugins: [
      // Enable multi-pass compilation for performance
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  }
}

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  }
}
