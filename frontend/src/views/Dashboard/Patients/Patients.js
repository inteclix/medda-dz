import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import AddConsulation from "./AddCons";
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
    component: EditConsulation,
    path: "/patients/:id/consultations/:consultationId/edit",
    exact: true,
  }
];
export default () => <RoutesBuilder routes={routes} />;
