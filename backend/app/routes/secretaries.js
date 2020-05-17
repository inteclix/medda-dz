const {verifyToken} = require("../middleware/jwt");
const {checkDuplicateUser} = require("../middleware/validations");
const {isAdminDoctor} = require("../middleware/permissions");

module.exports = (router, controller, middleware) => {
  router.get("/",
    [
      middleware.jwt.verifyToken,
      middleware.permissions.isAdminDoctor
    ],
    controller.getAll
  );

  router.post("/",
    [
      middleware.jwt.verifyToken,
      middleware.validations.checkDuplicateUser,
      middleware.permissions.isAdminDoctor
    ],
    controller.create
  );
  return router
}
