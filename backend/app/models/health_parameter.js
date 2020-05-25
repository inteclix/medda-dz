module.exports = (sequelize, Sequelize) => {
  const health_parameter = sequelize.define("health_parameters", {
    label: {
      type: Sequelize.STRING,
      unique: 1,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  health_parameter.associate = (models) => {
    health_parameter.belongsToMany(models.consultation, {
      through: "consultation_health_parameters",
    });
    health_parameter.hasMany(models.health_parameter_option);
    health_parameter.belongsTo(models.health_parameter_category);
  };

  return health_parameter;
};
