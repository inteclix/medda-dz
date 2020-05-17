const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    const user = await db.user.findByPk(decoded.id)
      .catch(() => {
        return res.status(500).send("error no user in server");
      });
    req.user = user
    next()
  });
};