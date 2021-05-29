const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

module.exports = {
  mode,
  output: {
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  target: isDevelopment ? 'web' : 'browserslist',
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [{
        // from: 'src/img/**',
        from: path.resolve(__dirname, 'src', 'img'),
        globOptions: {
          ignore: ['**/backgrounds/**'],
        },
        to: 'img',
      }],
    }),
  ].concat(isDevelopment ? [] : [new MiniCssExtractPlugin()]),
};
