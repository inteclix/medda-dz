const db = require("../models");

exports.getAll = (req, res) => {
  db.clinic
    .findByPk(req.doctor.clinicId, {
      include: {
        model: db.secretary,
        include: db.user,
      },
    })
    .then((clinic) => {
      const users = clinic.secretaries.map((secretary)=>{
        return secretary.user
      })
      return res.status(200).send(clinic.secretaries);
    })
    .catch(() => {
      return res.status(500).send("server error");
    });
};

exports.create = (req, res) => {
  db.secretary.create(
    {
      clinicId: req.doctor.clinicId,
      user: {
        username: "secretary",
        password: "123456",
        mobile: "0540055010",
      },
    },
    {
      include: db.user,
    }
  );
};
