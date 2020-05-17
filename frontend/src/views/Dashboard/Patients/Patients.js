import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import AddConsulation from "./AddConsulation";
import EditConsulation from "./EditConsulation";

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
  },
  {
    component: AddConsulation,
    path: "/patients/:id/consultations/add",
    exact: true,
  },
  {
    component: AddConsulation,
    path: "/patients/:id/consultations/edit",
    exact: true,
  }
];
export default () => <RoutesBuilder routes={routes} />;
