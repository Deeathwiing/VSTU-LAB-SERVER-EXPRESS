import {
  listUsers,
  authorization,
  createUser,
  deleteUser,
  removeRequest as addRemoveRequest,
  editNames,
  addAdminService,
  deleteAdminService
} from "../services/users";

import passport from "passport";

function getUsers(req, res) {
  listUsers(req).then(data => res.send(data));
}

function authuser(req, res, next) {
  req.email = req.body.email;
  req.password = req.body.password;
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return authorization(req, res).then(data => {
        return res.send(data);
      });
    });
  })(req, res, next);
}

function addUser(req, res) {
  createUser(req.body).then(data => {
    return res.sendStatus(data);
  });
}

function removeUser(req, res) {
  deleteUser(req.params.id).then(data => {
    return res.sendStatus(data);
  });
}

function removeRequest(req, res) {
  addRemoveRequest(req).then(status => res.sendStatus(status));
}

function editprofile(req, res) {
  editNames(req).then(data => res.sendStatus(data));
}

function addAdmin(req, res) {
  addAdminService(req.params.id).then(data => res.sendStatus(data));
}

function deleteAdmin(req, res) {
  deleteAdminService(req.params.id).then(data => res.sendStatus(data));
}

export {
  editprofile,
  removeRequest,
  removeUser,
  addUser,
  authuser,
  getUsers,
  addAdmin,
  deleteAdmin
};
