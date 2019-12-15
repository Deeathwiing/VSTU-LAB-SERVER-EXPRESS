const UserRep = require("..//repository/userRep");

class Auth {
  authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.sendStatus(401);
  };

  authenticationAdminMiddleware = async (req, res, next) => {
    if (await UserRep.verifyRole(req.user.id, "administration")) {
      return next();
    }

    res.sendStatus(401);
  };
}
module.exports = new Auth();
