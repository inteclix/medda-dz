module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: 1,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: 1,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    civilState: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    dateBirth: {
      type: Sequelize.DATE,
    },
    placeBirth: {
      type: Sequelize.STRING,
    },
    tel: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
      unique: 1,
    },
    mobileIsVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
    is: {
      type: Sequelize.STRING,
      defaultValue: "user",
    },
  });

  user.associate = (models) => {
    user.belongsTo(models.code_postal);
    user.hasOne(models.doctor);
    user.hasOne(models.secretary);
    user.hasOne(models.patient);
  };
  return user;
};
