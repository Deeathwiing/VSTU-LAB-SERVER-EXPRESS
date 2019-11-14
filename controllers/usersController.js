import { listUsers } from "../services/usersServices/listUsers";
import { authorization } from "../services/usersServices/authorization";
import { createUser } from "../services/usersServices/createUser";
import { deleteUser } from "../services/usersServices/deleteUser";
import { removeRequest as addRemoveRequest } from "../services/usersServices/addRemoveRequest";
import { editNames } from "../services/usersServices/editNames";

export function getUsers(req, res) {
  listUsers().then(data => res.send(data));
}

export function authuser(req, res) {
  authorization(req.body).then(data => {
    return res.send(data);
  });
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
