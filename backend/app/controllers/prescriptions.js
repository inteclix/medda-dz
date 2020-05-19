const db = require("../models");

exports.getAll = async (req, res) => {
  const prescriptions = await db.prescription.findAll().catch(() => {
    return res.status(400).send({ message });
  });
  return res.status(200).send(prescriptions);
};
