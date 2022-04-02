import path from "path";

import {getPath, TWebpackPaths} from "../path";
import {IS_DEV} from "../constants";

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


export function getCssRules(paths: TWebpackPaths) {
  return {
    test: /\.(scss|css)$/,
    use: [
      ...(IS_DEV ? [
        {
          loader: require.resolve('style-loader')
        }
      ] : []),
      ...(!IS_DEV ? [
        {
          loader: MiniCssExtractPlugin.loader
        }
      ] : []),
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader',
        options: {sourceMap: !IS_DEV}
      },
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: !IS_DEV
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !IS_DEV
        }
      }
    ],
    exclude: /\.module\.(scss|css)$/
  }
}

export default getCssRules(getPath(path.resolve(__dirname, '../')))
