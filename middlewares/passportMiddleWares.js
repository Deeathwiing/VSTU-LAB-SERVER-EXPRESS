import { models } from "../init/dataBaseUtils";

export function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

export function authenticationAdminMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    if (models.User.verifyRole(req.user.id, "administration")) {
      return next();
    }
  }
  res.sendStatus(401);
}
