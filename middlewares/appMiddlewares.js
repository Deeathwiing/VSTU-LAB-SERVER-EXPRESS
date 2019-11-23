import serveStatic from "serve-static";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import cors from "cors";

export const appMiddlewares = app => {
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
