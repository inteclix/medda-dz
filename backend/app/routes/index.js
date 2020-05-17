const Router = require("express").Router
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const middleware = require("../middleware");
module.exports = (app) => {
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const router = Router();
      let controller
      try {
        controller = require(path.join(__dirname, "../controllers", file));
      } catch (e) {
        console.error(e)
        console.info("create your controller in /controllers folder " + file)
      }
      const route = require(path.join(__dirname, file))(router, controller, middleware);
      app.use(`/api/${file.slice(0, -3)}`, route)
    });
}
