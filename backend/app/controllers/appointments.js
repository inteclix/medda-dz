const db = require("../models");
const config = require("../config/auth.config");
const helpers = require("../helpers");

var bcrypt = require("bcryptjs");

exports.getAll = (req, res) => {
    if (req.user.is === "doctor") {
        db.doctor.findOne({
            where: { userId: req.user.id }
        })
            .then((doctor) => {
                db.appointment.findAll({
                    where: { doctorId: doctor.id },
                    include: {
                        model: db.patient,
                        include: db.user
                    }
                }
                )
                    .then((appointments) => {
                        return res.status(200).send(appointments)
                    })
            })
            .catch(() => {
                return res.status(401).send("error");
            });
    }
};

const getRandomUsername = async () => {
  userCount = await db.user.count();
  const text = helpers.getRandomText(3)
  const username = `${userCount}u${text}`
  const user = await db.user.findOne({ where: { username } }).catch(() => {
  })
  if (user) {
    getRandomUsername()
  }
  return username
}

exports.createWithAppointment = async (req, res) => {
  const { firstname, lastname, mobile, dateBirth, gender } = req.body
  const username = await getRandomUsername()
  const password = helpers.getRandomText()
  const user = await db.user.create({
    username,
    password: bcrypt.hashSync(password, 8),
    firstname,
    lastname,
    mobile,
    dateBirth,
    gender,
    is: "patient"
  }).catch((err) => {
    return res.status(403).send({ message: "" + err })
  })
  if (user.id) {
    const patient = await db.patient.create({
      userId: user.id,
      createdById: req.user.id
    }).catch((err) => {
      return res.status(403).send({ message: "" + err })
    })
    if (req.user.is === "doctor") {
      const doctor = await db.doctor.findOne({ where: { userId: req.user.id } }).catch(() => {
      })
      const appointment = await db.appointment.create({
        clinicId: doctor.clinicId,
        doctorId: doctor.id,
        patientId: patient.id,
        createdById: req.user.id,
      })
      return res.status(201).send(appointment)
    }
  } else {
    return res.status(403).send({ message: "403" })
  }

  return res.status(403).send({ message: "403" })
}
