const multer = require("multer")

exports.uploadImage = multer({ dest: 'images/' })