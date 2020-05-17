module.exports = (sequelize, Sequelize) => {
  return sequelize.define("health_parameter_categories", {
    name: {
      type: Sequelize.STRING,
      unique: 1
    },
  });
};
