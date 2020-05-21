module.exports = (sequelize, Sequelize) => {
  const health_parameter_option = sequelize.define(
    "health_parameter_options",
    {
      name: {
        type: Sequelize.STRING,
        unique: 1,
      },
    }
  );

  health_parameter_option.associate = (models) => {
    health_parameter_option.belongsTo(models.health_parameter);
  };

  return health_parameter_option
};
