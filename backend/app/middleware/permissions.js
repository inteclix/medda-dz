const db = require("../models");

exports.isDoctor = async (req, res, next) => {
  if (req.user.is !== "doctor") {
    return res.status(401).send({
      message: "Un autorization",
    });
  }
  const doctor = await db.doctor.findOne({ where: { userId: req.userId } })
  if (!doctor) {
    return res.status(401).send({message: "Un autorization"});
  }
  req.doctor = doctor;
  next();
  return;
};

exports.isAdminDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(401).send({
      message: "Un autorization",
    });
  }
  db.doctor
    .findOne({
      where: { userId: req.userId, isAdmin: true },
    })
    .then((doctor) => {
      req.doctor = doctor;
      next();
    })
    .catch(() => {
      return res.status(401).send({
        message: "Un autorization",
      });
    });
};
