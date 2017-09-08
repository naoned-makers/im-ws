import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const PATHS = {
  client: path.join(__dirname, 'src/client'),
  dist: path.join(__dirname, 'dist')
};

export default {
  entry: {
    client: path.resolve(PATHS.client)
  },
  output: {
    path: path.resolve(PATHS.dist, 'public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.css', '*']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
    host: 'localhost', // Defaults to `localhost`
    port: 3000, // Defaults to 8080
    proxy: {
      '/': {
        target: 'http://localhost:5000/',
        secure: false
      }
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Welcome to DevFest Nantes 2017',
      template: path.resolve(PATHS.client, 'index.html'),
      favicon: path.resolve(PATHS.client, 'favicon.ico')
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(PATHS.client, 'img'),
      to: 'img'
    }])
  ]
};