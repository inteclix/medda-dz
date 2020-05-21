const db = require("../models");
const config = require("../config/auth.config");
const helpers = require("../helpers");

var bcrypt = require("bcryptjs");

exports.getById = async (req, res) => {
  const patient = await db.patient.findByPk(req.params.id, {
    include: db.user
  })
  if (!patient) {
    return res.status(404).send({message: "not found"})
  }
  return res.status(200).send(patient)
}

exports.updateById = async (req, res) => {
  const patient = await db.patient.findByPk(req.params.id)
  if (!patient) {
    return res.status(404).send({message: "not found"})
  }
  const user = await db.user.findByPk(patient.userId)
  if (!user) {
    return res.status(404).send({message: "not found"})
  }
  const updated = await user.update(req.body)
  if (!updated) {
    return res.status(404).send({message: "not updated"})
  }
  return res.status(200).send(updated)
}

exports.getAll = async (req, res) => {
  if (req.user.is === "doctor" || req.user.is === "secretary") {
    const doctorOrSecretary = await db[req.user.is].findOne({where: {userId: req.user.id}})
    if (!doctorOrSecretary) {
      return res.status(404).send({message: "not found"})
    }
    const clinic = await db.clinic.findByPk(doctorOrSecretary.clinicId, {
      include: {
        model: db.patient,
        include: [
          {
            model: db.user,
            attributes: {
              exclude: ['password']
            },
          }
        ],
      },
      order: [[db.patient, db.user, 'updatedAt', 'DESC']],
    })
    if (!clinic) {
      return res.status(404).send({message: "not found"})
    }
    //const patients = clinic.getPatients()
    return res.status(200).send(clinic.patients)
  } else {
    return res.status(401).send({message: "Unautorized!"})
  }
};

exports.create = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.mobile) {
    return res.status(404).send({message: "first name and lastname and phone are required"})
  }
  if (req.user.is === "doctor" || req.user.is === "secretary") {
    const u = await db[req.user.is].findOne({where: {userId: req.user.id}})
    if (!u) {
      return res.status(404).send({message: "no u found!"})
    }
    const clinic = await db.clinic.findByPk(u.clinicId)
    if (!clinic) {
      return res.status(404).send({message: "no clinic found!"})
    }
    userCount = await db.user.count();
    const password = helpers.getRandomText()
    const username = `${password}u${userCount}s${helpers.getRandomText(2)}`
    const user = await db.user.create({
      username: username,
      password: bcrypt.hashSync(password, 8),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mobile: req.body.mobile,
      tel: req.body.tel,
      email: req.body.email,
      gender: req.body.gender,
      dateBirth: req.body.dateBirth,
      placeBirth: req.body.placeBirth,
      civilState: req.body.civilState,
      is: "patient"
    })
    if (!user) {
      return res.status(404).send({message: "user not created!"})
    }
    const patient = await db.patient.create({
      userId: user.id,
      createdById: req.user.id
    })
    await clinic.addPatients(patient)
    return res.status(201).send({patient, user: {username, password}})
  } else {
    return res.status(401).send({message: "Unautorized!"})
  }
}

exports.getConsultations = async (req, res) => {
  const id = req.params.id
  const patient = await db.patient.findByPk(id, {
    include:[
      {
        model: db.consultation,
        include: db.health_parameter
      }
    ]
  })
  if (!patient) {
    return res.status(404).send({ message: "Not found" })
  }
  return res.status(200).send(patient)
}







