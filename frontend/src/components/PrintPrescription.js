import React from "react";
import ReactToPrint from "react-to-print";

import moment from "moment";

const styles = {
  hide: { display: "none" },
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "148mm",
    height: "200mm",
    fontSize: "4mm",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "blue",
    fontWeight: "bold",
    backgroundColor: "white",
    //borderBottom: "1mm solid",
  },
  pageBody: {
    display: "flex",
    backgroundColor: "white",
    padding: "5mm",
    flexDirection: "column",
  },
  pageFooter: {
    borderTop: ".1mm solid",
    paddingTop: "1mm",
    fontSize: "3mm",
    textAlign: "center",
  },
  underLine: {
    borderBottom: ".1mm solid",
    marginBottom: "1mm",
  },
  underLineTextAlignRight: {
    borderBottom: ".1mm solid",
    marginBottom: "1mm",
    textAlign: "right",
  },
  underPageHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "blue",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  patient: {
    marginTop: "3mm",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  medicaments: {
    marginTop: "3mm",
    display: "flex",
    flexDirection: "column",
  },
  medicament: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1mm",
    border: "0.1mm dashed black",
    padding: "1mm",
  },
  nbMedicaments: {
    display: "flex",
    textDecoration: "underline",
  },
  signature: {
    marginTop: "5mm",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textDecoration: "underline",
  },
  prescription: {
    marginTop: "3mm",
    flexDirection: "column",
    display: "flex",
  },
};

export default class ComponentToPrint extends React.Component {
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.pageBody}>
          <div style={styles.pageHeader}>
            <div>
              <div>{this.props.doctor.fullName}</div>
              <div>{this.props.doctor.speciality.name}</div>
              {this.props.doctor?.univ && (
                <div style={styles.underLine}>
                  Depelome faculte de {this.props.doctor.univ}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div>
                {this.props.doctor.clinicName
                  ? "CLINIC: " + this.props.doctor.clinicName.toUpperCase()
                  : "CLINIC: " + this.props.doctor.fullName.toUpperCase()}
              </div>
              <div>{this.props.doctor.address}</div>
              <div style={styles.underLineTextAlignRight}>
                {this.props.doctor?.code_postal?.wilaya}
              </div>
            </div>
          </div>
          <div style={styles.underPageHeader}>
            <div>{""}</div>
            <div style={styles.underLineTextAlignRight}>
              <div>TEL1: {this.props.doctor.tel1}</div>
              <div>TEL2: {this.props.doctor.tel2}</div>
            </div>
          </div>
          <div style={styles.patient}>
            <div>
              <div>Patient: {`${this.props.patient.fullName}`}</div>
              <div style={styles.underLine}>
                {`${this.props.patient.age}`} ans
              </div>
            </div>
            <div>
              <div>{`${this.props.doctor?.code_postal?.wilaya} le:`} </div>
              <div style={styles.underLineTextAlignRight}>
                {moment(new Date()).format("DD/MM/YYYY")}
              </div>
            </div>
          </div>
          <div style={styles.medicaments}>
            {this.props.medicaments_prescription &&
              this.props.medicaments_prescription.map((m, index) => (
                <div key={index} style={styles.medicament}>
                  <div style={{ flex: 4 }}>
                    <div>
                      <u>{m.label} </u>
                    </div>
                    <div>{m.medicament_prescription.posologie}</div>
                  </div>
                  <div>
                    <strong>[{m.medicament_prescription.number_unit}]</strong>
                  </div>
                  <div style={{ flex: 2, textAlign: "right" }}>
                    <span>{m.medicament_prescription.mention}</span>
                  </div>
                </div>
              ))}
            <div style={styles.nbMedicaments}>
              Nombers des médicaments:{" "}
              {this.props.medicaments_prescription &&
                this.props.medicaments_prescription.length}
            </div>
          </div>
          <div style={styles.prescription}>
            {this.props.comment &&
              this.props.comment
                .split(",")
                .map((c, index) => <div key={index}>{c}</div>)}
          </div>
          <div style={styles.signature}>
            <div style={{ flex: 6 }} />
            <div style={{ flex: 1 }}>Signature</div>
          </div>
        </div>
        <div style={styles.pageFooter}>
          {" "}
          PAT0000222211 | https://medda-dz.com | {"PRE0000021211"}
        </div>
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => this.props.children}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint
            {...this.props}
            ref={(el) => (this.componentRef = el)}
          />
        </div>
      </div>
    );
  }
}

//export default Example;

/*
 <PrintPrescription
        doctor={{
          fullName:
            user.gender === "man"
              ? `Mr. ${user.firstname} ${user.lastname}`
              : `Mme. ${user.firstname} ${user.lastname}`,
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
            posologie: "1p pour chaque jours",
            mention: "QSP 8jours",
          },
        ]}
        comment="this is a comment"
      >
*/
