import React, { useState } from "react";
import moment from "moment";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import {
  Grid,
  Box,
  Button,
  Divider,
  LinearProgress,
  Tabs,
  Tab,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import SearchField from "components/SearchField";
import { renderField } from "components/FormFields";
import ContainerWithBack from "components/layout/ContainerWithBack";

import { useAppStore } from "stores";

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { api, user, setUser } = useAppStore();
  const { params } = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();

  const [tabValue, setTabValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    window.scrollTo(0, 0);
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [me, setMe] = useState(user);
  const [specialities, setSpecialities] = useState([]);
  const hookForm = useForm();
  window.hookForm = hookForm;

  React.useEffect(() => {
    const loadSpecialities = async () => {
      await api
        .get("/specialities")
        .then(({ data }) => {
          const spes = data.map((s) => {
            return { label: s.label, value: s.id };
          });
          setSpecialities(spes);
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
    loadSpecialities();
  }, []);

  const meForm = [
    {
      name: "firstname",
      placeholder: "Nom",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: me ? me.firstname : "",
    },
    {
      name: "lastname",
      placeholder: "Prénom",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: me ? me.lastname : "",
    },
    {
      name: "mobile",
      placeholder: "Tel mobile",
      type: "text",
      defaultValue: me ? me.mobile : "",
      rules: {
        required: "Ce champ est obligatoire",
        pattern: {
          value: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          message: "Némero de TEL incorecte",
        },
      },
    },
    {
      name: "tel",
      placeholder: "Tel fix",
      type: "text",
      defaultValue: me ? me.tel : "",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "text",
      defaultValue: me ? me.email : "",
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
      defaultValue: me ? me.dateBirth : moment("1995/01/01"),
    },
    {
      name: "placeBirth",
      placeholder: "Lieu de naissance",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: me ? me.placeBirth : "",
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
      defaultValue: me ? me.gender : "man",
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
      defaultValue: me ? me.civilState : "single",
    },
    {
      name: "address",
      placeholder: "Adress",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: me ? me.address : "",
    },
  ];

  const clinicForm = [
    {
      name: "name",
      placeholder: "Nom de clinic",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: me ? me?.doctor?.clinic?.name : "",
    },
    {
      name: "address",
      placeholder: "Address de clinic",
      type: "text",
      rules: { required: "Ce champ est obligatoire" },
      defaultValue: me ? me?.doctor?.clinic?.address : "",
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
      defaultValue: me ? me?.doctor?.clinic?.mobile : "",
    },
    {
      name: "tel",
      placeholder: "Tel fix",
      type: "text",
      defaultValue: me ? me?.doctor?.clinic?.tel : "",
    },
  ];
  const onSubmit = (data) => {
    setIsSubmitting(true);
    if (tabValue === 0) {
      // me form
      api
        .put("auth/me", data)
        .then(({ data }) => {
          const message = "me updated";
          enqueueSnackbar(message, {
            variant: "success",
          });
          setIsSubmitting(false);
          setUser(data);
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "" + err;
          enqueueSnackbar(message, {
            variant: "error",
          });
          setIsSubmitting(false);
        });
    }
    if (tabValue === 1) {
      // clinic form
      api
        .put("/clinics/" + me?.doctor?.clinic?.id, data)
        .then(({ data }) => {
          const message = "me updated";
          enqueueSnackbar(message, {
            variant: "success",
          });
          setIsSubmitting(false);
          setUser(data);
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "" + err;
          enqueueSnackbar(message, {
            variant: "error",
          });
          setIsSubmitting(false);
        });
    }
    if (tabValue === 2) {
      // password change form
    }
  };

  const renderMe = () => {
    hookForm.register(
      { name: "codePostalId" },
      {
        required: "Ce champ est requis",
      }
    );
    hookForm.setValue("codePostalId", me?.code_postal?.id);
    return (
      <Grid container spacing={1}>
        {meForm.map((field, index) => {
          if (field.label === "specialityId" && me.is === "doctor") {
            return null;
          }
          return (
            <Grid key={field.name} item xs={12} md={6}>
              {renderField(field, hookForm, index)}
            </Grid>
          );
        })}

        <Grid item xs={12} md={6}>
          <FormControl
            margin="normal"
            fullWidth
            error={Boolean(hookForm.errors["codePostalId"])}
          >
            <SearchField
              url="codepostals"
              optionLabel="codePostal"
              textFieldProps={{
                placeholder: "Code postal",
                label: "Code postal",
                required: true,
              }}
              getOptionLabel={(option) =>
                option.codePostal ? option.codePostal : ""
              }
              onChange={(event, value) => {
                hookForm.setValue("codePostalId", value?.id);
              }}
              defaultValue={me?.code_postal}
              renderOption={(option, inputValue) => {
                const matches = match(
                  option.codePostal,
                  inputValue.inputValue.toUpperCase()
                );
                const parts = parse(option.codePostal, matches);
                return (
                  <Box flexDirection="column">
                    <Typography>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 700 : 400 }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </Typography>
                    <Typography>
                      {option.label + " - " + option.wilaya}
                    </Typography>
                  </Box>
                );
              }}
            />
            <FormHelperText>
              {hookForm.errors["codePostalId"] &&
                hookForm.errors["codePostalId"].message}
            </FormHelperText>
          </FormControl>
        </Grid>
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
    );
  };

  const renderClinic = () => {
    hookForm.register(
      { name: "codePostalId" },
      {
        required: "Ce champ est requis",
      }
    );
    hookForm.setValue("codePostalId", me?.doctor?.clinic?.code_postal?.id);
    return (
      <Grid container spacing={1}>
        {clinicForm.map((field, index) => {
          if (field.name === "specialityId" && me.is === "doctor") {
            return null;
          }
          return (
            <Grid key={field.name} item xs={12} md={6}>
              {renderField(field, hookForm, index)}
            </Grid>
          );
        })}
        <Grid item xs={12} md={6}>
        <FormControl
            margin="normal"
            fullWidth
            error={Boolean(hookForm.errors["codePostalId"])}
          >
            <SearchField
              url="codepostals"
              optionLabel="codePostal"
              textFieldProps={{
                placeholder: "Code postal",
                label: "Code postal",
                required: true,
              }}
              getOptionLabel={(option) =>
                option.codePostal ? option.codePostal : ""
              }
              onChange={(event, value) => {
                hookForm.setValue("codePostalId", value?.id);
              }}
              defaultValue={me?.doctor?.clinic?.code_postal}
              renderOption={(option, inputValue) => {
                const matches = match(
                  option.codePostal,
                  inputValue.inputValue.toUpperCase()
                );
                const parts = parse(option.codePostal, matches);
                return (
                  <Box flexDirection="column">
                    <Typography>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 700 : 400 }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </Typography>
                    <Typography>
                      {option.label + " - " + option.wilaya}
                    </Typography>
                  </Box>
                );
              }}
            />
            <FormHelperText>
              {hookForm.errors["codePostalId"] &&
                hookForm.errors["codePostalId"].message}
            </FormHelperText>
          </FormControl>
        </Grid>
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
    );
  };
  return (
    <ContainerWithBack
      tabsComponent={() => (
        <Tabs
          textColor="inherit"
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="me-tabs"
        >
          <Tab textColor="inherit" label="Votre information" />
          <Tab textColor="inherit" label="Informations sur la clinique" />
          <Tab textColor="inherit" label="Changement de mot de pass" />
        </Tabs>
      )}
      title="Mon compte"
    >
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          {tabValue === 0 && renderMe()}
          {tabValue === 1 && renderClinic()}
        </>
      )}
    </ContainerWithBack>
  );
};
