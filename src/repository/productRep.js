const { Op } = require("sequelize");
const models = require("../init/models");
const sequelize = require("../init/sequelize");
const CustomError = require("../init/customError");
const fs = require("fs");

class ProductRep {
  async findAllPagination(amount, withImg, sortByName, sortByDate, page) {
    try {
      let offset = Number(amount * (Math.floor(page) - 1));
      console.log("offset: " + offset);
      if (offset < 0) offset = 0;

      const whereOptionsFunc = () => {
        if (withImg == true) {
          return {
            picture: {
              [Op.not]: [{}, []]
            }
          };
        }
        return null;
      };

      const whereOptions = whereOptionsFunc();

      console.log(whereOptions);

      const orderOptionsFunc = () => {
        if (sortByName == true) {
          return [
            ["title", "desc"],
            ["amount", "desc"]
          ];
        }

        if (sortByDate == true) {
          return [
            ["updatedAt", "desc"],
            ["amount", "desc"]
          ];
        }

        return [["amount", "desc"]];
      };

      const orderOptions = orderOptionsFunc();

      console.log(orderOptions);

      //15ms sequelize without avg,count,etc
      //4 ms with avg,count (raw SQL)
      //19  sequelize with 2 table(rat,tag)

      let now = Date.now();

      const productsWithRating = await models.Product.findAll({
        subQuery: false,

        offset,

        limit: Number(amount),

        where: whereOptions,
        order: orderOptions,

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

        include: [
          {
            model: models.Rating,
            attributes: []
          }
        ],

        group: ["product.id"]
      });

      if (!productsWithRating)
        throw new CustomError(
          "findAllPaginationError",
          404,
          "Products with Rating not found"
        );

      const productsWithTags = await models.Product.findAll({
        offset,

        limit: Number(amount),

        where: whereOptions,
        order: orderOptions,

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

        include: [
          {
            model: models.Tag,
            attributes: ["text"]
          }
        ],

        group: ["product.id"]
      });

      if (!productsWithTags)
        throw new CustomError(
          "findAllPaginationError",
          404,
          "Products with Tags not found"
        );

      let products = productsWithTags.map(function(item, i, arr) {
        try {
          let items = item.dataValues;

          // console.log(items.id);
          // console.log(productsWithRating[i].dataValues.id);

          let foundedProduct = productsWithRating.find(
            product => product.dataValues.id == items.id
          );

          let averageRating = foundedProduct.dataValues.averageRating;

          let amountOfRatings = foundedProduct.dataValues.amountOfRatings;

          items.averageRating = averageRating;

          items.amountOfRatings = amountOfRatings;

          return items;
        } catch (e) {
          throw new CustomError(
            "mergedArrError",
            404,
            "Problem with merged array"
          );
        }
      });
      let after = Date.now();
      console.log(after - now);

      return products;
    } catch (e) {
      if (e instanceof CustomError) throw e;
      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }

  async createProduct(data, image) {
    try {
      console.log(data);
      console.log(image);

      const newProduct = await models.Product.create({
        picture: "none",
        title: data.title,
        description: data.description,
        price: data.price,
        amount: data.amount
      });

      if (!newProduct)
        throw new CustomError("createProductError", 404, "Product not created");

      const arrayOfTags = data.tags.split(",");

      arrayOfTags.forEach(async element => {
        const tag = await models.Tag.create({ text: element });

        if (!tag)
          throw new CustomError("createProductError", 404, "Tag not created");

        const result = await newProduct.addTag(tag);

        if (!result)
          throw new CustomError(
            "createProductError",
            404,
            "Tag not added to product"
          );
      });
    } catch (e) {
      console.log(e);
      if (e instanceof CustomError) throw e;
      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }

  async updateProduct(data) {
    try {
      const result = await models.Product.update(
        {
          picture: data.picture,
          title: data.title,
          description: data.description,
          price: data.price,
          tags: data.tags,
          amount: data.amount
        },
        { where: { id: data.id } }
      );

      if (!result)
        throw new CustomError("updateProductError", 404, "Product not updated");
    } catch (e) {
      if (e instanceof CustomError) throw e;
      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }

  async deleteProduct(id) {
    try {
      const result = await models.Product.destroy({ where: { id } });

      if (!result)
        throw new CustomError("deleteProductError", 404, "Product not deleted");
    } catch (e) {
      if (e instanceof CustomError) throw e;
      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }
}

module.exports = new ProductRep();
/*
 include: [
        {
          model: models.Rating,
          attributes: [
            [
              sequelize.fn("avg", "ratingValue")),
              "averageRating"
            ],
            [
              sequelize.fn("count", "ratingValue")),
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
          sequelize.fn("avg", "ratings.ratingValue")),
          "averageRating"
        ],
        [
          sequelize.fn("count", "ratings.ratingValue")),
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
          sequelize.fn("avg", "ratingValue")),

          sequelize.fn("count", "ratingValue"))
        ]
      }


   */

/*

 products = await sequelize.query(
      `
SELECT \`products\`.*, (Select avg(ratingValue) from ratings where productId = \`products\`.\`id\` ) as averageRating,
(Select count(ratingValue) from ratings where productId = \`products\`.\`id\` ) as amountOfRatings
from products
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

// models.Product.findAllPagination = async amount => {
//   let offset = Number(amount);

//   let products;

//   products = await models.Product.findAll({
//     offset,
//     limit: 15,
//     order: [["amount", "desc"]],
//     attributes: [
//       "id",
//       "price",
//       "title",
//       "amount",
//       "description",
//       "picture",
//       "createdAt",
//       "updatedAt"
//     ],

//     include: [
//       {
//         model: models.Rating,
//         attributes: [
//           "productId",
//           "ratingValue",
//           [
//             sequelize.fn("avg", sequelize.col("ratingValue")),
//             "averageRating"
//           ],
//           [
//             sequelize.fn("count", sequelize.col("ratingValue")),
//             "amountOfRatings"
//           ]
//         ],
//         group: ["product.id", "ratings.productId"]
//       }
//     ],
//     group: ["product.id"],
//     raw: true
//   });

//   console.log(products);
//   return products;
// };

// products = await models.Product.findAll({
//   offset,
//   limit: 15,
//   order: [["amount", "desc"]],
//   attributes: [
//     "id",
//     "price",
//     "title",
//     "amount",
//     "description",
//     "picture",
//     "createdAt",
//     "updatedAt",
//     [
//       sequelize.fn("avg", sequelize.col("ratings.ratingValue")),
//       "averageRating"
//     ],
//     [
//       sequelize.fn("count", sequelize.col("ratings.ratingValue")),
//       "amountOfRatings"
//     ]
//   ],

//   include: [
//     {
//       model: models.Rating,
//       attributes: [],
//       group: ["product.id", "ratings.productId"]
//     }
//   ],
//   group: ["product.id", "ratings.productId"],
//   raw: true
// });

// products = await models.Product.findAll({
//   offset,
//   limit: 15,
//   order: [["amount", "desc"]],
//   attributes: [
//     "id",
//     "price",
//     "title",
//     "amount",
//     "description",
//     "picture",
//     "createdAt",
//     "updatedAt"
//   ],

//   include: [
//     {
//       model: models.Rating,
//       attributes: {
//         include: [
//           [sequelize.fn("avg", "ratingValue"), "averageRating"],
//           [sequelize.fn("count", "ratingValue"), "amountOfRatings"]
//         ]
//       },
//       group: ["product.id", "ratings.productId"]
//     }
//   ]
// });
