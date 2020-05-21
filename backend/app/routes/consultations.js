module.exports = (router, controller, middleware) => {
  router.get("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.getAll)   
  router.post("/", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.create)  
  router.get("/:id", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.getConsultationById)   
  router.put("/:id", [middleware.jwt.verifyToken, middleware.permissions.isDoctor], controller.updateById)   
  return router
}
