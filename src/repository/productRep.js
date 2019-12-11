const initProductRep = (models, sequelize) => {
  models.Product.findAllPagination = async amount => {
    let offset = Number(amount);
    let products;
    products = await sequelize.query(
      `
SELECT \`products\`.*, (Select avg(ratingValue) from ratings where productId = \`products\`.\`id\` ) as averageRating, 
(Select count(ratingValue) from ratings where productId = \`products\`.\`id\` ) as amountOfRatings
from products 
ORDER BY \`products\`.\`amount\` DESC
LIMIT ${offset}, 15;
`
    );

    return products[0];
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
      .catch(err => 409);
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

/*

 products = await sequelize.query(
      `
SELECT \`products\`.*, (Select avg(ratingValue) from ratings where productId = \`products\`.\`id\` ) as averageRating,
(Select count(ratingValue) from ratings where productId = \`products\`.\`id\` ) as amountOfRatings
from products
LEFT OUTER JOIN \`ratings\` ON \`products\`.\`id\` = \`ratings\`.\`productId\`
ORDER BY \`products\`.\`amount\` DESC
LIMIT ${offset}, 15;
`
    );
    console.log(products);
    return products[0];


   */

// LEFT OUTER JOIN \`ratings\` ON \`products\`.\`id\` = \`ratings\`.\`productId\`

// (Select
//     CONCAT(
//   (Select`text` from tags Where id in
// (Select tagId from producttag Where productId = `products`.`id`)
//  )
//     ) as tags
// )
