const usersRouter = require("../routes/usersRouter.js");
const productsRouter = require("../routes/productsRouter.js");
const authRouter = require("../routes/authRouter");

class Router {
  constructor(app) {
    this.app = app;
  }

  init = () => {
    this.app.use("/users", usersRouter);
    this.app.use("/items", productsRouter);
    this.app.use("/auth", authRouter);
  };
}

module.exports = Router;
