import React from "react";
import { Link as LinkRouter } from "react-router-dom";
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
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import PerfectScrollbar from "react-perfect-scrollbar";

import { renderField } from "components/FormFields";

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

  const [specialities, setSpecialities] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    api
      .get("/specialities")
      .then(({ data }) => {
        if (mounted) {
          const spes = data.map((s) => {
            return { label: s.name, value: s.id };
          });
          setSpecialities(spes);
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = (data) => {
    api
      .post("auth/signin", data)
      .then(({ data }) => {
        setToken(data.accessToken);
        enqueueSnackbar("Bienvenu", {
          variant: "success",
        });
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  const signinForm = [
    {
      name: "username",
      placeholder: "Nom d'utilisateur",
      type: "text",
      rules: { required: "This field is required" },
    },
    {
      name: "password",
      placeholder: "Mot de pass",
      type: "password",
      rules: { required: "This field is required" },
    },
  ];

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
      <Grid item xs={12} sm={5} md={4} className={classes.right} component={PerfectScrollbar}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img
            className={classes.authenticationImage}
            src={authenticationImage}
          />
        </Box>
        <Paper style={{ padding: 8, marginTop: 8 }} component="form">
          {signinForm.map((field, index) =>
            renderField(field, hookForm, index)
          )}
          <Button
            onClick={hookForm.handleSubmit(onSubmit)}
            style={{ width: "100%" }}
            variant="contained"
            color="primary"
          >
            Connecté
          </Button>
        </Paper>
        <Link
          to="/signup"
          component={LinkRouter}
          variant="subtitle1"
          style={{ textAlign: "right" }}
        >
          Vous n'avez pas encore de compte?
        </Link>
      </Grid>
    </Grid>
  );
};
