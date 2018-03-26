let HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry:'./src/index.ts',
  output: {
    path: require('path').resolve(__dirname, './dist'),
    filename: 'gome-react-ui.js',
    libraryTarget: 'umd'
  },
  module: {
    rules:[
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
      // {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.(jpg|png|gif)$/,use:'url-loader'},
      {test: /\.tsx?$/,use: 'ts-loader',exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ]
};
