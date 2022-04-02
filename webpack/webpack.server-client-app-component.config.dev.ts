import merge from 'webpack-merge'
import webpack, {Configuration} from "webpack";
// @ts-ignore
import nodeExternals from 'webpack-node-externals';

import {getServerCommonConfig} from "./webpack.server.config.common";
import {defaultRootPath, getPath, TWebpackPaths} from "./path";

const LoadablePlugin = require('@loadable/webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')


export function getClientAppComponentDevConfig(paths: TWebpackPaths): Configuration {
  return merge(getServerCommonConfig(paths), {
    name: 'Clent App component',
    entry: `${paths.client}/App.tsx`,
    output: {
      libraryTarget: 'assign',
      library: 'App'
    },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ],
      externals: [nodeExternals()],
    }
  )}

export default getClientAppComponentDevConfig(getPath(defaultRootPath));

