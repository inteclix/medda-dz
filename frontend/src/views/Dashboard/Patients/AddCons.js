import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Tabs,
  Tab,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Typography,
  AppBar,
  Toolbar,
  TextField,
} from "@material-ui/core";

import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";

import { useForm } from "react-hook-form";

import { renderField } from "components/FormFields";
import ContainerWithBack from "components/layout/ContainerWithBack";

import SearchField from "components/SearchField";

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
  const hookForm = useForm();
  window.hookForm = hookForm;

  const [tabValue, setTabValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    window.scrollTo(0, 0);
  };
  const [healthParameters, setHealthParameters] = React.useState([]);
  const [medicaments, setMedicaments] = React.useState([]);
  const onSubmit = (data) => {
    console.log(data);
  };

  const renderConsultation = () => {
    const consultationForm = [
      {
        name: "motifs",
        placeholder: "Motifs",
        type: "text",
        rules: { required: "Ce champ est obligatoire" },
      },
      {
        name: "historique",
        placeholder: "Historique",
        type: "text",
      },
      {
        name: "examenClinique",
        placeholder: "Examen clinique",
        type: "text",
      },
      {
        name: "examenParaClinique",
        placeholder: "Examen para clinique",
        type: "text",
      },
      {
        name: "diagnostique",
        placeholder: "Diagnostique",
        type: "text",
      },
      {
        name: "traitement",
        placeholder: "traitement",
        type: "text",
      },
      {
        name: "examentDemander",
        placeholder: "Exament demander",
        type: "text",
      },
      {
        name: "note",
        placeholder: "Note",
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
                <Tooltip title="Imprimer">
                  <IconButton>
                    <PrintIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box padding={1} component={Grid} container spacing={1}>
          {consultationForm.map((field, index) => (
            <Grid item xs={12} md={6}>
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
      name: "h_id" + p.id,
      type: p.type,
      placeholder: p.label,
      options: p.health_parameter_options
        ? p.health_parameter_options.map((o) => o.label)
        : [],
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
                    placeholder: "Rechercher un parameter de santé",
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
                <Tooltip title="Imprimer">
                  <IconButton>
                    <PrintIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
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
    let field = {
      name: "m_id" + m.id,
      placeholder: m.name,
    };
    return (
      <Grid key={field.name} item xs={12} md={12}>
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
            <Grid item xs={12} md={6}>
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
                  <strong>, [Dosage: </strong>
                  {m.dosage}]
                </Typography>
              )}
            </Grid>
            <Grid item xs={4} md={2}>
              {renderField(
                {
                  name: m.id + "_number_unit",
                  type: "number",
                  placeholder: "Nb unités",
                },
                hookForm,
                m.id + "_number_unit"
              )}
            </Grid>
            <Grid item xs={4} md={2}>
              {renderField(
                {
                  name: m.id + "_dosage",
                  type: "text",
                  placeholder: "Dosage",
                },
                hookForm,
                m.id + "_dosage"
              )}
            </Grid>
            <Grid item xs={4} md={2}>
              {renderField(
                {
                  name: m.id + "_mention",
                  type: "text",
                  placeholder: "Mention",
                },
                hookForm,
                m.id + "_mention"
              )}
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Box display="flex" flexDirection="column">
            <IconButton
              style={{ margin: 2 }}
              onClick={() => {
                window.confirm("Supprimer ?") &&
                  setMedicaments(medicaments.filter((fp) => fp.id !== m.id));
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
                  getOptionLabel={(option) => (option.label ? option.label : "")}
                  getOptionDisabled={(option) => _.some(medicaments, option)}
                  onChange={(event, value) => {
                    value && setMedicaments([...medicaments, value]);
                  }}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Imprimer">
                  <IconButton>
                    <PrintIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box padding={1}>
          <Grid container spacing={1}>
            {medicaments.length !== 0 ? (
              medicaments.map((p) => renderMedicament(p))
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
    </ContainerWithBack>
  );
};
