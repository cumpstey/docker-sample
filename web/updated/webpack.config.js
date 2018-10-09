const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyFiles = new CopyWebpackPlugin([{
  from: './resources/assets/fonts',
  to: './fonts',
}], {
  copyUnmodified: true,
});

module.exports = {
  entry: {
    app: './resources/index.jsx',
    //vendor: [
      //'axios',
      //'classnames',
      //'connected-react-router',
      // 'history',
      // 'prop-types',
      //'react',
      //'react-dom',
      //'react-redux',
      //'react-router',
      // 'react-router-dom',
      //'redux',
      //'redux-thunk',
    //],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    //publicPath: '/public/'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.(png|jpg|gif)$/,
      use: ['file-loader']
    }, {
      test: /\.svg$/,
      use: ['svg-react-loader']
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader'
      ]
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [copyFiles],
};


// // const autoprefixer = require('autoprefixer');
// const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// require('dotenv').config();

// const envs = new webpack.DefinePlugin({
//   'process.env': {
//   },
// });

// // const commons = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

// const copyFiles = new CopyWebpackPlugin([{
//   from: './resources/assets/fonts',
//   to: './fonts',
// }], {
//   copyUnmodified: true,
// });

// module.exports = {
//   entry: {
//     app: './resources',
//     vendor: [
//       'axios',
//       'classnames',
//       'd3',
//       'react',
//       'react-dom',
//       'react-redux',
//       'react-router',
//       'react-router-redux',
//       'redux',
//       'redux-thunk',
//     ],
//   },

//   output: {
//     path: 'public',
//     filename: 'app.js',
//     publicPath: '/',
//   },

//   devtool: "source-map",

//   module: {
//     loaders: [{
//       test: /.jsx?$/,
//       loader: 'babel',
//       exclude: /node_modules/,
//     }, {
//       test: /\.css$/,
//       loader: 'style!css!postcss',
//     },{
//       test: /\.svg$/,
//       loader: 'svg-react-loader',
//     }, {
//       test: /\.jpg$/,
//       loader: 'file',
//     }, {
//       test: /\.png$/,
//       loader: 'file',
//     }],
//   },

//   // postcss: [autoprefixer({
//   //   browsers: ['last 2 versions'],
//   // })],

//   resolve: {
//     extensions: ['', '.js', '.jsx', '.css'],
//   },

//   plugins: [envs, /*commons,*/ copyFiles],
// };
