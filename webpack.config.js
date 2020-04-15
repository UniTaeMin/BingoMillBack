const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devtool: "source-map",
  target: "node",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  }
}
