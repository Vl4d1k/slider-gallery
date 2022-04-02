import path from "path";

import {defaultRootPath, getPath, TWebpackPaths} from "../path";
import {IS_DEV} from "../constants";

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export function getModuleCssRules(paths: TWebpackPaths) {
  return {
    test: /\.module\.(scss|css)$/,
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
        loader: 'css-loader',
        options: {
          modules: true,
        }
      },
      {
        loader: 'postcss-loader',
        options: {config: {path: path.join(paths.root, 'postcss.config.js')}, sourceMap: !IS_DEV}
      },
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: !IS_DEV,
          root: paths.client,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !IS_DEV
        }
      }
    ],
    include: /\.module\.(scss|css)$/
  }
}

export default getModuleCssRules(getPath(defaultRootPath))
