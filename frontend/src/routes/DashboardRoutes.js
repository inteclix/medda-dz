import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import Home from "views/Dashboard/Home";
import Me from "views/Dashboard/Me";
import Settings from "views/Dashboard/Settings";
import Patients from "views/Dashboard/Patients";
import Consultations from "views/Dashboard/Consultations";

const routes = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: Me,
    path: "/me",
    exact: true,
  },
  {
    component: Settings,
    path: "/settings",
    exact: true,
  },
  {
    component: Patients,
    path: "/patients",
    exact: false,
  },
  {
    component: Consultations,
    path: "/consultations",
    exact: false,
  },
  {
    component: "redirect",
    to: "/",
  },
];

export default () => <RoutesBuilder routes={routes} />;
