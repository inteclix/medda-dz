module.exports = (router, controller, middleware) => {
  router.get("/", [middleware.jwt.verifyToken], controller.getAll);
  router.get("/:id", [middleware.jwt.verifyToken], controller.getById);
  router.put("/:id", [middleware.jwt.verifyToken], controller.updateById);
  router.get("/:id/consultations", [middleware.jwt.verifyToken], controller.getConsultations);
  router.post("/", [middleware.jwt.verifyToken], controller.create);
  return router
}
