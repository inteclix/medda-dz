import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import ListAccounts from "./ListAccounts"
import AddEditAccount from "./AddEditAccount";

const routes = [
  {
    component: ListAccounts,
    path: "/accounts",
    exact: true,
  },
  {
    component: AddEditAccount,
    path: "/accounts/add",
    exact: true,
  },
  {
    component: AddEditAccount,
    path: "/accounts/edit/:id",
    exact: true,
  }
];
export default () => <RoutesBuilder routes={routes} />;
