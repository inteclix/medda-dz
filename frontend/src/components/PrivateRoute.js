import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useAppStore} from "stores";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {user} = useAppStore()
  const location = useLocation();

  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return <Redirect to="/" />;
  }
  const checkUserAndToekn = () =>{
    return Boolean(user) // TODO: check if token is valid
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        checkUserAndToekn() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
