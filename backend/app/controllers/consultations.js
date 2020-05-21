const db = require("../models");

exports.getAll = async (req, res) => {
  const consultations = await db.consultation.findAll();
  if (!consultations) {
    return res.status(404).send({ message: "no consoltaions" });
  }
  return res.status(200).send(consultations);
};

exports.getConsultationById = async (req, res) => {
  const id = req.params.id;
  const consultation = await db.consultation.findByPk(id, {
    include: [
      {
        model: db.health_parameter,
        include: [
          {
            model: db.health_parameter_option,
            attributes: ["name"],
          },
          {
            model: db.health_parameter_category,
            attributes: ["name"],
          },
        ],
      },
      {
        model: db.patient,
        include: db.user,
      },
    ],
  });
  if (!consultation) {
    return res.status(404).send({ message: "Not found" });
  }
  return res.status(200).send(consultation);
};

exports.create = async (req, res) => {
  const consultation = await db.consultation.create(
    { ...req.body, doctorId: req.doctor.id },
    {
      //attributes: [""],  TODO: white list for consultations
    }
  );
  if (!consultation) {
    return res.status(404).send({ message: "not found" });
  }
  const healthParameters = req.body.healthParameters.map((p) => {
    return { ...p, consultationId: consultation.id };
  });
  const consultationHealthPrameters = await db.consultation_health_parameter.bulkCreate(
    healthParameters
  );

  if (!consultationHealthPrameters) {
    return res.status(404).send({ message: "Not found" });
  }
  return res.status(200).send(consultation);
};

exports.updateById = async (req, res) => {
  const id = req.params.id;
  const consultation = await db.consultation.findByPk(id, {
    include: db.health_parameter
  });
  if (!consultation) {
    return res.status(404).send({ message: "Not found" });
  }
  const updatedConsultation = await consultation.update(req.body, {
    // attributtes: ["value", "test"],
   });
   if(!updatedConsultation){
     return res.status(404).send({ message: "Error when update" });
   }
  const oldParametres = await consultation.setHealth_parameters([])
  console.dir(oldParametres)

  const healthParameters = req.body.healthParameters.map((p) => {
    return { ...p, consultationId: consultation.id };
  });
  const consultationHealthPrameters = await db.consultation_health_parameter.bulkCreate(
    healthParameters
  );

  if (!consultationHealthPrameters) {
    return res.status(404).send({ message: "error when add paramaters" });
  }
  return res.status(200).send(consultation);
};
