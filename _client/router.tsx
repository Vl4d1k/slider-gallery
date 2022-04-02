import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import loadable, {LoadableComponent} from "@loadable/component";


const IndexPage = loadable(() => import('./pages/index'));
const ViewImage = loadable(() => import('./pages/view-image.jsx'));

export const ROUTES = {
  index: '/',
  viewImage: '/view-image'
} as const

const renderPage = (Page: LoadableComponent<any>) => (
  <Page/>
);

const Routes = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route path={ROUTES.index} render={() => renderPage(IndexPage)} exact={true} />
      <Route path={`${ROUTES.viewImage}/:id`} render={() => renderPage(ViewImage)}/>
    </Switch>
  )
}

export default Routes
