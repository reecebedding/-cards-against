import * as React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import { Home } from "../../components";

const App = (props: any) => {
    return (
        <Switch>
            <Route exact={true} path="/" component={Home} />
        </Switch>
    );
};

export default withRouter(App);