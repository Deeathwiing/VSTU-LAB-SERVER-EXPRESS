const usersRouter = require("../routes/usersRouter.js");
const productsRouter = require("../routes/productsRouter.js");

class Router {
  constructor(app) {
    this.app = app;
  }
  init = () => {
    this.app.use("/users", usersRouter);
    this.app.use("/items", productsRouter);
  };
}

module.exports = Router;
