module.exports = (sequelize, Sequelize) => {
  const medicament = sequelize.define("medicaments", {
    label: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    codeChifa: {
      type: Sequelize.STRING,
    },
    dosage: {
      type: Sequelize.STRING,
    },
    packing: {
      type: Sequelize.STRING,
    },
    isPrinceps: {
      type: Sequelize.STRING,
    },
    isPsychotropic: {
      type: Sequelize.STRING,
    },
    formLabel: {
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
