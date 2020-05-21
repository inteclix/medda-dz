module.exports = (sequelize, Sequelize) => {
  const medicament = sequelize.define("medicaments", {
    name: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.INTEGER,
    },
  });

  medicament.associate = (models) => {
    medicament.belongsToMany(models.prescription, {
      through: "medicament_prescription",
    });
  };

  return medicament;
};
