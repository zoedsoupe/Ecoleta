import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { Home } from "./pages/Home";
import { CreatePoint } from "./pages/CreatePoint";

const Routes = () => (
  <Router>
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </Switch>
  </Router>
);

export default Routes;
