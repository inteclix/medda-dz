module.exports = (sequelize, Sequelize) => {
  return sequelize.define("medicaments", {
    name: {
      type: Sequelize.STRING,
    },
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
