module.exports = (sequelize, Sequelize) => {
  const prescription = sequelize.define("prescriptions", {
    description: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.STRING,
    },
  });

  prescription.associate = (models) => {
    prescription.belongsTo(models.consultation);
    prescription.belongsToMany(models.medicament, {
      through: "medicament_prescription",
    });
  };

  return prescription;
};
