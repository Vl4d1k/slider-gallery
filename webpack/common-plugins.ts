import path from "path";
import webpack, {ProgressPlugin} from "webpack";
import {IS_DEV} from "./constants";

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

export default [
  new ModuleNotFoundPlugin(path.resolve(__dirname, '.')),
  new CleanWebpackPlugin(),
  new ProgressPlugin({}),
  new FriendlyErrorsPlugin({
    clearConsole: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(IS_DEV ? 'development' : 'prod'),
      DEBUG: JSON.stringify(IS_DEV),
      BROWSER: JSON.stringify(true)
    },
    isProduction: JSON.stringify(!IS_DEV),
  }),
  new ForkTsCheckerWebpackPlugin({
    async: IS_DEV,
  }),

]
