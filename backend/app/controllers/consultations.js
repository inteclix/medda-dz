const db = require("../models");

exports.getAll = async (req, res) => {
  const consultations = await db.consultation.findAll()
  if(!consultations){
      return res.status(404).send({message: "no consoltaions"})
  }
  return res.status(200).send(consultations);
};

exports.create = async (req, res) => {
  const consultation = await db.consultation.create({ ...req.body, doctorId: req.doctor.id }, {
    //attributes: [""],  TODO: white list for consultations
  });
  if (!consultation) {
    return res.status(404).send({ message: "not found" })
  }
  const healthParameters = req.body.healthParameters.map((p) => {
    return { ...p, consultationId: consultation.id }
  })
  const consultationHealthPrameters = await db.consultationHealthParameter.bulkCreate(healthParameters)

  if (!consultationHealthPrameters) {
    return res.status(404).send({ message: "Not found" })
  }
  return res.status(200).send(consultation);
}

exports.update = async (req, res) => {
  const id = req.params.id
  const consultation = await db.consultation.findByPk(id)
  if (!consultation) {
    return res.status(404).send({ message: "Not found" })
  }
  consultation.update(req.body, {
    attributtes: ["value", "test"]
  })
  return res.status(200).send(consultation)
}
