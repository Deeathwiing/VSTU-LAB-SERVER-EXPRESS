import { listUsers } from "../services/usersServices/listUsers";
import { authorization } from "../services/usersServices/authorization";
import { createUser } from "../services/usersServices/createUser";
import { deleteUser } from "../services/usersServices/deleteUser";
import { removeRequest as addRemoveRequest } from "../services/usersServices/addRemoveRequest";
import { editNames } from "../services/usersServices/editNames";
import passport from "passport";

export function getUsers(req, res, next) {
  passport.authenticate("local"), listUsers(req).then(data => res.send(data));
}

export function authuser(req, res, next) {
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
      console.log(user);
      if (err) {
        return next(err);
      }
      return authorization(req, res).then(data => {
        return res.send(data);
      });
    });
  })(req, res, next);
}

export function addUser(req, res) {
  createUser(req.body).then(data => {
    return res.sendStatus(data);
  });
}

export function removeUser(req, res) {
  deleteUser(req.params.id).then(data => {
    return res.sendStatus(data);
  });
}

export function removeRequest(req, res) {
  addRemoveRequest(req.body).then(data => res.sendStatus(data));
}

export function editprofile(req, res) {
  editNames(req.body).then(data => res.sendStatus(data));
}
