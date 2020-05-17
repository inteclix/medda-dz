module.exports = (router, controller, middleware) => {
  router.get("/",
    [
      middleware.jwt.verifyToken,
      middleware.permissions.isAdminDoctor
    ],
    controller.getSecretaries
  );

  return router
}