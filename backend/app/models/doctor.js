module.exports = (sequelize, Sequelize) => {
  return sequelize.define("doctors", {
    isAdmin: {
      type: Sequelize.BOOLEAN
    }
  });
};
