const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test:/\.(png|jpg|jpeg|gif|mp3|wav)$/i,
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