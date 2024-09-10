import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { scssf } from 'cssf/peer/sass.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'index.scss'),
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              functions: scssf.env,
              includePaths: [
                path.resolve(__dirname, 'node_modules'),
              ],
            },
            sourceMap: true
          }
        }
      ]
    }]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new CssMinimizerPlugin(),
  ]
};
