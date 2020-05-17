module.exports = (router, controller, middleware) => {
  router.get("/", [middleware.jwt.verifyToken], controller.getAll)
  //router.post("/appointments", [middleware.jwt.verifyToken], controller.createWithAppointment);
  return router
}
