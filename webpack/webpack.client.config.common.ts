import * as path from 'path';
import {Configuration} from 'webpack';

import {defaultRootPath, getPath, TWebpackPaths} from "./path";
import {getCssRules} from "./rules/css";
import jsRule from "./rules/js";
import fontsRule from "./rules/fonts";
import {IS_DEV} from "./constants";
import resolve from "./resolve";
import commonPlugins from "./common-plugins";
import {getModuleCssRules} from "./rules/cssModules";

const TerserPlugin = require('terser-webpack-plugin');
const SensitivePath = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('MODE IS DEVELOPMENT -', IS_DEV)

const localPaths = getPath(defaultRootPath);

export function getCommonConfig(paths: TWebpackPaths): Configuration {
    return {
        name: 'Clinet',
        target: 'web',
        entry: paths.entryClient,

        mode: !IS_DEV ? 'production' : 'development',
        devtool: !IS_DEV ? 'source-map' : 'inline-source-map',

        output: {
            path: localPaths.buildClient,
            filename: 'js/[hash].[name].js',
            publicPath: '/assets/client/'
        },
        resolve: resolve,
        module: {
            rules: [
                ...jsRule,
                getCssRules(paths),
                getModuleCssRules(paths),
                fontsRule
            ]
        },
        optimization: {
            minimize: !IS_DEV,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        compress: true,
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                })
            ],
        },
        plugins: [
            ...(!IS_DEV ? [
                new MiniCssExtractPlugin({
                    filename: 'css/[name].[contenthash:8].css',
                    chunkFilename: 'css/[name].[contenthash:8].chunk.css',
                })
            ]: []),
            ...(IS_DEV ? [
                new WatchMissingNodeModulesPlugin(path.resolve ('node_modules')),
                new webpack.HotModuleReplacementPlugin(),
                new SensitivePath(),
            ]: []),
            ...commonPlugins
        ]
    }
}

export default getCommonConfig(localPaths);
