import passport from "passport";
import { Strategy } from "passport-local";
import { verifyPassword } from "../services/usersServices/verifyPassword";
import User from "../models/user";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (password != verifyPassword(user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        console.log("прошло");
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
