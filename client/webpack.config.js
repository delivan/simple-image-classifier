const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "src", "app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'index.css',
    }),
    new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: path.resolve(__dirname, "src", "index.html"),
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 3000,
    compress: true,
    public: "ai4ar.dev.goorm.io"
  }
};
