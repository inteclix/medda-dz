module.exports = (router, controller, middleware) => {
  router.post(
    "/",
    [
      middleware.jwt.verifyToken,
      middleware.permissions.isDoctor,
      middleware.upload.single("file"),
    ],
    controller.uploadImage
  );

  router.get(
    "/:id",
    [middleware.jwt.verifyToken, middleware.permissions.isDoctor],
    controller.getImage
  );

  router.get(
    "/download/:id",
    [middleware.jwt.verifyToken, middleware.permissions.isDoctor],
    controller.downloadImage
  );
  return router;
};
