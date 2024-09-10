import path from 'path';
import { fileURLToPath } from 'url';
import webpackConfig from './webpack.config.mjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { htmlWebpackPluginTemplateCustomizer } from 'template-ejs-loader';
import CopyPlugin from 'copy-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  ...webpackConfig,
  output: {
    path: path.join(__dirname, 'public'),
  },
  devServer: {
    static: './public',
  },
  module: {
    ...webpackConfig.module,
    rules: [
      ...webpackConfig.module.rules,
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.ejs$/i,
        use: [
          'html-loader',
          {
            loader: 'template-ejs-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...webpackConfig.plugins,
    new CopyPlugin({
      patterns: [
        { from: "node_modules/theme-editor-kit/dist/themeEditorKit.min.js", to: "themeEditorKit.min.js" },
        { from: "node_modules/bootstrap/dist/js/bootstrap.min.js", to: "bootstrap.min.js" },
        { from: "node_modules/@popperjs/core/dist/umd/popper.min.js", to: "popper.min.js" },
        { from: "node_modules/bootstrap/dist/css/bootstrap.min.css", to: "bootstrap.min.css" },
      ],
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: ''
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: 'demo/index.ejs',
        htmlLoaderOption: {},
        templateEjsLoaderOption: {
          root: '',
          data: {}
        }
      }),
    })
  ]
};
