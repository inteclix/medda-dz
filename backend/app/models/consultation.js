module.exports = (sequelize, Sequelize) => {
  return sequelize.define("consultations", {
    motifs: {
      type: Sequelize.STRING
    },
    historique: {
      type: Sequelize.STRING
    },
    examenClinique: {
      type: Sequelize.STRING
    },
    examenParaClinique: {
      type: Sequelize.STRING
    },
    diagnostique: {
      type: Sequelize.STRING
    },
    traitement: {
      type: Sequelize.STRING
    },
    examentDemander: {
      type: Sequelize.STRING
    },
    note: {
      type: Sequelize.STRING
    },
  });
};
