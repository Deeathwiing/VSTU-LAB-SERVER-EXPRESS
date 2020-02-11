const Router = require("./router.js"),
  AppLoader = require("./appLoader"),
  PassportLoader = require("./passport"),
  { errorHandler } = require("../middlewares/errorHandler");

class InitLoaders {
  constructor(app) {
    this.app = app;
  }

  init = () => {
    new AppLoader(this.app).init();

    new PassportLoader(this.app).init();

    new Router(this.app).init();

    this.app.use(errorHandler);
  };
}

module.exports = InitLoaders;
