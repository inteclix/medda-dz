import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import RoutesBuilder from "components/RoutesBuilder";

import Home from "views/Others/Home";
import Signin from "views/Others/Signin";
import Signup from "views/Others/Signup";

const routes = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: Signin,
    path: "/signin",
    exact: true,
  },
  {
    component: Signup,
    path: "/signup",
    exact: true,
  },
  {
    component: "redirect",
    to: "/",
  },
];

export default () => {
  return <RoutesBuilder routes={routes} />;
};
