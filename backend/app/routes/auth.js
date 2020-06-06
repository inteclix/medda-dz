module.exports = (router, controller, middleware) => {
  router.post("/signup", [middleware.validations.checkDuplicateUser], controller.signup);
  router.post("/signin", controller.signin);
  router.get("/me", [middleware.jwt.verifyToken], controller.getMe);
  router.put("/me", [middleware.jwt.verifyToken], controller.updateMe);
  return router
}
