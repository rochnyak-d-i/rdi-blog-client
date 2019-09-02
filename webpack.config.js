const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: ['development', 'production'].includes(env) ? env : 'development',
  devtool: 'inline-source-map',

  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env === 'development'
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                removeViewBox: false,
                removeDoctype: true,
                removeXMLProcInst: true,
                removeDimensions: true,
                removeXMLNS: true
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      excludeAssets: [/style.*.js/]
    }),

    ...(env === 'production' ? [new HtmlWebpackExcludeAssetsPlugin()] : [])
  ],

  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 3000,
    historyApiFallback: true
    // allowedHosts: ['.exmaple.com']
    // disableHostCheck: true
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  }
};
