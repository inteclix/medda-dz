import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import DashboardHome from "views/Dashboard/DashboardHome";
import Me from "views/Dashboard/Me";
import Settings from "views/Dashboard/Settings";
import Patients from "views/Dashboard/Patients";

const routes = [
  {
    component: DashboardHome,
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
    component: "redirect",
    to: "/",
  },
];

export default () => <RoutesBuilder routes={routes} />;
