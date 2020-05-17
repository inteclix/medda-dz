module.exports = (sequelize, Sequelize) => {
  return sequelize.define("analyses", {
    name: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.INTEGER
    },
    result: {
      type: Sequelize.STRING
    },
    unit: {
      type: Sequelize.STRING // mm, mg, g/l ...
    },
    interval: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER // 0: pending, 1: finish, 2: seen
    }
  })
}