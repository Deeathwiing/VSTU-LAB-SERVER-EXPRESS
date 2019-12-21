const UserRep = require("..//repository/userRep");
const CustomError = require("../init/customError");

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

  next(new CustomError("authAdminError", 401, "You are not admin"));
};

module.exports = { authenticationAdminMiddleware, authenticationMiddleware };
