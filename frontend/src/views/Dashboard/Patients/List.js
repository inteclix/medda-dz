import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Typography, IconButton, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import ReplayIcon from "@material-ui/icons/Replay";
import { useAppStore } from "stores";

import MaterialTable from "components/MaterialTable";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VisibilityIcon from '@material-ui/icons/Visibility';

import PatientConsultations from "./PatientConsultations"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
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

const List = () => {
  const history = useHistory();
  const classes = useStyles();
  const { api } = useAppStore();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getPatients = () => {
    setIsLoading(true);
    api
      .get("/patients")
      .then(({ data }) => {
        setAppointments(data);
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
  useEffect(getPatients, []);
  const columns = [
    { title: "First name", field: "user.firstname" },
    { title: "Last name", field: "user.lastname" },
    { title: "Mobile phone", field: "user.mobile" },
    { title: "Gender", field: "user.gender" },
  ];
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Tooltip title="Actualisé">
            <IconButton onClick={getPatients} className={classes.exportButton}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Button
            onClick={() => history.push("/patients/add")}
            color="primary"
            variant="contained"
          >
            Ajouter
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <MaterialTable
          title="Patient list"
          isLoading={isLoading}
          columns={columns}
          data={appointments}
          options={{
            search: true,
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow && selectedRow.tableData.id === rowData.tableData.id
                  ? "#EEE"
                  : "#FFF",
            }),
            actionsColumnIndex: -1,
          }}
          onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow)}
          detailPanel={(rowData) => {
            return <PatientConsultations id={rowData.tableData.id}/>
          }}
          actions={[
            {
              icon: VisibilityIcon,
              tooltip: "Modifier",
              onClick: (event, rowData) =>
                history.push(`/patients/edit/${rowData.id}`),
            },
            (rowData) => ({
              icon: AssignmentIcon,
              tooltip: "Medical consultation",
              onClick: (event, rowData) =>
                history.push(`/consultations/add/${rowData.id}`),
              //disabled: rowData.birthYear < 2000
            }),
          ]}
        />
      </div>
    </div>
  );
};

export default List;
