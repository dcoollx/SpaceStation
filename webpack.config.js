const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode:'development',
  entry: './src/main.ts',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/assets", to: "assets" },
    ],
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
  }),
],
  module: {
    rules: [
      {
        test:/\.(png|jpg|jpeg|gif|mp3|wav|ogg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options:{
        compilerOptions:{
          noEmit:false
        }
      }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer :{
    host:'127.0.0.1',
    contentBase: './dist',
    port : 9000
  },
  output: {
    filename: 'bundle.js',
    assetModuleFilename:"assets/[hash][ext][query]",
    path: path.resolve(__dirname, 'dist'),
  },
};