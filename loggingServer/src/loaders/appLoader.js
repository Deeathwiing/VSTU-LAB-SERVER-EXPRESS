const bodyParser = require("body-parser"),
  cors = require("cors"),
  express = require("express"),
  logErrorRouter = require("../routes/logErrorRouter"),
  logRouter = require("../routes/logRouter"),
  { errorHandler } = require("../middlewares/errorHandler");

class AppLoader {
  constructor(app) {
    this.app = app;
  }

  init = () => {
    this.app.use(bodyParser());

    this.app.use(bodyParser.json());

    this.app.use(cors({ origin: "http://localhost:3002", credentials: true }));

    this.app.use("/error", logErrorRouter);

    this.app.use("/main", logRouter);

    this.app.use(errorHandler);
  };
}

module.exports = AppLoader;
