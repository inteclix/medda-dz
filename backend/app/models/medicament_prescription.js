module.exports = (sequelize, Sequelize) => {
  const medicament_prescription = sequelize.define("medicament_prescription", {
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

  medicament_prescription.associate = (models) => {}

  return medicament_prescription
};
