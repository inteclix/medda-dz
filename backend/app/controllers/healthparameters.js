const db = require("../models");

exports.getAll = async (req, res) => {
  const rows = await db.healthParameter.findAll({
    include: [
      {
        model: db.healthParameterOption,
        attributes: ["name"]
      },
      {
        model: db.healthParameterCategory,
        attributes: ["name"]
      }
    ]
  })
  if(!rows){
    return res.status(404).send({message: "not found"})
  }
  return res.status(200).send(rows)
}