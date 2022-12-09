// webpack.config.js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    "router-client-service": path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    library: "libraryStarter",
    libraryTarget: "umd",
    globalObject: "this",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: [
    {
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    },
  ],
  externalsPresets: { node: true },
  resolve: {
    extensions: [".js", ".ts"],
    symlinks: false,
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      util: require.resolve("util"),
      url: require.resolve("url"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
};
