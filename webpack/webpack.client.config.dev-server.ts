// @ts-ignore
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import {Configuration} from "webpack";
import path from "path";

import common from './webpack.client.config.common';
import PATH from "./path";

const config: Configuration = {
    output: {
        publicPath: '/',
    },
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {aggregateTimeout: 300, poll: 1000},
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PATH.root, `public/index.html`)
        }),
    ]
};

export default merge(common, config);
