var path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "dist", "index.html"),
      inject: 'body'
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist", "assets"),
    filename: "bundle.js"
  },
  resolve: { extensions: [".js", ".jsx"] }
}