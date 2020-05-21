module.exports = (sequelize, Sequelize) => {
  const patient = sequelize.define("patients", {});

  patient.associate = (models) => {
    patient.belongsTo(models.user);
    patient.belongsTo(models.user, {
      as: "createdBy",
      foreignKey: "createdById",
    });
    patient.belongsTo(models.doctor, {
      as: "addressedBy",
      foreignKey: "addressedById",
    });
    patient.hasMany(models.appointment);
    patient.hasMany(models.consultation);
    patient.belongsToMany(models.clinic, { through: "clinic_patient" });
  };
  return patient
};
