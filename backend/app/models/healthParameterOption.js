module.exports = (sequelize, Sequelize) => {
  return sequelize.define("health_parameter_options", {
    name: {
      type: Sequelize.STRING,
      unique: 1
    }
  });
};
