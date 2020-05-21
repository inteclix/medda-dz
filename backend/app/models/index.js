const config = require("../config/db.config.js");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

/*
  loading models from files
 */

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[file.slice(0, -3)] = model;
  });
*/

db.analyse = require("./analyse")(sequelize, Sequelize);
db.appointment = require("./appointment")(sequelize, Sequelize);
db.clinic = require("./clinic")(sequelize, Sequelize);
db.consultation_health_parameter = require("./consultation_health_parameter")(sequelize, Sequelize);
db.consultation = require("./consultation")(sequelize, Sequelize);
db.doctor = require("./doctor")(sequelize, Sequelize);
db.health_parameter_category = require("./health_parameter_category")(sequelize, Sequelize);
db.health_parameter_option = require("./health_parameter_option")(sequelize, Sequelize);
db.health_parameter = require("./health_parameter")(sequelize, Sequelize);
db.medicament_prescription = require("./medicament_prescription")(sequelize, Sequelize);
db.medicament = require("./medicament")(sequelize, Sequelize);
db.patient = require("./patient")(sequelize, Sequelize);
db.prescription = require("./prescription")(sequelize, Sequelize);
db.secretary = require("./secretary")(sequelize, Sequelize);
db.speciality = require("./speciality")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
