import React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  makeStyles,
  Grid,
  Box,
  Paper,
  Hidden,
  Typography,
  Button,
  Link,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import PerfectScrollbar from "react-perfect-scrollbar";

import { renderField } from "components/FormFields";
import SearchField from "components/SearchField";

import { useAppStore } from "stores";

const useStyles = makeStyles((theme) => ({
  left: {
    overflowY: "auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  right: {
    padding: theme.spacing(1),
    background: "linear-gradient(to right, #e6e8f9 0%, #f4f6f8)",
    boxShadow: "5px 0px 25px 0px #0000007d",
    overflowY: "auto",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
    height: "100%",
  },
  authenticationImage: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      //display: "none"
    },
  },
  doctorsImage: {
    width: "calc(100% - 80px)",
  },
}));

const authenticationImage = require("assets/authentication.svg");
const doctorsImage = require("assets/doctors.svg");

export default () => {
  const classes = useStyles();
  const { api, setToken } = useAppStore();
  const hookForm = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/auth/signup", { ...data, is: "doctor" })
      .then(() => {
        enqueueSnackbar(
          "Connectez-vous maintenant avec nom d'utilisateur et mot de passe",
          {
            variant: "success",
          }
        );
        history.push("/signin");
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  const signupForm = [
    {
      name: "mobile",
      placeholder: "Tel mobile",
      type: "text",
      rules: {
        required: "Ce champ est requis",
        pattern: {
          value: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          message: "Némero de TEL incorecte",
        },
      },
      style: { width: "100%" },
    },
    {
      name: "username",
      placeholder: "Nom d'utilisateur",
      type: "text",
      rules: { required: "Ce champ est requis" },
    },
    {
      name: "password",
      placeholder: "Mot de pass",
      type: "password",
      rules: { required: "Ce champ est requis" },
    },
  ];

  hookForm.register(
    { name: "specialityId" },
    {
      required: "Ce champ est requis",
    }
  );
  return (
    <Grid container style={{ height: "100vh" }}>
      <Hidden xsDown>
        <Grid item sm={7} md={8} className={classes.left}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <img className={classes.doctorsImage} src={doctorsImage} />
          </Box>
          <Typography style={{ textAlign: "center" }}>
            {"</>"} (developed) with ❤ by{" "}
            <Link
              color="inherit"
              href="https://twitter.com/seddikBENZEMAME"
              target="_blank"
            >
              @seddikBENZEMAME
            </Link>
          </Typography>
        </Grid>
      </Hidden>
      <Grid
        item
        xs={12}
        sm={5}
        md={4}
        className={classes.right}
        component={PerfectScrollbar}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <img
            className={classes.authenticationImage}
            src={authenticationImage}
          />
        </Box>
        <Paper style={{ padding: 8, marginTop: 8 }} component="form">
          <FormControl
            margin="normal"
            fullWidth
            error={Boolean(hookForm.errors["specialityId"])}
          >
            <SearchField
              url="specialities"
              optionLabel="label"
              textFieldProps={{
                placeholder: "Choisé votre specialité",
                required: true,
              }}
              getOptionLabel={(option) => (option.label ? option.label : "")}
              onChange={(event, value) => {
                hookForm.setValue("specialityId", value?.id);
              }}
            />
            <FormHelperText>
              {hookForm.errors["specialityId"] &&
                hookForm.errors["specialityId"].message}
            </FormHelperText>
          </FormControl>
          {signupForm.map((field, index) =>
            renderField(field, hookForm, index)
          )}

          <Button
            onClick={hookForm.handleSubmit(onSubmit)}
            style={{ width: "100%" }}
            variant="contained"
            color="primary"
          >
            S'inscrire
          </Button>
        </Paper>
        <Link
          to="/signin"
          component={LinkRouter}
          variant="subtitle1"
          style={{ textAlign: "right" }}
        >
          Si vous avez déjà un compte, identifiez-vous
        </Link>
      </Grid>
    </Grid>
  );
};
