module.exports = (sequelize, Sequelize) => {
  return sequelize.define("medicaments", {
    name: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.INTEGER,
    }
  });
};
