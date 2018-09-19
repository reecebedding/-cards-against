import * as React from "react";
import * as  ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import { Route, Switch, Router } from "react-router-dom";

import { Home } from "./components";

import "../resources/scss/style.scss";

ReactDOM.render(
  <Router history={createHistory()}>
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById("root"),
);