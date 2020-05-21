module.exports = (sequelize, Sequelize) => {
  const health_parameter_category = sequelize.define(
    "health_parameter_categories",
    {
      name: {
        type: Sequelize.STRING,
        unique: 1,
      },
    }
  );

  health_parameter_category.associate = (models) => {
    health_parameter_category.hasMany(models.health_parameter);
  };

  return health_parameter_category
};
