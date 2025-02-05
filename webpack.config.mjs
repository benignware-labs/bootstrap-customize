import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { scssf } from 'cssf/peer';
import { LegacyColorVarsPlugin } from 'cssf/addons';

scssf.use(new LegacyColorVarsPlugin({
  identifiers: [
    '--bs-primary',
    '--bs-secondary',
    '--bs-info',
    '--bs-success',
    '--bs-warning',
    '--bs-danger',
    '--bs-light',
    '--bs-dark',
  ],
  functions: [],
  styles: [],
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    path.resolve(__dirname, 'index.scss'),
    path.resolve(__dirname, 'index.js'),
  ],
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
              quietDeps: true,
              includePaths: [
                path.resolve(__dirname, 'node_modules'),
              ],
            },
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,

    }]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ]
};
