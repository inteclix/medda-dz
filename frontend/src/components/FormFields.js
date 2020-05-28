import React from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  Switch,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { SingleSelect } from "react-select-material-ui";
import {
  DatePicker,
  KeyboardDatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
//import { SingleSelect } from "react-select-material-ui";

import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({}));

export const renderField = (field, form, index) => {
  const { control, errors } = form;
  if (field.type === "component") {
    return field.component;
  }
  if (
    field.type === "text" ||
    field.type === "password" ||
    field.type === "tel"
  ) {
    return (
      <FormControl
        key={index}
        margin="normal"
        error={Boolean(errors[field.name])}
        fullWidth
      >
        <Controller
          as={TextField}
          autoFocus={field.autoFocus}
          fullWidth
          type={field.type}
          control={control}
          required={field.rules ? true : false}
          name={field.name ? field.name : field.code}
          defaultValue={field.defaultValue ? field.defaultValue : ""}
          label={field.placeholder ? field.placeholder : field.label}
          rules={field.rules}
        />
        <FormHelperText>
          {errors[field.name] && errors[field.name].message}
        </FormHelperText>
      </FormControl>
    );
  }
  if (field.type === "number") {
    return (
      <FormControl
        key={index}
        margin="normal"
        fullWidth
        error={Boolean(errors[field.name])}
      >
        <Controller
          as={TextField}
          autoFocus={field.autoFocus}
          fullWidth
          type={"number"}
          control={control}
          required={field.rules ? true : false}
          name={field.name ? field.name : field.code}
          defaultValue={field.defaultValue ? field.defaultValue : ""}
          label={field.placeholder}
          rules={field.rules}
        />
        <FormHelperText>
          {errors[field.name] && errors[field.name].message}
        </FormHelperText>
      </FormControl>
    );
  }
  if (field.type === "date") {
    return (
      <FormControl
        key={index}
        margin="normal"
        fullWidth
        error={Boolean(errors[field.name])}
      >
        <Controller
          autoFocus={field.autoFocus}
          as={DatePicker}
          fullWidth
          format="DD-MM-YYYY"
          control={control}
          required={field.rules ? true : false}
          name={field.name}
          defaultValue={field.defaultValue ? field.defaultValue : new Date()}
          label={field.placeholder}
          rules={field.rules}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>
          {errors[field.name] && errors[field.name].message}
        </FormHelperText>
      </FormControl>
    );
  }
  if (field.type === "select" || field.type === "list") {
    return (
      <FormControl
        margin="normal"
        fullWidth
        error={Boolean(errors[field.name])}
        key={index}
      >
        <Controller
          autoFocus={field.autoFocus}
          as={SingleSelect}
          fullWidth
          name={field.name}
          defaultValue={field.defaultValue ? field.defaultValue : "user"}
          rules={field.rules}
          control={control}
          options={field.options}
          label={field.placeholder}
        />
        <FormHelperText>
          {errors[field.name] && errors[field.name].message}
        </FormHelperText>
      </FormControl>
    );
  }
  if (field.type === "boolean") {
    return (
      <FormControl fullWidth margin="normal" key={index}>
        <FormControlLabel
          control={
            <Controller
              autoFocus={field.autoFocus}
              as={Switch}
              name={field.name}
              defaultValue={
                field.defaultValue
                  ? field.defaultValue === "false"
                    ? false
                    : Boolean(field.defaultValue)
                  : true
              }
              control={control}
            />
          }
          label={field.placeholder}
        />
      </FormControl>
    );
  }
  return null;
};

export default ({ render }) => {
  const form = useForm();
  return <>{render && render(form)}</>;
};
