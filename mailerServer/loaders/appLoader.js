const bodyParser = require("body-parser"),
  cors = require("cors"),
  mailerRouter = require("../routes/mailerRouter"),
  { errorHandler } = require("../middlewares/errorHandler");

class AppLoader {
  constructor(app) {
    this.app = app;
  }

  init = () => {
    this.app.use(bodyParser());

    this.app.use(bodyParser.json());

    this.app.use(cors({ origin: "http://localhost:3002", credentials: true }));

    this.app.use("/main", mailerRouter);

    this.app.use(errorHandler);
  };
}

module.exports = AppLoader;
