module.exports = (router, controller, middleware) => {
  router.get("/", [], controller.getAll)   
  return router
}
