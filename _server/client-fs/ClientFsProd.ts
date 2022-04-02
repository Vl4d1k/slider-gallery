import BaseClientFs from "./Base";
import * as fs from "fs";

export default class ClientFsProd extends BaseClientFs {
  readonly fs = fs;

  getLoadableStatsFile(): Object {
    return JSON.parse(this.fs.readFileSync(ClientFsProd.pathToLoadableStatsFile).toString())
  }

}
