import * as React from "react";
import * as  ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { Route, Switch, Router } from "react-router-dom";

import { Home } from "./components";

import "../resources/scss/style.scss";

import configureStore from './redux/store/configureStore';
import { defaultState } from './redux/store/initialStates'
const store = configureStore(defaultState);

ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root"),
);

