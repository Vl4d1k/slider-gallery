import merge from 'webpack-merge'
import {defaultRootPath, getPath, TWebpackPaths} from "./path";
import {Configuration} from "webpack";

import {getCommonConfig} from "./webpack.client.config.common";

const LoadablePlugin = require('@loadable/webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')


export function getClientDevConfig(paths: TWebpackPaths): Configuration {
  return merge(getCommonConfig(paths), {
      plugins: [
        new LoadablePlugin(),
        new WebpackManifestPlugin()
      ]
    }
  )}

export default getClientDevConfig(getPath(defaultRootPath));

