const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = function (env, args) {
  const outDir = path.join(__dirname, 'out')
  const nodeModulesDir = path.join(__dirname, 'node_modules')

  const srcDir = path.join(__dirname, 'src')

  return {
    entry: {
      background: path.join(srcDir, 'background.js'),
      sidepanel: path.join(srcDir, 'sidepanel.js')
    },
    output: {
      filename: '[name].js',
      path: outDir
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new CaseSensitivePathsPlugin(),
      new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: true, allowAsyncCycles: false }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(srcDir, 'sidepanel.html'), to: 'sidepanel.html', force: true },
          { from: path.join(srcDir, 'manifest.json'), to: 'manifest.json', force: true }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /(\.js|\.cjs)$/,
          use: { loader: 'babel-loader' },
          exclude: [path.resolve(nodeModulesDir)],
          include: [
            path.resolve(srcDir)
          ]
        }
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.js',
        '.json'
      ]
    }
  }
}
