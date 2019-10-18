'use strict';

const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;
const DartSass = require('sass');
const PostcssImport = require('postcss-import');
const PostcssPresetEnv = require('postcss-preset-env');

module.exports = () => {
  return {
    entry: path.join(__dirname, './src/main.js'),
    output: {
      path: path.join(__dirname, '/dist/'),
      publicPath: '/dist/',
      filename: `[name].js`,
      chunkFilename: `chunks/[name].js`
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            BabelMultiTargetPlugin.loader(),
          ],
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  PostcssImport(),
                  PostcssPresetEnv({
                    browsers: ['last 2 versions', 'ie 11'],
                    autoprefixer: {
                      grid: 'autoplace'
                    }
                  })
                ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: DartSass,
                sourceMap: true
              }
            }
          ],
        }
      ]
    },
    watchOptions: {
      aggregateTimeout: 600,
      ignored: ['node_modules']
    },
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    resolve: {
      mainFields: [
        'es2015',
        'module',
        'main',
      ]
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin({
        silent: true
      }),
      new MiniCssExtractPlugin({
        filename: `[name].css`,
        chunkFilename: `chunks/[name].css`
      }),
      new BabelMultiTargetPlugin({
        babel: {
          presetOptions: {
            'corejs': '2',
            'targets': {
              'browsers': [
                'last 2 versions',
                'ie >= 11'
              ]
            },
            'modules': false,
            'useBuiltIns': 'usage'
          }
        },
        exclude: [/node_modules/],
        targets: {
          modern: {
            key: 'es6',
            tagAssetsWithKey: true,
          },
          legacy: {
            tagAssetsWithKey: false,
          }
        }
      })
    ]
  }
};
