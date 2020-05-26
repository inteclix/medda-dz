module.exports = (sequelize, Sequelize) => {
  const prescription = sequelize.define("prescriptions", {
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
