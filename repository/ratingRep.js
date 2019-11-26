export const initRatingRep = models => {
  models.Rating.addRating = req => {
    console.log(req.body);
    const productId = Number(req.body.itemId);
    const user = req.user;
    const userId = Number(user.id);
    const ratingValue = Number(req.body.ratingValue);
    return models.Rating.upsert(
      { userId, productId },
      { fields: [ratingValue] }
    )
      .then(() => 201)
      .catch(() => 409);
  };
};
