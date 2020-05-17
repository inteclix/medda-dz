module.exports = (router, controller, middleware) => {
  router.get("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.getAll)   
  router.post("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.create)   
  return router
}
