const models = require("../init/models");
const CustomError = require("../init/customError");

class RatingRepository {
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
      if (e instanceof CustomError) throw e;
      throw new CustomError("undefined error", 400, "Something wrong");
    }
  };
}

module.exports = new RatingRepository();
