import express, {Request, Response} from "express";

import BaseController from "./Base";
import render from "../utils/render";
import Server from "../Server";

export default class IndexController extends BaseController {
  prefix = '';
  router = express.Router();
  chunkName = 'pages-index';

  constructor(server: Server) {
    super(server);
    this.indexAction = this.indexAction.bind(this);

    this.initRoutes()
  }

  initRoutes(): void {
    const { router } = this;

    router.get('/', this.indexAction)
  }

  indexAction(req: Request, res: Response) {
    render(req, res, 'pages/index', this)
  }

}
