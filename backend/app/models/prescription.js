module.exports = (sequelize, Sequelize) => {
  return sequelize.define("prescriptions", {
    description: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.STRING,
    }
  });
};
