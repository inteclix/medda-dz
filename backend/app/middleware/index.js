const middleware = {}

middleware.permissions = require("./permissions")
middleware.jwt = require("./jwt")
middleware.validations = require("./validations")
middleware.multer = require("./multer")

module.exports = middleware