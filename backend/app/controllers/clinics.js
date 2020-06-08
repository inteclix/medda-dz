const db = require("../models");

exports.updateById = async (req, res) => {
  const clinic = await db.clinic.findByPk(req.params.id)
  if(!clinic){
    return res.status(404).send({message: "clinic not found"})
  }
  try {
    await clinic.update(req.body)
  } catch (error) {
    console.log(error, null, 2)
    return res.status(404).send({ message: "something got error"})
  }
  const updatedUser = await db.user.findByPk(req.user.id, {
    include: [
      {
        model: db.doctor,
        include: [
          {
            model: db.clinic,
            include: db.code_postal,
          },
          db.speciality,
        ],
      },
      {
        model: db.secretary,
        include: db.clinic,
      },
      {
        model: db.patient,
      },
      {
        model: db.code_postal,
      },
    ],
  });
    if (!updatedUser) {
    return res.status(404).send({ message: "some thing got wrong" })
  }
  return res.status(200).send(updatedUser)
};