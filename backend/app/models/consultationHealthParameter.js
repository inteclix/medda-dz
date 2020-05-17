module.exports = (sequelize, Sequelize) => {
  return sequelize.define("consultation_health_parameters", {
    value: {
      type: Sequelize.STRING,
    }
  });
};
