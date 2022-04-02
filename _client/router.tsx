import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import loadable, {LoadableComponent} from "@loadable/component";


const IndexPage = loadable(() => import('./pages/index'));
const OtherPage = loadable(() => import('./pages/view-image.jsx'));

export const ROUTES = {
  index: '/',
  other: '/other-page'
} as const

const renderPage = (Page: LoadableComponent<any>) => (
  <Page/>
);

const Routes = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route path={ROUTES.index} render={() => renderPage(IndexPage)} exact={true} />
      <Route path={ROUTES.other} render={() => renderPage(OtherPage)}/>
    </Switch>
  )
}

export default Routes
