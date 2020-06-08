const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");

const pg = new Sequelize("postgres://postgres:@localhost:5432/BU01_F01");
const mysql = new Sequelize(
  "mysql://root:inteclix0540055010@localhost:3306/medda"
);

const pgSpeciality = pg.define("Specialities", {
  Label: {
    type: Sequelize.STRING,
  },
});

const mysqlSpeciality = mysql.define("specialities", {
  label: {
    type: Sequelize.STRING,
  },
});

const run = async () => {
  const specialities = await pgSpeciality.findAll({
    attributes: [
      "Label",
    ],
  });
  const data = specialities.map((row) => ({
    label: row.Label,
  }));
  console.log(data, null, 2)
  await mysqlSpeciality.bulkCreate(data);
};

run();
