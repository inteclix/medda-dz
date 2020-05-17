import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Typography,
  LinearProgress,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Divider,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';

import { useHistory, useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";
import moment from "moment";
import { useAppStore } from "stores";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: "#fafafa",
    maxHeight: 192,
  },
  inline: {
    alignItems: "center",
  },
}));

const PatientConsultations = ({ id }) => {
  const classes = useStyles();
  const { api } = useAppStore();
  const [consultations, setConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    api
      .get(`patients/${id}/consultations`)
      .then(({ data }) => {
        setConsultations(data.consultations);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LinearProgress />;
  }
  if(consultations.length ===0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
        <Typography>Aucun consultation pour ce patient</Typography>
      </Box>
    )
  }
  return (
    <List component={PerfectScrollbar} className={classes.root}>
      {consultations.map((c, index) => (
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar>
              <AssignmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {`Motifs: ${c.motifs}`}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {`Diagnostique: ${c.diagnostique}`}
                </Typography>
              </Box>
            }
            secondary={`Le ${moment(c.createdAt).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton style={{ marginLeft: ".5em" }} aria-label="edit">
              <VisibilityIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PatientConsultations;
