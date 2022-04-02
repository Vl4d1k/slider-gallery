import express, {Request, Response} from "express";

import BaseController from "./Base";
import render from "../utils/render";
import Server from "../Server";

export default class OtherController extends BaseController {
  prefix = '';
  router = express.Router();
  chunkName = 'pages-other-page';

  constructor(server: Server) {
    super(server);
    this.indexAction = this.indexAction.bind(this);

    this.initRoutes()
  }

  initRoutes(): void {
    const { router } = this;

    router.get('/other-page', this.indexAction)
  }

  indexAction(req: Request, res: Response) {
    render(req, res, 'pages/index', this)
  }

}
