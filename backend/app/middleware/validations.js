const { Op } = require("sequelize");
const db = require("../models");

exports.checkDuplicateUser = async (req, res, next) => {
  if (!req.body.username || !req.body.mobile) {
    res.status(400).send({
      message: "username or mobile is not in request!",
    });
  }

  const user = await db.user.findOne({
    attributes: ["id"],
    where: {
      [Op.or]: [{ username: req.body.username }, { mobile: req.body.mobile }],
    },
  });
  if (user) {
    return res.status(400).send({
      message: "Failed! Username or mobile is already in use!",
    });
  } else {
    next();
  }
};

exports.checkDuplicateClinic = async (req, res, next) => {
  if (!req.body.clinicName) {
    return res.status(400).send({
      message: "clinic name is not in request!",
    });
  }
  // clinic Name
  const clinic = await db.clinic.findOne({
    attributes: ["id"],
    where: {
      name: req.body.clinicName,
    },
  });
  if (clinic) {
    return res.status(400).send({
      message: "Failed! clinic name is already in use!",
    });
  } else {
    next();
  }
};

exports.checkRole = (req, res, next) => {
  if (!req.body.role) {
    return res.status(400).send({
      message: "role is not in request!",
    });
  }
  if (!db.ROLES.includes(req.body.role)) {
    return res.status(400).send({
      message: "Failed! Role does not exist",
    });
  } else {
    next();
  }
};
