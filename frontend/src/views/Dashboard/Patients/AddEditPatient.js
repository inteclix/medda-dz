import React, { useState } from "react";
import moment from "moment";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { useAppStore } from "stores";
import { Grid, Button, Divider, LinearProgress } from "@material-ui/core";
import { renderField } from "components/FormFields";
import ContainerWithBack from "components/layout/ContainerWithBack";

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { api } = useAppStore();
  const { params } = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [patient, setPatient] = useState(null);

  const hookForm = useForm();

  React.useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      const load = async () => {
        await api
          .get(`/patients/${params.id}`)
          .then(({ data }) => {
            setPatient(data.user);
            setIsLoading(false);
          })
          .catch((err) => {
            const message = err?.response?.data?.message || "" + err;
            enqueueSnackbar(message, {
              variant: "error",
            });
            setIsLoading(false);
          });
      };
      load();
    }
  }, []);

  const patinetForm = [
    {
      name: "firstname",
      placeholder: "Nom",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: patient ? patient.firstname : "",
    },
    {
      name: "lastname",
      placeholder: "Prénom",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: patient ? patient.lastname : "",
    },
    {
      name: "mobile",
      placeholder: "Tel mobile",
      type: "text",
      rules: {
        required: "Ce champ est obligatoire",
        pattern: {
          value: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          message: "Némero de TEL incorecte",
        },
      },
      defaultValue: patient ? patient.mobile : "",
    },
    {
      name: "tel",
      placeholder: "Tel fix",
      type: "text",
      defaultValue: patient ? patient.tel : "",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "text",
      defaultValue: patient ? patient.email : "",
      rules: {
        required: "Ce champ est requis",
        pattern: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Email incorecte",
        },
      },
    },
    {
      name: "dateBirth",
      placeholder: "Date de naissance",
      type: "date",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: patient ? patient.dateBirth : moment("1995/01/01"),
    },
    {
      name: "placeBirth",
      placeholder: "Lieu de naissance",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: patient ? patient.placeBirth : "",
    },
    {
      name: "gender",
      placeholder: "Sexe",
      type: "select",
      options: [
        { label: "Home", value: "man" },
        { label: "Female", value: "woman" },
      ],
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: patient ? patient.gender : "man",
    },
    ,
    {
      name: "civilState",
      placeholder: "État civile",
      type: "select",
      options: [
        { label: "Célibataire", value: "single" },
        { label: "Marié(e)", value: "married" },
        { label: "Dévorcé(e)", value: "divorced" },
        { label: "Veuf(ve)", value: "widower" },
      ],
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: patient ? patient.civilState : "single",
    },
  ];

  const onSubmit = (data) => {
    setIsSubmitting(true);
    if (patient) {
      api
        .put(`patients/${params.id}`, data)
        .then(() => {
          const message = "Patient updated";
          enqueueSnackbar(message, {
            variant: "success",
          });
          //setIsLoading(false);
          history.push("/patients");
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "" + err;
          enqueueSnackbar(message, {
            variant: "error",
          });
          // setIsLoading(false);
        });
    } else {
      api
        .post("/patients", data)
        .then(() => {
          const message = "Patient created with pending appointment";
          enqueueSnackbar(message, {
            variant: "success",
          });
          setIsSubmitting(false);
          history.push("/patients");
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "" + err;
          enqueueSnackbar(message, {
            variant: "error",
          });
          setIsSubmitting(false);
        });
    }
  };

  return (
    <ContainerWithBack
      title={
        patient
          ? `Modifier Patient: ${
              patient.firstname
            } ${patient.lastname.toUpperCase()}`
          : isLoading
          ? ""
          : "Ajouter un patient"
      }
    >
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={1}>
          {patinetForm.map((field, index) => (
            <Grid key={field.name} item xs={12} md={6}>
              {renderField(field, hookForm, index)}
            </Grid>
          ))}
          <Grid item xs={12} md={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={hookForm.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              Sauvgarder
            </Button>
          </Grid>
        </Grid>
      )}
    </ContainerWithBack>
  );
};
// https://nominatim.openstreetmap.org/search/${search}?format=json
