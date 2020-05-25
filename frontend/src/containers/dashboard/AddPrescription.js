import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import MaterialTable from "components/MaterialTable";

import { useAppStore } from "stores";
import { renderField } from "components/FormFields";
import WidgetsIcon from "@material-ui/icons/Widgets";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import throttle from "lodash/throttle";

import PrintPrescription from "components/PrintPrescription";

class PMedicament {
  constructor(
    id = 0,
    name = "",
    code = "",
    description = "",
    posologie = "",
    number_unit = 1,
    qsp = 0
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.description = description;
    this.posologie = posologie;
    this.number_unit = number_unit;
    this.qsp = qsp;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      posologie: this.posologie,
      number_unit: this.number_unit,
      qsp: this.qsp,
    };
  }
}
class Prescription {
  constructor(description, comment, medicaments) {
    this.description = description;
    this.comment = comment;
    this.medicaments = medicaments;
  }
  addMedicament(medicament) {
    this.push(medicament);
  }
  deleteMedicament(medicament) {
    //this.medicaments
  }
}

export default function AddPrescription({ form, patient }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const { user} = useAppStore();
  const [pMedicaments, setPMedicaments] = React.useState([]);
  window.form = form;
  React.useEffect(() => {
    form.register("pMedicaments", []);
  });
  const [prescription, setPrescription] = React.useState(
    new Prescription("", "", pMedicaments)
  );
  React.useEffect(() => {
    console.log(prescription);
  }, [prescription]);

  React.useEffect(() => {
    console.log(pMedicaments);
    form.setValue("pMedicaments", pMedicaments);
  }, [pMedicaments]);

  const columns = [
    {
      title: "Medicament",
      field: "medicamentName",
      editComponent: (props) => {
        return (
          <SearchMedicament
            value={{ name: props.value }}
            onChange={(value) => props.onChange(value?.name)}
          />
        );
      },
      cellStyle: {
        width: "100%",
      },
    },
    {
      title: "Posologie",
      field: "posologie",
    },
    { title: "Nbr d'unité", field: "number_unit", type: "numeric" },
    { title: "QSP", field: "qsp" },
  ];
  const prescriptionRowForm = [
    {
      name: "description",
      placeholder: "Description",
      type: "text",
    },
    {
      name: "comment",
      placeholder: "Commentaire",
      type: "text",
    },
  ];
  return (
    
    <Box>
      {prescriptionRowForm.map((row, index) => renderField(row, form, index))}
      <PrintPrescription
      doctor={{
        fullName: user.gender === "man" ? `Mr. ${user.firstname} ${user.lastname}`: `Mme. ${user.firstname} ${user.lastname}`,
        speciality: user.doctor.speciality,
        univ: "",
        clinicName: user[user.is].clinic.name,
        address: user[user.is].clinic.address,
        wilaya: "Bordj bou arreridj",
        tel1: "021000101",
        tel2: "021000102",
      }}
        patient={{ fullName: "Mr Mohamed lahcen", age: 57, weight: 67 }}
        medicaments={[
          {
            name: "Dolipran",
            dosage: "1p pour chaque jours",
            mention: "QSP 8jours",
          },
        ]}
        comment="this is a comment"
      >
        <Button>Print</Button>
      </PrintPrescription>
      <MaterialTable
        padding={1}
        search={false}
        title="Ajouter des medicaments"
        columns={columns}
        data={pMedicaments}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              if (!Boolean(newData.medicamentName)) {
                return resolve();
              }
              const rowExist =
                pMedicaments.filter(
                  (row) => row.medicamentName === newData.medicamentName
                ).length !== 0;
              if (rowExist) {
                alert("deja exist");
                return resolve();
              }
              setPMedicaments([...pMedicaments, newData]);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              if (!Boolean(newData.medicamentName)) {
                return resolve();
              }
              const data = pMedicaments.map((row) => {
                if (row.medicamentName === oldData.medicamentName) {
                  return newData;
                }
                return row;
              });
              setPMedicaments(data);
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              const data = pMedicaments.filter(
                (row) => row.medicamentName !== oldData.medicamentName
              );
              setPMedicaments(data);
              resolve();
            }),
        }}
      />
    </Box>
  );
}

export const SearchMedicament = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { api } = useAppStore();
  const fetchThrottle = React.useMemo(
    () =>
      throttle(async (search, callback) => {
        const medicamentsData = await api.get(`medicaments?search=${search}`);
        callback(medicamentsData);
      }, 500),
    []
  );
  React.useEffect(() => {
    let active = true;
    if (inputValue === "") {
      setOptions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchThrottle(inputValue.toUpperCase(), (medicamentsData) => {
      if (active && medicamentsData) {
        setOptions(medicamentsData.data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => (option.name ? option.name : "")}
      includeInputInList
      options={options}
      loading={loading}
      onChange={(event, value) => {
        onChange(value);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Médicaments"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(option) => {
        const matches = match(option.name, inputValue.toUpperCase());
        const parts = parse(option.name, matches);

        return (
          <Grid container alignItems="center">
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              {option.dosage && (
                <Typography variant="body2" color="textSecondary">
                  <span style={{ fontWeight: 700 }}>DOSAGE: </span>
                  {option.dosage}
                </Typography>
              )}

              <Typography variant="body2" color="textSecondary">
                {option.formLabel && (
                  <>
                    <span style={{ fontWeight: 700 }}>Forme: </span>{" "}
                    {option.formLabel}
                  </>
                )}
                {option.formLabel && option.packing && " / "}
                {option.packing && (
                  <>
                    <span style={{ fontWeight: 700 }}>Emballage: </span>{" "}
                    {option.packing}
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
