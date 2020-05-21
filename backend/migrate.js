const db = require("./app/models")

db.sequelize.sync({ force: true })
