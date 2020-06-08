module.exports = (sequelize, Sequelize) => {
  const speciality = sequelize.define("specialities", {
    label: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    dateOfSpeciality: {
      type: Sequelize.DATE,
    },
    icon: {
      type: Sequelize.STRING,
    },
    img1: {
      type: Sequelize.STRING,
    },
    img2: {
      type: Sequelize.STRING,
    },
  });

  speciality.associate = (models) => {
    speciality.hasMany(models.doctor);
  };

  return speciality
};
