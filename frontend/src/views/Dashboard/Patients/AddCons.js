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
  searchInput: {
    fontSize: theme.typography.fontSize,
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
      type: getType(p.type),
      placeholder: p.label,
      options: p.health_parameter_options
        ? p.health_parameter_options.map((o) => o.name)
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
                  textFieldProps={{
                    placeholder: "Rechercher un parameter de santé",
                    InputProps: {
                      disableUnderline: true,
                      className: classes.searchInput,
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
                  <Typography variant="h6">
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
          border="1px solid lightgray"
          borderRadius={4}
          display="flex"
          alignItems="center"
          flexDirection="row"
          padding={1}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Medicament: {m.name}</Typography>
              <Typography variant="subtitle2">Packing: {m.packing}</Typography>
              <Tooltip title={m.dosage}>
                <HelpIcon style={{ display: "inline" }} />
              </Tooltip>
            </Grid>
            <Grid item xs={6} md={3}>
              {renderField(
                {
                  name: "dosage",
                  type: "text",
                  placeholder: "dosage",
                },
                hookForm,
                "dosage" + m.id
              )}
            </Grid>
            <Grid item xs={6} md={3}>
              {renderField(
                {
                  name: "mention",
                  type: "text",
                  placeholder: "mention",
                },
                hookForm,
                "mention" + m.id
              )}
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <IconButton
            style={{ marginRight: 4 }}
            onClick={() => {
              window.confirm("Supprimer ?") &&
                setMedicaments(medicaments.filter((fp) => fp.id !== m.id));
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
                  textFieldProps={{
                    placeholder: "Rechercher un medicament",
                    InputProps: {
                      disableUnderline: true,
                      className: classes.searchInput,
                    },
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  getOptionDisabled={(option) => _.some(medicaments, option)}
                  clearOnBlur
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
                  <Typography variant="h6">
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

const getType = (t) => {
  if (t === 0) {
    return "text";
  }
  if (t === 1) {
    return "number";
  }
  if (t === 2) {
    return "date";
  }
  if (t === 3) {
    return "boolean";
  }
  if (t === 4) {
    return "list";
  }
};
