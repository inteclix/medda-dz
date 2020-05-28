const { Op } = require("sequelize");
const db = require("../models");

exports.getAll = async (req, res) => {
  const rows = await db.health_parameter.findAll({
    limit: 15,
    order: [["label", "ASC"]],
    where: {
      [req.query.where ? req.query.where : "label"]: {
        [Op.like]: `%${req.query.search ? req.query.search : ""}%`,
      },
    },
    include: [
      {
        model: db.health_parameter_option,
      },
      {
        model: db.health_parameter_category,
        attributes: ["label"]
      }
    ]
  })
  if(!rows){
    return res.status(404).send({message: "not found"})
  }
  return res.status(200).send(rows)
}