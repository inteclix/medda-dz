module.exports = (sequelize, Sequelize) => {
  const secretary = sequelize.define("secretaries", {});

  secretary.associate = (models) => {
    secretary.belongsTo(models.user);
  };

  return secretary;
};
