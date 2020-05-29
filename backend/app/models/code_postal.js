module.exports = (sequelize, Sequelize) => {
  const analyse = sequelize.define("code_postal", {
    codePostal: {
      type: Sequelize.STRING
    },
    label: {
      type: Sequelize.STRING
    },
    wilaya: {
      type: Sequelize.STRING
    },
  })

  analyse.associate = (models) => {

  }

  return analyse
}