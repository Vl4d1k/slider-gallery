import MemoryFS from 'memory-fs'
import {MultiCompiler, Configuration} from "webpack";
import path from "path";

import BaseClientFs from "./Base";
import {LOADABLE_STATS_FILE_NAME} from "../../webpack/constants";

export default class ClientFsDev extends BaseClientFs {
  readonly fs = new MemoryFS();

  constructor(compiler: MultiCompiler, webpackConfig: Configuration) {
    super();

    ClientFsDev.pathToLoadableStatsFile = `${webpackConfig.output!.path}/${LOADABLE_STATS_FILE_NAME}`;
  }

  getLoadableStatsFile(): Object {
    return JSON.parse(this.fs.readFileSync(ClientFsDev.pathToLoadableStatsFile).toString())
  }

}
