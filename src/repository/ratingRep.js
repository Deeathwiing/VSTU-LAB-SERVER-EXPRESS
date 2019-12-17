const models = require("../init/models");
const CustomError = require("../init/customError");

class RatingRep {
  addRating = async req => {
    try {
      const productId = Number(req.body.itemId);
      const user = req.user;
      const userId = Number(user.id);
      const ratingValue = Number(req.body.ratingValue);

      const result = await models.Rating.upsert({
        ratingValue,
        userId,
        productId
      });

      if (!result) {
        throw new CustomError("ratingError", 409, "Rating not added");
      }
    } catch (e) {
      throw new CustomError(
        "ratingError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };
}

module.exports = new RatingRep();
