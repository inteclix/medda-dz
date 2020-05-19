const db = require("../models");

exports.getAll = async (req, res) => {
  const medicaments = await db.medicament.findAll().catch(() => {
    return res.status(400).send({ message });
  });
  return res.status(200).send(medicaments);
};
