import React, { useEffect, useState, useDebugValue } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import utils from "utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsloading] = useState(true);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [auth, setAuth] = useState({
    isAuth: false,
    isLoading: true,
  });
  const location = useLocation();
  useEffect(() => {
    utils.isLogin().then(() => {
      setAuth({
        isAuth: true,
        isLoading: false,
      });
      console.log("check route if is authorize: " + location.pathname);
    });
    return () => {
      setAuth({
        isAuth: false,
        isLoading: true,
      });
    };
  }, [location]);
  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }
  if (
    auth.isAuth &&
    (location.pathname === "/signin" || location.pathname === "/signup")
  ) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuth ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
