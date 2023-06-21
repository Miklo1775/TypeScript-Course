const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  // target: "node",
  // externals: [nodeExternals()],
  // externalsPresets: {
  //   node: true,
  // },
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: path.resolve(__dirname, "node_modules/"),
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
