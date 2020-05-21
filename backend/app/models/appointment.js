module.exports = (sequelize, Sequelize) => {
  const appointment = sequelize.define("appointments", {
    status: {
      type: Sequelize.INTEGER,
      defaultValue: "0", // [" 0 : pending", " -1: rejected", " 1: confirmed"]
    },
    appointmentDateStart: {
      type: Sequelize.DATE,
    },
    appointmentDateEnd: {
      type: Sequelize.DATE,
    },
  });

  appointment.associate = (models) => {
    appointment.belongsTo(models.patient);
    appointment.belongsTo(models.clinic);
    appointment.belongsTo(models.doctor);
    appointment.belongsTo(models.user, {
      as: "createdBy",
      foreignKey: "createdById",
    });
    appointment.belongsTo(models.user, {
      as: "editedBy",
      foreignKey: "editedById",
    });
  };

  return appointment;
};
