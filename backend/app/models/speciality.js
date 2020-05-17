module.exports = (sequelize, Sequelize) => {
  return sequelize.define("specialities", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    dateOfSpeciality: {
      type: Sequelize.DATE
    },
    icon: {
      type: Sequelize.STRING
    },
    img1: {
      type: Sequelize.STRING
    },
    img2: {
      type: Sequelize.STRING
    },
  });
};
