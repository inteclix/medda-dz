import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAppStore } from "stores";
import Form, { renderField } from "components/FormFields";

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
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  healthParameter: {
    padding: theme.spacing(2),
  },
}));

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { api } = useAppStore();
  const { enqueueSnackbar } = useSnackbar();
  const [parameters, setParameters] = useState([]);
  const [defaultValueParameters, setDefaultValueParameters] = useState([]);
  const [parametersRow, setParametersRow] = useState({});
  const [parameterOptions, setParameterOptions] = useState([]);
  const [consultation, setConsultation] = useState(null);
  const { params } = useRouteMatch();
  const classes = useStyles();
  window.parameters = parameters;
  window.parametersRow = parametersRow;
  const consultationForm = [
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
      let pRow = {};
      await api
        .get(`/consultations/${params.consultationId}`)
        .then(({ data }) => {
          const fetchedParamaters = data.health_parameters.map((p, i) => {
            if (getType(p.type) === "boolean") {
              pRow["_id" + p.id] =
                p.consultation_health_parameters.value === "true";
            } else {
              pRow["_id" + p.id] = p.consultation_health_parameters.value;
            }
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
          setParameters(fetchedParamaters);
          setDefaultValueParameters(fetchedParamaters);
          setParametersRow(pRow);
          setConsultation(data);
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
  }, []);

  const onSubmit = (data, form) => {
    window.form = form;
    window.data = data;
    let healthParameters = [];
    let id;
    let value;
    Object.keys(data).map((key) => {
      if (key.startsWith("_id")) {
        id = key.slice(3);
        value = data[key];
        healthParameters.push({
          healthParameterId: id,
          value: value.toString(),
        });
        delete data[key];
      }
    });
    data["healthParameters"] = healthParameters;
    data["patientId"] = consultation.patient.id;
    api
      .put(`consultations/${consultation.id}`, data)
      .then(() => {
        const message = "Consultation est enregister avec success";
        enqueueSnackbar(message, {
          variant: "success",
        });
        //setIsLoading(false);
        form.reset();
        //history.push(`/patients/${patient.id}`)
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
        //setIsLoading(false);
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
      style={{ padding: 10, backgroundColor: "whitesmoke" }}
      display="flex"
      flexDirection="column"
      component={Box}
    >
      <Typography variant="h6">
        Consultations (
        {`${moment(consultation.createdAt).format("DD/MM/YYYY, h:mm:ss a")}`})
        pour:{" "}
        {consultation &&
          consultation?.patient?.user?.firstname.toUpperCase() +
            " " +
            consultation?.patient?.user?.lastname.toUpperCase()}
      </Typography>
      <Form
        render={(form) => (
          <Box marginTop={1}>
            <ExpansionPanel expanded>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Consultation
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box display="flex" flexWrap="wrap">
                  {consultationForm.map((field, index) =>
                    renderField(field, form, index, consultation)
                  )}
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Paramaters de santé
                </Typography>
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
                    defaultValue={defaultValueParameters}
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
                  <Paper
                    style={{
                      marginTop: 20,
                      padding: 10,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {parameters.length !== 0 &&
                      parameters.map((field, index) =>
                        renderField(field, form, field.name, parametersRow)
                      )}
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
                <Typography className={classes.heading}>Ordonance</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box flex={1} display="flex" flexDirection="column">
                  Ordonance{" "}
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button
              onClick={form.handleSubmit((data) => onSubmit(data, form))}
              fullWidth
              variant="outlined"
              color="primary"
              disabled={Object.keys(form.formState.touched).length === 0}
              style={{ marginTop: 10 }}
            >
              OK
            </Button>
          </Box>
        )}
      />
    </Paper>
  );
};
