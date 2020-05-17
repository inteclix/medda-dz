module.exports = (router, controller) => {
  router.get("/", [], controller.getAll);
  return router
}
