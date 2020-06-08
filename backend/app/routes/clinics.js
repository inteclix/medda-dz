module.exports = (router, controller, middleware) => {
  router.put(
    "/:id",
    [middleware.jwt.verifyToken, middleware.permissions.isAdminDoctor],
    controller.updateById
  );
  return router;
};
