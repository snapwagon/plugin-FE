const path = require('path');
const webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = path.join(__dirname, 'src');
const output = path.join(__dirname, 'dist');

const plugins = [];

if (process.env.MINIFY) {
  plugins.push(new HtmlWebpackPlugin({
    title: 'My App',
    filename: 'assets/test.html'
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));
  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //   },
  // }));
  // plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  // plugins.push(new CompressionPlugin({
  //       asset: "[path].gz[query]",
  //       algorithm: "gzip",
  //       test: /\.js$|\.css$|\.html$/,
  //       threshold: 10240,
  //       minRatio: 0.8
  //     }));
}

module.exports = {
  entry: [
    entry,
  ],
  output: {
    path: output,
    filename: process.env.MINIFY ? 'snapwagon.min.js' : 'snapwagon.js',
    libraryTarget: 'var',
    library: 'snapwagon',
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  module: {
    loaders: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|gif)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      }
    ]
  },
  plugins,
};
