module.exports = (sequelize, Sequelize) => {
  const clinic = sequelize.define("clinics", {
    name: {
      type: Sequelize.STRING,
      unique: 1,
    },
    description: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    tel: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    wilaya: {
      type: Sequelize.STRING,
    },
    town: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.FLOAT,
    },
    lon: {
      type: Sequelize.FLOAT,
    },
  });
  
  clinic.associate = (models) => {
    clinic.hasMany(models.secretary);
    clinic.hasMany(models.doctor);
    clinic.hasMany(models.appointment);
    clinic.belongsToMany(models.patient, { through: "clinic_patient" });
  };
  return clinic;
};
