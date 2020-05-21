module.exports = (sequelize, Sequelize) => {
  const consultation = sequelize.define("consultations", {
    motifs: {
      type: Sequelize.STRING,
    },
    historique: {
      type: Sequelize.STRING,
    },
    examenClinique: {
      type: Sequelize.STRING,
    },
    examenParaClinique: {
      type: Sequelize.STRING,
    },
    diagnostique: {
      type: Sequelize.STRING,
    },
    traitement: {
      type: Sequelize.STRING,
    },
    examentDemander: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.STRING,
    },
  });

  consultation.associate = (models) => {
    consultation.belongsTo(models.patient);
    consultation.belongsTo(models.doctor);
    consultation.belongsToMany(models.health_parameter, {
      through: "consultation_health_parameters",
    });
    consultation.belongsToMany(models.analyse, {
      through: "analyse_consultation",
    });
  };

  return consultation;
};
