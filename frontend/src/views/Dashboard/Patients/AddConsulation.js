import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink, useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import { useAppStore } from "stores";
import Form, { renderFields } from "components/Form";
import { Paper, Typography, Box, TextField, FormHelperText, FormControl, makeStyles, LinearProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab"
import { Controller } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  healthParameter: {
    padding: theme.spacing(2),
  }
}));

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { api } = useAppStore();
  const { enqueueSnackbar } = useSnackbar();
  const [parameters, setParameters] = useState([])
  const [parameterOptions, setParameterOptions] = useState([])
  const [patient, setPatient] = useState(null)
  const { params } = useRouteMatch()
  const classes = useStyles()
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
            options: p.health_parameter_options ? p.health_parameter_options.map((o) => o.name) : []
          }
        })
        setParameterOptions(fetchedParamaterOptions)
      })

      await api.get(`/patients/${params.id}`)
        .then(({ data }) => {
          setPatient(data)
          setIsLoading(false)
        })
        .catch((err) => {
          const message = err ?.response ?.data ?.message || '' + err;
          enqueueSnackbar(message, {
            variant: 'error'
          });
          //setIsLoading(false);
        })
    }
    load()
  }, [])

  const onSubmit = data => {
    let healthParameters = []
    let id
    let value
    Object.keys(data).map((key) => {
      if (key.startsWith("_id")) {
        id = key.slice(3)
        value = data[key]
        healthParameters.push({ healthParameterId: id, value: value })
        delete data[key]
      }
    })
    data["healthParameters"] = healthParameters
    data["patientId"] = patient.id
    api.post("consultations", data)
      .then(() => {
        const message = 'Consultation est enregister avec success';
        enqueueSnackbar(message, {
          variant: 'success'
        });
        setIsLoading(false);
        history.push(`/patients/${patient.id}/consultations/edit`)
      })
      .catch(err => {
        const message = err ?.response ?.data ?.message || '' + err;
        enqueueSnackbar(message, {
          variant: 'error'
        });
        setIsLoading(false);
      });

  };

  const getType = (t) => {
    if (t === 0) {
      return "text"
    }
    if (t === 1) {
      return "number"
    }
    if (t === 2) {
      return "date"
    }
    if (t === 3) {
      return "boolean"
    }
    if (t === 4) {
      return "list"
    }
  }

  const renderParameters = (control, errors) => {
    if (parameters) {
      return (
        parameters.map((paramater, index) => {
          return (
            <FormControl
              key={index}
              fullWidth
              margin="normal"
              error={Boolean(errors["f" + paramater.id])}>
              <Controller
                as={TextField}
                type={getType(paramater.type)}
                control={control}
                name={"f" + paramater.id}
                label={paramater.name}
              />
              <FormHelperText>
                {errors["f" + paramater.id] && errors["f" + paramater.id].message}
              </FormHelperText>
            </FormControl>
          )
        })
      )
    }
  }
  
  if (isLoading) {
    return (
      <LinearProgress />
    )
  }
  return (
    <Paper style={{ padding: 10 }} display="flex" flexDirection="column" component={Box}>
      <Typography variant="h6">Nouvelle consultations pour: {patient && patient ?.user ?.firstname + " " + patient ?.user ?.lastname}</Typography>
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
                  size="small"
                  limitTags={3}
                  id="multiple-limit-tags"
                  options={parameterOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Paramaters de santé" placeholder="Paramaters de santé" />
                  )}
                />
                {
                  renderFields(parameters, control, errors)
                }
              </Paper>
            )
          }}
        />
      </Box>
    </Paper>
  );
};
