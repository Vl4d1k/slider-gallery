import 'ignore-styles'
// @ts-ignore
import register from '@babel/register';


const tsConfig = require("../tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

(tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
}))()

register({
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
  plugins: [
    '@loadable/babel-plugin'
  ]
});

import('./App');
