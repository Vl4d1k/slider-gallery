import express, {Application, ErrorRequestHandler, RequestHandler} from "express";
import webpack, {MultiCompiler} from "webpack";
import compression from "compression";
import WDM from "webpack-dev-middleware";


import BaseClientFs from "./client-fs/Base";
import ClientFsProd from "./client-fs/ClientFsProd";
import ClientFsDev from "./client-fs/ClientFsDev";
import {getPath} from "../webpack/path";
import BaseController from "./controllers/Base";
import {getClientDevConfig} from "../webpack/webpack.client.config.dev";
import {getClientAppComponentDevConfig} from '../webpack/webpack.server-client-app-component.config.dev';

var expressStaticGzip = require("express-static-gzip");


const IS_DEV = process.env.NODE_ENV === 'development';

export default class Server {
  readonly expressApp: Application
  readonly port: number
  readonly host: string
  readonly serverCompiler?: MultiCompiler
  readonly clientFs: BaseClientFs

  constructor({ controllers }: {
    middleWares: Array<RequestHandler | ErrorRequestHandler>;
    controllers?: BaseController[];
  }) {
    this.expressApp = express();
    this.port = Number(process.env.PORT) || 3001;
    this.host = process.env.HOST || '127.0.01';

    if (IS_DEV) {
      const paths = getPath('./');
      const config = getClientDevConfig(paths);
      const compiler = webpack([config, getClientAppComponentDevConfig(paths)]);

      this.clientFs = new ClientFsDev(compiler, config);
      this.serverCompiler = compiler;

      this.expressApp.use(
        WDM(compiler, {
          // @ts-ignore
          outputFileSystem: this.clientFs.fs,
          serverSideRender: true
        })
      );
    } else {
      this.clientFs = new ClientFsProd();
    }


    this.init();
    if (controllers) {
      this.attachControllers(controllers);
      this.attachAssets();
    }
    this.template();
  }

  private init(): void {
    const { expressApp } = this;

    expressApp.use(compression());

    expressApp.set('host', this.host);
    expressApp.set('port', this.port);
  }

  private middlewares(middleWares: Array<RequestHandler | ErrorRequestHandler>): void {
    const { expressApp } = this;

    middleWares.forEach(middleWare => {
      expressApp.use(middleWare);
    });
  }

  attachControllers(controllers: BaseController[]): void {
    const { expressApp } = this;

    controllers.forEach(controller => {
      expressApp.use(controller.prefix, controller.router);
    });
  }

  attachAssets(): void {
    const { expressApp } = this;

    expressApp.use('/', express.static('public'));
    expressApp.use('/', expressStaticGzip('public'));
  }

  private template(): void {
    const { expressApp } = this;

    expressApp.set('view engine', 'twig');
    expressApp.set('views', `_server/views`);
  }

  public start(callback: (app: Application) => void): void {
    const { expressApp } = this;

    expressApp.listen(this.port, () => {
      callback(this.expressApp);
    });
  }

}

