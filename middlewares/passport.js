import passport from "passport";
import { Strategy } from "passport-local";
import { verifyPassword } from "../services/users";
import { models } from "../init/dataBaseUtils";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(username, password, done) {
      models.User.findOne({ where: { email: username } }).then((user, err) => {
        user = user.dataValues;

        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (password != verifyPassword(user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findOne({ where: { id: id } }).then(function(user, err) {
    done(err, user);
  });
});
