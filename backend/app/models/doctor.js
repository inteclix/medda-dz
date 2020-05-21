module.exports = (sequelize, Sequelize) => {
  const doctor = sequelize.define("doctors", {
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
  });

  doctor.associate = (models) => {
    doctor.belongsTo(models.user);
    doctor.belongsTo(models.speciality);
    doctor.belongsTo(models.clinic);
    doctor.hasMany(models.appointment);
  };

  return doctor
};
