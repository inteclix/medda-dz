const db = require("../models");

exports.isDoctor = async (req, res, next) => {
  if (req.user.is !== "doctor") {
    return res.status(401).send({
      message: "Un autorization",
    });
  }
  const doctor = await db.doctor.findOne({ where: { userId: req.userId } });
  if (!doctor) {
    return res.status(401).send({ message: "Un autorization" });
  }
  req.doctor = doctor;
  next();
  return;
};

exports.isAdminDoctor = async (req, res, next) => {
  if (req.user.is !== "doctor") {
    return res.status(401).send({
      message: "Un autorization",
    });
  }
    
  try {
    const doctor = await db.doctor
    .findOne({
      where: { userId: req.user.id, isAdmin: true },
    })
    if(!doctor){
      return res.status(401).send({message: "Not autorized"})
    }
    req.doctor = doctor;
    next();
  } catch (error) {
    console.log(error, null, 2)
    return res.status(404).send({
      message: "Some thing got error",
    });
  }
  


};
