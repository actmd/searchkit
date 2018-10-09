const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const copyrightBanner = require("fs").readFileSync("./COPYRIGHT", "utf-8")
const autoprefixer = require('autoprefixer')

var loaders = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
  },
  {
    loader: 'sass-loader',
  },
];

module.exports = {
  entry: {
    "ignore":['./theming/index.ts'],
    "bundle":['./src/index.ts']
  },
  output: {
    path: path.join(__dirname, 'release'),
    filename: '[name].js',
    library:["Searchkit"],
    libraryTarget:"umd",
    publicPath: '',
    // css: 'theme.css'
  },
  resolve: {
    extensions:[".js", ".ts", ".tsx", ".webpack.js", ".web.js", ".scss"]
  },
  devtool: "source-map",
  plugins: [
    new webpack.BannerPlugin({banner: copyrightBanner, entryOnly:true}),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin({filename: "theme.css", allChunks:true}),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['require', 'export', '$super']
      },
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  ],
  externals: {
    "react": "React",
    "react-dom":"ReactDOM"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        include: [path.join(__dirname, 'src'),path.join(__dirname, 'theming')]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: loaders,
        }),
        include: path.join(__dirname, 'theming')
      },
      {
        test: /\.(jpg|png|svg)$/,
        loaders: [
            'file-loader?name=[path][name].[ext]'
        ],
        include: path.join(__dirname, 'theming')
      }
    ]
  }
};
