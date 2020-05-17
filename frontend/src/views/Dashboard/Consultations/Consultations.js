import React from 'react';
import RoutesBuilder from "components/RoutesBuilder";
import Add from './Add';
import Edit from "./Edit";
import List from "./List";

const routes = [
  {
    component: List,
    path: "/consultations",
    exact: true,
  },
  {
    component: Add,
    path: "/consultations/add",
    exact: true,
  },
  {
    component: Edit,
    path: "/consultations/edit/:id",
    exact: true,
  }
];
export default () => <RoutesBuilder routes={routes} />;