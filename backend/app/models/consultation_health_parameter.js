module.exports = (sequelize, Sequelize) => {
  const consultation_health_parameter = sequelize.define(
    "consultation_health_parameters",
    {
      value: {
        type: Sequelize.STRING,
      },
    }
  );

  return consultation_health_parameter;
};
