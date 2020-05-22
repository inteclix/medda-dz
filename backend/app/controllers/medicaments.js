const { Op } = require("sequelize");
const db = require("../models");

exports.getAll = async (req, res) => {
  try {
    const medicaments = await db.medicament.findAll({
      limit: 15,
      order: [["name", "ASC"]],
      where: {
        [req.query.where ? req.query.where : "name"]: {
          [Op.like]: `%${req.query.search ? req.query.search : ""}%`,
        },
      },
    });
    return res.status(200).send(medicaments);
  } catch (err) {
    return res.status(404).send({ message: "error" });
  }
};
