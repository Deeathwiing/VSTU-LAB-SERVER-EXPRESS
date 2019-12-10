const models = require("../init/models");

class Auth {
  authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.sendStatus(401);
  };

  authenticationAdminMiddleware = async (req, res, next) => {
    if (await models.User.verifyRole(req.user.id, "administration")) {
      return next();
    }

    res.sendStatus(401);
  };
}
module.exports = new Auth();
