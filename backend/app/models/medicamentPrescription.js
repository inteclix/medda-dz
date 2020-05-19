module.exports = (sequelize, Sequelize) => {
  return sequelize.define("medicament_prescription", {
    posologie: {
      type: Sequelize.STRING,
    },
    number_unit: {
      type: Sequelize.INTEGER,
    },
    qsp: {
      type: Sequelize.STRING,
    }
  });
};
