const { Op } = require("sequelize");
const db = require("../models");

exports.getAll = async (req, res) => {
  try {
    const codePostals = await db.code_postal.findAll({
      limit: 15,
      order: [["codePostal", "ASC"]],
      where: {
        codePostal: {
          [Op.like]: `${req.query.search ? req.query.search : ""}%`,
        },
      },
    });
    return res.status(200).send(codePostals);
  } catch (err) {
    return res.status(404).send({ message: "error" });
  }
};
