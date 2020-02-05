const serveStatic = require("serve-static"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  morgan = require("morgan"),
  cors = require("cors"),
  PassportMid = require("../middlewares/passport"),
  express = require("express"),
  cronJob = require("../helpers/cron/cron");

class AppLoader {
  constructor(app) {
    this.app = app;
  }

  init = () => {
    this.app.use(bodyParser.json());

    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    this.app.use("/static", express.static("static"));

    this.app.use(cookieParser());

    this.app.use(bodyParser());

    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
        resave: false,
        saveUninitialized: false
      })
    );

    this.app.use(morgan("combined"));

    this.app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    new PassportMid().init();

    cronJob.start();
  };
}

module.exports = AppLoader;
