const Router = require("./router.js");
const AppLoader = require("./appLoader");
const PassportLoader = require("./passport");

class InitLoaders {
  constructor(app) {
    this.app = app;
  }
  init = () => {
    new AppLoader(this.app).init();

    new PassportLoader(this.app).init();

    new Router(this.app).init();
  };
}

module.exports = InitLoaders;
