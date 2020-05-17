const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getSecretaries = (req, res) => {
  // Fetch User from Database
  if (req.user.is === "doctor") {
    db.doctor
      .findOne({
        where: { userId: req.userId, isAdmin: 1 },
        include: {
          model: db.clinic,
          include: [db.secretary],
        },
      })
      .then((doctor) => {
        return res.status(200).send(doctor.clinic.secretaries);
      })
      .catch(() => {
        return res.status(401).send("error");
      });
  }
};