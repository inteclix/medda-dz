const middleware = {}

middleware.permissions = require("./permissions")
middleware.jwt = require("./jwt")
middleware.validations = require("./validations")
middleware.upload = require("./multer")

module.exports = middleware