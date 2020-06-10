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
          },
          {
            model: db.health_parameter_category,
            attributes: ["label"],
          },
        ],
      },
      {
        model: db.prescription,
        include: db.medicament,
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
  // create consultation
  const consultation = await db.consultation.create(
    { ...req.body, doctorId: req.doctor.id },
    {
      //attributes: [""],  TODO: white list for consultation
    }
  );
  if (!consultation) {
    return res.status(404).send({ message: "not create consultation" });
  }

  // create healthParameter
  const healthParameters = req.body.healthParameters.map((p) => {
    return { ...p, consultationId: consultation.id };
  });
  const consultationHealthPrameters = await db.consultation_health_parameter.bulkCreate(
    healthParameters
  );
  if (!consultationHealthPrameters) {
    return res.status(404).send({ message: "Not create healthParameters" });
  }

  // create prescription
  const prescription = await db.prescription.create({
    comment: req.body.comment,
    consultationId: consultation.id,
  });
  if (!prescription) {
    return res.status(404).send({ message: "Not create prescription" });
  }

  // create medicaments
  const medicaments_prescription = req.body.medicaments_prescription.map(
    (m) => {
      return { ...m.medicament_prescription, prescriptionId: prescription.id };
    }
  );
  const ms_prescription = await db.medicament_prescription.bulkCreate(
    medicaments_prescription
  );
  if (!ms_prescription) {
    return res.status(404).send({ message: "Not create Medicaments" });
  }

  return res.status(200).send(consultation);
};

exports.updateById = async (req, res) => {
  const id = req.params.id;
  const consultation = await db.consultation.findByPk(id, {
    include: [
      db.health_parameter,
      {
        model: db.prescription,
        include: db.medicament,
      },
    ],
  });
  if (!consultation) {
    return res.status(404).send({ message: "Not found" });
  }
  await consultation.update(req.body, {
    // attributtes: ["value", "test"],
  });
  if (!consultation) {
    return res.status(404).send({ message: "Error when update" });
  }

  await consultation.setHealth_parameters([]);

  const healthParameters = req.body.healthParameters.map((p) => {
    return { ...p, consultationId: consultation.id };
  });
  const consultationHealthPrameters = await db.consultation_health_parameter.bulkCreate(
    healthParameters
  );
  if (!consultationHealthPrameters) {
    return res.status(404).send({ message: "error when add paramaters" });
  }

  // update prescription
  const prescription = await consultation.prescription.update({
    comment: req.body.comment,
  });
  if (!prescription) {
    return res.status(404).send({ message: "not updated prescription" });
  }

  const medicaments_prescription = req.body.medicaments_prescription.map(
    (m) => {
      return { ...m.medicament_prescription, prescriptionId: prescription.id };
    }
  );
  await db.medicament_prescription.destroy({
    where: { prescriptionId: prescription.id },
  });
  const medicamentPrescription = db.medicament_prescription.bulkCreate(
    medicaments_prescription
  );
  if (!medicamentPrescription) {
    return res
      .status(404)
      .send({ message: "not updated medicament_prescription" });
  }

  return res.status(200).send({ message: "consultation updated" });
};

exports.uploadImages = async (req, res) => {
  
}

exports.deleteById = async (req, res) => {
  const consultation = await db.consultation.findByPk(req.params.id);
  if (!consultation) {
    return res.status(404).send({ message: "Not found" });
  }
  await consultation
    .destroy()
    .then(() => {
      return res.status(203).send({ message: "consultation removed" });
    })
    .catch(() => {
      return res.status(500).send({ message: "error when removed" });
    });
};
