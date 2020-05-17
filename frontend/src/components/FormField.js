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
} from "@material-ui/core";
import {
  DatePicker,
  KeyboardDatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Controller } from "react-hook-form";

export default ({ control, errors, field, style }) => {
  if (
    field.type === "text" ||
    field.type === "password" ||
    field.type === "tel"
  ) {
    return (
      <FormControl
        fullWidth
        margin="normal"
        error={Boolean(errors[field.name])}
      >
        <Controller
          as={TextField}
          type={field.type}
          control={control}
          required={field.rules ? true : false}
          name={field.name}
          defaultValue={field ? field[field.name] : ""}
          label={field.label}
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
        fullWidth
        margin="normal"
        error={Boolean(errors[field.name])}
      >
        <Controller
          as={TextField}
          type={"number"}
          control={control}
          required={field.rules ? true : false}
          name={field.name ? field.name : field.code}
          defaultValue={field ? field[field.name] : ""}
          label={field.label}
          rules={field.rules}
        />
        <FormHelperText>
          {errors[field.name] && errors[field.name].message}
        </FormHelperText>
      </FormControl>
    );
  }
  if (field.type === "list") {
  }
  if (field.type === "date") {
    return (
      <FormControl
        fullWidth
        margin="normal"
        error={Boolean(errors[field.name])}
      >
        <Controller
          as={DatePicker}
          format="DD-MM-YYYY"
          control={control}
          required={field.rules ? true : false}
          name={field.name}
          defaultValue={field ? field[field.name] : new Date()}
          label={field.label}
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
      null
    );
  }
  if (field.type === "boolean") {
    return (
      <FormControl fullWidth margin="normal">
        <FormControlLabel
          control={
            <Controller
              as={Switch}
              name={field.name}
              defaultValue={field ? field[field.name] : true}
              control={control}
            />
          }
          label={field.label}
        />
      </FormControl>
    );
  }
  return null;
};
