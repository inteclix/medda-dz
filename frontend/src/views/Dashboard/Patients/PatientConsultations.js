import React, { useEffect, useState } from "react";
import {
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
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import moment from "moment";
import { useAppStore } from "stores";
import { useCallback } from "react";

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
  const history = useHistory();

  const getConsultations = useCallback(() => {
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
  });
  useEffect(() => {
    getConsultations();
  }, []);
  if (isLoading) {
    return <LinearProgress />;
  }
  if (consultations.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Typography>Aucun consultation pour ce patient</Typography>
      </Box>
    );
  }
  return (
    <List component={PerfectScrollbar} className={classes.root}>
      {consultations.map((c, index) => (
        <ListItem key={c.id} alignItems="center">
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
              </Box>
            }
            secondary={`Le ${moment(c.createdAt).format(
              "DD/MM/YYYY, h:mm:ss a"
            )}`}
          />
          <ListItemSecondaryAction>
            <IconButton>
              <DeleteIcon
                onClick={() => {
                  window.confirm("Supprimer ?") &&
                    api
                      .delete(`consultations/${c.id}`)
                      .then(({ data }) => {
                        enqueueSnackbar(data.message, {
                          variant: "success",
                        });
                        getConsultations();
                      })
                      .catch((err) => {
                        const message =
                          err?.response?.data?.message || "" + err;
                        enqueueSnackbar(message, {
                          variant: "error",
                        });
                      });
                }}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(`/patients/${id}/consultations/${c.id}/edit`)
              }
              style={{ marginLeft: ".5em" }}
              aria-label="edit"
            >
              <VisibilityIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PatientConsultations;
