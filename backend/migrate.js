const db = require("./app/models");

const seed = async () => {
  await db.sequelize.sync({ force: true });
};
seed();
