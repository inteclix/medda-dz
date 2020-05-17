import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Link,
  makeStyles,
  Typography,
  Toolbar,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import { motion } from "framer-motion";

import { Link as LinkRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import PerfectScrollbar from "react-perfect-scrollbar";
import Form from "components/Form";
import authenticationSVG from "assets/authentication.svg";
import doctorsSVG from "assets/doctors.svg";

import { useAppStore } from "stores";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    height: "100vh",
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    background: "linear-gradient(to right, #e6e8f9 0%, #f4f6f8)",
    boxShadow: "5px 0px 25px 0px #0000007d",
    height: "100%",
    overflowY: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    elevation: 2,
  },
  authenticationSVG: {
    height: 200,
    margin: theme.spacing(2),
  },
  doctorsSVG: {
    height: 500,
  },
}));
export default () => {
  const classes = useStyles();
  const [specialities, setSpecialities] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control, errors } = useForm();
  const { api, setToken } = useAppStore();

  useEffect(() => {
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

  const submit = (data) => {
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
  const signupForm = [
    {
      name: "username",
      placeholder: "Nom d'utilisateur",
      type: "text",
      rules: { required: "This field is required" },
      style: { width: "100%" },
    },
    {
      name: "password",
      placeholder: "Mot de pass",
      type: "password",
      rules: { required: "This field is required" },
      style: { width: "100%" },
    },
  ];
  return (
    <Grid container className={classes.root}>
      <Grid className={classes.left}>
        <motion.div
          animate={{ scale: 0.95, rotate: 0.5, opacity: 0.8 }}
          transition={{
            yoyo: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        >
          <img className={classes.doctorsSVG} src={doctorsSVG} />
        </motion.div>
        <Typography variant="h5">
          ❝ MEDDA la première application ❤ médical online en ALGERIE ❞
        </Typography>
      </Grid>

      <Grid component={PerfectScrollbar} className={classes.right} item>
        <motion.div
        style={{display: "flex", alignItems: "center", justifyContent:"center "}}
          animate={{ scale: 0.98, rotate: 0.5, opacity: 0.8 }}
          transition={{
            yoyo: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <img src={authenticationSVG} className={classes.authenticationSVG} />
        </motion.div>
        <Paper className={classes.form}>
          <Typography variant="h6">Connecté à MEDDA</Typography>

          <Box
            marginBottom={2}
            marginTop={2}
            component="form"
            display="flex"
            flexDirection="column"
          >
            <Form form={signupForm} onSubmit={submit} submitText="Connecté" />
          </Box>

          <Link
            to="/signup"
            component={LinkRouter}
            variant="subtitle1"
            style={{ textAlign: "right" }}
          >
            Vous n'avez pas encore de compte?
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
};
