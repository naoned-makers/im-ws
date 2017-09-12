import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from 'cssnano';
import CopyPlugin from 'copy-webpack-plugin';

const PATHS = {
  client: path.join(__dirname, 'src/client'),
  server: path.join(__dirname, 'src/server'),
  dist: path.join(__dirname, 'dist'),
  reports: path.join(__dirname, 'reports')
};

const server = () => {
  let nodeModules = {};
  fs
    .readdirSync('node_modules')
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

  return {
    entry: {
      server: PATHS.server
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js'
    },
    target: 'node',
    node: {
      __dirname: false
    },
    externals: nodeModules,
    devtool: 'sourcemap',
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        use: ['babel-loader']
      }]
    },
    plugins: [
      new CleanWebpackPlugin([PATHS.dist, PATHS.reports]),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../reports/server/report.html',
        generateStatsFile: true,
        statsFilename: '../reports/server/stats.json',
        openAnalyzer: false
      })
    ]
  }
};

const client = {
  entry: {
    client: PATHS.client
  },
  output: {
    path: path.resolve(PATHS.dist, 'public'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '*']
  },
  devtool: 'sourcemap',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 100000,
    maxAssetSize: 450000
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader']
    }, {
      test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
      use: ['file-loader']
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Welcome to DevFest Nantes 2017',
      template: path.resolve(PATHS.client, 'index.html'),
      favicon: path.resolve(PATHS.client, 'favicon.ico'),
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new BabelMinifyPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        safe: true
      },
      canPrint: false,
    }),
    new CopyPlugin([{
      from: path.join(PATHS.client, 'manifest.json'),
      to: path.join(PATHS.dist, 'public')
    }, {
      from: path.join(PATHS.client, 'images'),
      to: path.join(PATHS.dist, 'public/images')
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../../reports/client/report.html',
      generateStatsFile: true,
      statsFilename: '../../reports/client/stats.json',
      openAnalyzer: false
    })
  ]
}

export default [server, client];