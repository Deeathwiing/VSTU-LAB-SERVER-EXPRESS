const { models } = require("../init/dataBaseUtils");

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

function authenticationAdminMiddleware(req, res, next) {
  if (models.User.verifyRole(req.user.id, "administration")) {
    return next();
  }
  res.sendStatus(401);
}
module.exports = { authenticationAdminMiddleware, authenticationMiddleware };
