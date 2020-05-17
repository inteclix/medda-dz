module.exports = (sequelize, Sequelize) => {
  return sequelize.define("appointments", {
    status: {
      type: Sequelize.INTEGER,
      defaultValue: "0" // [" 0 : pending", " -1: rejected", " 1: confirmed"]
    },
    appointmentDateStart: {
      type: Sequelize.DATE
    },
    appointmentDateEnd: {
      type: Sequelize.DATE
    }
  });
};
