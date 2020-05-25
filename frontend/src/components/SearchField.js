import React from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import throttle from "lodash/throttle";

import { useAppStore } from "stores";

export default ({ url, textFieldProps, ...props }) => {
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
  React.useEffect(() => {
    let active = true;
    if (inputValue === "") {
      setOptions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchThrottle(inputValue.toUpperCase(), (data) => {
      if (active && data) {
        setOptions(data.data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      includeInputInList
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        console.log(newInputValue);
        setInputValue(newInputValue);
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
      {...props}
    />
  );
};
