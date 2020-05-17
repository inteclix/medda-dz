import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import List from "./List";
import Add from "./Add";
import Edit from "./Edit";

const routes = [
  {
    component: List,
    path: "/patients",
    exact: true,
  },
  {
    component: Add,
    path: "/patients/add",
    exact: true,
  },
  {
    component: Edit,
    path: "/patients/edit/:id",
    exact: true,
  }
];
export default () => <RoutesBuilder routes={routes} />;
