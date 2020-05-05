const { Strategy } = require("passport-local"),
  Users = require("../services/userServices"),
  models = require("../init/models"),
  passport = require("passport");

class PassportMid {
  init = () => {
    passport.use(
      new Strategy(
        {
          usernameField: "email",
          passwordField: "password",
        },

        function (username, password, done) {
          models.User.findOne({ where: { email: username } }).then(
            (user, err) => {
              user = user.dataValues;

              if (err) {
                return done(err);
              }

              if (!user) {
                return done(null, false, { message: "Incorrect username" });
              }

              if (password != Users.verifyPassword(user.password)) {
                return done(null, false, { message: "Incorrect password" });
              }

              return done(null, user);
            }
          );
        }
      )
    );

    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      models.User.findOne({ where: { id: id } }).then(function (user, err) {
        done(err, user);
      });
    });

    return passport;
  };
}

module.exports = PassportMid;
