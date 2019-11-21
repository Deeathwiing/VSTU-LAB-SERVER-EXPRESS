export function authenticationMiddleware(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

export function authenticationAdminMiddleware(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    if (req.user.administration) {
      return next();
    }
  }
  res.sendStatus(401);
}
