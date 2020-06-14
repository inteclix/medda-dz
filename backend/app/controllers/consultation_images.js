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

exports.getImage = (req, res) => {
  const image = Image.findById(req.params.id);
  if (!image) {
    return res.status(404).send({ message: "Not found" });
  }
  return res.status(200).send(image);
};

exports.downloadImage = (req, res) => {
  Image.findById(req.params.id).then((file) => {
    var fileContents = Buffer.from(file.data, "base64");
    var readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set("Content-disposition", "attachment; filename=" + file.name);
    res.set("Content-Type", file.type);

    readStream.pipe(res);
  });
};