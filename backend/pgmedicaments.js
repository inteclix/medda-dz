const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");

const pg = new Sequelize("postgres://postgres:@localhost:5432/BU01_F01");
const mysql = new Sequelize(
  "mysql://root:inteclix0540055010@localhost:3306/medda"
);

const pgDrug = pg.define("Drug", {
  Label: {
    type: Sequelize.STRING,
  },
  ChiffaCode: {
    type: Sequelize.STRING,
  },
  Dosage: {
    type: Sequelize.STRING,
  },
  Packing: {
    type: Sequelize.STRING,
  },
  isPrinceps: {
    type: Sequelize.BOOLEAN,
  },
  isPsychotropic: {
    type: Sequelize.BOOLEAN,
  },
});

pgDrugForm = pg.define("DrugForm", {
  Label: {
    type: Sequelize.STRING,
  },
});

pgDrug.belongsTo(pgDrugForm);

const mysqlMedicament = mysql.define("medicaments", {
  label: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.STRING,
  },
  codeChifa: {
    type: Sequelize.STRING,
  },
  dosage: {
    type: Sequelize.STRING,
  },
  packing: {
    type: Sequelize.STRING,
  },
  isPrinceps: {
    type: Sequelize.STRING,
  },
  isPsychotropic: {
    type: Sequelize.STRING,
  },
  formLabel: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.INTEGER,
  },
});

const run = async () => {
  const drugs = await pgDrug.findAll({
    attributes: [
      "Label",
      "ChiffaCode",
      "Dosage",
      "Packing",
      "IsPrinceps",
      "IsPsychotropic",
    ],
    include: [
      {
        model: pgDrugForm,
        attributes: ["Label"],
      },
    ],
  });
  const data = drugs.map((drug) => ({
    label: drug.Label,
    codeChifa: drug.ChiffaCode,
    formLabel: drug.DrugForm ? drug.DrugForm.Label : "",
    dosage: drug.Dosage,
    packing: drug.Packing,
    isPrinceps: drug.IsPrinceps,
    isPsychotropic: drug.IsPsychotropic,
  }));
  const medicaments = await mysqlMedicament.bulkCreate(data);
  console.log(medicaments);
  //await mysqlMedicament.destroy({where:{}})
};

run();
