const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config();

const envs = new webpack.DefinePlugin({
  'process.env': {
  },
});

const commons = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

const copyFiles = new CopyWebpackPlugin([{
  from: './resources/assets/fonts',
  to: './fonts',
}], {
  copyUnmodified: true,
});

module.exports = {
  entry: {
    app: './resources',
    vendor: [
      'axios',
      'classnames',
      'd3',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
    ],
  },

  output: {
    path: 'public',
    filename: 'app.js',
    publicPath: '/',
  },

  devtool: "source-map",

  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
    },{
      test: /\.svg$/,
      loader: 'svg-react-loader',
    }, {
      test: /\.jpg$/,
      loader: 'file',
    }, {
      test: /\.png$/,
      loader: 'file',
    }],
  },

  postcss: [autoprefixer({
    browsers: ['last 2 versions'],
  })],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },

  plugins: [envs, commons, copyFiles],
};
