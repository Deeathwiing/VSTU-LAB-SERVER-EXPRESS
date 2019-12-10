const Users = require("../services/users");

const passport = require("passport");

class UsersController {
  getUsers = (req, res) => {
    Users.listUsers(req).then(data => res.send(data));
  };

  authuser = (req, res, next) => {
    req.email = req.body.email;

    req.password = req.body.password;

    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.sendStatus(401);
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        return Users.authorization(req, res).then(data => {
          return res.send(data);
        });
      });
    })(req, res, next);
  };

  addUser = (req, res) => {
    Users.createUser(req.body).then(data => {
      return res.sendStatus(data);
    });
  };

  removeUser = (req, res) => {
    Users.deleteUser(req.params.id).then(data => {
      return res.sendStatus(data);
    });
  };

  removeRequest = (req, res) => {
    Users.addRemoveRequest(req).then(status => res.sendStatus(status));
  };

  editprofile = (req, res) => {
    Users.editNames(req).then(data => res.sendStatus(data));
  };

  addAdmin = (req, res) => {
    Users.addAdminService(req.params.id).then(data => res.sendStatus(data));
  };

  deleteAdmin = (req, res) => {
    Users.deleteAdminService(req.params.id).then(data => res.sendStatus(data));
  };
}

module.exports = new UsersController();
