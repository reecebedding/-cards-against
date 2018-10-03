import "../resources/scss/style.scss";

import * as React from "react";
import * as  ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";

import { Provider } from "react-redux";
import { AnyAction, Store } from "redux";

import createHistory from "history/createBrowserHistory";

import { connect } from 'socket.io-client';
import { ResponsesManager } from './socket/responses/responsesManager';
 

import configureStore from './redux/store/configureStore';

import Lobby from "./components/Lobby";

const store: Store<{}, AnyAction> = configureStore();

var socket: SocketIOClient.Socket = connect('http://localhost:5000');
ResponsesManager.init(socket, store.dispatch);

ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
      <Switch>
        <Route exact={true} path="/" render={() => { return <Lobby socket={socket} /> }} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root"),
);

