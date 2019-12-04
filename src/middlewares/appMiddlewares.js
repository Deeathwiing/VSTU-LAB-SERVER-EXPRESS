const serveStatic = require("serve-static");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");

const appMiddleWares = app => {
  app.use(serveStatic("public"));

  app.use(cookieParser());

  app.use(bodyParser());

  app.use(
    session({
      secret: "Its 322",
      cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(morgan("combined"));

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(passport.initialize());

  app.use(passport.session());
};

module.exports = { appMiddleWares };
