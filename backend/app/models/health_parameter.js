module.exports = (sequelize, Sequelize) => {
  const health_parameter = sequelize.define("health_parameters", {
    code: {
      type: Sequelize.STRING,
      unique: 1,
    },
    label: {
      type: Sequelize.STRING,
      unique: 1,
    },
    type: {
      type: Sequelize.INTEGER, // 0: text, 1: number, 2: date, 3: boolean, 4: list
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
