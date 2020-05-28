import React from "react";
import RoutesBuilder from "components/RoutesBuilder";

import ListPatientsWithConsultations from "./ListPatientsWithConsultations";
import AddEditPatient from "./AddEditPatient";
import AddEditConsulation from "./AddEditConsulation";

const routes = [
  {
    component: ListPatientsWithConsultations,
    path: "/patients",
    exact: true,
  },
  {
    component: AddEditPatient,
    path: "/patients/add",
    exact: true,
  },
  {
    component: AddEditPatient,
    path: "/patients/edit/:id",
    exact: true,
  },
  {
    component: AddEditConsulation,
    path: "/patients/:id/consultations/add",
    exact: true,
  },
  {
    component: AddEditConsulation,
    path: "/patients/:id/consultations/:consultationId/edit",
    exact: true,
  }
];
export default () => <RoutesBuilder routes={routes} />;
