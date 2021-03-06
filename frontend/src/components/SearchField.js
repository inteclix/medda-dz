import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import throttle from "lodash/throttle";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import { useAppStore } from "stores";

export default ({
  url,
  textFieldProps,
  optionLabel,
  defaultValue,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { api } = useAppStore();
  
  const fetchThrottle = React.useMemo(
    () =>
      throttle(async (search, callback) => {
        const data = await api.get(`${url}?search=${search}`);
        callback(data);
      }, 500),
    []
  );

  const searchValue = (inputValue) => {
    setLoading(true);
    fetchThrottle(inputValue.toUpperCase(), (data) => {
      if (data) {
        setOptions(data.data);
        setLoading(false);
      }
    });
  }

  return (
    <Autocomplete
      defaultValue={defaultValue}
      includeInputInList
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        searchValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            ...textFieldProps.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(option) => {
          const matches = match(
            optionLabel ? option[optionLabel] : option,
            inputValue.toUpperCase()
          );
        const parts = parse(
          optionLabel ? option[optionLabel] : option,
          matches
        );
        return (
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
        );
      }}
      {...props}
      onChange={(event, value) => {
        props.onChange(event, value);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
    />
  );
};
