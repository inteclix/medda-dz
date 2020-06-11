module.exports = (sequelize, Sequelize) => {
  const consultation_images = sequelize.define("consultation_images", {
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.BLOB("long"),
    },
  });

  consultation_images.associate = (models) => {
    consultation_images.belongsTo(models.consultation);
  };
  return consultation_images;
};
