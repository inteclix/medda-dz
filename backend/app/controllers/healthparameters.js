const db = require("../models");

exports.getAll = async (req, res) => {
  const rows = await db.health_parameter.findAll({
    include: [
      {
        model: db.health_parameter_option,
        attributes: ["name"]
      },
      {
        model: db.health_parameter_category,
        attributes: ["name"]
      }
    ]
  })
  if(!rows){
    return res.status(404).send({message: "not found"})
  }
  return res.status(200).send(rows)
}