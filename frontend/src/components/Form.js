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
import {SingleSelect} from 'react-select-material-ui';
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

export const renderFields = (form, control, errors, row) => {
  return form.map((field, index) => {
    if(field.type === "component"){
      return field.component
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
          style={{margin: 10}}
        >
          <Controller
            as={TextField}
            type={field.type}
            control={control}
            required={field.rules ? true : false}
            name={field.name ? field.name : field.code}
            defaultValue={row ? row[field.name] : ""}
            label={field.placeholder}
            style={{ width: 280, ...field.style  }}
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
          style={{margin: 10}}
          error={Boolean(errors[field.name])}
        >
          <Controller
            as={TextField}
            type={"number"}
            control={control}
            required={field.rules ? true : false}
            name={field.name ? field.name : field.code}
            defaultValue={row ? row[field.name] : ""}
            label={field.placeholder}
            style={{ width: 280, ...field.style  }}
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
          style={{margin: 10}}
          error={Boolean(errors[field.name])}
        >
          <Controller
            as={DatePicker}
            format="DD-MM-YYYY"
            control={control}
            required={field.rules ? true : false}
            name={field.name}
            style={{ width: 280, ...field.style  }}
            defaultValue={row ? row[field.name] : new Date()}
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
          style={{margin: 10}}
          error={Boolean(errors[field.name])}
          key={index}>
          <Controller
            as={SingleSelect}
            name={field.name}
            defaultValue={row ? row[field.name] : ""}
            rules={field.rules}
            control={control}
            options={field.options}
            style={{ width: 280, ...field.style  }}
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
          
        <FormControl style={{margin: 10}} margin="normal" key={index}>
          <FormControlLabel
            control={
              <Controller
                as={Switch}
                name={field.name}
                defaultValue={row ? row[field.name] : true}
                control={control}
              />
            }
            label={field.placeholder}
          />
        </FormControl>
      );
    }
    return null;
  });
};

export default ({
  form,
  style,
  row,
  onSubmit,
  submitText,
  isLoading,
  extraFieldsTop,
  extraFieldsBottom,
}) => {
  const { handleSubmit, control, errors } = useForm();

  return (
    <>
      {extraFieldsTop && extraFieldsTop(control, errors)}
      {renderFields(form, control, errors, row)}
      {extraFieldsBottom && extraFieldsBottom(control, errors)}
      <Button
        style={{width: "calc(100% - 20px)",margin: 10}}
        onClick={handleSubmit(onSubmit)}
        color="primary"
        disabled={Boolean(isLoading)}
        variant="outlined"
      >
        {submitText ? submitText : "OK"}
      </Button>
    </>
  );
};
