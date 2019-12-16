const { Op } = require("sequelize");
const models = require("../init/models");
const sequelize = require("../init/sequelize");
class ProductRep {
  findAllPagination = async (amount, options) => {
    console.log(options);
    const { withImg, sortByName, sortByDate } = options;
    let offset = Number(amount);

    const whereOptionsFunc = () => {
      if (withImg) {
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
      if (sortByName) {
        return [
          ["title", "desc"],
          ["amount", "desc"]
        ];
      }
      if (sortByDate) {
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

      limit: 15,

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
    const productsWithTags = await models.Product.findAll({
      offset,

      limit: 15,

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
    let products = productsWithTags.map(function(item, i, arr) {
      let items = item.dataValues;
      items.averageRating = productsWithRating.find(
        product => product.dataValues.id == items.id
      ).dataValues.averageRating;

      items.amountOfRatings = productsWithRating.find(
        product => product.dataValues.id == items.id
      ).dataValues.amountOfRatings;

      return items;
    });
    let after = Date.now();
    console.log(after - now);
    // console.log(products);
    return products;
  };
  createProduct = async data => {
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

  updateProduct = data => {
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

  deleteProduct = id => {
    return models.Product.destroy({ where: { id } })
      .then(() => 201)
      .catch(err => 409);
  };
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
