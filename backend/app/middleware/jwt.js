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
    try {
      const user = await db.user.findByPk(decoded.id, {
        include: [
          {
            model: db.doctor,
            include: [
              {
                model: db.clinic,
                include: db.code_postal,
              },
              db.speciality,
            ],
          },
          {
            model: db.secretary,
            include: db.clinic,
          },
          {
            model: db.patient,
          },
          {
            model: db.code_postal,
          },
        ],
      });
      req.user = user;
      return next();
    } catch (err) {
      return res.status(404).send({ message: "error on server" });
    }
  });
};
