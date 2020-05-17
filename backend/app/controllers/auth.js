const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.me = (req, res) => {
  return res.status(200).send(req.user)
};

exports.signup = async (req, res) => {
  if (req.body.is === "doctor" && req.body.specialityId) {
    await db.clinic
      .create(
        {
          name: "Clinic" + new Date().getTime(),
          doctors: [
            {
              isAdmin: 1,
              specialityId: req.body.specialityId,
              user: {
                username: req.body.username,
                mobile: req.body.mobile,
                password: bcrypt.hashSync(req.body.password, 8),
                is: req.body.is,
                permissions: "['clinic', 'doctor']"
              },
            },
          ],
        },
        {
          include: {
            model: db.doctor,
            include: db.user,
          },
        }
      )
      .catch(() => {
        return res
          .status(400)
          .send({ message: "Failed! when register new user" });
      })
      .then((clinic) => {
        return res.status(200).send({ message: "User registered successfully!" });
      })

  } else {
    return res.status(400).send({ message: "Failed! role required" });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      if (!user.isActive) {
        return res.status(401).send({ message: "Your account is inactive!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        user: user,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
