module.exports = (router, controller, middleware) => {
  router.post(
    "/",
    [
      middleware.jwt.verifyToken,
      middleware.permissions.isDoctor,
      middleware.upload.single("uploadfile"),
    ],
    controller.uploadImage
  );

  router.get(
    "/download/:id",
    [middleware.jwt.verifyToken, middleware.permissions.isDoctor],
    controller.downloadImage
  );
  return router;
};
