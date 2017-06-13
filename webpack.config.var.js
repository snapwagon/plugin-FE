const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = path.join(__dirname, 'src');
const output = path.join(__dirname, 'dist');

const plugins = [];

if (process.env.MINIFY) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));

  plugins.push(new HtmlWebpackPlugin({
    title: 'My App',
    filename: 'assets/test.html'
  }));
}

module.exports = {
  entry: [
    entry,
  ],
  output: {
    path: output,
    filename: process.env.MINIFY ? 'recoop.min.js' : 'recoop.js',
    libraryTarget: 'var',
    library: 'recoop',
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ]
  },
  plugins,
};
