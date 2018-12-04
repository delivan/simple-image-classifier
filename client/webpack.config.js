const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  }
};