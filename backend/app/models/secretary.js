module.exports = (sequelize, Sequelize) => {
  const secretary = sequelize.define("secretaries", {});

  secretary.associate = (models) => {
    secretary.belongsTo(models.user);
    secretary.belongsTo(models.clinic);

  };

  return secretary;
};
