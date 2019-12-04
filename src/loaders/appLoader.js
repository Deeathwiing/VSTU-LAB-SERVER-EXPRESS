const serveStatic = require("serve-static");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");

class AppLoader {
  constructor(app) {
    this.app = app;
  }
  init = () => {
    this.app.use(serveStatic("public"));

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
  };
}

module.exports = AppLoader;
