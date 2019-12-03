const initProductRep = (models, sequelize) => {
  models.Product.findAllPagination = async amount => {
    let offset = Number(amount);
    console.log(offset);
    let products;
    return (products = models.Product.findAll({
      offset,
      limit: 15,
      order: [["amount", "desc"]],
      include: [
        {
          model: models.Rating,
          attributes: [
            [
              sequelize.fn("avg", sequelize.col("ratingValue")),
              "averageRating"
            ],
            [
              sequelize.fn("count", sequelize.col("ratingValue")),
              "amountOfRatings"
            ]
          ]
        }
      ]
    }).then(products => products));
  };
  models.Product.createProduct = async data => {
    const newProduct = await models.Product.create({
      picture: data.picture,
      title: data.title,
      description: data.description,
      price: data.price,
      amount: data.amount
    });
    const arrayOfTags = await data.tags.split(",");
    console.log(arrayOfTags);
    arrayOfTags.forEach(async element => {
      const tag = await models.Tag.create({ text: element });
      await newProduct.addTag(tag);
    });

    /*
      .tags()
      .then(() => 201)
      .catch(() => 409);
      */
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

module.exports = { initProductRep };
/*
 include: [
        {
          model: models.Rating,
          attributes: [
            [
              sequelize.fn("avg", sequelize.col("ratingValue")),
              "averageRating"
            ],
            [
              sequelize.fn("count", sequelize.col("ratingValue")),
              "amountOfRatings"
            ]
          ]
        }
      ]
   */

/*

 attributes: [
        "id",
        "price",
        "title",
        "amount",
        "description",
        "picture",
        "createdAt",
        "updatedAt",
        [
          sequelize.fn("avg", sequelize.col("ratings.ratingValue")),
          "averageRating"
        ],
        [
          sequelize.fn("count", sequelize.col("ratings.ratingValue")),
          "amountOfRatings"
        ]
      ],
      include: [{ model: models.Rating, as: "ratings", attributes: [] }],
      group: ["product.id", "rating.productId"]


   */

/*

attributes: [
        "id",
        "price",
        "title",
        "amount",
        "description",
        "picture",
        "createdAt",
        "updatedAt"
      ],

      include: {
        model: models.Rating,
        attributes: [
          sequelize.fn("avg", sequelize.col("ratingValue")),

          sequelize.fn("count", sequelize.col("ratingValue"))
        ]
      }


   */
