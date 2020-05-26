import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Tabs,
  Tab,
  Button,
  IconButton,
  Divider,
  Box,
  Typography,
  AppBar,
  Toolbar,
  LinearProgress,
} from "@material-ui/core";

import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";

import { renderField } from "components/FormFields";
import ContainerWithBack from "components/layout/ContainerWithBack";
import PrintPrescription from "components/PrintPrescription";
import SearchField from "components/SearchField";

import { useAppStore } from "stores";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  tabPanel: {
    marginTop: theme.spacing(1),
    //padding: theme.spacing(1),
  },
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
}));

export default () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const hookForm = useForm();
  window.hookForm = hookForm;
  const [formValues, setFormValues] = React.useState(hookForm.getValues());
  window.formValues = formValues;

  const { api, user } = useAppStore();

  const [tabValue, setTabValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    window.scrollTo(0, 0);
  };
  const [healthParameters, setHealthParameters] = React.useState([]);
  const [
    medicaments_prescription,
    setMedicaments_prescription,
  ] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [consultation, setConsultation] = React.useState(null);
  const [patient, setPatient] = React.useState(null);
  const { params } = useRouteMatch();
  const history = useHistory();

  React.useEffect(() => {
    const load = async () => {
      if (params.consultationId) {
        await api
          .get(`/consultations/${params.consultationId}`)
          .then(({ data }) => {
            setConsultation(data); // on edit route
            setMedicaments_prescription(data.prescription.medicaments);
            setPatient(data.patient);
            setIsLoading(false);
          })
          .catch((err) => {
            const message = err?.response?.data?.message || "" + err;
            enqueueSnackbar(message, {
              variant: "error",
            });
            setIsLoading(false);
          });
      } else {
        await api
          .get(`/patients/${params.id}`)
          .then(({ data }) => {
            setPatient(data);
            setIsLoading(false);
          })
          .catch((err) => {
            const message = err?.response?.data?.message || "" + err;
            enqueueSnackbar(message, {
              variant: "error",
            });
            //setIsLoading(false);
          });
      }
    };
    load();
  }, []);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    data["healthParameters"] = getPMValues()._healthParametersConsultation;
    data["medicaments_prescription"] = getPMValues().medicaments_prescription;
    data["patientId"] = patient.id;
    api
      .post("consultations", data)
      .then(({ data }) => {
        const message = "Consultation est enregister avec success";
        enqueueSnackbar(message, {
          variant: "success",
        });
        setIsSubmitting(false);
        history.push(`/patients/${patient.id}/consultations/${data.id}/edit`);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
        setIsSubmitting(false);
      });
  };

  const printPrescription = React.useRef();
  const handlePrintPrescription = useReactToPrint({
    content: () => printPrescription.current,
    onBeforeGetContent: async () =>
      setFormValues({
        ...hookForm.getValues(),
        medicaments_prescription: getPMValues().medicaments_prescription,
      }),
  });

  const getPMValues = () => {
    const hookFormData = hookForm.getValues();
    let _healthParametersConsultation = [];
    let _medicamentsPrescription = [];
    let mpIds = [];
    Object.keys(hookFormData).map((key) => {
      if (key.startsWith("p__id")) {
        _healthParametersConsultation.push({
          healthParameterId: key.slice(5),
          value: hookFormData[key].toString(),
        });
      }

      if (key.startsWith("m__id")) {
        let id = Number(key.slice(7).split("__")[0]);
        if (!mpIds.includes(id)) {
          mpIds.push(id);
          _medicamentsPrescription.push({
            medicamentId: id,
            number_unit:
              hookFormData[`m__id__${id}__number_unit`] === ""
                ? 0
                : Number(hookFormData[`m__id__${id}__number_unit`]),
            posologie: hookFormData[`m__id__${id}__posologie`],
            mention: hookFormData[`m__id__${id}__mention`],
          });
        }
      }
    });
    // medicaments_prescription contain medicament prescription with lebel and other medical fields
    let mps = [];
    _medicamentsPrescription.map((medicament_prescription) => {
      medicaments_prescription.map((m) => {
        if (m.id === medicament_prescription.medicamentId) {
          mps.push({
            ...m,
            medicament_prescription,
          });
        }
      });
    });
    return {
      _healthParametersConsultation,
      _medicamentsPrescription,
      medicaments_prescription: mps,
    };
  };

  const renderConsultation = () => {
    const consultationForm = [
      {
        name: "motifs",
        placeholder: "Motifs",
        type: "text",
        rules: { required: "Ce champ est obligatoire" },
        defaultValue: consultation ? consultation.motifs : "",
        autoFocus: true,
      },
      {
        name: "historique",
        placeholder: "Historique",
        defaultValue: consultation ? consultation.historique : "",
        type: "text",
      },
      {
        name: "examenClinique",
        placeholder: "Examen clinique",
        defaultValue: consultation
          ? consultation.examenClinique
          : "",
        type: "text",
      },
      {
        name: "examenParaClinique",
        placeholder: "Examen para clinique",
        defaultValue: consultation
          ? consultation.examenParaClinique
          : "",
        type: "text",
      },
      {
        name: "diagnostique",
        placeholder: "Diagnostique",
        defaultValue: consultation
          ? consultation.diagnostique
          : "",
        type: "text",
      },
      {
        name: "traitement",
        placeholder: "traitement",
        defaultValue: consultation ? consultation.traitement : "",
        type: "text",
      },
      {
        name: "examentDemander",
        placeholder: "Exament demander",
        defaultValue: consultation
          ? consultation.examentDemander
          : "",
        type: "text",
      },
      {
        name: "note",
        placeholder: "Note",
        defaultValue: consultation ? consultation.note : "",
        type: "text",
      },
    ];
    return (
      <Paper
        style={{ display: tabValue === 0 ? "" : "none" }}
        className={classes.tabPanel}
      >
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item></Grid>
              <Grid item xs></Grid>
              <Grid item>
                <IconButton>
                  <PrintIcon className={classes.block} color="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box padding={1} component={Grid} container spacing={1}>
          {consultationForm.map((field, index) => (
            <Grid key={index} item xs={12} md={6}>
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
        </Box>
      </Paper>
    );
  };

  const renderHealthParameter = (p) => {
    let field = {
      name: "p__id" + p.id,
      defaultValue: "",
      type: p.type,
      placeholder: p.label,
      options: p.health_parameter_options
        ? p.health_parameter_options.map((o) => o.label)
        : [],
      autoFocus: true,
    };
    return (
      <Grid key={field.name} item xs={12} md={6}>
        <Box
          alignItems="center"
          border="1px solid lightgray"
          borderRadius={4}
          display="flex"
          alignItems="center"
          flexDirection="row"
          padding={1}
          height={100}
        >
          {renderField(field, hookForm, field.name + "f")}
          <IconButton
            style={{ margin: 4 }}
            onClick={() => {
              window.confirm("Supprimer ?") &&
                setHealthParameters(
                  healthParameters.filter((fp) => fp.label !== p.label)
                );
            }}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>
    );
  };

  const renderHealthParameters = () => {
    return (
      <Paper
        style={{ display: tabValue === 1 ? "" : "none" }}
        className={classes.tabPanel}
        component={Grid}
      >
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <SearchField
                  url="healthparameters"
                  optionLabel="label"
                  textFieldProps={{
                    placeholder: "Poids, Taille, Tabagisme ...",
                    InputProps: {
                      disableUnderline: true,
                    },
                  }}
                  getOptionLabel={(option) =>
                    option.label ? option.label : ""
                  }
                  getOptionDisabled={(option) =>
                    _.some(healthParameters, option)
                  }
                  clearOnBlur
                  onChange={(event, value) => {
                    value && setHealthParameters([...healthParameters, value]);
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton>
                  <PrintIcon className={classes.block} color="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box padding={1}>
          <Grid container spacing={1}>
            {healthParameters.length !== 0 ? (
              healthParameters.map((p) => renderHealthParameter(p))
            ) : (
              <Grid item xs={12} md={12}>
                <Box
                  padding={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">
                    Aucun Parametre selectione
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    );
  };

  const renderMedicament = (m) => {
    return (
      <Grid key={m.id} item xs={12} md={12}>
        <Box
          alignItems="center"
          border="1px dashed lightgray"
          borderRadius={4}
          display="flex"
          alignItems="center"
          flexDirection="row"
          padding={1}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="body1" gutterBottom>
                <strong>Medicament: </strong>
                {m.label}
              </Typography>
              {m.packing && (
                <Typography variant="caption">
                  <strong>[Emballage: </strong>
                  {m.packing}]
                </Typography>
              )}
              {m.formLabel && (
                <Typography variant="caption">
                  <strong>, [Form: </strong>
                  {m.formLabel}]
                </Typography>
              )}
              {m.dosage && (
                <Typography variant="caption">
                  <strong>, [dosage: </strong>
                  {m.dosage}]
                </Typography>
              )}
            </Grid>
            <Grid item xs={2} md={1}>
              {renderField(
                {
                  name: "m__id__" + m.id + "__number_unit",
                  type: "number",
                  placeholder: "Nbs",
                  autoFocus: true,
                  defaultValue: m.medicament_prescription
                    ? m.medicament_prescription.number_unit
                    : 0,
                },
                hookForm,
                "m__id__" + m.id + "__number_unit"
              )}
            </Grid>
            <Grid item xs={5} md={3}>
              {renderField(
                {
                  name: "m__id__" + m.id + "__posologie",
                  type: "text",
                  placeholder: "posologie",
                  defaultValue: m.medicament_prescription
                    ? m.medicament_prescription.posologie
                    : "",
                },
                hookForm,
                "m__id__" + m.id + "__posologie"
              )}
            </Grid>
            <Grid item xs={5} md={3}>
              {renderField(
                {
                  name: "m__id__" + m.id + "__mention",
                  type: "text",
                  placeholder: "Mention",
                  defaultValue: m.medicament_prescription
                    ? m.medicament_prescription.mention
                    : "",
                },
                hookForm,
                "m__id__" + m.id + "__mention"
              )}
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Box display="flex" flexDirection="column">
            <IconButton
              style={{ margin: 2 }}
              onClick={() => {
                window.confirm("Supprimer ?") &&
                  setMedicaments_prescription(
                    medicaments_prescription.filter((fp) => fp.id !== m.id)
                  );
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              style={{ margin: 2 }}
              onClick={() => {
                window.alert(JSON.stringify(m, null, 2));
              }}
              aria-label="help"
            >
              <HelpIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    );
  };

  const renderPrescription = () => {
    return (
      <Paper
        style={{ display: tabValue === 2 ? "" : "none" }}
        className={classes.tabPanel}
      >
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <SearchField
                  url="medicaments"
                  optionLabel="label"
                  textFieldProps={{
                    placeholder: "Rechercher un medicament",
                    InputProps: {
                      disableUnderline: true,
                    },
                  }}
                  getOptionLabel={(option) =>
                    option.label ? option.label : ""
                  }
                  getOptionDisabled={(option) =>
                    _.some(medicaments_prescription, option)
                  }
                  onChange={(event, value) => {
                    value &&
                      setMedicaments_prescription([
                        ...medicaments_prescription,
                        {
                          ...value,
                          medicament_prescription: {
                            mention: "",
                            number_unit: 0,
                            posologie: "",
                          },
                        },
                      ]);
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton
                  onClick={handlePrintPrescription}
                  disabled={medicaments_prescription.length === 0}
                >
                  <PrintIcon className={classes.block} color="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box padding={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              {renderField(
                {
                  name: "comment",
                  type: "text",
                  defaultValue: consultation
                    ? consultation.prescription
                      ? consultation.prescription.comment
                      : ""
                    : "",
                  placeholder: "Commentair d'ordonnance",
                },
                hookForm,
                "comment"
              )}
            </Grid>
            {medicaments_prescription.length !== 0 ? (
              medicaments_prescription.map((p) => renderMedicament(p))
            ) : (
              <Grid item xs={12} md={12}>
                <Box
                  padding={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">
                    Aucun medicament selectione
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    );
  };
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <ContainerWithBack
      tabsComponent={() => (
        <Tabs
          textColor="inherit"
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="consultation-tabs"
        >
          <Tab textColor="inherit" label="Consultation" />
          <Tab textColor="inherit" label="Parametre de santé" />
          <Tab textColor="inherit" label="Ordonnance" />
        </Tabs>
      )}
      title="Ajouter une consultation"
    >
      {renderConsultation()}
      {renderHealthParameters()}
      {renderPrescription()}
      <div style={{ display: "none" }}>
        <PrintPrescription
          ref={printPrescription}
          doctor={{
            fullName:
              user.gender === "man"
                ? `Mr. ${user.firstname} ${user.lastname.toUpperCase()}`
                : `Mme. ${user.firstname} ${user.lastname.toUpperCase()}`,
            speciality: user.doctor.speciality,
            univ: "",
            clinicName: user[user.is].clinic.name,
            address: user[user.is].clinic.address,
            wilaya: user[user.is].clinic.wilaya,
            tel1: user[user.is].clinic.mobile,
            tel2: user[user.is].clinic.tel,
          }}
          patient={{
            fullName:
              patient.user.gender === "man"
                ? `Mr. ${
                    patient.user.firstname
                  } ${patient.user.lastname.toUpperCase()}`
                : `Mme. ${
                    patient.user.firstname
                  } ${patient.user.lastname.toUpperCase()}`,
            age: moment().diff(moment(patient.user.dateBirth), "years"),
          }}
          medicaments_prescription={formValues.medicaments_prescription}
          comment={formValues.comment}
        />
      </div>
    </ContainerWithBack>
  );
};
