export const initProductRep = models => {
  models.Product.findAllPagination = async amount => {
    let offset = Number(amount);
    return await models.Product.findAll({
      offset,
      limit: 15,
      include: [{ model: models.Rating }]
    });
  };
  models.Product.createProduct = data => {
    return models.Product.create({
      picture: data.picture,
      title: data.title,
      description: data.description,
      price: data.price,
      tags: data.tags,
      amount: data.amount
    })
      .then(() => 201)
      .catch(() => 409);
  };

  models.Product.updateProduct = data => {
    return models.Product.update(
      {
        picture: data.picture,
        title: data.title,
        description: data.description,
        price: data.price,
        tags: data.tags,
        amount: data.amount
      },
      { where: { id: data.id } }
    )
      .then(() => 201)
      .catch(() => 409);
  };

  models.Product.deleteProduct = id => {
    return models.Product.destroy({ where: { id } })
      .then(() => 201)
      .catch(() => 409);
  };
};

/*
attributes: {
      include: [
        [
          { model: models.Rating, as: "Ratings" },
          sequelize.fn("Count", sequelize.col("Ratings.productId")),
          "ratingAmount"
        ]
      ]
    }
*/
