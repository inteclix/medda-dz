import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute";

export default ({ routes }) => (
  <Switch>
    {routes.map((route, index) =>
      route.component === "redirect" ? (
        <Redirect key={index} to={route.to} />
      ) : route.private ? (
        <PrivateRoute
          key={index}
          component={route.component}
          exact={route.exact}
          path={route.path}
        />
      ) : (
        <Route
          key={index}
          component={route.component}
          exact={route.exact}
          path={route.path}
        />
      )
    )}
  </Switch>
);
