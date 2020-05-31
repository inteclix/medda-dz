import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Divider, Button, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  container: {
    flex: 1,
    marginTop: theme.spacing(1),
    minHeight: 800,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  title: {
    marginLeft: theme.spacing(2),
  },
}));

export default ({ children, title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {title && (
        <>
          <Box className={classes.top}>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Box>
          <Divider variant="middle" />
        </>
      )}
      <Container className={classes.container}>{children}</Container>
    </Box>
  );
};
