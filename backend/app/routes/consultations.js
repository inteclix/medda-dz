module.exports = (router, controller, middleware) => {
  router.get("/:id", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.getConsultation)   
  router.get("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.getAll)   
  router.post("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.create)   
  return router
}
