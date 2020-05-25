module.exports = (sequelize, Sequelize) => {
  const health_parameter_option = sequelize.define(
    "health_parameter_options",
    {
      label: {
        type: Sequelize.STRING,
      },
    }
  );

  health_parameter_option.associate = (models) => {
    health_parameter_option.belongsTo(models.health_parameter);
  };

  return health_parameter_option
};
