import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Button, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useSnackbar} from 'notistack';

import AppContext from "../../contexts/app-context";

import mockData from '../../components/UserList/data';
import MaterialTable from "../../components/material-table";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const PatientsList = () => {
  const history = useHistory();
  const classes = useStyles();
  const {api} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState(null)
  const [users] = useState(mockData);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    api.get("/patients")
      .then(({data}) => {
        setAppointments(data)
        setIsLoading(false)
      })
      .catch((err) => {
        const message = err?.response?.data?.message || '' + err;
        enqueueSnackbar(message, {
          variant: 'error'
        });
        setIsLoading(false)
      })
  }, [])
  const columns = [
    {title: "First name", field: "user.firstname"},
    {title: "Last name", field: "user.lastname"},
    {title: "Mobile phone", field: "user.mobile"},
    {title: "Gender", field: "user.gender"}
  ]
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.row}>
          <span className={classes.spacer}/>
          <Button className={classes.importButton}>Import</Button>
          <Button className={classes.exportButton}>Export</Button>
          <Button
            onClick={() => history.push('/patients/add')}
            color="primary"
            variant="contained">
            Add user
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <MaterialTable
          title="Patient list"
          columns={columns}
          data={appointments}
          options={{
            search: true,
            rowStyle: rowData => ({
              backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
            }),
            actionsColumnIndex: -1
          }}
          onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow))}
          detailPanel={rowData => {
            return (
              <div style={{height: 200, backgroundColor: "red"}}>

              </div>
            )
          }}

          actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            },
            rowData => ({
              icon: AssignmentIcon,
              tooltip: 'Medical consultation',
              onClick: (event, rowData) => window.confirm("You want to delete " + rowData.name),
              disabled: rowData.birthYear < 2000
            })
          ]}
        />
      </div>
    </div>
  )
    ;
};

export default PatientsList;
