import { verifyRole } from "../services/usersServices/verifyRole";

export function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

export function authenticationAdminMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    if (verifyRole(req.user.id, "administration")) {
      return next();
    }
  }
  res.sendStatus(401);
}
