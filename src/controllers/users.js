const Users = require("../services/users");
const customError = require("../init/customError");

const passport = require("passport");

class UsersController {
  getUsers = (req, res, next) => {
    Users.listUsers(req)
      .then(data => res.send(data))
      .catch(err => next(err));
  };

  authuser = (req, res, next) => {
    req.email = req.body.email;

    req.password = req.body.password;

    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(
          new customError(
            "authError",
            401,
            "You are not logged in - wrong password or email,user not found "
          )
        );
      }

      if (!user) {
        return next(
          new customError(
            "authError",
            401,
            "You are not logged in - wrong password or email,user not found "
          )
        );
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(
            new customError(
              "authError",
              401,
              "You are not logged in - wrong password or email,user not found "
            )
          );
        }

        return Users.authorization(req, res).then(data => {
          return res.send(data);
        });
      });
    })(req, res, next);
  };

  addUser = (req, res, next) => {
    Users.createUser(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  removeUser = (req, res, next) => {
    Users.deleteUser(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  removeRequest = (req, res, next) => {
    Users.addRemoveRequest(req)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  editprofile = (req, res, next) => {
    Users.editNames(req)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  addAdmin = (req, res, next) => {
    Users.addAdminService(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  deleteAdmin = (req, res, next) => {
    Users.deleteAdminService(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };
}

module.exports = new UsersController();
