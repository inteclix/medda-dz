import React, { useEffect, useState, useDebugValue } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useAppStore } from "stores";
import { LinearProgress } from "@material-ui/core";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoadingUser } = useAppStore();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
