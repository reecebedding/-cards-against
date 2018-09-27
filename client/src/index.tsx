import * as React from "react";
import * as  ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { Route, Switch, Router } from "react-router-dom";
import { connect } from 'socket.io-client';

import { Game } from "./components";

import "../resources/scss/style.scss";

import configureStore from './redux/store/configureStore';
const store = configureStore();

var socket = connect('http://localhost:5000');

ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
      <Switch>
        <Route exact={true} path="/" component={Game} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root"),
);

