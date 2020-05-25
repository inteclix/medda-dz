const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");

const pg = new Sequelize("postgres://postgres:@localhost:5432/BU01_F01");
const mysql = new Sequelize(
  "mysql://root:inteclix0540055010@localhost:3306/medda"
);


const pg_health_parameter = pg.define("HealthParameters", {
  OID: {
    type: Sequelize.INTEGER,
  },
  Code: {
    type: Sequelize.STRING,
    unique: 1,
  },
  Label: {
    type: Sequelize.STRING,
    unique: 1,
  },
  Type: {
    type: Sequelize.INTEGER,
  },
  Category: {
    type: Sequelize.INTEGER,
  },
});

const pg_health_parameter_category = pg.define(
  "HealthParameterCategory",
  {
    OID: {
      type: Sequelize.INTEGER,
    },
    Label: {
      type: Sequelize.STRING,
      unique: 1,
    },
  }
);

const pg_health_parameter_option = pg.define(
  "HealthParameterOptions",
  {
    OID: {
      type: Sequelize.INTEGER,
    },
    Label: {
      type: Sequelize.STRING,
      unique: 1,
    },
    Parameter: {
      type: Sequelize.INTEGER
    }
  }
);

const mysql_health_parameter = mysql.define("health_parameters", {
  label: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  healthParameterCategoryId: {
    type: Sequelize.INTEGER,
  },
});

const mysql_health_parameter_category = mysql.define(
  "health_parameter_categories",
  {
    label: {
      type: Sequelize.STRING,
      unique: 1,
    },
  }
);

const mysql_health_parameter_option = mysql.define(
  "health_parameter_options",
  {
    label: {
      type: Sequelize.STRING,
    },
    healthParameterId: {
      type: Sequelize.INTEGER
    }
  }
);

const getAllDrug = async () => {
  const pg_hps = await pg_health_parameter.findAll({
    attributes: [
      "OID",
      "Code",
      "Label",
      "Type",
      "Category"
    ],
  });

  const pg_hpcs = await pg_health_parameter_category.findAll({
    attributes: [
      "OID",
      "Code",
      "Label",
    ],
  });

  const pg_hpos = await pg_health_parameter_option.findAll({
    attributes: [
      "OID",
      "Parameter",
      "Label",
    ],
  });

  const mysql_hpcs = pg_hpcs.map((row) => ({
    id: row.OID,
    code: row.Code,
    label: row.Label,
  }));
  await mysql_health_parameter_category.bulkCreate(mysql_hpcs)

  const mysql_hps = pg_hps.map((row) => ({
    id: row.OID,
    label: row.Label,
    type: getType(row.Type),
    healthParameterCategoryId: row.Category,
  }));
  await mysql_health_parameter.bulkCreate(mysql_hps)

  const mysql_hpos = pg_hpos.map((row) => ({
    id: row.OID,
    label: row.Label,
    healthParameterId: row.Parameter,
  }));
  await mysql_health_parameter_option.bulkCreate(mysql_hpos)
  console.log(JSON.stringify(mysql_hpos, null, 2));
};


const getType = (t) => {
  if (t === 0) {
    return "text";
  }
  if (t === 1) {
    return "number";
  }
  if (t === 2) {
    return "date";
  }
  if (t === 3) {
    return "boolean";
  }
  if (t === 4) {
    return "list";
  }
};
getAllDrug();
