import Item from "../../models/item";

export const addRating = async req => {
  Item.findById(req.body.itemId).then(foundItem => {
    const user = req.user;
    const personalRating = {
      user: user.email,
      ratingValue: req.body.ratingValue
    };
    const singleRating = foundItem.rating;

    let checkRating = false;
    if (singleRating[0]) {
      singleRating.forEach((element, i, rating) => {
        if (element.user === user.email) {
          rating[i] = personalRating;
          checkRating = true;
        }
      });
      if (!checkRating) {
        singleRating.push(personalRating);
      }
    } else singleRating.push(personalRating);

    foundItem.rating = singleRating;

    const ratingValueArr = foundItem.rating.map(element =>
      Number(element.ratingValue)
    );

    let nextAverageRating = ratingValueArr.reduce(
      (sum, current) => sum + current
    );

    nextAverageRating /= ratingValueArr.length;

    foundItem.averageRating = nextAverageRating;

    return Item.updateOne(
      { _id: req.body.itemId },
      { rating: foundItem.rating, averageRating: foundItem.averageRating }
    );
  });
};
