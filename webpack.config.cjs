const path = require("path");

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: ".\\src\\site\\index.ts", // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist/script"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "index.js", // string
    // the filename template for entry chunks
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
    /* Advanced module configuration (click to show) */
  },
  resolve: {
    // directories where to look for modules
    extensions: [".ts", ".js"],
    // extensions that are used
  },
  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
};