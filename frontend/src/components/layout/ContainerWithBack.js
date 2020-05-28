import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    marginTop: theme.spacing(1),
    minHeight: 600,
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

export default ({ children, title, tabsComponent, goBack }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <AppBar position="sticky" elevation={0}>
        <Box className={classes.top}>
          <IconButton
            style={{ color: "white" }}
            onClick={() => (goBack ? goBack() : history.goBack())}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Box>
        {tabsComponent && tabsComponent()}
      </AppBar>
      <Container className={classes.container}>{children}</Container>
    </Box>
  );
};
