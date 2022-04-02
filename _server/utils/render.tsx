import { Stats } from 'webpack';
import { Request, Response } from 'express';
import React, { ReactElement, FC } from "react";
import {StaticRouter} from "react-router-dom";
import {renderToString} from "react-dom/server";
import {ChunkExtractor, ChunkExtractorManager} from "@loadable/server";

import AppProd from "@client/App";
import BaseController from "../controllers/Base";


function getAppComponent(stats: Stats): FC {
  const assets = stats.compilation.assets;
  const source = stats.compilation.assets[Object.keys(assets)[0]].source();
  let App: any;

  eval(source)

  return App!.default;
}

export default function render(req: Request, res: Response, viewName: string, controller: BaseController) {
  let App: FC = AppProd;

  if (controller.server.serverCompiler) {
    // @ts-ignore
    const clienAppComponentStats: Stats = res.locals.webpack.devMiddleware.stats.stats[1]
    App = getAppComponent(clienAppComponentStats);
  }

  const clientExtractor = new ChunkExtractor({
    stats: controller.server.clientFs.getLoadableStatsFile(),
    entrypoints: ['main', controller.chunkName]
  });

  res.status(200).render(viewName, {
    body: renderToString((
      <>
        {clientExtractor.getLinkElements()}
        {clientExtractor.getStyleElements()}
        {clientExtractor.getScriptElements()}
        <div id="root">
          <ChunkExtractorManager extractor={clientExtractor}>
            <StaticRouter location={req.path}>
              <App/>
            </StaticRouter>
          </ChunkExtractorManager>
        </div>
      </>
    ))
  })

}
