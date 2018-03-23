let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:'./src/index.js',
  output: {
    path:require('path').resolve('./dist'),
    filename: 'gome-react-ui.js',
    libraryTarget: 'umd'
  },
  module: {
    rules:[
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
      // {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.(jpg|png|gif)$/,use:'url-loader'}
    ]
  },
  // devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ]
};
