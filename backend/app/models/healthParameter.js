module.exports = (sequelize, Sequelize) => {
  return sequelize.define("health_parameters", {
    code: {
      type: Sequelize.STRING,
      unique: 1
    },
    label: {
      type: Sequelize.STRING,
      unique: 1
    },
    type: {
      type: Sequelize.INTEGER // 0: text, 1: number, 2: date, 3: boolean, 4: list
    },
  });
};
