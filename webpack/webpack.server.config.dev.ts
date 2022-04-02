import merge from "webpack-merge";
import WebpackShellPlugin from "webpack-shell-plugin";

import webpackOptionServerCommon from "./webpack.server.config.common";

export default merge(webpackOptionServerCommon, {
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [`nodemon ${webpackOptionServerCommon.output?.path}`],
    }),
  ]
})
