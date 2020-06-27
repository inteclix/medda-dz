import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import ReplayIcon from "@material-ui/icons/Replay";
import { useAppStore } from "stores";

import MaterialTable from "components/MaterialTable";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Container from "components/layout/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    //padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

export default () => {
  const history = useHistory();
  const classes = useStyles();
  const { api } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getAccounts = () => {
    setIsLoading(true);
    api
      .get("/accounts")
      .then(({ data }) => {
        setAccounts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "" + err;
        enqueueSnackbar(message, {
          variant: "error",
        });
        setIsLoading(false);
      });
  };
  useEffect(getAccounts, []);
  const columns = [
    { title: "Nom", field: "user.firstname" },
    { title: "Prénom", field: "user.lastname" },
    { title: "Tel mobile", field: "user.mobile" },
    {
      title: "Sexe",
      field: "user.gender",
      lookup: { man: "Home", woman: "Female" },
    },
  ];
  return (
    <Container title="Sous comptes">
      <div>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Tooltip title="Actualisé">
            <IconButton onClick={getAccounts} className={classes.exportButton}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Button
            onClick={() => history.push("/accounts/add")}
            color="primary"
            variant="contained"
          >
            Ajouter
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <MaterialTable
          title="Liste des utilisateurs"
          isLoading={isLoading}
          columns={columns}
          data={accounts}
          options={{
            search: true,
          }}
          onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow)}
          actions={[
            {
              icon: VisibilityIcon,
              tooltip: "Modifier",
              onClick: (event, rowData) =>
                history.push(`/accounts/edit/${rowData.id}`),
            },
          ]}
        />
      </div>
    </Container>
  );
};
