import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAppStore } from "stores";
import Form, { renderFields, renderField } from "./Form";
import {
  Paper,
  Typography,
  Box,
  TextField,
  makeStyles,
  LinearProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  healthParameter: {
    padding: theme.spacing(2),
  },
}));

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { api } = useAppStore();
  const { enqueueSnackbar } = useSnackbar();
  const [parameters, setParameters] = useState([]);
  const [parameterOptions, setParameterOptions] = useState([]);
  const [patient, setPatient] = useState(null);
  const { params } = useRouteMatch();
  const classes = useStyles();
  const rowForm = [
    {
      name: "motifs",
      placeholder: "Motifs",
      type: "text",
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

  useEffect(() => {
    const load = async () => {
      await api.get("healthparameters").then(({ data }) => {
        const fetchedParamaterOptions = data.map((p, i) => {
          return {
            ...p,
            type: getType(p.type),
            name: "_id" + p.id,
            placeholder: p.label,
            categoryName: p.health_parameter_category.name,
            options: p.health_parameter_options
              ? p.health_parameter_options.map((o) => o.name)
              : [],
          };
        });
        setParameterOptions(fetchedParamaterOptions);
      });

      await api
        .get(`/patients/${params.id}`)
        .then(({ data }) => {
          setPatient(data);
          setIsLoading(false);
        })
        .catch((err) => {
          const message = err ?.response ?.data ?.message || "" + err;
          enqueueSnackbar(message, {
            variant: "error",
          });
          //setIsLoading(false);
        });
    };
    load();
  }, []);

  const onSubmit = (data) => {
    let healthParameters = [];
    let id;
    let value;
    Object.keys(data).map((key) => {
      if (key.startsWith("_id")) {
        id = key.slice(3);
        value = data[key];
        healthParameters.push({ healthParameterId: id, value: value });
        delete data[key];
      }
    });
    data["healthParameters"] = healthParameters;
    data["patientId"] = patient.id;
    api
      .post("consultations", data)
      .then(({ data }) => {
        const message = "Consultation est enregister avec success";
        enqueueSnackbar(message, {
          variant: "success",
        });
        setIsLoading(false);
        history.push(`/patients/${patient.id}/consultations/${data.id}/edit`);
      })
      .catch((err) => {
        const message = err ?.response ?.data ?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
        setIsLoading(false);
      });
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

  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <Paper
      style={{ padding: 10 }}
      display="flex"
      flexDirection="column"
      component={Box}
    >
      <Typography variant="h6">
        Nouvelle consultations pour:{" "}
        {patient &&
          patient ?.user ?.firstname ?.toUpperCase() +
            " " +
            patient ?.user ?.lastname ?.toUpperCase()}
      </Typography>
      <Form render={(form) => (
        <>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Consultation</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box display="flex" flexWrap="wrap">
                {rowForm.map((field, index) => (
                  renderField(field, form, index)
                ))}
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Paramaters de santé</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box flex={1} display="flex" flexDirection="column">
                <Autocomplete
                  multiple
                  onChange={(event, values) => setParameters(values)}
                  filterSelectedOptions
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  size="small"
                  limitTags={3}
                  id="multiple-limit-tags"
                  options={parameterOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Paramaters"
                      placeholder="Paramaters"
                    />
                  )}
                />
                <Paper style={{ marginTop: 20, padding: 10, display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                  {
                    parameters.length !== 0 &&
                    parameters.map((field, index) => (
                      renderField(field, form, field.name)
                    ))
                  }
                  {parameters.length === 0 && (
                    <Typography>
                      Sélectionner un ou plusieur paramètres de santé
                  </Typography>
                  )}
                </Paper>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box flex={1} display="flex" flexDirection="column">
                <Autocomplete
                  multiple
                  onChange={(event, values) => setParameters(values)}
                  filterSelectedOptions
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  size="small"
                  limitTags={3}
                  id="multiple-limit-tags"
                  options={parameterOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Paramaters"
                      placeholder="Paramaters"
                    />
                  )}
                />
                <Paper style={{ marginTop: 20, padding: 10, display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                  {
                    parameters.length !== 0 &&
                    parameters.map((field, index) => (
                      renderField(field, form, field.name)
                    ))
                  }
                  {parameters.length === 0 && (
                    <Typography>
                      Sélectionner un ou plusieur paramètres de santé
                  </Typography>
                  )}
                </Paper>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </>
      )} />

    </Paper>
  );
};

/*
<Box component="form">
  <Form
    form={rowForm}
    onSubmit={onSubmit}
    isLoading={isLoading}
    extraFieldsBottom={(control, errors) => {
      return (
        <Paper className={classes.healthParameter}>
          <Autocomplete
            multiple
            onChange={(event, values) => setParameters(values)}
            filterSelectedOptions
            getOptionSelected={(option, value) =>
              option.name === value.name
            }
            size="small"
            limitTags={3}
            id="multiple-limit-tags"
            options={parameterOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paramaters de santé"
                placeholder="Paramaters de santé"
              />
            )}
          />
          <Paper style={{ marginTop: 20, padding: 10 }}>
            {parameters.length !== 0 &&
              renderFields(parameters, control, errors)}
            {parameters.length === 0 && (
              <Typography>
                Sélectionner un ou plusieur paramètres de santé
          </Typography>
            )}
          </Paper>
        </Paper>
      );
    }}
  />
</Box>


 */