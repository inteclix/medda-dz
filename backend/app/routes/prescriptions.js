module.exports = (router, controller, middleware) => {
  router.get("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.getAll)   
  return router
}
