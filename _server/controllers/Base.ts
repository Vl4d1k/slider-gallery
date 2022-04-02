import {Router} from "express";
import Server from "../Server";

export default abstract class BaseController {
  readonly abstract prefix: string;
  readonly server: Server;
  readonly abstract router: Router;
  /** имя чанка, для которого нужно будет инжектить стили и скрипты сразу в страницу при редере
   * состоит из pages-[имя файла в папке pages]
   */
  readonly abstract chunkName: string;

  protected constructor(server: Server) {
    this.server = server;
  }

  abstract initRoutes(): void;
}
