const db = require("../models");
const { Op } = require("sequelize");
exports.getAll = async (req, res) => {
  const specialities = await db.speciality
    .findAll({
      limit: 15,
      order: [["label", "ASC"]],
      where: {
        [req.query.where ? req.query.where : "label"]: {
          [Op.like]: `%${req.query.search ? req.query.search : ""}%`,
        },
      },
    })
    .catch(() => {
      return res.status(400).send({ message });
    });
  return res.status(200).send(specialities);
};
