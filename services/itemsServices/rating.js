import Item from "../../models/item";

export const addRating = async data => {
  Item.findById(data.itemId).then(foundItem => {
    const { user } = data;
    const personalRating = {
      user: user.logEmail,
      ratingValue: data.ratingValue
    };
    const singleRating = foundItem.rating;

    let checkRating = false;
    if (singleRating[0]) {
      singleRating.forEach((element, i, rating) => {
        if (element.user === user.logEmail) {
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
      { _id: data.itemId },
      { rating: foundItem.rating, averageRating: foundItem.averageRating }
    );
  });
};
