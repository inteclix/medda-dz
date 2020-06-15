var stream = require("stream");

const db = require("../models");
const Image = db.consultation_images;

exports.uploadImage = (req, res) => {
  Image.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    consultationId: req.body.consultationId,
  })
    .then(() => {
      res.status(200).send({ message: "uploaded success" });
    })
    .catch(() => {
      return res.status(404).send({ message: "error" });
    });
};

exports.getById = (req, res) => {
  const image = Image.findByPk(req.params.id);
  if (!image) {
    return res.status(404).send({ message: "Not found" });
  }
  return res.status(200).send(image);
};

exports.downloadById = (req, res) => {
  Image.findByPk(req.params.id).then((file) => {
    var fileContents = Buffer.from(file.data, "base64");
    var readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set("Content-disposition", "attachment; filename=" + file.name);
    res.set("Content-Type", file.type);

    readStream.pipe(res);
  });
};


exports.deleteById = async (req, res) => {
  console.log("params", req.params)
  const consultation_image = await db.consultation_images.findByPk(req.params.id);
  if (!consultation_image) {
    return res.status(404).send({ message: "Not found" });
  }
  await consultation_image
    .destroy()
    .then(() => {
      return res.status(203).send({ message: "consultation removed" });
    })
    .catch(() => {
      return res.status(500).send({ message: "error when removed" });
    });
};