import webpack, {Configuration} from "webpack";
// @ts-ignore
import nodeExternals from 'webpack-node-externals';
import {defaultRootPath, getPath, TWebpackPaths} from "./path";

import resolve from "./resolve";
import commonPlugins from "./common-plugins";
import {IS_DEV} from "./constants";

const localPaths = getPath(defaultRootPath);

export function getServerCommonConfig(paths: TWebpackPaths): Configuration {
    return {
        name: 'Server',
        target: 'node',
        entry: paths.entryServer,
        mode: !IS_DEV ? 'production' : 'development',
        output: {
            filename: 'index.js',
            path: localPaths.buildServer,
        },
        resolve: resolve,
        externals: [
            nodeExternals(),
            '@loadable/component'
        ],
        module: {
            rules: [
                { test: /\.(scss|css)|(module\.(scss|css)|(png|jpg|svg))/, loader: 'ignore-loader' },
                {
                    test: /\.(tsx|ts)$/,
                    use: 'babel-loader',
                    exclude: IS_DEV ? /node_modules/ : []
                }
            ]
        },
        plugins: [
            ...commonPlugins,
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ]
    }
}

export default getServerCommonConfig(getPath(defaultRootPath));
