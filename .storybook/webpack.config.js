// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  devtool: 'sourcemap',
  plugins: [
    require('precss')
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|png|mp3|wav|ogg)$/,
        loaders: ['url-loader']
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2|gif)$/,
          loader: 'file?name=public/fonts/[name].[ext]'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      '../node_modules',
      '../__mock__'
    ]
  }
}
